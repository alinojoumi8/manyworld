"""Summarize frozen human reviews and prepare one offline-only ablation."""
import collections
import copy
import hashlib
import json
from pathlib import Path
import random
import re
import socket

ROOT = Path(__file__).resolve().parents[1]
PACKAGE = ROOT / 'reports/out/jev-blinded-adjudication-20260921'
C = PACKAGE / 'coordinator'
OUT = ROOT / 'reports/out/jev-adjudication-results-20260921'

def read(p):
    return json.loads(p.read_text(encoding='utf-8'))

def digest(p):
    return hashlib.sha256(p.read_bytes()).hexdigest()

def write(name, data):
    p = OUT / name
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(json.dumps(data, indent=2, ensure_ascii=False)+'\n', encoding='utf-8')

def counts(items):
    return dict(collections.Counter(items))

def main():
    attempts = []
    def denied(*args, **kwargs):
        attempts.append('network_attempt')
        raise RuntimeError('Offline analysis: network disabled')
    socket.socket = denied
    socket.create_connection = denied
    socket.getaddrinfo = denied
    assert not OUT.exists(), 'Refuse to overwrite frozen experiment'
    protected = [p for p in PACKAGE.rglob('*') if p.is_file()]
    before = {str(p):digest(p) for p in protected}
    reviews = {s:read(C/f'frozen/{s}/review.json') for s in ('A','B')}
    cases = read(C/'cases.json')
    records = read(C/'results/unblinded.json')['records']
    byid = {r['case_id']:r for r in records}
    mem = {s:{(r['case_id'],int(r['memory_index'])):r for r in v['memories']} for s,v in reviews.items()}
    summary = {'case_count':len(cases),'reviewers':{},'categories':{s:counts(r[s] for r in records) for s in ('reviewer_A_category','reviewer_B_category','agreed_category')}}
    quality = read(C/'results/information-quality-by-reviewer.json')
    for s,r in reviews.items():
        summary['reviewers'][s] = {
            'primary':counts(x['primary'] for x in r['judgments']),
            'confidence':counts(x['confidence'] for x in r['judgments']),
            'goals':counts(x['goal_impact'] for x in r['judgments']),
            'missing_information':counts(v.strip() for x in r['judgments'] for v in x['missing_information'].split(';')),
            'memory':{k:counts(x[k] for x in r['memories']) for k in ('useful','stale','irrelevant')},
            'memory_association':{},
        }
        for group in ('empty','no_useful','some_useful'):
            selected = [x for x in quality[s]['by_case'] if ('empty' if x['memory_count']==0 else 'some_useful' if x['useful_yes'] else 'no_useful')==group]
            summary['reviewers'][s]['memory_association'][group] = {'n':len(selected),'judgments':counts(x['primary'] for x in selected)}
    emp = read(C/'results/employment-suitability-after-unblinding.json')
    summary['employment'] = {'n':len(emp),'judgment_pairs':counts('/'.join(x['judgments']) for x in emp),'shared_suitable_job_cases':sum(bool(x['both_find_same_suitable_job']) for x in emp),'both_prefer_job_cases':sum(bool(x['both_prefer_same_job_over_wait']) for x in emp)}
    summary['common_useful_memories'] = sum(mem['A'][k]['useful']=='yes' and mem['B'][k]['useful']=='yes' for k in mem['A'])
    summary['goal_impact_pairs'] = counts(x['A']['goal_impact']+'/'+x['B']['goal_impact'] for x in records)
    summary['disputed_missed_opportunities'] = [x for x in records if x['actual_wait'] and (x['A']['primary']=='ACT' or x['B']['primary']=='ACT')]
    summary['agreement'] = read(C/'results/agreement.json')
    summary['frozen_review_sha256'] = {s:digest(C/f'frozen/{s}/review.json') for s in reviews}
    # One intervention only: remove entire memory entries composed solely of
    # generic operational audit markers, with both reviewers marking not useful.
    pattern = re.compile(r'Something happened: (?:typed_decision|bounded_selection|information_exposed)\.(?: \| Something happened: (?:typed_decision|bounded_selection|information_exposed)\.)*')
    edits=[]
    for c in sorted(cases,key=lambda x:x['case_id']):
        cid=c['case_id']; a=c['evaluation']; b=copy.deepcopy(a)
        removed=[i for i,t in enumerate(a['state']['memories']) if pattern.fullmatch(t) and all(mem[s][cid,i]['useful']=='no' for s in reviews)]
        if not removed:continue
        b['state']['memories']=[t for i,t in enumerate(a['state']['memories']) if i not in removed]
        restored=copy.deepcopy(b);restored['state']['memories']=a['state']['memories']
        assert restored==a and b!=a
        write(f'inputs/{cid}/A.json',a);write(f'inputs/{cid}/B.json',b)
        edits.append({'case_id':cid,'removed_indices':removed,'removed_texts':[a['state']['memories'][i] for i in removed],'original_choices_excluded_from_inputs':True,'agreed_category':byid[cid]['agreed_category'],'actual_wait':byid[cid]['actual_wait']})
    rng=random.Random(202609212230)
    schedule=[]
    for e in edits:
        for rep in range(1,4):
            arms=['A','B'];rng.shuffle(arms)
            schedule.extend({'case_id':e['case_id'],'replicate':rep,'arm':arm} for arm in arms)
    # Randomized paired arm ordering without choosing order from outcomes.
    assert len(schedule)==len(edits)*6
    plan=read(C/'frozen-input-experiment.template.json')
    plan.update(status='PREPARED_NOT_RUN_NO_MODEL_AUTHORIZATION',intervention='Remove whole memory entries consisting only of generic typed_decision, bounded_selection, or information_exposed markers and rated not useful by both reviewers.',affected_case_ids=[e['case_id'] for e in edits],allowed_changed_json_paths=['/state/memories'],arm_B='Original evaluation with precisely the precommitted memory indices removed; retained strings/order unchanged.',problem='Both reviewers find nearly all retrieved memories not useful; this is a quality finding, not proof these entries caused WAIT.',intervention_rationale='Common evidence deficit that can be ablated without inventing actor goals, obligations or economic facts.',expected_effect='Preserve supported decisions while reducing irrelevant input. Direction of action-rate change is unspecified.',risk='Deletion may remove subtle useful signals despite ratings; actor clustering and rater disagreement limit generalization.',primary_metric='Paired B-minus-A exact WAIT selection rate on the 44 affected jointly-WAIT cases, averaged equally by case over three repeats. No agreed ACT cases exist: beneficial active-choice accuracy cannot be estimated. Disputed and insufficient judgments remain separate.',calls_formula=f'{len(edits)} cases x 2 arms x 3 repeats = {len(schedule)} calls; not authorized',randomization='Fixed seed 202609212230; randomized within each case/replicate paired A/B order.',analysis='Exploratory ablation, not evidence of missed-opportunity correction. Preserve per-reviewer results and disputed strata; report actor-clustered descriptive differences without naive independent-case significance.',success_rule='No loss in aggregate or per-case supported-WAIT concordance; zero newly role-incompatible selections rated clearly unsuitable by either reviewer; complete valid schema/ID outputs. Input character reduction is secondary, not a model-quality improvement claim.')
    plan['affected_counts']={'cases':len(edits),'memory_entries_removed':sum(len(e['removed_indices']) for e in edits),'categories':counts(e['agreed_category'] for e in edits),'actual_wait':counts(str(e['actual_wait']) for e in edits)}
    plan['output_contract']='Preserve the original provider output schema, questions, criteria and parsing/evaluation contract. No retries, fallback, candidate changes or live world execution. Required model revision unavailable => stop.'
    assert sum(e['agreed_category'] in ('A','E') for e in edits)==44
    write('summary.json',summary);write('experiment-plan.json',plan);write('edits.json',edits);write('schedule.json',schedule)
    write('source-preservation.json',{'files_checked':len(before),'before':before,'after':{str(p):digest(p) for p in protected},'network_attempts':len(attempts)})
    assert before=={str(p):digest(p) for p in protected}
    write('SHA256SUMS.json',{str(p.relative_to(OUT)):digest(p) for p in OUT.rglob('*') if p.is_file()})
    print(json.dumps({'output':str(OUT),'affected':plan['affected_counts'],'calls_prepared':len(schedule),'preserved_files':len(before),'network_attempts':len(attempts),'review_stats':{s:{k:v for k,v in d.items() if k in ('memory_association',)} for s,d in summary['reviewers'].items()},'goal_pairs':summary['goal_impact_pairs']},indent=2))

if __name__=='__main__':main()
