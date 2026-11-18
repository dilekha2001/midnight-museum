import test from 'node:test';
import assert from 'node:assert/strict';
import {emptyProgress,normalizeProgress,collectFragment,placeFragment,isComplete} from './game-state.js';
test('invalid or duplicate saved pieces cannot create a false win',()=>{const p=normalizeProgress({found:[0,0,1,9,'2'],placed:[0,1,2,3,4,5]});assert.deepEqual(p,{found:[0,1],placed:[0,1]});assert.equal(isComplete(p),false)});
test('collecting the same fragment twice does not inflate the inventory',()=>{let p=collectFragment(emptyProgress(),2);p=collectFragment(p,2);assert.deepEqual(p.found,[2]);assert.deepEqual(collectFragment(p,-1),p)});
test('uncollected pieces and incorrect puzzle positions are rejected',()=>{const p=collectFragment(emptyProgress(),1);assert.equal(placeFragment(p,2,2),p);assert.equal(placeFragment(p,1,4),p);assert.equal(isComplete(p),false)});
test('all six unique collected pieces in correct positions win and survive a save round trip',()=>{let p=emptyProgress();for(const id of [4,0,2,5,1,3])p=collectFragment(p,id);for(let id=0;id<6;id++){assert.equal(isComplete(p),false);p=placeFragment(p,id,id)}assert.equal(isComplete(p),true);assert.deepEqual(placeFragment(p,0,0),p);assert.deepEqual(normalizeProgress(JSON.parse(JSON.stringify(p))),p)});
