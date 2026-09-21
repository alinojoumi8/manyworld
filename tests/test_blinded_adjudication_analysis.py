"""Synthetic workflow tests only; these are not reviews of the real 88 cases."""
import copy
import csv
import json
import shutil
from pathlib import Path
import pytest
from analysis import blinded_adjudication as b

@pytest.fixture
def package(tmp_path):
 records=[]
 for i in range(88):
  ev={'state':{'actor':{'id':i+1,'role':'synthetic'},'tick':1,'goals':[],'memories':['Synthetic historical statement.']},'questions':{'action':{'type':'choice','instructions':'Synthetic fixture','criteria':{'c_one':{'actions':[{'type':'apply_job','job_id':1}],'facts':{'wage_cents':10}},'wait':{'actions':[]},'escalate':{'actions':[]}}}}}
  records.append({'status':'selected','receipt':{'selected_candidate':'wait' if i<81 else 'c_one'},'supplied_evaluation':ev,'event_id':i+1,'selected_actions':[] if i<81 else [{'type':'apply_job','job_id':1}],'wait_classification':'C' if i<33 else 'G'})
 source=tmp_path/'synthetic.json';b.write(source,records);root=tmp_path/'pack';b.build(source,root,123)
 return root,source

def completed(root,label,tmp_path,primary='WAIT'):
 dest=tmp_path/('submission-'+label);shutil.copytree(root/f'reviewer-{label}',dest)
 m=b.read(dest/'reviewer.json');m['reviewer_identity']='SYNTHETIC TEST PERSON '+label;m['attestations']={k:True for k in m['attestations']};b.write(dest/'reviewer.json',m)
 js=b.csv_read(dest/'judgments.csv')
 for r in js:r.update(primary=primary,confidence='medium',preferred_active_candidate_ids='c_one' if primary=='ACT' else '',missing_information='explicit actor goals',goal_impact='cannot determine',rationale='Synthetic fixture rationale only.')
 b.csv_write(dest/'judgments.csv',list(js[0]),js)
 alts=b.csv_read(dest/'alternatives.csv')
 for r in alts:r.update(suitability='plausibly suitable',role_compatibility_information='Synthetic unknown',rationale='Synthetic fixture.')
 b.csv_write(dest/'alternatives.csv',list(alts[0]),alts)
 mems=b.csv_read(dest/'memories.csv')
 for r in mems:r.update(useful='unknown',stale='unknown',irrelevant='unknown',rationale='Synthetic fixture.')
 b.csv_write(dest/'memories.csv',list(mems[0]),mems)
 return dest

def test_packet_excludes_choices_and_preserves_input(package,tmp_path):
 root,source=package;cases=b.read(root/'reviewer-A/cases.json');key=b.read(root/'coordinator/unblinding-key.json');records=b.read(source)
 assert len(cases)==88
 assert all(set(c)=={'case_id','evaluation'} for c in cases)
 for c in cases:assert c['evaluation']==records[key[c['case_id']]['event_id']-1]['supplied_evaluation']
 import zipfile
 with zipfile.ZipFile(root/'reviewer-A.zip') as z:assert not any('coordinator' in n or 'key' in n for n in z.namelist())
 assert [c['case_id'] for c in cases]!=[c['case_id'] for c in b.read(root/'reviewer-B/cases.json')]
 second=tmp_path/'second';b.build(source,second,123)
 assert b.read(second/'reviewer-A/cases.json')==cases

def test_blank_review_rejected(package):
 root,_=package
 with pytest.raises(ValueError,match='identified human'):b.freeze(root,root/'reviewer-A','A')

def test_unblind_requires_both_reviews(package,tmp_path):
 root,_=package
 with pytest.raises(ValueError,match='Both independent'):b.unblind(root)
 b.freeze(root,completed(root,'A',tmp_path),'A')
 with pytest.raises(ValueError,match='Both independent'):b.unblind(root)

def test_freeze_immutable_and_tamper_rejected(package,tmp_path):
 root,_=package;d=completed(root,'A',tmp_path);b.freeze(root,d,'A')
 with pytest.raises(ValueError,match='already frozen'):b.freeze(root,d,'A')
 p=root/'coordinator/frozen/A/review.json';p.write_text(p.read_text()+' ')
 with pytest.raises(ValueError,match='Frozen review changed'):b.both(root)

def test_same_person_rejected(package,tmp_path):
 root,_=package;a=completed(root,'A',tmp_path);b.freeze(root,a,'A');d=completed(root,'B',tmp_path);m=b.read(d/'reviewer.json');m['reviewer_identity']=b.read(a/'reviewer.json')['reviewer_identity'];b.write(d/'reviewer.json',m)
 with pytest.raises(ValueError,match='different people'):b.freeze(root,d,'B')

def test_incomplete_or_duplicate_cases_rejected(package,tmp_path):
 root,_=package;d=completed(root,'A',tmp_path);rows=b.csv_read(d/'judgments.csv');rows[1]=copy.deepcopy(rows[0]);b.csv_write(d/'judgments.csv',list(rows[0]),rows)
 with pytest.raises(ValueError,match='Incomplete/duplicate'):b.validate(root,d,'A')

def test_act_requires_named_suitable_candidate(package,tmp_path):
 root,_=package;d=completed(root,'A',tmp_path,'ACT');rows=b.csv_read(d/'judgments.csv');rows[0]['preferred_active_candidate_ids']='';b.csv_write(d/'judgments.csv',list(rows[0]),rows)
 with pytest.raises(ValueError,match='ACT requires'):b.validate(root,d,'A')

def test_complete_disagreement_kept_unresolved(package,tmp_path):
 root,_=package
 for label,judgment in [('A','ACT'),('B','WAIT')]:b.freeze(root,completed(root,label,tmp_path,judgment),label)
 stats=b.compare(root);assert stats['exact_agreement']==0;assert stats['cohens_kappa']==0
 result=b.read(b.unblind(root));assert result['unresolved']==88;assert result['agreed_counts']=={}
 assert len(b.csv_read(root/'coordinator/results/blinded-adjudication-queue.csv'))==88

def test_agreement_kappa_and_weighting():
 def row(cid,label,conf):return {'case_id':cid,'primary':label,'confidence':conf}
 a=[row('1','ACT','high'),row('2','WAIT','medium'),row('3','WAIT','low')]
 c=[row('1','ACT','high'),row('2','ACT','low'),row('3','WAIT','high')]
 m=b.agreement(a,c);assert m['exact_agreement']==pytest.approx(2/3);assert m['cohens_kappa']==pytest.approx(.4);assert m['confidence_weighted_agreement']==pytest.approx(.8)
 constant=[row('1','WAIT','high')];assert b.agreement(constant,constant)['cohens_kappa'] is None

def test_source_and_rubric_tamper_rejected(package):
 root,_=package;(root/'coordinator/rubric.json').write_text('{}')
 with pytest.raises(ValueError,match='Frozen package changed'):b.verify_package(root)

def test_memory_flags_do_not_invent_quality():
 rows=b.memory_flags(['Something happened: typed_decision.','Something happened: typed_decision.','I was paid 100c.'])
 assert rows[1]['exact_duplicate_within_case'];assert rows[0]['contains_audit_marker'];assert not rows[2]['contains_generic'];assert all(x['useful']=='unrated' and x['stale']=='unrated' for x in rows)
