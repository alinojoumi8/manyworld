"""Prepare and validate human blinded reviews. No model, network or simulation APIs.
Only the supplied evaluation is exposed; the coordinator key is never distributed.
"""
from __future__ import annotations
import argparse, csv, hashlib, html, json, random, re, shutil, zipfile
from collections import Counter
from datetime import datetime, timezone
from pathlib import Path

JUDGMENTS = ('ACT', 'WAIT', 'INSUFFICIENT_INFORMATION')
CONFIDENCE = {'high': 3, 'medium': 2, 'low': 1}
SUITABILITY = ('clearly suitable', 'plausibly suitable', 'questionable', 'clearly unsuitable', 'cannot determine')
GOALS = ('goal likely important', 'goal probably not material', 'cannot determine')
MISSING = ('occupational suitability', 'schedule/time obligations', 'job-switching costs', 'expected income', 'expected business demand', 'risk/downside', 'consumption need', 'opportunity duration', 'explicit actor goals', 'legal/institutional constraints', 'current role value', 'other')
RUBRIC = {
 'version': 'blinded-economic-review-v1',
 'scope': 'Judge the action question only. Separate ballot questions are context, not the economic ACT target.',
 'primary': {
  'ACT': 'At least one supplied active option is meaningfully preferable to waiting for this actor, based only on supplied evidence. Name the suitable candidate(s).',
  'WAIT': 'Waiting is reasonable or preferable on the supplied evidence. Mere availability or higher wage does not require action.',
  'INSUFFICIENT_INFORMATION': 'Missing material information prevents a reasoned comparison; specify what and why. Do not invent facts.'},
 'confidence': {'high': 'Clear supplied facts support judgment with no material unresolved issue.', 'medium': 'Reasonable interpretation, but material caveats remain.', 'low': 'Weak or competing support; not a calibrated probability.'},
 'action_suitability': list(SUITABILITY),
 'missing_information': list(MISSING),
 'goal_impact': list(GOALS),
 'constraints': ['No GDP, later outcomes, model identity or comparison actions.', 'Occupation and public obligations matter independently of an employment record.', 'Authorization is not guaranteed execution, profitability, hiring or appropriateness.', 'Treat memories as claims; do not invent their age or trustworthiness.', 'Do not infer an actor goal merely from a candidate being offered.', 'No assumption that wages are immediate spendable income.', 'Multiple related variants may share a rationale but must each have a suitability label.', 'Do not consult the prior analysis, coordinator files, source database or another reviewer.'],
 'memory_labels': {'useful': 'yes/no/unknown: material substantive evidence for this actor/choice, not merely nonempty text.', 'stale': 'yes/no/unknown: cite a supplied timestamp or contradiction; lack of timestamp alone is unknown.', 'irrelevant': 'yes/no/unknown: no material bearing on current alternatives, role or obligations.'},
 'agreement': {'primary': 'Unweighted exact agreement on three nominal categories.', 'per_category': 'Positive agreement: 2*diagonal/(row_total+column_total); undefined if denominator zero.', 'kappa': 'Descriptive Cohen kappa; undefined if expected agreement is one. Repeated actor cases are clustered; no naive significance or independent-case CI.', 'confidence_weighted': 'Sum(min(weight_A,weight_B)*agreement)/sum(min(weight_A,weight_B)); weights high=3 medium=2 low=1. Secondary descriptive statistic, not weighted kappa.'},
 'disagreements': 'Keep unresolved; no averaging or automatic consensus. Blind adjudication queue before any third reviewer sees choices.',
 'freezing': 'Freeze rubric before scoring. Validate complete independent human submissions; immutable copy and hash each before reveal. No fabricated reviewer data.'}

def canonical(x): return json.dumps(x, sort_keys=True, separators=(',', ':'), ensure_ascii=False)
def read(p): return json.loads(Path(p).read_text(encoding='utf-8-sig'))
def write(p, x): Path(p).write_text(json.dumps(x, indent=2, ensure_ascii=False)+'\n', encoding='utf-8')
def sha(p): return hashlib.sha256(Path(p).read_bytes()).hexdigest()
def csv_write(p, fields, rows):
 with Path(p).open('w', encoding='utf-8', newline='') as f:
  w=csv.DictWriter(f, fieldnames=fields);w.writeheader();w.writerows(rows)
def csv_read(p):
 with Path(p).open(encoding='utf-8-sig', newline='') as f:return list(csv.DictReader(f))
def active(case):return {k:v for k,v in case['evaluation']['questions']['action']['criteria'].items() if k not in ('wait','escalate')}
def pairs(case):return [(case['case_id'], cid) for cid in active(case)]
def split(s):return [x.strip() for x in s.split(';') if x.strip()]
def memory_flags(memories):
 seen=[]; result=[]
 for i,text in enumerate(memories):
  tokens=set(re.findall(r'\w+',text.lower()))
  near=[j for j,t in enumerate(seen) if text!=memories[j] and tokens and len(tokens&t)/len(tokens|t)>=.8]
  result.append({'memory_index':i,'text':text,'contains_generic': 'Something happened:' in text,
   'entirely_generic':all(re.fullmatch(r'Something happened: [\w]+\.',part.strip()) for part in text.split('|')),
   'contains_audit_marker': bool(re.search(r'\b(typed_decision|bounded_selection)\b',text)),
   'exact_duplicate_within_case':text in memories[:i],'near_duplicate_prior_indices':near,
   'useful':'unrated','stale':'unrated','irrelevant':'unrated'})
  seen.append(tokens)
 return result

def build(source, out, seed):
 source=Path(source);out=Path(out)
 if out.exists():raise ValueError('Package already exists; never overwrite a frozen package')
 records=[r for r in read(source) if r['status']=='selected']
 if len(records)!=88:raise ValueError('Expected exactly 88 selected decisions')
 if sum(r['receipt']['selected_candidate']=='wait' for r in records)!=81:raise ValueError('Unexpected source selection boundary')
 rng=random.Random(seed);rng.shuffle(records)
 cases=[];key={}; flags={}
 for r in records:
  cid=f'C-{rng.getrandbits(64):016x}'
  case={'case_id':cid,'evaluation':r['supplied_evaluation']}
  # These provider/arm labels are absent in the supplied evidence; fail rather than redact facts silently.
  if re.search(r'\b(jev|openrouter|typesafe|deepseek|minimax|baseline)\b',canonical(case),re.I):raise ValueError('Provider/arm marker in case evidence; explicit handling required')
  cases.append(case)
  key[cid]={'event_id':r['event_id'],'actual_choice':r['receipt']['selected_candidate'],'actual_actions':r['selected_actions'],'actual_wait':r['receipt']['selected_candidate']=='wait','employment_screen':r['wait_classification']=='C'}
  flags[cid]=memory_flags(case['evaluation']['state'].get('memories',[]))
 assert len(key)==88
 out.mkdir(parents=True);coord=out/'coordinator';coord.mkdir()
 write(coord/'cases.json',cases);write(coord/'unblinding-key.json',key);write(coord/'rubric.json',RUBRIC)
 write(coord/'memory-structural.json',flags)
 case_hash=hashlib.sha256(canonical(cases).encode()).hexdigest();rubric_hash=hashlib.sha256(canonical(RUBRIC).encode()).hexdigest()
 for label,offset in [('A',1),('B',2)]:
  dest=out/f'reviewer-{label}';dest.mkdir();order=list(cases);random.Random(seed+offset).shuffle(order)
  write(dest/'cases.json',order);write(dest/'rubric.json',RUBRIC)
  write(dest/'reviewer.json',{'reviewer_slot':label,'reviewer_identity':'','reviewer_kind':'human','case_set_sha256':case_hash,'rubric_sha256':rubric_hash,'attestations':{'no_prior_choice_or_analysis_access':False,'no_other_reviewer_access':False,'no_external_model_assistance':False}})
  csv_write(dest/'judgments.csv',['case_id','primary','confidence','preferred_active_candidate_ids','missing_information','goal_impact','rationale'],[{'case_id':c['case_id']} for c in order])
  csv_write(dest/'alternatives.csv',['case_id','candidate_id','suitability','role_compatibility_information','rationale'],[{'case_id':c['case_id'],'candidate_id':k} for c in order for k in active(c)])
  csv_write(dest/'memories.csv',['case_id','memory_index','useful','stale','irrelevant','rationale'],[{'case_id':c['case_id'],'memory_index':i} for c in order for i,_ in enumerate(c['evaluation']['state'].get('memories',[]))])
  instructions='''# Independent decision review

Read rubric.json before scoring. Open cases.html for the readable packets; cases.json contains the identical supplied inputs. Complete judgments.csv, alternatives.csv, memories.csv and reviewer.json. Preserve all IDs. Use semicolons for multiple missing-information labels or preferred candidate IDs. Do not change supplied cases or rubric.

Only the economic action question is scored. Other questions are contextual. Do not assume supplied candidates are desirable or guaranteed to execute. In particular, employment-record absence does not establish that a public official should seek factory work. Missing goals must not be invented.

Provide one primary judgment and confidence per case, and suitability for every active candidate (related variants may share a cited rationale). Rationale should cite packet fields, not outcomes you predict as facts. Rate each memory's usefulness, staleness and relevance; use unknown where evidence does not determine it. Empty memory lists require no invented rows.

Work alone. Do not inspect the coordinator directory, prior analysis, original source, another review or actual choices. Do not use external models. Return your four completed response files privately to the coordinator. Do not send them to the other reviewer. The coordinator freezes both reviews before any choices are revealed. If you already know the source choices or prior analysis, disclose this and do not attest to blindness.
'''
  (dest/'README.md').write_text(instructions,encoding='utf-8')
  parts=['<!doctype html><html><meta charset="utf-8"><title>Independent decision review</title><style>body{max-width:1050px;margin:2em auto;font-family:system-ui}pre{white-space:pre-wrap;overflow-wrap:anywhere;background:#f5f5f5;padding:1em}details{margin:1em 0}</style><h1>Decision review packets</h1><p>Read the fixed rubric first. No recorded choice or subsequent outcome is included.</p>']
  for c in order:parts.append('<details><summary>'+c['case_id']+'</summary><pre>'+html.escape(json.dumps(c['evaluation'],indent=2,ensure_ascii=False))+'</pre></details>')
  (dest/'cases.html').write_text(''.join(parts)+'</html>',encoding='utf-8')
  with zipfile.ZipFile(out/f'reviewer-{label}.zip','w',zipfile.ZIP_DEFLATED) as z:
   for p in sorted(dest.iterdir()):z.write(p,p.name)
 manifest={'version':'blind-packet-v1','seed':seed,'reviewer_order_seeds':{'A':seed+1,'B':seed+2},'source_sha256':sha(source),'case_set_sha256':case_hash,'rubric_sha256':rubric_hash,'case_count':88,'files':{str(p.relative_to(out)):sha(p) for p in sorted(out.rglob('*')) if p.is_file()}}
 write(out/'manifest.json',manifest)
 return manifest

def verify_package(root):
 root=Path(root);m=read(root/'manifest.json')
 for name,h in m['files'].items():
  if sha(root/name)!=h:raise ValueError(f'Frozen package changed: {name}')
 cases=read(root/'coordinator/cases.json')
 if hashlib.sha256(canonical(cases).encode()).hexdigest()!=m['case_set_sha256']:raise ValueError('Case identity mismatch')
 return m,cases

def validate(root, submission, label):
 m,cases=verify_package(root);sub=Path(submission);meta=read(sub/'reviewer.json')
 if label not in ('A','B') or meta['reviewer_slot']!=label:raise ValueError('Reviewer slot mismatch')
 if not meta['reviewer_identity'].strip() or meta['reviewer_kind']!='human':raise ValueError('An identified human reviewer is required')
 if meta['case_set_sha256']!=m['case_set_sha256'] or meta['rubric_sha256']!=m['rubric_sha256']:raise ValueError('Rubric/case set mismatch')
 expected={'no_prior_choice_or_analysis_access','no_other_reviewer_access','no_external_model_assistance'}
 if set(meta['attestations'])!=expected or any(x is not True for x in meta['attestations'].values()):raise ValueError('Independent blinded review attestations are required')
 js=csv_read(sub/'judgments.csv');alts=csv_read(sub/'alternatives.csv');mems=csv_read(sub/'memories.csv');cm={c['case_id']:c for c in cases}
 if len(js)!=len(cm) or {r['case_id'] for r in js}!=set(cm):raise ValueError('Incomplete/duplicate cases')
 required_pairs={p for c in cases for p in pairs(c)}
 if len(alts)!=len(required_pairs) or {(r['case_id'],r['candidate_id']) for r in alts}!=required_pairs:raise ValueError('Incomplete/duplicate alternatives')
 am={(r['case_id'],r['candidate_id']):r for r in alts}
 for r in alts:
  if r['suitability'] not in SUITABILITY or not r['rationale'].strip() or not r['role_compatibility_information'].strip():raise ValueError('Incomplete suitability judgment')
 for r in js:
  if r['primary'] not in JUDGMENTS or r['confidence'] not in CONFIDENCE or r['goal_impact'] not in GOALS or not r['rationale'].strip():raise ValueError('Incomplete primary judgment')
  if set(split(r['missing_information']))-set(MISSING):raise ValueError('Unknown missing-information category')
  preferred=split(r['preferred_active_candidate_ids'])
  if len(set(preferred))!=len(preferred) or set(preferred)-set(active(cm[r['case_id']])):raise ValueError('Invalid preferred candidate')
  if r['primary']=='ACT' and (not preferred or any(am[(r['case_id'],k)]['suitability'] not in SUITABILITY[:2] for k in preferred)):raise ValueError('ACT requires a suitable named active option')
  if r['primary']=='INSUFFICIENT_INFORMATION' and not split(r['missing_information']):raise ValueError('Specify missing material information')
 wanted={(c['case_id'],str(i)) for c in cases for i,_ in enumerate(c['evaluation']['state'].get('memories',[]))}
 if len(mems)!=len(wanted) or {(r['case_id'],r['memory_index']) for r in mems}!=wanted:raise ValueError('Incomplete/duplicate memories')
 for r in mems:
  if any(r[k] not in ('yes','no','unknown') for k in ('useful','stale','irrelevant')) or not r['rationale'].strip():raise ValueError('Incomplete memory rating')
 return {'metadata':meta,'judgments':js,'alternatives':alts,'memories':mems}

def freeze(root,submission,label):
 root=Path(root);data=validate(root,submission,label);dest=root/'coordinator/frozen'/label
 if dest.exists():raise ValueError('Review is already frozen; never overwrite')
 other=root/'coordinator/frozen'/('B' if label=='A' else 'A')/'review.json'
 if other.exists() and read(other)['metadata']['reviewer_identity'].strip().casefold()==data['metadata']['reviewer_identity'].strip().casefold():raise ValueError('Reviewers must be different people')
 dest.mkdir(parents=True);write(dest/'review.json',data);write(dest/'freeze.json',{'review_sha256':sha(dest/'review.json'),'slot':label,'frozen_at_utc':datetime.now(timezone.utc).isoformat(),'submission_hashes':{name:sha(Path(submission)/name) for name in ('reviewer.json','judgments.csv','alternatives.csv','memories.csv')}})
 return sha(dest/'review.json')

def both(root):
 root=Path(root);verify_package(root);result=[]
 for label in ('A','B'):
  p=root/'coordinator/frozen'/label
  if not (p/'freeze.json').exists():raise ValueError('Both independent reviews must be frozen before comparison or unblinding')
  if sha(p/'review.json')!=read(p/'freeze.json')['review_sha256']:raise ValueError('Frozen review changed')
  result.append(read(p/'review.json'))
 if result[0]['metadata']['reviewer_identity'].strip().casefold()==result[1]['metadata']['reviewer_identity'].strip().casefold():raise ValueError('Same reviewer twice')
 return result

def agreement(a,b):
 aa={r['case_id']:r for r in a};bb={r['case_id']:r for r in b}
 if not aa or len(aa)!=len(a) or len(bb)!=len(b) or set(aa)!=set(bb):raise ValueError('Paired unique complete labels required')
 matrix={x:{y:0 for y in JUDGMENTS} for x in JUDGMENTS};numer=denom=0
 for cid,x in aa.items():
  y=bb[cid];matrix[x['primary']][y['primary']]+=1
  weight=min(CONFIDENCE[x['confidence']],CONFIDENCE[y['confidence']]);denom+=weight;numer+=weight*(x['primary']==y['primary'])
 n=len(aa);ca=Counter(r['primary'] for r in a);cb=Counter(r['primary'] for r in b);p=sum(matrix[x][x] for x in JUDGMENTS)/n;expected=sum(ca[x]*cb[x] for x in JUDGMENTS)/n**2
 return {'n':n,'exact_agreement':p,'reviewer_A_counts':dict(ca),'reviewer_B_counts':dict(cb),'matrix_rows_A_columns_B':matrix,'expected_agreement':expected,'cohens_kappa':None if expected==1 else (p-expected)/(1-expected),'confidence_weighted_agreement':numer/denom,'per_category_positive_agreement':{x:2*matrix[x][x]/(ca[x]+cb[x]) if ca[x]+cb[x] else None for x in JUDGMENTS},'uncertainty':'Descriptive; correlated cases, no independent-case significance test.'}

def review_descriptives(review):
 judgments={r['case_id']:r for r in review['judgments']};case_rows=[]
 for cid,r in judgments.items():
  mems=[m for m in review['memories'] if m['case_id']==cid];n=len(mems);yes=sum(m['useful']=='yes' for m in mems);unknown=sum(m['useful']=='unknown' for m in mems)
  case_rows.append({'case_id':cid,'primary':r['primary'],'memory_count':n,'useful_yes':yes,'useful_unknown':unknown,'density_lower':yes/n if n else None,'density_upper':(yes+unknown)/n if n else None})
 groups={}
 for label in JUDGMENTS:
  group=[x for x in case_rows if x['primary']==label];observed=[x for x in group if x['memory_count']]
  groups[label]={'cases':len(group),'no_memory_cases':len(group)-len(observed),'mean_density_lower':sum(x['density_lower'] for x in observed)/len(observed) if observed else None,'mean_density_upper':sum(x['density_upper'] for x in observed)/len(observed) if observed else None}
 return {'by_case':case_rows,'by_judgment':groups,'memory_counts':{k:dict(Counter(r[k] for r in review['memories'])) for k in ('useful','stale','irrelevant')},'goal_impact_counts':dict(Counter(r['goal_impact'] for r in review['judgments'])),'missing_information':dict(Counter(k for r in review['judgments'] for k in split(r['missing_information']))),'interpretation':'Density includes confirmed useful entries only in its lower bound; unknown entries widen upper bound. No-memory cases have undefined density. Group differences are descriptive, not causal; no independent-case significance test.'}

def compare(root):
 root=Path(root);a,b=both(root);out=root/'coordinator/results'
 if out.exists():raise ValueError('Results already exist; do not overwrite')
 out.mkdir();result=agreement(a['judgments'],b['judgments']);write(out/'agreement.json',result)
 write(out/'information-quality-by-reviewer.json',{'A':review_descriptives(a),'B':review_descriptives(b)})
 bm={r['case_id']:r for r in b['judgments']}
 queue=[{'case_id':r['case_id'],'A_judgment':r['primary'],'B_judgment':bm[r['case_id']]['primary'],'A_rationale':r['rationale'],'B_rationale':bm[r['case_id']]['rationale'],'adjudicated_judgment':'','adjudicator':'','rationale':''} for r in a['judgments'] if r['primary']!=bm[r['case_id']]['primary']]
 csv_write(out/'blinded-adjudication-queue.csv',['case_id','A_judgment','B_judgment','A_rationale','B_rationale','adjudicated_judgment','adjudicator','rationale'],queue)
 write(out/'reviews-bound.json',{label:sha(root/'coordinator/frozen'/label/'review.json') for label in ('A','B')})
 return result

def unblind(root):
 root=Path(root);a,b=both(root);p=root/'coordinator/results';bound=read(p/'reviews-bound.json')
 if any(bound[k]!=sha(root/'coordinator/frozen'/k/'review.json') for k in ('A','B')):raise ValueError('Comparison uses different reviews')
 target=p/'unblinded.json'
 if target.exists():raise ValueError('Already unblinded')
 key=read(root/'coordinator/unblinding-key.json');bm={r['case_id']:r for r in b['judgments']};records=[]
 categories={True:dict(zip(JUDGMENTS,('B','A','C'))),False:dict(zip(JUDGMENTS,('D','E','F')))}
 for r in a['judgments']:
  cid=r['case_id'];truth=key[cid];other=bm[cid];same=r['primary']==other['primary']
  records.append({'case_id':cid,**truth,'A':r,'B':other,'reviewer_A_category':categories[truth['actual_wait']][r['primary']],'reviewer_B_category':categories[truth['actual_wait']][other['primary']],'agreed_category':categories[truth['actual_wait']][r['primary']] if same else None,'status':'agreed' if same else 'unresolved_disagreement'})
 cases={c['case_id']:c for c in read(root/'coordinator/cases.json')};employment=[]
 for rec in records:
  if not rec['employment_screen']:continue
  cid=rec['case_id'];job_ids={k for k,v in active(cases[cid]).items() if any(x['type'] in ('apply_job','accept_job_offer') for x in v['actions'])}
  fits={label:{r['candidate_id'] for r in review['alternatives'] if r['case_id']==cid and r['candidate_id'] in job_ids and r['suitability'] in SUITABILITY[:2]} for label,review in [('A',a),('B',b)]}
  employment.append({'case_id':cid,'A_plausible_or_clear_job_candidates':sorted(fits['A']),'B_plausible_or_clear_job_candidates':sorted(fits['B']),'both_find_same_suitable_job':sorted(fits['A']&fits['B']),'both_prefer_same_job_over_wait':sorted(set(split(rec['A']['preferred_active_candidate_ids'])) & set(split(rec['B']['preferred_active_candidate_ids'])) & fits['A'] & fits['B']) if rec['A']['primary']==rec['B']['primary']=='ACT' else [],'judgments':[rec['A']['primary'],rec['B']['primary']],'confidences':[rec['A']['confidence'],rec['B']['confidence']]})
 write(p/'employment-suitability-after-unblinding.json',employment)
 write(target,{'records':records,'agreed_counts':dict(Counter(r['agreed_category'] for r in records if r['agreed_category'])),'unresolved':sum(r['agreed_category'] is None for r in records),'warning':'B is a reviewer concern, not proven model error; inspect confidence and suitability.'})
 return target

def main():
 p=argparse.ArgumentParser();p.add_argument('operation',choices=['build','validate','freeze','compare','unblind']);p.add_argument('--root',type=Path,required=True);p.add_argument('--source',type=Path);p.add_argument('--seed',type=int,default=202609210101);p.add_argument('--submission',type=Path);p.add_argument('--reviewer',choices=['A','B']);a=p.parse_args()
 if a.operation=='build':result=build(a.source,a.root,a.seed)
 elif a.operation=='validate':result=validate(a.root,a.submission,a.reviewer)['metadata']
 elif a.operation=='freeze':result=freeze(a.root,a.submission,a.reviewer)
 elif a.operation=='compare':result=compare(a.root)
 else:result=str(unblind(a.root))
 print(json.dumps(result,indent=2))
if __name__=='__main__':main()
