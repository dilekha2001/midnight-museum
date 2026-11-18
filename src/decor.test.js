import test from 'node:test';
import assert from 'node:assert/strict';
import * as T from 'three';
import {decorateMuseum}from'./decor.js';
import {addMysteryDetails}from'./mystery.js';
import {addPalatialGallery,addOpenColonnades}from'./palatial-gallery.js';
function setup(){const scene=new T.Scene(),blocks=[];const material=color=>new T.MeshStandardMaterial({color});const gold=material('#ab925c'),stone=material('#aaaabb'),wood=material('#332233');function mesh(geo,mat,x,y,z,parent=scene){const o=new T.Mesh(geo,mat);o.position.set(x,y,z);parent.add(o);return o}function box(w,h,d,x,y,z,mat,solid=false){if(solid)blocks.push({x,z,w:w/2+.28,d:d/2+.28});return mesh(new T.BoxGeometry(w,h,d),mat,x,y,z)}function cyl(a,b,h,x,y,z,mat){return mesh(new T.CylinderGeometry(a,b,h,12),mat,x,y,z)}decorateMuseum({scene,mesh,box,cyl,label(){},painting(){},material,gold,stone,wood});addMysteryDetails({scene,mesh,box,cyl,label(){},material,gold,stone,wood});addPalatialGallery({scene,mesh,box,cyl,material,gold,stone});addOpenColonnades({box,cyl,stone,gold});return{scene,blocks}}
test('museum decoration builds populated galleries with valid geometry',()=>{const{scene}=setup();let count=0;scene.traverse(o=>{assert.ok([o.position.x,o.position.y,o.position.z].every(Number.isFinite));if(o.isMesh){count++;assert.ok([...o.geometry.attributes.position.array].every(Number.isFinite))}});assert.ok(count>200,`Expected a densely furnished museum, got ${count} meshes`)});
test('new exhibits leave both gallery doorways and all fragment locations open',()=>{const{blocks}=setup();const clear=(x,z)=>!blocks.some(b=>Math.abs(x-b.x)<b.w&&Math.abs(z-b.z)<b.d);for(const x of [-6,6])for(const z of [2,4,6])assert.ok(clear(x,z),'Gallery doorway blocked');for(const[x,z]of[[-15,-7.8],[0,7],[15,-9],[-10,9],[-3,-5.6],[11,9.2]])assert.ok(clear(x,z),`Fragment blocked at ${x}, ${z}`)});

test('open museum has a continuous cross-hall walking aisle between all wings',()=>{const{blocks}=setup();for(let x=-15;x<=15;x+=.1)assert.ok(!blocks.some(b=>Math.abs(x-b.x)<b.w&&Math.abs(2-b.z)<b.d),'Aisle blocked at '+x)});
