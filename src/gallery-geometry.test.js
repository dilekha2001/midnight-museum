import test from'node:test';import assert from'node:assert/strict';
import{createGildedFrame}from'./gallery-geometry.js';
import{createVaultGeometry}from'./palatial-gallery.js';
test('vaults clear human eye level and meet the existing roof',()=>{
 for(const skylight of[false,true]){const g=createVaultGeometry(skylight);g.computeBoundingBox();assert.ok(g.boundingBox.min.y>4.5);assert.ok(g.boundingBox.max.y<5.8);assert.ok(Math.abs(g.boundingBox.max.x-5.6)<.001);assert.ok([...g.attributes.normal.array].every(Number.isFinite));g.dispose()}
 const closed=createVaultGeometry(),open=createVaultGeometry(true);assert.ok(open.index.count<closed.index.count);closed.dispose();open.dispose();
});
test('gilded frames have physical thickness and an open center',()=>{
 const g=createGildedFrame(2,3);g.computeBoundingBox();assert.ok(g.boundingBox.max.z-g.boundingBox.min.z>.12);assert.ok(g.boundingBox.max.x>1.18);assert.ok(g.boundingBox.max.y>1.68);
 const p=g.attributes.position;for(let i=0;i<p.count;i+=3){const x=(p.getX(i)+p.getX(i+1)+p.getX(i+2))/3,y=(p.getY(i)+p.getY(i+1)+p.getY(i+2))/3;assert.ok(Math.abs(x)>.94||Math.abs(y)>1.44,'Frame must not cover the canvas')}
 g.dispose();
});
