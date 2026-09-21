import json,collections,pathlib,statistics
O=pathlib.Path('reports/out/jev-wait-analysis');rs=json.loads((O/'decisions.json').read_text(encoding='utf-8'));s=[x for x in rs if x['status']=='selected'];w=[x for x in s if x['receipt']['selected_candidate']=='wait']
mem=[m for x in s for m in x['supplied_evaluation']['state']['memories']]
out={'supplied_memory_slots':len(mem),'slots_with_generic_something_happened':sum('Something happened:' in m for m in mem),'slots_with_generic_structured_facts':sum('I used the current structured engine facts' in m for m in mem),'no_memories_decisions':sum(not x['supplied_evaluation']['state']['memories'] for x in s), 'institutional_waits':sum(bool(x['supplied_evaluation']['state']['actor'].get('role')) for x in w),'noninstitutional_waits':sum(not x['supplied_evaluation']['state']['actor'].get('role') for x in w),'C_institutional_roles':dict(collections.Counter(x['supplied_evaluation']['state']['actor'].get('role') for x in w if x['wait_classification']=='C')),'ballot_responses_with_wait':dict(collections.Counter(v for x in w for v in x['receipt'].get('ballot_choices',{}).values())),'ranking_audit':[]}
for x in s:
 ctx=x['frozen_predecision_context'];p=x['model_call']['request']['decision_policy'];pending=set(ctx.get('pending_job_ids',[]))
 jobs=[j for j in sorted(ctx.get('jobs',[]),key=lambda j:(-j['wage'],j['job_id'])) if j['job_id'] not in pending]
 offered=sorted({a['job_id'] for o in x['receipt']['candidates'] for a in o['actions'] if a['type']=='apply_job'})
 out['ranking_audit'].append({'event_id':x['event_id'],'eligible_observed_jobs_before_menu_bound':[j['job_id'] for j in jobs], 'offered_job_ids':offered,'job_bound':p['max_job_options'],'incoming_offer_blocks_new_applications':bool(ctx.get('incoming_job_offers')),'context_observation_tick':ctx['tick'],'evaluation_tick':x['supplied_evaluation']['state']['tick'],'selected':x['receipt']['selected_candidate']})
out['menus_with_more_than_two_jobs_in_context']=sum(len(x['eligible_observed_jobs_before_menu_bound'])>2 for x in out['ranking_audit'])
out['waits_with_more_than_two_jobs_in_context']=sum(len(x['eligible_observed_jobs_before_menu_bound'])>2 and x['selected']=='wait' for x in out['ranking_audit'])
(O/'input-quality.json').write_text(json.dumps(out,indent=2),encoding='utf-8');print(json.dumps({k:v for k,v in out.items() if k!='ranking_audit'},indent=2))

paired=[x for x in rs if x['status']=='selected' and x['baseline_context'] is not None]
for label,mems in [('jev_paired',[m for x in paired for m in x['supplied_evaluation']['state']['memories']]),('baseline_paired',[m for x in paired for m in x['baseline_context'].get('memories',[])])]:
 out[label]={'decisions':len(paired),'slots':len(mems),'generic_slots':sum('Something happened:' in m for m in mems),'structured_facts_boilerplate':sum('I used the current structured engine facts' in m for m in mems)}
out['slots_mentioning_typed_decision']=sum('typed_decision' in m for m in mem)
out['slots_mentioning_bounded_selection']=sum('bounded_selection' in m for m in mem)
out['slots_mentioning_ballot_cast']=sum('ballot_cast' in m for m in mem)
(O/'input-quality.json').write_text(json.dumps(out,indent=2),encoding='utf-8')
print(json.dumps({k:v for k,v in out.items() if k.startswith(('jev_paired','baseline_paired','slots_mentioning'))},indent=2))
