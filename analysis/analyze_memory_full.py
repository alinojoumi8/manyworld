"""Offline combined analysis; original metric remains fixed, C/D supplementary."""
import collections,csv,json,statistics,sys
from decimal import Decimal
from pathlib import Path
import run_memory_remaining as r
ROOT=r.ROOT;OUT=r.OUT

def main():
    dest=OUT/'analysis'
    if dest.exists():raise ValueError('Do not overwrite results')
    schedule,pilot=r.prepare()
    new=[r.read(p) for p in sorted((OUT/'execution').glob('*-result.json'))]
    if len(new)!=300 or any(x['status']!='completed' for x in new):raise ValueError('Incomplete/invalid execution: report blocker without completed analysis')
    assert [r.key(x) for x in new]==[r.key(x) for x in schedule]
    for x in pilot:x['execution_phase']='pilot'
    for x in new:x['execution_phase']='remaining'
    allrows=pilot+new;by={r.key(x):x for x in allrows}
    assert len(by)==372 and len({x['response']['id'] for x in allrows})==372
    assert set(by)=={r.key(x) for x in r.read(r.E/'schedule.json')}
    original=ROOT/'reports/out/jev-blinded-adjudication-20260921/coordinator'
    reviews={s:r.read(original/f'frozen/{s}/review.json') for s in 'AB'}
    four={x['case_id']:x for x in r.read(r.F/'four-reviewer-results.json')['by_case']}
    judgments={s:{x['case_id']:x for x in rev['judgments']} for s,rev in reviews.items()}
    ratings={s:{(x['case_id'],x['candidate_id']):x['suitability'] for x in rev['alternatives']} for s,rev in reviews.items()}
    cases=[];changes=[];losses=[];unsuitable=[];nonmodal=0;unstable=0
    for e in r.read(r.E/'edits.json'):
        cid=e['case_id'];arms={arm:[by[cid,arm,i] for i in (1,2,3)] for arm in ('A','B')}
        votes={a:collections.Counter(x['selected_action'] for x in rows) for a,rows in arms.items()}
        unstable+=sum(len(x)>1 for x in votes.values());nonmodal+=sum(3-max(x.values()) for x in votes.values())
        counts={a:sum(x['choice_kind']=='WAIT' for x in rows) for a,rows in arms.items()}
        joint=judgments['A'][cid]['primary']==judgments['B'][cid]['primary']=='WAIT'
        if joint and counts['B']<counts['A']:losses.append({'case_id':cid,'A_wait':counts['A'],'B_wait':counts['B']})
        for rep in (1,2,3):
            a=by[cid,'A',rep];b=by[cid,'B',rep]
            if a['selected_action']!=b['selected_action']:
                delta={'case_id':cid,'replicate':rep,'A_choice':a['selected_action'],'B_choice':b['selected_action'],'A_actions':a['actions'],'B_actions':b['actions'],'joint_AB_WAIT':joint,'AB_category':e['agreed_category'],'B_suitability':{s:ratings[s].get((cid,b['selected_action'])) for s in ratings},'four_reviewer_pattern':four[cid]['pattern'],'four_reviewer_majority':four[cid]['majority_label'],'phase':a['execution_phase']}
                changes.append(delta)
                if b['choice_kind']=='ACTIVE' and 'clearly unsuitable' in delta['B_suitability'].values():unsuitable.append(delta)
        ev=r.read(r.E/f'inputs/{cid}/A.json')
        cases.append({'case_id':cid,'actor_id':ev['state']['actor']['id'],'joint_AB_WAIT':joint,'AB_category':e['agreed_category'],'AB_judgments':{s:judgments[s][cid]['primary'] for s in 'AB'},'four_reviewer_majority':four[cid]['majority_label'],'four_reviewer_pattern':four[cid]['pattern'],'historical_wait':e['actual_wait'],'choices':{a:dict(x) for a,x in votes.items()},'wait_counts':counts,'paired_wait_rate_delta':(counts['B']-counts['A'])/3,'phase':arms['A'][0]['execution_phase'],'input_tokens':{a:sum(x['input_tokens'] for x in rows) for a,rows in arms.items()},'removed_characters':sum(map(len,e['removed_texts']))})
    primary=[c for c in cases if c['joint_AB_WAIT']];assert len(primary)==44
    primary_counts={a:sum(c['wait_counts'][a] for c in primary) for a in ('A','B')}
    actor_groups=collections.defaultdict(list)
    for c in primary:actor_groups[c['actor_id']].append(c['paired_wait_rate_delta'])
    actor_deltas={str(k):sum(v)/len(v) for k,v in actor_groups.items()}
    byarm={a:{'calls':sum(x['arm']==a for x in allrows),'input_tokens':sum(x['input_tokens'] for x in allrows if x['arm']==a),'output_tokens':sum(x['output_tokens'] for x in allrows if x['arm']==a),'choices':dict(collections.Counter(x['choice_kind'] for x in allrows if x['arm']==a)),'cost_usd':str(sum((Decimal(str(x['cost_usd'])) for x in allrows if x['arm']==a),Decimal(0)))} for a in ('A','B')}
    supplemental={}
    for label in ('WAIT','ACT',None):
        group=[c for c in cases if c['four_reviewer_majority']==label]
        supplemental[label or 'no_majority']={'cases':len(group),'A_WAIT':sum(c['wait_counts']['A'] for c in group),'B_WAIT':sum(c['wait_counts']['B'] for c in group),'note':'Supplementary descriptive counts only; do not recode original primary metric or interpret any ACTIVE as a suitable ACT choice.'}
    summary={'total_calls':372,'new_calls':300,'retained_pilot_calls':72,'models':dict(collections.Counter(x['response']['model'] for x in allrows)),'invalid_outputs':0,'retries':0,'unknown_reservations':sum(x['reservation_state']=='unknown' for x in allrows),'unique_provider_ids':372,'by_arm':byarm,'primary':{'joint_AB_WAIT_cases':44,'evaluations_per_arm':132,'A_wait':primary_counts['A'],'B_wait':primary_counts['B'],'A_wait_rate':primary_counts['A']/132,'B_wait_rate':primary_counts['B']/132,'B_minus_A_percentage_points':100*(primary_counts['B']-primary_counts['A'])/132,'cases_worse':losses,'distinct_actors':len(actor_deltas),'actor_equal_weight_delta':sum(actor_deltas.values())/len(actor_deltas),'actor_deltas':actor_deltas,'uncertainty':'Descriptive, clustered/repeated cases, no naive independent-case significance or causal conclusion.'},'new_clearly_unsuitable_B_choices':unsuitable,'paired_changes':len(changes),'paired_comparisons':186,'changed_cases':len({c['case_id'] for c in changes}),'unstable_case_arm_groups':unstable,'total_case_arm_groups':124,'nonmodal_outputs':nonmodal,'nonmodal_fraction':nonmodal/372,'input_tokens_saved':byarm['A']['input_tokens']-byarm['B']['input_tokens'],'input_tokens_saved_pct':100*(byarm['A']['input_tokens']-byarm['B']['input_tokens'])/byarm['A']['input_tokens'],'cached_tokens_status':'Provider did not report cached-token counts; unavailable, not assumed zero.','cost_usd':str(sum((Decimal(str(x['cost_usd'])) for x in allrows),Decimal(0))),'new_cost_usd':str(sum((Decimal(str(x['cost_usd'])) for x in new),Decimal(0))),'latency_ms_median':statistics.median(x['latency_ms'] for x in allrows),'four_reviewer_supplementary':supplemental,'original_guardrail_result':'FAIL' if losses or unsuitable else 'PASS','efficacy_claim':'None: no jointly ACT targets; intervention cannot demonstrate consensus-supported active-choice improvement on this set.'}
    dest.mkdir();r.write(dest/'summary.json',summary);r.write(dest/'per-case.json',cases);r.write(dest/'paired-changes.json',changes)
    fields=['case_id','arm','replicate','execution_phase','selected_action','choice_kind','input_tokens','output_tokens','cached_tokens','cost_usd','latency_ms','status','retries','reservation_state']
    with (dest/'calls.csv').open('w',newline='',encoding='utf-8') as f:
        w=csv.DictWriter(f,fieldnames=fields);w.writeheader();w.writerows({k:x.get(k) for k in fields} for x in allrows)
    before=r.read(OUT/'preservation-before.json');after={p:r.sha(Path(p)) for p in before};assert before==after
    r.write(dest/'preservation-after.json',{'protected_files':len(before),'changed_files':[],'hashes':after})
    r.write(dest/'SHA256SUMS.json',{str(p.relative_to(OUT)):r.sha(p) for p in OUT.rglob('*') if p.is_file()})
    print(json.dumps(summary,indent=2));print('CHANGES',json.dumps(changes,indent=2))
if __name__=='__main__':main()
