import { test } from 'node:test';
import assert from 'node:assert/strict';
import { packCityTargets } from '../src/lib/cityMapTargets.js';

test('co-located targets remain separate and inside a narrow viewport', () => {
  const targets = Array.from({length:103},(_,i)=>({x:10,y:15,width:i<3?92:36,height:36}));
  const source = structuredClone(targets);
  const offsets = packCityTargets(targets,340,620);
  const rectangles = targets.map((t,i)=>({...t,x:t.x+offsets[i].dx,y:t.y+offsets[i].dy}));
  rectangles.forEach((r,i)=>{
    assert.ok(r.x-r.width/2>=0&&r.x+r.width/2<=340);
    assert.ok(r.y-r.height/2>=0&&r.y+r.height/2<=620);
    rectangles.slice(0,i).forEach(p=>assert.ok(Math.abs(p.x-r.x)>=(p.width+r.width)/2+4 || Math.abs(p.y-r.y)>=(p.height+r.height)/2+4));
  });
  assert.deepEqual(targets,source);
  assert.deepEqual(packCityTargets(targets,340,620),offsets);
});
