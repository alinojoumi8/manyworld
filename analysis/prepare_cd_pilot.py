"""Prepare C/D blind packets and a precommitted 12-case pilot; no network."""
from __future__ import annotations
import hashlib, html, json, random, shutil, subprocess, zipfile
from pathlib import Path
from datetime import datetime, timezone
import blinded_adjudication as blind

ROOT=Path(__file__).resolve().parents[1]
ORIGINAL=ROOT/'reports/out/jev-blinded-adjudication-20260921'
EXPERIMENT=ROOT/'reports/out/jev-adjudication-results-20260921'
OUT=ROOT/'reports/out/jev-cd-pilot-20260921'
EXPECTED='9fdeddbdd7e7ddb2953d0972a2fe83e3abd4d1e55da6f0ee5c1df49014383e8c'

def read(p):return blind.read(p)
def sha(p):return blind.sha(p)
def write(p,obj):p.parent.mkdir(parents=True,exist_ok=True);blind.write(p,obj)
def verify_manifest(root,name):
    for rel,h in read(root/name).items():
        if sha(root/rel)!=h:raise ValueError(f'Frozen input changed: {rel}')

def select(edits,records):
    byid={r['case_id']:r for r in records}
    rank=lambda e:(-sum(len(t) for t in e['removed_texts']),-len(e['removed_indices']),e['case_id'])
    ranked=sorted(edits,key=rank); chosen=[];used=set()
    def take(label,n,predicate):
        pool=[e for e in ranked if e['case_id'] not in used and predicate(e,byid[e['case_id']])]
        if len(pool)<n:raise ValueError('Not enough distinct cases for '+label)
        for e in pool[:n]:chosen.append(dict(e,stratum=label));used.add(e['case_id'])
    take('joint_WAIT_high_burden',4,lambda e,r:e['actual_wait'] and r['A']['primary']==r['B']['primary']=='WAIT')
    take('disagreement',4,lambda e,r:e['actual_wait'] and r['A']['primary']!=r['B']['primary'])
    take('active_control',2,lambda e,r:not e['actual_wait'] and r['B']['primary']=='ACT')
    take('additional_high_burden',2,lambda e,r:e['actual_wait'])
    assert len(used)==12
    return chosen

def main():
    if OUT.exists():raise ValueError('Never overwrite a frozen pilot')
    manifest,cases=blind.verify_package(ORIGINAL);blind.both(ORIGINAL)
    assert manifest['case_set_sha256']==EXPECTED
    verify_manifest(EXPERIMENT,'SHA256SUMS.json')
    tracked=subprocess.check_output(['git','ls-files'],cwd=ROOT,text=True).splitlines()
    protected=set(ROOT/p for p in tracked if (ROOT/p).is_file())
    protected.update(p for r in (ORIGINAL,EXPERIMENT,ROOT/'analysis',ROOT/'docs/analysis') for p in r.rglob('*') if p.is_file() and '__pycache__' not in str(p))
    hashes={str(p):sha(p) for p in sorted(protected)}
    OUT.mkdir();write(OUT/'preservation-before.json',hashes)
    packet_info={}
    for slot,seed in [('C',202609210104),('D',202609210105)]:
        d=OUT/f'reviewer-{slot}';d.mkdir();order=list(cases);random.Random(seed).shuffle(order)
        blind.write(d/'cases.json',order)
        shutil.copyfile(ORIGINAL/'reviewer-A/rubric.json',d/'rubric.json')
        instructions=(ORIGINAL/'reviewer-A/README.md').read_text().replace('freezes both reviews','freezes all reviews')
        (d/'README.md').write_text(instructions,encoding='utf-8')
        meta=read(ORIGINAL/'reviewer-A/reviewer.json');meta['reviewer_slot']=slot
        blind.write(d/'reviewer.json',meta)
        for name,fields,rows in [
            ('judgments.csv',['case_id','primary','confidence','preferred_active_candidate_ids','missing_information','goal_impact','rationale'],[{'case_id':c['case_id']} for c in order]),
            ('alternatives.csv',['case_id','candidate_id','suitability','role_compatibility_information','rationale'],[{'case_id':c['case_id'],'candidate_id':k} for c in order for k in blind.active(c)]),
            ('memories.csv',['case_id','memory_index','useful','stale','irrelevant','rationale'],[{'case_id':c['case_id'],'memory_index':i} for c in order for i,_ in enumerate(c['evaluation']['state']['memories'])])]:
            blind.csv_write(d/name,fields,rows)
        page='<!doctype html><meta charset="utf-8"><title>Independent decision review</title><style>body{max-width:1050px;margin:2em auto;font-family:system-ui}pre{white-space:pre-wrap;overflow-wrap:anywhere}details{margin:1em}</style><h1>Independent decision review</h1><p>Read README.md and rubric.json before scoring.</p>'
        page+=''.join('<details><summary>'+c['case_id']+'</summary><pre>'+html.escape(json.dumps(c['evaluation'],indent=2,ensure_ascii=False))+'</pre></details>' for c in order)
        (d/'cases.html').write_text(page,encoding='utf-8')
        assert {c['case_id']:c for c in order}=={c['case_id']:c for c in cases}
        zpath=OUT/f'reviewer-{slot}.zip'
        with zipfile.ZipFile(zpath,'w',zipfile.ZIP_DEFLATED) as z:
            for p in sorted(d.iterdir()):
                info=zipfile.ZipInfo(p.name,date_time=(2026,9,21,0,0,0));info.compress_type=zipfile.ZIP_DEFLATED;z.writestr(info,p.read_bytes())
        packet_info[slot]={'zip':str(zpath),'sha256':sha(zpath),'order_seed':seed,'case_order':[c['case_id'] for c in order],'case_set_sha256':EXPECTED}
    write(OUT/'packet-manifest.json',packet_info)
    chosen=select(read(EXPERIMENT/'edits.json'),read(ORIGINAL/'coordinator/results/unblinded.json')['records'])
    details=[]
    for e in chosen:
        cid=e['case_id'];a=read(EXPERIMENT/f'inputs/{cid}/A.json');b=read(EXPERIMENT/f'inputs/{cid}/B.json')
        actual=[t for i,t in enumerate(a['state']['memories']) if i not in e['removed_indices']]
        assert b['state']['memories']==actual
        b_rebuilt=json.loads(json.dumps(b));b_rebuilt['state']['memories']=a['state']['memories'];assert a==b_rebuilt
        for arm in ('A','B'):
            dest=OUT/f'inputs/{cid}/{arm}.json';dest.parent.mkdir(parents=True,exist_ok=True);shutil.copyfile(EXPERIMENT/f'inputs/{cid}/{arm}.json',dest)
        details.append(dict(e,removed_memory_ids=[f'{cid}:{i}' for i in e['removed_indices']],removed_characters=sum(map(len,e['removed_texts'])),removed_tokens=None,token_note='Exact provider token delta measured from pilot usage, no guessed tokenizer.',A_sha256=sha(OUT/f'inputs/{cid}/A.json'),B_sha256=sha(OUT/f'inputs/{cid}/B.json'),checks={'candidates':True,'actor':True,'economic_state':True,'goals':True,'questions_and_schema':True,'only_memories_changed':True}))
    # Subsequence of the already-frozen schedule, not a new order optimized from results.
    selected={e['case_id'] for e in chosen}
    schedule=[r for r in read(EXPERIMENT/'schedule.json') if r['case_id'] in selected]
    assert len(schedule)==72
    write(OUT/'pilot-cases.json',details);write(OUT/'schedule.json',schedule)
    plan={'frozen_at_utc':datetime.now(timezone.utc).isoformat(),'case_set_sha256':EXPECTED,'pilot_case_file_sha256':sha(OUT/'pilot-cases.json'),'schedule_sha256':sha(OUT/'schedule.json'),'parent_experiment_plan_sha256':sha(EXPERIMENT/'experiment-plan.json'),'selection':'Distinct strata in listed order. Rank descending removable Unicode characters, then entry count, then ascending case ID. First/disagreement/additional strata require historical WAIT, so exactly two historical ACTIVE controls. Active controls require Reviewer B ACT; Reviewer A disagreement is retained, not consensus.','order':'Exact subsequence of frozen 372-call schedule, seed 202609212230; randomized A/B order inside pairs; no new order chosen after outputs.','max_calls':72,'max_retries':0,'model_route':'typesafe/jev-1.13','required_resolved_revision':'typesafe/jev-1.13-20260917','endpoint':'https://openrouter.ai/api/alpha/decisions','provider':{'allow_fallbacks':False},'output_schema':'Original questions and llm.decisions.response_error contract unchanged. Adapter sends no temperature, seed or max_tokens parameters.','timeout_seconds':20,'max_pilot_spend_usd':0.25,'model_calls_authorized':True,'authorization':'User attachment 0ddc0254-cf47-40b7-8724-62e2e7b81750, 72-call pilot only. Full remaining 300 calls unauthorized.','stop':'Any network/HTTP error, invalid/missing usage, unavailable resolved revision, or unexpected input differences stops execution without retry. No fallback or simulation.','gate':'SAFE TO SCALE only with all 72 valid outputs, no newly clearly-unsuitable actions in B, no paired loss of Reviewer-B-supported active choice in historical active controls, and <=25% modal disagreement rate across repeat groups. More than 25% is conservatively unstable; any suitability degradation is risky. Malformed outputs/accounting or transport incompleteness is harness/readiness failure, not behavior evidence.','active_control_limit':'No jointly ACT controls exist. Active preservation judged against Reviewer B named suitable choices and Reviewer A contrary judgments reported separately.','four_reviewer_status':'Pending actual C/D submissions; do not change intervention.'}
    write(OUT/'pilot-plan.json',plan)
    write(OUT/'frozen-manifest.json',{str(p.relative_to(OUT)):sha(p) for p in OUT.rglob('*') if p.is_file()})
    assert hashes=={p:sha(Path(p)) for p in hashes}
    print(json.dumps({'packets':{k:{x:v for x,v in d.items() if x!='case_order'} for k,d in packet_info.items()},'pilot_cases':[{'id':e['case_id'],'stratum':e['stratum'],'characters_removed':e['removed_characters']} for e in details],'pilot_hash':plan['pilot_case_file_sha256'],'protected_files':len(hashes)},indent=2))
if __name__=='__main__':main()
