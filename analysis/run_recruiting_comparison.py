"""Explicit 120-call recruiting comparison only; standalone receipts, no simulation/gateway writes."""
from __future__ import annotations
import asyncio, hashlib, json, os, sys, time
from datetime import datetime, timezone
from pathlib import Path

ROOT=Path(__file__).resolve().parents[1]
sys.path.insert(0,str(ROOT))
from llm.openrouter_decisions import OpenRouterDecisionsAdapter
from llm.decisions import response_error, validate_evaluation

P=ROOT/'reports/out/jev-recruiting-presentation-20260922'
D=ROOT/'reports/out/jev-recruiting-execution-20260922'
def read(p):return json.loads(p.read_text(encoding='utf-8-sig'))
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def write(p,obj):p.write_text(json.dumps(obj,indent=2)+'\n',encoding='utf-8')

def verify_inputs():
    for rel,h in read(P/'SHA256SUMS.json').items():
        if sha(P/rel)!=h:raise ValueError('Frozen input changed: '+rel)
    plan=read(D/'execution-plan.json');schedule=read(P/'schedule.json')
    assert len(schedule)==plan['max_calls']==120
    assert plan['model_route']=='typesafe/jev-1.13'
    assert plan['max_pilot_spend_usd']==0.10
    for e in read(P/'case-audit.json'):
        a=read(P/f"{e['case_id']}-A.json");b=read(P/f"{e['case_id']}-B.json")
        del b['state']['recruiting_evidence'];assert a==b
        validate_evaluation(a)
    return plan,schedule

async def run():
    plan,schedule=verify_inputs()
    dest=D/'execution'
    if dest.exists():raise ValueError('Execution already attempted; no automatic resume or retry')
    # Existing secret read into process only, never copied into artifacts or output.
    from dotenv import dotenv_values
    secret=dotenv_values(r'C:\Users\matri\Documents\myprojects\agent-economy\.env').get('OPENROUTER_API_KEY')
    if not secret:raise ValueError('OPENROUTER_API_KEY unavailable; no dispatch')
    os.environ['OPENROUTER_API_KEY']=secret
    adapter=OpenRouterDecisionsAdapter({'timeout_s':plan['timeout_seconds'],'resolved_models':[plan['required_resolved_revision']]})
    dest.mkdir()
    write(dest/'start.json',{'utc':datetime.now(timezone.utc).isoformat(),'plan_sha256':sha(D/'execution-plan.json'),'schedule_sha256':sha(P/'schedule.json'),'runner_sha256':sha(Path(__file__)),'calls_authorized':120,'retries':0,'simulation_access':False,'accounting':'Separate pilot receipts only; no live-run budget DB opened. Conservative $0.01 local reserve before each call; $0.10 stop cap; provider charge can only be verified after response.'})
    spent=0.;completed=0;stop=None
    for i,item in enumerate(schedule,1):
        if spent+0.01>plan['max_pilot_spend_usd']:
            stop='pilot cost ceiling: next local reservation denied';break
        ev=validate_evaluation(read(P/f"{item['case_id']}-{item['arm']}.json"))
        receipt=dict(item,call_index=i,started_utc=datetime.now(timezone.utc).isoformat(),input_sha256=sha(P/f"{item['case_id']}-{item['arm']}.json"),reservation_id=f'pilot-{i:03}',reserved_usd=.01,retries=0,status='dispatched')
        write(dest/f'{i:03}-started.json',receipt)
        started=time.perf_counter()
        try:
            answer=await adapter.complete(plan['model_route'],[],purpose='decision',context={'_evaluation':ev})
            value=json.loads(answer.text)
            error=response_error(value,ev,expected_models=(plan['required_resolved_revision'],),expected_provider='TypeSafe')
            usage=value.get('usage',{})
            cost=answer.reported_cost_usd
            if cost is None:error=error or 'Missing reported cost; cannot safely continue accounting'
            if cost is not None:
                spent+=cost
                if cost > .01 or spent > plan['max_pilot_spend_usd']:error=error or 'Provider charge exceeded local reservation/cap; stopped'
            choice=value.get('answers',{}).get('action',{}).get('choice')
            kind='WAIT' if choice=='wait' else 'ESCALATE' if choice=='escalate' else 'ACTIVE'
            cached=usage.get('cached_tokens',usage.get('cache_read_input_tokens'))
            receipt.update(status='invalid' if error else 'completed',validation_error=error,response=value,input_tokens=answer.in_tokens,output_tokens=answer.out_tokens,cached_tokens=cached,cached_tokens_status='unavailable' if cached is None else 'reported',cost_usd=cost,reservation_state='settled' if cost is not None else 'unknown',selected_action=choice,choice_kind=kind,actions=ev['questions']['action']['criteria'].get(choice,{}).get('actions',[]),latency_ms=round((time.perf_counter()-started)*1000,3))
            if not error:completed+=1
            else:stop=error
        except Exception as exc:
            # Adapter errors already suppress remote response/header content.
            receipt.update(status='error',error_type=type(exc).__name__,error=str(exc).replace(secret,'[REDACTED]'),latency_ms=round((time.perf_counter()-started)*1000,3),reservation_state='unknown',cost_usd=None)
            stop=receipt['error']
        receipt['finished_utc']=datetime.now(timezone.utc).isoformat()
        write(dest/f'{i:03}-result.json',receipt)
        print(json.dumps({'call':i,'status':receipt['status'],'choice':receipt.get('choice_kind'),'tokens':receipt.get('input_tokens'),'spent':spent,'stop':stop}),flush=True)
        if stop:break
    result={'completed':completed,'attempted':len(list(dest.glob('*-started.json'))),'cost_usd_known':spent,'stop_reason':stop,'unknown_reservations':sum(read(p)['reservation_state']=='unknown' for p in dest.glob('*-result.json')),'no_retries':True}
    write(dest/'completion.json',result);print(json.dumps(result),flush=True)

if __name__=='__main__':
    if sys.argv[1:]!=['--execute-authorized-120']:raise SystemExit('Use explicit --execute-authorized-120 only after offline checks')
    asyncio.run(run())
