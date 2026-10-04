"""Analyze completed pilot receipts without any model/network operation."""
import collections, csv, hashlib, json, statistics
from decimal import Decimal
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
P=ROOT/'reports/out/jev-cd-pilot-20260921'
def read(p):return json.loads(p.read_text(encoding='utf-8-sig'))
def sha(p):return hashlib.sha256(p.read_bytes()).hexdigest()
def write(p,x):p.write_text(json.dumps(x,indent=2)+'\n',encoding='utf-8')
def main():
 out=P/'analysis'
 if out.exists():raise ValueError('Do not overwrite pilot analysis')
 out.mkdir()
 for rel,h in read(P/'frozen-manifest.json').items():assert sha(P/rel)==h
 results=[read(p) for p in sorted((P/'execution').glob('*-result.json'))]
 assert len(results)==72 and all(r['status']=='completed' for r in results)
 schedule=read(P/'schedule.json');assert all(all(r[k]==s[k] for k in ('case_id','arm','replicate')) for r,s in zip(results,schedule))
 assert len({r['response']['id'] for r in results})==72
 by={(r['case_id'],r['arm'],r['replicate']):r for r in results}
 coord=ROOT/'reports/out/jev-blinded-adjudication-20260921/coordinator'
 reviews={s:read(coord/f'frozen/{s}/review.json') for s in ('A','B')}
 ratings={s:{(r['case_id'],r['candidate_id']):r['suitability'] for r in v['alternatives']} for s,v in reviews.items()}
 judgments={s:{r['case_id']:r for r in v['judgments']} for s,v in reviews.items()}
 cases=[];pair_changes=[];bad=[];active_loss=[];nonmodal=0
 for c in read(P/'pilot-cases.json'):
  cid=c['case_id'];arms={a:[by[cid,a,i] for i in (1,2,3)] for a in ('A','B')}
  choices={a:collections.Counter(r['selected_action'] for r in rr) for a,rr in arms.items()}
  nonmodal+=sum(3-max(v.values()) for v in choices.values())
  tokens={a:sum(r['input_tokens'] for r in rr) for a,rr in arms.items()}
  changes=[]
  for rep in (1,2,3):
   a=by[cid,'A',rep];b=by[cid,'B',rep]
   if a['selected_action']!=b['selected_action']:
    detail={'case_id':cid,'replicate':rep,'A':a['selected_action'],'B':b['selected_action'],'B_actions':b['actions'],'stratum':c['stratum'],'B_suitability':{s:ratings[s].get((cid,b['selected_action'])) for s in ratings}}
    changes.append(detail);pair_changes.append(detail)
    if b['choice_kind']=='ACTIVE' and any(ratings[s].get((cid,b['selected_action']))=='clearly unsuitable' for s in ratings):bad.append(detail)
   preferred=set(judgments['B'][cid]['preferred_active_candidate_ids'].split(';'))
   if c['stratum']=='active_control' and a['selected_action'] in preferred and b['selected_action'] not in preferred:active_loss.append({'case_id':cid,'replicate':rep,'A':a['selected_action'],'B':b['selected_action']})
  cases.append({'case_id':cid,'stratum':c['stratum'],'removed_memory_ids':c['removed_memory_ids'],'removed_characters':c['removed_characters'],'input_tokens_per_arm_3_repeats':tokens,'input_tokens_removed_per_request':(tokens['A']-tokens['B'])/3,'choices':{a:dict(v) for a,v in choices.items()},'within_arm_unstable':{a:len(v)>1 for a,v in choices.items()},'judgments':{s:judgments[s][cid]['primary'] for s in reviews},'paired_changes':changes})
 byarm={a:{'input_tokens':sum(r['input_tokens'] for r in results if r['arm']==a),'output_tokens':sum(r['output_tokens'] for r in results if r['arm']==a),'cost_usd':str(sum((Decimal(str(r['cost_usd'])) for r in results if r['arm']==a),Decimal(0))),'choices':dict(collections.Counter(r['choice_kind'] for r in results if r['arm']==a))} for a in ('A','B')}
 variance=nonmodal/72
 classification='INTERVENTION LOOKS RISKY' if bad or active_loss or variance>.25 else 'SAFE TO SCALE'
 summary={'classification':classification,'calls':72,'invalid_outputs':0,'retries':0,'unique_response_ids':72,'models':dict(collections.Counter(r['response']['model'] for r in results)),'by_arm':byarm,'removed_characters_unique_cases':sum(c['removed_characters'] for c in cases),'removed_memory_entries':sum(len(c['removed_memory_ids']) for c in cases),'input_tokens_reduction':byarm['A']['input_tokens']-byarm['B']['input_tokens'],'input_tokens_reduction_percent':100*(byarm['A']['input_tokens']-byarm['B']['input_tokens'])/byarm['A']['input_tokens'],'cached_tokens':'Not reported by provider on any response; not assumed zero.','within_arm_groups_unstable':sum(v for c in cases for v in c['within_arm_unstable'].values()),'within_arm_groups_total':24,'nonmodal_outputs':nonmodal,'nonmodal_fraction':variance,'paired_choice_changes':len(pair_changes),'paired_comparisons':36,'changed_cases':len({c['case_id'] for c in pair_changes}),'pair_changes':pair_changes,'new_clearly_unsuitable_B_choices':bad,'active_control_losses':active_loss,'latency_ms':{'median':statistics.median(r['latency_ms'] for r in results),'min':min(r['latency_ms'] for r in results),'max':max(r['latency_ms'] for r in results)},'cost_usd':str(sum((Decimal(str(r['cost_usd'])) for r in results),Decimal(0))),'guardrail_scope':'Historical active controls were supported by B, disputed by A; no jointly ACT controls exist. A safe pilot is not efficacy or causal proof.'}
 write(out/'summary.json',summary);write(out/'per-case.json',cases)
 fields=['call_index','case_id','arm','replicate','selected_action','choice_kind','status','input_tokens','cached_tokens','cached_tokens_status','output_tokens','cost_usd','latency_ms','retries','reservation_id','reservation_state']
 with (out/'calls.csv').open('w',newline='',encoding='utf-8') as f:
  w=csv.DictWriter(f,fieldnames=fields);w.writeheader();w.writerows({k:r.get(k) for k in fields} for r in results)
 hashes=read(P/'preservation-before.json');differences=[p for p,h in hashes.items() if not Path(p).is_file() or sha(Path(p))!=h]
 assert not differences,differences
 write(out/'preservation-after.json',{'protected_files':len(hashes),'changed_files':differences,'hashes':{p:sha(Path(p)) for p in hashes}})
 write(out/'evidence-sha256.json',{str(p.relative_to(P)):sha(p) for folder in (P/'execution',out) for p in folder.rglob('*') if p.is_file()})
 print(json.dumps(summary,indent=2));print('per_case',json.dumps(cases,indent=2))
if __name__=='__main__':main()
