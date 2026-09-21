"""Offline analysis of frozen matched evidence; never opens a source SQLite file.
No provider imports/dispatch or simulation step. All SQLite access is in memory.
"""
from __future__ import annotations
import csv, hashlib, json, sqlite3, statistics, sys
from collections import Counter
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))
from agents.domain_candidates import compile_domain_candidates
from llm.decisions import canonical_json, decision_hash
P=Path(r'C:\tmp\ae-pr96-combined-20260921\reports\out\final-matched-20260921')
OUT=Path(__file__).resolve().parents[1]/'reports/out/jev-wait-analysis'
OUT.mkdir(parents=True,exist_ok=True)
def load(p):return json.loads(p.read_text(encoding='utf-8-sig'))
def dump(p,x):p.write_text(json.dumps(x,indent=2,ensure_ascii=False),encoding='utf-8')
def digest(p):return hashlib.sha256(p.read_bytes()).hexdigest() if p.exists() else None
def db(p):
 c=sqlite3.connect(':memory:');c.deserialize(p.read_bytes());c.row_factory=sqlite3.Row
 assert c.execute('pragma integrity_check').fetchone()[0]=='ok'
 assert not c.execute('pragma foreign_key_check').fetchall()
 return c
def rows(c,sql,args=()):return [dict(r) for r in c.execute(sql,args)]
def decrow(r):
 for k,v in list(r.items()):
  if k.endswith('_json') and v:
   try:r[k[:-5]]=json.loads(v)
   except ValueError:pass
 return r
def comparable_axes(ctx):
 # Conservative named common fields: supplemental v4 formatting is not world divergence.
 return {
  'actor':{k:ctx.get('agent',{}).get(k) for k in ['id','name','age','role','occupation','health','retired','dependents','risk_tolerance','political_lean']},
  'finances':{k:ctx.get('state',{}).get(k) for k in ['checking_balance','debt','employed','wage','net_worth','shares','savings_balance']},
  'business':ctx.get('my_firm'),
  'goods':[{k:x.get(k) for k in ['firm_id','price','inventory','product']} for x in ctx.get('prices',[])],
  'jobs':[{k:x.get(k) for k in ['job_id','firm_id','wage','title','application_count']} for x in ctx.get('jobs',[])],
  'incoming_offers':ctx.get('incoming_job_offers',[]),
  'founding_opportunity':ctx.get('entrepreneurship_opportunity'),
  'vc_fund_cash':ctx.get('fund_cash'),'vc_pending_pitches':ctx.get('pending_pitches')}
def csvout(name,rs):
 with (OUT/name).open('w',encoding='utf-8',newline='') as f:
  if not rs:return
  w=csv.DictWriter(f,fieldnames=list(rs[0]));w.writeheader()
  for r in rs:w.writerow({k:json.dumps(v,ensure_ascii=False) if isinstance(v,(list,dict)) else v for k,v in r.items()})
# Independent preservation check: all previously sealed artifacts, including old runs.
preserved=load(Path(r'C:\tmp\ae-final-merge-20260921\preservation-final.json'))['hashes']
assert all(digest(Path(p))==h for p,h in preserved.items()),'Source artifact hash mismatch'
sources={str(P/arm/'live-tick-5/world.db'):digest(P/arm/'live-tick-5/world.db') for arm in ['baseline','jev-v4']}
cs={arm:db(P/arm/'live-tick-5/world.db') for arm in ['baseline','jev-v4']}
c,b=cs['jev-v4'],cs['baseline']
calls={r['id']:decrow(r) for r in rows(c,'select * from llm_calls')}
bcalls=[decrow(r) for r in rows(b,'select * from llm_calls')]
props={arm:[decrow(r) for r in rows(conn,'select * from action_proposals order by id')] for arm,conn in cs.items()}
policy=next(x['request']['decision_policy'] for x in calls.values() if 'decision_policy' in x['request'])
records=[];flat=[];candidate_rows=[];pairs=[];recomp=[]
for e in rows(c,"select * from events where kind='typed_decision' order by tick,id"):
 r=json.loads(e['payload_json']);t=r['tick'];aid=r['agent_id'];pur=r['purpose']
 call=calls[r['calls'][0]['model_call_id']] if r['calls'] else None
 q=call['request'] if call else {};ctx=q.get('context',{});ev=r['evaluation'];st=ev['state'];crit=ev['questions']['action']['criteria']
 compile_context={k:v for k,v in ctx.items() if k!='_evaluation'}
 menu=compile_domain_candidates(compile_context,t,q.get('decision_policy',policy))
 checks={'event_id':e['id'],'candidates_equal':menu.candidates==r['candidates'],'evaluation_equal':menu.evaluation==ev,'menu_hash_equal':menu.menu_hash==r['menu_hash'],'observation_hash_equal':menu.observation_hash==r['observation_hash']}
 assert all(v for k,v in checks.items() if k!='event_id'),checks
 recomp.append(checks)
 selected=r['selected_candidate'];chosen=next((x for x in r['candidates'] if x['id']==selected),None)
 opts=[x for x in r['candidates'] if x['id'] not in ['wait','escalate']]
 acts=[a for o in opts for a in o['actions']];types=sorted({a['type'] for a in acts});fin=st['own_finances'];business=st.get('own_business')
 category=None;basis=None
 if selected=='wait':
  if not opts:category='A';basis='No economic alternative in frozen menu.'
  elif fin.get('employed') is False and not business and any(x in types for x in ['accept_job_offer','apply_job']):
   category='C';basis='Unemployed non-founder shown a positive-wage application or offer; worthwhile review candidate, not a proven utility-maximizing action or guaranteed hire.'
  else:category='G';basis='Alternatives exist, but preserved evidence does not establish a preferred action or the model reason for waiting.'
 current_props=[x for x in props['jev-v4'] if x['tick']==t and x['actor_id']==aid and (not call or x['model_call_id']==call['id'])]
 bc=next((x for x in bcalls if x['tick']==t and x['agent_id']==aid and x['purpose']==pur),None)
 bctx=bc['request'].get('context',{}) if bc else None
 bp=[x for x in props['baseline'] if x['tick']==t and x['actor_id']==aid and (not bc or x['model_call_id']==bc['id'])]
 axes=['agent','state','my_firm','prices','jobs','incoming_job_offers','entrepreneurship_opportunity','entrepreneurship_options','startup_work']
 raw_differences=[k for k in axes if ctx.get(k)!=bctx.get(k)] if bctx is not None else None
 comparable_a=comparable_axes(ctx);comparable_b=comparable_axes(bctx) if bctx is not None else None
 differences=[k for k in comparable_a if comparable_a[k]!=comparable_b[k]] if comparable_b is not None else None
 mem=st.get('memories',[]);rawmem=ctx.get('memories',[])
 # No guessed dates: free-text memory freshness unavailable unless explicitly structured.
 missing_keys=[k for k in ['household','daily_time','news','heard','skills','compute_plan','incoming_job_offers','jobs'] if ctx.get(k) and k not in st]
 ownlater={}
 for arm,conn in cs.items():
  ownlater[arm]={'agent':rows(conn,'select id,name,role,occupation,employer_id,checking_account_id from agents where id=?',(aid,)),
   'employments':rows(conn,'select * from employments where agent_id=?',(aid,)),
   'accounts':rows(conn,"select * from accounts where owner_type='agent' and owner_id=?",(aid,)),
   'applications':rows(conn,'select * from applications where agent_id=?',(aid,)),
   'insurance':rows(conn,'select * from insurance_policies where agent_id=?',(aid,)),
   'firms':rows(conn,'select * from firms where founder_agent_id=?',(aid,)),
   'proposals_after_decision':[x for x in props[arm] if x['actor_id']==aid and x['tick']>t]}
 rec={'event_id':e['id'],'tick':t,'actor_id':aid,'actor_name':st['actor']['name'],'purpose':pur,'status':r['status'],
  'receipt':r,'model_call':call,'frozen_predecision_context':ctx,'supplied_evaluation':ev,'selected_actions':chosen['actions'] if chosen else None,
  'wait_classification':category,'classification_basis':basis,'classification_confidence':'screening only; no causal reason available',
  'projection_omits_context_keys':missing_keys,'immediate_proposals':current_props,'later_outcome_at_tick5':ownlater,
  'baseline_call_id':bc['id'] if bc else None,'baseline_context':bctx,'baseline_proposals':bp,'comparison_axis_differences':differences,'raw_context_axis_differences':raw_differences,
  'eligibility_scope':'Frozen compiler-prepared eligibility; unchosen execution and utility were not tested. Execution can recheck capacity and shared state.',
  'memory_freshness':'No uniform source tick in supplied string memories; do not infer.',
  'hidden_reasoning':'Not available; choice/confidence/probabilities are not a rationale.'}
 records.append(rec)
 nums=[v for o in opts for v in o.get('facts',{}).values() if type(v) in (int,float)]
 f={'event_id':e['id'],'tick':t,'actor_id':aid,'name':st['actor']['name'],'purpose':pur,'status':r['status'],
 'selected_candidate':selected,'selected_actions':chosen['actions'] if chosen else None,'wait_category':category,'classification_basis':basis,
 'cash_cents':fin.get('checking_balance'),'employed':fin.get('employed'),'own_firm_id':(business or {}).get('firm_id'),
 'candidate_count':len(r['candidates']),'candidate_evidence_count':sum(bool(o.get('facts')) for o in opts),'active_candidates':len(opts),'offered_action_types':types,
 'confidence':r['confidence'],'wait_probability':r.get('probabilities',{}).get('wait'),'goals_count':len(st.get('goals',[])),
 'memory_count':len(mem),'duplicate_memories':len(mem)-len(set(mem)),'truncated_memories':sum(len(str(x))>384 for x in rawmem[:6]),
 'evaluation_bytes':len(canonical_json(ev).encode()),'context_bytes':len(canonical_json(ctx).encode()),
 'input_tokens':call['in_tokens'] if call else 0,'output_tokens':call['out_tokens'] if call else 0,
 'numeric_fact_count_shallow':len(nums),'omitted_context_keys':missing_keys,
 'opportunity_count':len(ctx.get('entrepreneurship_options',[])),'current_job_count':len(ctx.get('jobs',[])),
 'incoming_offer_count':len(ctx.get('incoming_job_offers',[])), 'reason':r['reason'],
 'baseline_call_id':bc['id'] if bc else None,'baseline_actions':[x['action_type'] for x in bp],
 'comparison_axis_differences':differences,'raw_context_axis_differences':raw_differences,'receipt_outcomes':r.get('outcomes',[])}
 flat.append(f)
 for pos,o in enumerate(r['candidates']):
  candidate_rows.append({'event_id':e['id'],'tick':t,'actor_id':aid,'position_receipt':pos,'candidate_id':o['id'],'selected':o['id']==selected,
   'domain':o['domain'],'actions':o['actions'],'facts':o.get('facts',{}),'requirements':o.get('requirements',{}),'source':o.get('source'),
   'probability':r.get('probabilities',{}).get(o['id'])})
 pairs.append({'event_id':e['id'],'tick':t,'actor_id':aid,'purpose':pur,'baseline_call_id':bc['id'] if bc else None,
 'comparison':'equal named economic axes (not full context)' if differences==[] else 'same actor/tick/purpose, state differs' if bc else 'no matched call',
 'different_axes':differences,'baseline_actions':[x['action_type'] for x in bp],'baseline_outcomes':[{k:x[k] for k in ['id','validation_status','result_json']} for x in bp],
 'jev_actions':chosen['actions'] if chosen else [x['payload'] for x in current_props], 'jev_outcomes':[{k:x[k] for k in ['id','validation_status','result_json']} for x in current_props]})
selected=[x for x in flat if x['status']=='selected'];waits=[x for x in selected if x['selected_candidate']=='wait'];active=[x for x in selected if x['selected_candidate']!='wait']
assert len(records)==97 and len(selected)==88 and len(waits)==81 and len(active)==7
assert all(x['supplied_evaluation']['state']['actor'].get('role') for x in records if x['wait_classification']=='C')
summary={'total_receipts':97,'selected':88,'waits':81,'active':7,'outside_menu':9,
 'wait_rate_selected':81/88,'wait_rate_all_receipts':81/97,'categories':dict(Counter(x['wait_category'] for x in waits)),
 'reasons':dict(Counter(x['reason'] for x in flat)),'paired_states':dict(Counter(x['comparison'] for x in pairs)),
 'waits_with_jobs':sum('apply_job' in x['offered_action_types'] for x in waits),
 'waits_with_accept_offer':sum('accept_job_offer' in x['offered_action_types'] for x in waits),
 'waits_with_founding':sum('found_company' in x['offered_action_types'] for x in waits),
 'waits_with_goods':sum('buy_goods' in x['offered_action_types'] for x in waits),
 'groups':{},'call_choice_checks':[]}
for name,group in [('wait',waits),('active',active)]:
 summary['groups'][name]={k:{'min':min(x[k] for x in group),'median':statistics.median(x[k] for x in group),'max':max(x[k] for x in group)} for k in ['candidate_count','memory_count','evaluation_bytes','input_tokens','confidence','wait_probability']}
 summary['groups'][name]['goals_empty']=sum(x['goals_count']==0 for x in group)
 summary['groups'][name]['missing_context_keys']=dict(Counter(k for x in group for k in x['omitted_context_keys']))
 summary['groups'][name]['duplicate_memories']=sum(x['duplicate_memories'] for x in group)
 summary['groups'][name]['truncated_memories']=sum(x['truncated_memories'] for x in group)
# Gateway logs sanitized escaping; parse using its exact existing parser, never infer model reasons.
from llm.gateway import Gateway
for rec in records:
 if rec['status']!='selected':continue
 parsed,_=Gateway._parse(rec['model_call']['response']['text'])
 assert parsed['answers']['action']['choice']==rec['receipt']['selected_candidate']
 summary['call_choice_checks'].append(rec['model_call']['id'])
dump(OUT/'decisions.json',records);csvout('decisions.csv',flat);csvout('candidates.csv',candidate_rows);csvout('baseline-pairs.csv',pairs)
dump(OUT/'summary.json',summary);dump(OUT/'recompilation-checks.json',recomp)
assert all(digest(Path(p))==h for p,h in preserved.items()),'Source mutation detected'
dump(OUT/'preservation.json',{'protected_paths_checked':len(preserved),'differences':[],'source_world_hashes':sources,
 'read_method':'Source bytes deserialized into private in-memory SQLite; no live DB opened or mutated.'})
print(json.dumps(summary,indent=2))
