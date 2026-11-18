import test from'node:test';import assert from'node:assert/strict';
import{tryInitialLandscape}from'./initial-orientation.js';
test('mobile attempts landscape as soon as the page opens',async()=>{
 const calls=[];const result=await tryInitialLandscape({mobile:true,orientation:{async lock(mode){calls.push(mode)}},isLandscape:()=>false});
 assert.deepEqual(calls,['landscape']);assert.equal(result.status,'locked');
});
test('browser gesture requirement falls back without an unhandled error',async()=>{
 const result=await tryInitialLandscape({mobile:true,orientation:{async lock(){throw Error('gesture required')}},isLandscape:()=>false});assert.equal(result.status,'manual');
});
test('desktop is untouched and unsupported landscape phones stay usable',async()=>{
 const result=await tryInitialLandscape({mobile:false,orientation:{lock(){throw Error('must not run')}},isLandscape:()=>false});assert.equal(result.status,'skipped');
 assert.equal((await tryInitialLandscape({mobile:true,isLandscape:()=>true})).status,'landscape');
});
