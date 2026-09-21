"""Run analysis with all Python socket networking denied, including loopback."""
import json,runpy,socket
from pathlib import Path
attempts=[]
def deny(*args,**kwargs):
 attempts.append('network_attempt')
 raise RuntimeError('Analysis networking is disabled')
socket.socket.connect=deny
socket.socket.connect_ex=deny
socket.create_connection=deny
socket.getaddrinfo=deny
# Prove deny boundary without contacting a host; this self-test is not analysis traffic.
try:socket.create_connection(('example.invalid',443))
except RuntimeError:pass
assert len(attempts)==1
attempts.clear()
for script in ['jev_wait_analysis.py','jev_wait_quality.py']:
 runpy.run_path(str(Path(__file__).with_name(script)),run_name='__main__')
assert not attempts
Path('reports/out/jev-wait-analysis/network.json').write_text(json.dumps({'analysis_network_attempts':len(attempts),'guard_self_test':'passed; blocked before DNS/socket connect','scope':'Python socket connect/connect_ex/create_connection/getaddrinfo; both extraction scripts in-process','live_model_calls':0,'live_world_steps':0},indent=2))
