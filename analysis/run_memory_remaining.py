"""Execute only the 300 unconsumed frozen schedule slots. Never resume/retry."""
import asyncio, json, os, sys, time, subprocess
from datetime import datetime,timezone
from decimal import Decimal
from pathlib import Path
import run_memory_pilot as pilot
ROOT=pilot.ROOT
E=ROOT/'reports/out/jev-adjudication-results-20260921'
P=pilot.P
F=ROOT/'reports/out/jev-four-reviewer-20260922'
OUT=ROOT/'reports/out/jev-memory-full-20260922'
read=pilot.read;sha=pilot.sha;write=pilot.write

def key(row):return row['case_id'],row['arm'],row['replicate']
def check_manifest(root,name):
    for rel,h in read(root/name).items():
        if sha(root/rel)!=h:raise ValueError('Frozen artifact mismatch: '+str(root/rel))

def prepare():
    pilot.verify_inputs()
    check_manifest(E,'SHA256SUMS.json');check_manifest(F,'SHA256SUMS.json')
    check_manifest(P,'analysis/evidence-sha256.json')
    full=read(E/'schedule.json');old=[read(p) for p in sorted((P/'execution').glob('*-result.json'))]
    if len(full)!=372 or len(set(map(key,full)))!=372:raise ValueError('Invalid full schedule')
    if len(old)!=72 or any(x['status']!='completed' for x in old):raise ValueError('Pilot incomplete')
    if [key(r) for r in old]!=[key(r) for r in read(P/'schedule.json')]:raise ValueError('Pilot receipt mismatch')
    consumed=set(map(key,old));remaining=[dict(x,full_schedule_index=i) for i,x in enumerate(full,1) if key(x) not in consumed]
    if len(remaining)!=300 or len(consumed)!=72 or not consumed<=set(map(key,full)):raise ValueError('Wrong remaining boundary')
    for e in read(E/'edits.json'):
        a=read(E/f"inputs/{e['case_id']}/A.json");b=read(E/f"inputs/{e['case_id']}/B.json")
        if b['state']['memories']!=[t for i,t in enumerate(a['state']['memories']) if i not in e['removed_indices']]:raise ValueError('Wrong deletion')
        b['state']['memories']=a['state']['memories']
        if a!=b:raise ValueError('Unintended input difference')
    return remaining,old

def freeze():
    if OUT.exists():raise ValueError('Never overwrite an existing run')
    schedule,old=prepare();OUT.mkdir()
    write(OUT/'remaining-schedule.json',schedule)
    protected=set(Path(p) for p in read(F/'preservation.json')['after'])
    protected.update(p for folder in (E,P,F,ROOT/'analysis',ROOT/'docs/analysis') for p in folder.rglob('*') if p.is_file() and '__pycache__' not in str(p))
    hashes={str(p):sha(p) for p in sorted(protected)}
    write(OUT/'preservation-before.json',hashes)
    write(OUT/'authorization.json',{'utc':datetime.now(timezone.utc).isoformat(),'authorization':'User: ok i agree lets get it done; remaining 300 frozen calls only.','max_new_calls':300,'pilot_calls_preserved':72,'model_route':'typesafe/jev-1.13','required_resolved_revision':'typesafe/jev-1.13-20260917','timeout_seconds':20,'retries':0,'max_total_experiment_cost_usd':.25,'pilot_cost_usd':str(sum((Decimal(str(r['cost_usd'])) for r in old),Decimal(0))),'main_before':subprocess.check_output(['git','rev-parse','main'],cwd=ROOT,text=True).strip(),'runner_sha256':sha(Path(__file__)),'remaining_schedule_sha256':sha(OUT/'remaining-schedule.json'),'parent_plan_sha256':sha(E/'experiment-plan.json'),'note':'No historical budget database opened. Original scoring and four-reviewer supplementary separation unchanged.'})
    print('FROZEN',len(schedule),sha(OUT/'remaining-schedule.json'))

async def execute():
    schedule,old=prepare();auth=read(OUT/'authorization.json')
    if schedule!=read(OUT/'remaining-schedule.json') or sha(OUT/'remaining-schedule.json')!=auth['remaining_schedule_sha256']:raise ValueError('Schedule changed')
    if sha(Path(__file__))!=auth['runner_sha256']:raise ValueError('Runner changed after freeze')
    dest=OUT/'execution'
    if dest.exists():raise ValueError('Already attempted; no retry or resume')
    from dotenv import dotenv_values
    secret=dotenv_values(r'C:\Users\matri\Documents\myprojects\agent-economy\.env').get('OPENROUTER_API_KEY')
    if not secret:raise ValueError('API key unavailable')
    os.environ['OPENROUTER_API_KEY']=secret
    adapter=pilot.OpenRouterDecisionsAdapter({'timeout_s':20,'resolved_models':[auth['required_resolved_revision']]})
    dest.mkdir();spent=Decimal(auth['pilot_cost_usd']);stop=None;completed=0
    for i,item in enumerate(schedule,1):
        if spent+Decimal('.01')>Decimal(str(auth['max_total_experiment_cost_usd'])):stop='Local reserve denied at total experiment ceiling';break
        ev=pilot.validate_evaluation(read(E/f"inputs/{item['case_id']}/{item['arm']}.json"))
        row=dict(item,call_index=i,started_utc=datetime.now(timezone.utc).isoformat(),input_sha256=sha(E/f"inputs/{item['case_id']}/{item['arm']}.json"),reservation_id=f'full-{i:03}',reserved_usd=.01,retries=0,status='dispatched')
        write(dest/f'{i:03}-started.json',row);start=time.perf_counter()
        try:
            answer=await adapter.complete(auth['model_route'],[],purpose='decision',context={'_evaluation':ev})
            value=json.loads(answer.text);usage=value.get('usage',{})
            error=pilot.response_error(value,ev,expected_models=(auth['required_resolved_revision'],),expected_provider='TypeSafe')
            cost=answer.reported_cost_usd
            if cost is None:error=error or 'Missing reported cost'
            else:spent+=Decimal(str(cost))
            choice=value.get('answers',{}).get('action',{}).get('choice');cached=usage.get('cached_tokens',usage.get('cache_read_input_tokens'))
            row.update(status='invalid' if error else 'completed',validation_error=error,response=value,input_tokens=answer.in_tokens,output_tokens=answer.out_tokens,cached_tokens=cached,cached_tokens_status='unavailable' if cached is None else 'reported',cost_usd=cost,reservation_state='settled' if cost is not None else 'unknown',selected_action=choice,choice_kind='WAIT' if choice=='wait' else 'ESCALATE' if choice=='escalate' else 'ACTIVE',actions=ev['questions']['action']['criteria'].get(choice,{}).get('actions',[]))
            if error:stop=error
            else:completed+=1
        except Exception as exc:
            row.update(status='error',error_type=type(exc).__name__,error=str(exc).replace(secret,'[REDACTED]'),reservation_state='unknown',cost_usd=None);stop=row['error']
        row.update(finished_utc=datetime.now(timezone.utc).isoformat(),latency_ms=round((time.perf_counter()-start)*1000,3));write(dest/f'{i:03}-result.json',row)
        if i%10==0 or stop:print(json.dumps({'new_attempts':i,'completed':completed,'total_cost_including_pilot':str(spent),'stop':stop}),flush=True)
        if stop:break
    result={'new_completed':completed,'new_attempted':len(list(dest.glob('*-started.json'))),'total_known_cost_including_pilot':str(spent),'stop_reason':stop,'unknown_reservations':sum(read(p)['reservation_state']=='unknown' for p in dest.glob('*-result.json')),'retries':0}
    write(dest/'completion.json',result);print(json.dumps(result),flush=True)

if __name__=='__main__':
    if sys.argv[1:]==['--prepare']:freeze()
    elif sys.argv[1:]==['--execute-authorized-300']:asyncio.run(execute())
    else:raise SystemExit('Choose --prepare or --execute-authorized-300')
