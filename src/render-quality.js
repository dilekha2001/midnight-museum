import * as T from 'three';
import {mergeGeometries} from 'three/addons/utils/BufferGeometryUtils.js';
export function mergeStaticExhibits(scene,protectedObjects=[]){
const protectedSet=new Set(protectedObjects),groups=new Map();scene.updateMatrixWorld(true);
function protectedAncestor(o){while(o){if(protectedSet.has(o)||o.userData.dynamic)return true;o=o.parent}return false}
scene.traverse(o=>{if(!o.isMesh||o.isReflector||Array.isArray(o.material)||o.material.transparent||!o.geometry.index||protectedAncestor(o))return;const p=new T.Vector3();o.getWorldPosition(p);const room=p.x<-6?0:p.x>6?2:1;const key=[room,o.material.uuid,o.castShadow,o.receiveShadow,Object.keys(o.geometry.attributes).sort().join(',')].join('|');if(!groups.has(key))groups.set(key,[]);groups.get(key).push(o)});
let removed=0,created=0;for(const objects of groups.values()){if(objects.length<3)continue;const copies=objects.map(o=>o.geometry.clone().applyMatrix4(o.matrixWorld));const geometry=mergeGeometries(copies,false);copies.forEach(g=>g.dispose());if(!geometry)continue;geometry.computeBoundingSphere();const merged=new T.Mesh(geometry,objects[0].material);merged.name='Batched gallery exhibits';merged.castShadow=objects[0].castShadow;merged.receiveShadow=objects[0].receiveShadow;scene.add(merged);objects.forEach(o=>o.removeFromParent());removed+=objects.length;created++}return{removed,created};
}
export function qualityProfile(name='balanced'){const profiles={high:{pixelRatio:1.8,aoScale:.8,bloomScale:.65,steps:24,reflectionSize:1024,reflectionInterval:2},balanced:{pixelRatio:1.35,aoScale:.6,bloomScale:.5,steps:16,reflectionSize:768,reflectionInterval:3},low:{pixelRatio:.85,aoScale:.4,bloomScale:.35,steps:10,reflectionSize:256,reflectionInterval:5}};return profiles[name]||profiles.balanced}
