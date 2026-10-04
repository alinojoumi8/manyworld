"""Additive C/D validation, immutable freeze, and descriptive four-rater analysis."""
import collections, hashlib, itertools, json, shutil, socket
from datetime import datetime, timezone
from pathlib import Path
import blinded_adjudication as b
ROOT=Path(__file__).resolve().parents[1]
OLD=ROOT/'reports/out/jev-blinded-adjudication-20260921'
OUT=ROOT/'reports/out/jev-four-reviewer-20260922'
SOURCES={'C':Path('C:/tmp/ae-cd-review-check-20260922T014254Z/C'),'D':Path('C:/tmp/ae-review-D-check-20260922T015520Z')}
NAMES=('reviewer.json','judgments.csv','alternatives.csv','memories.csv')

def validate_cd(path,label,manifest,cases):
    """Same rubric and field requirements as A/B; genuine C/D slot retained."""
    if label not in ('C','D'):raise ValueError('Expected C or D')
    meta=b.read(path/'reviewer.json')
    for k,v in [('reviewer_slot',label),('reviewer_kind','human'),('case_set_sha256',manifest['case_set_sha256']),('rubric_sha256',manifest['rubric_sha256'])]:
        if meta.get(k)!=v:raise ValueError('Metadata mismatch: '+k)
    if not meta.get('reviewer_identity','').strip():raise ValueError('Missing reviewer identity')
    attest={'no_prior_choice_or_analysis_access','no_other_reviewer_access','no_external_model_assistance'}
    if set(meta.get('attestations',{}))!=attest or any(meta['attestations'][k] is not True for k in attest):raise ValueError('Required independent human attestations')
    js=b.csv_read(path/'judgments.csv');alts=b.csv_read(path/'alternatives.csv');mems=b.csv_read(path/'memories.csv')
    cm={c['case_id']:c for c in cases}
    expected_alts={(c['case_id'],k) for c in cases for k in b.active(c)}
    expected_mems={(c['case_id'],str(i)) for c in cases for i,_ in enumerate(c['evaluation']['state']['memories'])}
    for rows,keys,wanted in [(js,('case_id',),{(k,) for k in cm}),(alts,('case_id','candidate_id'),expected_alts),(mems,('case_id','memory_index'),expected_mems)]:
        actual=[tuple(r.get(k) for k in keys) for r in rows]
        if len(actual)!=len(wanted) or set(actual)!=wanted:raise ValueError('Missing/duplicate/unexpected row IDs')
    am={(r['case_id'],r['candidate_id']):r for r in alts}
    for r in alts:
        if r.get('suitability') not in b.SUITABILITY or not r.get('rationale','').strip() or not r.get('role_compatibility_information','').strip():raise ValueError('Incomplete alternative')
    for r in js:
        if r.get('primary') not in b.JUDGMENTS or r.get('confidence') not in b.CONFIDENCE or r.get('goal_impact') not in b.GOALS or not r.get('rationale','').strip():raise ValueError('Incomplete judgment')
        missing=b.split(r.get('missing_information',''));pref=b.split(r.get('preferred_active_candidate_ids',''))
        if set(missing)-set(b.MISSING):raise ValueError('Unknown missing-information category')
        if len(pref)!=len(set(pref)) or set(pref)-set(b.active(cm[r['case_id']])):raise ValueError('Invalid preferred candidate')
        if r['primary']=='ACT' and (not pref or any(am[r['case_id'],k]['suitability'] not in b.SUITABILITY[:2] for k in pref)):raise ValueError('ACT requires suitable named option')
        if r['primary']=='INSUFFICIENT_INFORMATION' and not missing:raise ValueError('Missing information explanation required')
    for r in mems:
        if any(r.get(k) not in ('yes','no','unknown') for k in ('useful','stale','irrelevant')) or not r.get('rationale','').strip():raise ValueError('Incomplete memory rating')
    return {'metadata':meta,'judgments':js,'alternatives':alts,'memories':mems}

def four_stats(reviews):
    if set(reviews)!=set('ABCD'):raise ValueError('Four frozen reviews required')
    maps={s:{r['case_id']:r for r in review['judgments']} for s,review in reviews.items()}
    ids=set(maps['A'])
    if not ids or any(set(m)!=ids or len(m)!=len(reviews[s]['judgments']) for s,m in maps.items()):raise ValueError('Unique paired cases required')
    pairs={a+b_:b.agreement(reviews[a]['judgments'],reviews[b_]['judgments']) for a,b_ in itertools.combinations('ABCD',2)}
    rows=[];pooled=collections.Counter();pis=[]
    for cid in sorted(ids):
        labels={s:maps[s][cid]['primary'] for s in 'ABCD'}
        if any(x not in b.JUDGMENTS for x in labels.values()):raise ValueError('Unknown category')
        votes=collections.Counter(labels.values());pooled.update(votes);pattern=sorted(votes.values(),reverse=True)
        kind='unanimous' if pattern==[4] else '3_of_4' if pattern==[3,1] else '2_2' if pattern==[2,2] else 'no_majority_2_1_1'
        majority=next((k for k,v in votes.items() if v>=3),None)
        pi=sum(v*(v-1) for v in votes.values())/12;pis.append(pi)
        rows.append({'case_id':cid,'judgments':labels,'confidences':{s:maps[s][cid]['confidence'] for s in 'ABCD'},'votes':dict(votes),'pattern':kind,'majority_label':majority,'pair_agreement':pi})
    po=sum(pis)/len(pis);pe=sum((pooled[k]/(4*len(ids)))**2 for k in b.JUDGMENTS)
    return {'n':len(ids),'reviewers':4,'patterns':dict(collections.Counter(r['pattern'] for r in rows)),'fleiss_kappa':None if pe==1 else (po-pe)/(1-pe),'observed_pair_agreement':po,'expected_agreement':pe,'pairwise':pairs,'by_case':rows,'majorities':dict(collections.Counter(r['majority_label'] or 'none' for r in rows))}

def main():
    if OUT.exists():raise ValueError('Never overwrite frozen review results')
    attempts=[]
    def deny(*args,**kwargs):attempts.append('network');raise RuntimeError('Offline review analysis')
    socket.socket=deny;socket.create_connection=deny;socket.getaddrinfo=deny
    manifest,cases=b.verify_package(OLD);ab=b.both(OLD)
    assert manifest['case_set_sha256']=='9fdeddbdd7e7ddb2953d0972a2fe83e3abd4d1e55da6f0ee5c1df49014383e8c'
    reviews=dict(zip('AB',ab))
    for s in 'CD':reviews[s]=validate_cd(SOURCES[s],s,manifest,cases)
    identities=[r['metadata']['reviewer_identity'].strip().casefold() for r in reviews.values()]
    if len(set(identities))!=4:raise ValueError('Reviewer identities must be distinct')
    prior=ROOT/'reports/out/jev-cd-pilot-20260921/analysis/preservation-after.json'
    protected=set(Path(p) for p in b.read(prior)['hashes'])
    for folder in (OLD,ROOT/'reports/out/jev-adjudication-results-20260921',ROOT/'reports/out/jev-cd-pilot-20260921'):
        protected.update(p for p in folder.rglob('*') if p.is_file())
    before={str(p):b.sha(p) for p in sorted(protected)}
    OUT.mkdir();(OUT/'frozen').mkdir()
    for s in 'CD':
        dest=OUT/'frozen'/s;dest.mkdir();(dest/'raw').mkdir()
        for name in NAMES:shutil.copyfile(SOURCES[s]/name,dest/'raw'/name)
        b.write(dest/'review.json',reviews[s])
        b.write(dest/'freeze.json',{'slot':s,'frozen_at_utc':datetime.now(timezone.utc).isoformat(),'review_sha256':b.sha(dest/'review.json'),'case_set_sha256':manifest['case_set_sha256'],'source':str(SOURCES[s]),'submission_hashes':{name:b.sha(dest/'raw'/name) for name in NAMES}})
    # Only now, after both new freezes, compute agreement and join recorded choices.
    for s in 'CD':assert b.sha(OUT/f'frozen/{s}/review.json')==b.read(OUT/f'frozen/{s}/freeze.json')['review_sha256']
    stats=four_stats(reviews)
    key=b.read(OLD/'coordinator/unblinding-key.json')
    category=lambda wait,label:({'WAIT':'A','ACT':'B','INSUFFICIENT_INFORMATION':'C'} if wait else {'ACT':'D','WAIT':'E','INSUFFICIENT_INFORMATION':'F'})[label]
    for row in stats['by_case']:
        truth=key[row['case_id']];row.update(actual_wait=truth['actual_wait'],actual_choice=truth['actual_choice'],employment_screen=truth['employment_screen'])
        row['individual_categories']={s:category(truth['actual_wait'],v) for s,v in row['judgments'].items()}
        row['majority_category']=category(truth['actual_wait'],row['majority_label']) if row['majority_label'] else None
        row['unanimous_category']=row['majority_category'] if row['pattern']=='unanimous' else None
    stats['majority_categories']=dict(collections.Counter(r['majority_category'] or 'unresolved' for r in stats['by_case']))
    stats['unanimous_categories']=dict(collections.Counter(r['unanimous_category'] for r in stats['by_case'] if r['unanimous_category']))
    stats['individual_categories']={s:dict(collections.Counter(r['individual_categories'][s] for r in stats['by_case'])) for s in 'ABCD'}
    stats['employment']={'n':sum(r['employment_screen'] for r in stats['by_case']),'patterns':dict(collections.Counter(r['pattern'] for r in stats['by_case'] if r['employment_screen'])),'majority_labels':dict(collections.Counter(r['majority_label'] or 'none' for r in stats['by_case'] if r['employment_screen']))}
    stats['reviewer_counts']={s:{'primary':dict(collections.Counter(x['primary'] for x in r['judgments'])),'confidence':dict(collections.Counter(x['confidence'] for x in r['judgments'])),'goal_impact':dict(collections.Counter(x['goal_impact'] for x in r['judgments'])),'memory':{k:dict(collections.Counter(x[k] for x in r['memories'])) for k in ('useful','stale','irrelevant')}} for s,r in reviews.items()}
    b.write(OUT/'four-reviewer-results.json',stats)
    fields=['case_id','pattern','majority_label','actual_wait','actual_choice','employment_screen','majority_category']+[s+'_judgment' for s in 'ABCD']+[s+'_confidence' for s in 'ABCD']
    b.csv_write(OUT/'all-cases.csv',fields,[{**{k:r[k] for k in fields if k in r},**{s+'_judgment':r['judgments'][s] for s in 'ABCD'},**{s+'_confidence':r['confidences'][s] for s in 'ABCD'}} for r in stats['by_case']])
    b.write(OUT/'preservation.json',{'files_checked':len(before),'before':before,'after':{p:b.sha(Path(p)) for p in before},'network_attempts':len(attempts)})
    assert before=={p:b.sha(Path(p)) for p in before}
    b.write(OUT/'SHA256SUMS.json',{str(p.relative_to(OUT)):b.sha(p) for p in OUT.rglob('*') if p.is_file()})
    print(json.dumps({k:v for k,v in stats.items() if k not in ('by_case','pairwise')},indent=2))
    print('PAIRWISE',json.dumps({k:{n:v[n] for n in ('exact_agreement','cohens_kappa')} for k,v in stats['pairwise'].items()}))
    print('FREEZES',json.dumps({s:b.read(OUT/f'frozen/{s}/freeze.json') for s in 'CD'}));print('PROTECTED',len(before))
if __name__=='__main__':main()
