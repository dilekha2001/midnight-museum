import test from'node:test';import assert from'node:assert/strict';
import{visitor,isBlocked,moveVisitor,smoothVelocity}from'./visitor-motion.js';
test('swept movement cannot tunnel through a thin barrier on a long frame',()=>{
 const wall=[{x:0,z:0,w:.02,d:3}],p=moveVisitor({x:-2,z:0},{x:6,z:0},wall);
 assert.ok(p.x<-.24);assert.equal(p.z,0);
});
test('visitor slides along exhibit sides and stays within the museum',()=>{
 const p=moveVisitor({x:-1,z:-1},{x:2,z:3},[{x:0,z:0,w:.3,d:2}]);
 assert.ok(p.x<-.5);assert.ok(p.z>.5);
 const edge=moveVisitor({x:17,z:12.9},{x:10,z:10},[]);
 assert.ok(edge.x<=visitor.bounds.x&&edge.z<=visitor.bounds.z);
});
test('rounded visitor footprint clears corners without penetrating a plinth',()=>{
 const obstacles=[{x:0,z:0,w:.5,d:.5}];
 assert.equal(isBlocked(.65,.65,obstacles),true);
 assert.equal(isBlocked(.7,.7,obstacles),false);
});
test('acceleration is frame-rate independent and deceleration settles',()=>{
 let a={x:0,z:0},b={x:0,z:0};
 for(let i=0;i<60;i++)a=smoothVelocity(a,{x:2,z:0},1/60);
 for(let i=0;i<30;i++)b=smoothVelocity(b,{x:2,z:0},1/30);
 assert.ok(Math.abs(a.x-b.x)<1e-9);
 for(let i=0;i<60;i++)a=smoothVelocity(a,{x:0,z:0},1/60);
 assert.ok(a.x<.001);assert.equal(visitor.eyeHeight,1.68);
});
