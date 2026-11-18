import test from'node:test';
import assert from'node:assert/strict';
import{floorRoutes,walkingPath,floorDistance}from'./museum-walk.js';
test('every piece and doorway is reachable along authored floor routes',()=>{
 for(const[room,route]of Object.entries(floorRoutes))for(const target of[route.door,...Object.values(route.approaches)]){
  const path=walkingPath(room,route.nodes[0],target);assert.ok(path.length>1);assert.ok(floorDistance(path.at(-1),target)<.001);
  for(const point of path)assert.ok(point.every(Number.isFinite)&&point[1]>=60&&point[1]<=94);
 }
});
test('walking projects exhibit taps onto floor and supports interrupted walks',()=>{
 for(const room of Object.keys(floorRoutes)){
  const first=walkingPath(room,floorRoutes[room].nodes[0],[0,0]);
  const reroute=walkingPath(room,first[1],[100,100]);
  assert.ok(reroute.length>0);assert.ok(reroute.every(p=>p[0]>=0&&p[0]<=100&&p[1]>=60&&p[1]<=94));
 }
});
test('same-position requests terminate without a loop',()=>{
 for(const[room,route]of Object.entries(floorRoutes)){const path=walkingPath(room,route.nodes[0],route.nodes[0]);assert.equal(path.length,1)}
});
