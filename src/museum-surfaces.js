import * as T from'three';

// Seeded, local surface maps. Color maps are sRGB; surface-data maps remain linear.
export function createSurfaces(){
 const size=typeof innerWidth!=='undefined'&&innerWidth>=900?1024:512,maps=[];
 let seed=731;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
 function map(draw,repeat=1,data=false){
  const c=document.createElement('canvas');c.width=c.height=size;const p=c.getContext('2d');p.scale(size/512,size/512);draw(p);
  const t=new T.CanvasTexture(c);t.wrapS=t.wrapT=T.RepeatWrapping;t.repeat.set(repeat,repeat);t.anisotropy=8;
  if(!data)t.colorSpace=T.SRGBColorSpace;maps.push(t);return t;
 }
 function grain(p,count,alpha){for(let i=0;i<count;i++){p.fillStyle=random()>.5?'rgba(255,255,255,'+alpha+')':'rgba(0,0,0,'+alpha+')';p.fillRect(random()*512,random()*512,1+random()*2,1+random()*2)}}
 const plaster=map(p=>{p.fillStyle='#dfded9';p.fillRect(0,0,512,512);for(let i=0;i<220;i++){const x=random()*512,y=random()*512,r=20+random()*60;const g=p.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,'#71695809');g.addColorStop(1,'#71695800');p.fillStyle=g;p.fillRect(x-r,y-r,r*2,r*2)}grain(p,16000,.035)},3);
 const plasterRough=map(p=>{p.fillStyle='#e2e2e2';p.fillRect(0,0,512,512);grain(p,8000,.025)},3,true);
 const marble=map(p=>{p.fillStyle='#bbc0c3';p.fillRect(0,0,512,512);for(let i=0;i<65;i++){const x=random()*700-100,y=random()*512;p.beginPath();p.moveTo(x,y);p.bezierCurveTo(x+80,y-40,x+210,y+60,x+380,y-100);p.strokeStyle=i%4?'#35445618':'#f2dfb631';p.lineWidth=.3+random()*2;p.stroke()}grain(p,6000,.025)});
 const oak=map(p=>{p.fillStyle='#8e8174';p.fillRect(0,0,512,512);for(let i=0;i<1800;i++){const y=random()*512;p.beginPath();p.moveTo(0,y);p.bezierCurveTo(170,y+random()*6,370,y-random()*6,512,y);p.strokeStyle=random()>.5?'#e4bb7a17':'#10090926';p.lineWidth=.3+random();p.stroke()}},2);
 const goldRough=map(p=>{p.fillStyle='#c7c7c7';p.fillRect(0,0,512,512);grain(p,18000,.055);for(let i=0;i<170;i++){p.strokeStyle='#3333330d';p.lineWidth=.3;p.beginPath();p.moveTo(random()*512,0);p.lineTo(random()*512,512);p.stroke()}},1,true);
 const weave=map(p=>{p.fillStyle='#808080';p.fillRect(0,0,512,512);for(let i=0;i<256;i++){p.fillStyle=i%2?'#929292':'#767676';p.fillRect(i*2,0,1,512);p.fillStyle='#92929244';p.fillRect(0,i*2,512,1)}},5,true);
 // Four 2m stone tiles across each repeat, with tile-local veins and narrow joints.
 const floorMap=map(p=>{for(let y=0;y<4;y++)for(let x=0;x<4;x++){
  p.save();p.beginPath();p.rect(x*128,y*128,128,128);p.clip();p.fillStyle=(x+y)%2?'#252e3b':'#48505a';p.fillRect(x*128,y*128,128,128);
  for(let i=0;i<32;i++){const yy=y*128+random()*140-6,xx=x*128;p.beginPath();p.moveTo(xx,yy);p.bezierCurveTo(xx+40,yy+random()*25,xx+75,yy-15,xx+130,yy+random()*20);p.lineWidth=i%6?.2+random()*.6:1.4;p.strokeStyle=i%6?'#e7dbc33a':'#0e182b28';p.stroke()}
  p.strokeStyle='#121924';p.lineWidth=.65;p.strokeRect(x*128,y*128,128,128);p.restore();
 }grain(p,10000,.025)});
 floorMap.repeat.set(4.5,3.5);
 const floorRough=map(p=>{for(let y=0;y<4;y++)for(let x=0;x<4;x++){const v=180+Math.floor(random()*30);p.fillStyle='rgb('+v+','+v+','+v+')';p.fillRect(x*128,y*128,128,128)}grain(p,10000,.035)},1,true);
 floorRough.repeat.copy(floorMap.repeat);
 const stone=new T.MeshStandardMaterial({color:'#76818e',map:marble,roughness:.44,bumpMap:marble,bumpScale:.002,metalness:0});
 const wood=new T.MeshStandardMaterial({color:'#554333',map:oak,bumpMap:oak,bumpScale:.006,roughness:.48,metalness:0});
 const wall=new T.MeshStandardMaterial({color:'#263c58',map:plaster,bumpMap:plaster,bumpScale:.008,roughness:1,roughnessMap:plasterRough});
 const gold=new T.MeshStandardMaterial({color:'#d2b579',metalness:1,roughness:.36,roughnessMap:goldRough,envMapIntensity:1.1});
 const velvet=new T.MeshPhysicalMaterial({color:'#441d30',roughness:.96,metalness:0,sheen:1,sheenColor:new T.Color('#9c5264'),sheenRoughness:.8,bumpMap:weave,bumpScale:.0015});
 const floor=new T.MeshPhysicalMaterial({map:floorMap,roughness:.4,roughnessMap:floorRough,metalness:0,clearcoat:.16,clearcoatRoughness:.25,envMapIntensity:.5});
 const dark=new T.MeshStandardMaterial({color:'#101a28',roughness:.78});
 return{stone,wood,wall,gold,velvet,floor,dark,maps};
}
