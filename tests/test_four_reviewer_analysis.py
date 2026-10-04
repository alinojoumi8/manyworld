import sys,copy,json
from pathlib import Path
import pytest
sys.path.insert(0,str(Path(__file__).resolve().parents[1]/'analysis'))
import four_reviewer_analysis as f

def reviews(labels):
 return {s:{'judgments':[{'case_id':str(i),'primary':p,'confidence':'high'} for i,p in enumerate(labels[s])]} for s in 'ABCD'}

def test_patterns_and_fleiss():
 r=reviews({'A':['WAIT','WAIT','WAIT','WAIT'],'B':['WAIT','WAIT','WAIT','WAIT'],'C':['WAIT','WAIT','ACT','ACT'],'D':['WAIT','ACT','ACT','INSUFFICIENT_INFORMATION']})
 x=f.four_stats(r)
 assert x['patterns']=={'unanimous':1,'3_of_4':1,'2_2':1,'no_majority_2_1_1':1}
 assert x['majorities']=={'WAIT':2,'none':2}
 assert x['observed_pair_agreement']==pytest.approx(.5)
 assert x['fleiss_kappa']==pytest.approx((.5-(121+16+1)/256)/(1-(121+16+1)/256))
 assert len(x['pairwise'])==6

def test_degenerate_kappa_and_missing_review():
 x=f.four_stats(reviews({s:['WAIT'] for s in 'ABCD'}));assert x['fleiss_kappa'] is None
 with pytest.raises(ValueError):f.four_stats({})

def test_real_cd_and_invalid_category(tmp_path):
 m,c=f.b.verify_package(f.OLD)
 for s in 'CD':assert len(f.validate_cd(f.SOURCES[s],s,m,c)['judgments'])==88
 import shutil
 for n in f.NAMES:shutil.copyfile(f.SOURCES['D']/n,tmp_path/n)
 rows=f.b.csv_read(tmp_path/'judgments.csv');rows[0]['missing_information']='invented category';f.b.csv_write(tmp_path/'judgments.csv',list(rows[0]),rows)
 with pytest.raises(ValueError,match='Unknown missing'):f.validate_cd(tmp_path,'D',m,c)

def test_metadata_and_missing_rows(tmp_path):
 import shutil
 m,c=f.b.verify_package(f.OLD)
 for n in f.NAMES:shutil.copyfile(f.SOURCES['C']/n,tmp_path/n)
 meta=f.b.read(tmp_path/'reviewer.json');meta['reviewer_slot']='A';f.b.write(tmp_path/'reviewer.json',meta)
 with pytest.raises(ValueError,match='Metadata'):f.validate_cd(tmp_path,'C',m,c)
 meta['reviewer_slot']='C';f.b.write(tmp_path/'reviewer.json',meta)
 rows=f.b.csv_read(tmp_path/'memories.csv');f.b.csv_write(tmp_path/'memories.csv',list(rows[0]),rows[:-1])
 with pytest.raises(ValueError,match='row IDs'):f.validate_cd(tmp_path,'C',m,c)
