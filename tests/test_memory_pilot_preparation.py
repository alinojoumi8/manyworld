import importlib.util
from pathlib import Path
import json
from collections import Counter
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('pilot',ROOT/'analysis/run_memory_pilot.py')
pilot=importlib.util.module_from_spec(spec);spec.loader.exec_module(pilot)

def test_frozen_inputs_and_schedule():
 plan,schedule=pilot.verify_inputs()
 assert len(schedule)==72
 assert len({x['case_id'] for x in schedule})==12
 assert set(Counter((x['case_id'],x['arm']) for x in schedule).values())=={3}
 assert plan['max_retries']==0

def test_exact_intervention_and_strata():
 cases=pilot.read(pilot.P/'pilot-cases.json')
 assert Counter(c['stratum'] for c in cases)=={'joint_WAIT_high_burden':4,'disagreement':4,'active_control':2,'additional_high_burden':2}
 for c in cases:
  a=pilot.read(pilot.P/f"inputs/{c['case_id']}/A.json");b=pilot.read(pilot.P/f"inputs/{c['case_id']}/B.json")
  assert a['questions']==b['questions']
  assert a['state']['actor']==b['state']['actor']
  assert a['state']['goals']==b['state']['goals']
  assert c['removed_characters']>0

def test_blind_packets():
 import zipfile
 original=pilot.read(ROOT/'reports/out/jev-blinded-adjudication-20260921/coordinator/cases.json')
 orders=[]
 for slot in ('C','D'):
  with zipfile.ZipFile(pilot.P/f'reviewer-{slot}.zip') as z:
   assert set(z.namelist())=={'README.md','reviewer.json','rubric.json','cases.json','cases.html','judgments.csv','alternatives.csv','memories.csv'}
   cases=json.loads(z.read('cases.json'));orders.append([c['case_id'] for c in cases])
   assert {c['case_id']:c for c in cases}=={c['case_id']:c for c in original}
   meta=json.loads(z.read('reviewer.json'));assert meta['reviewer_slot']==slot
   assert not any(meta['attestations'].values())
   assert z.read('rubric.json')==(ROOT/'reports/out/jev-blinded-adjudication-20260921/reviewer-A/rubric.json').read_bytes()
 assert orders[0]!=orders[1]
