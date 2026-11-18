import * as T from 'three';
import {RoomEnvironment} from 'three/addons/environments/RoomEnvironment.js';
export {createSurfaces} from './museum-surfaces';
export function addRealism({scene,renderer,mesh,box,cyl,label,material,stone,wood,gold,velvet:upholstery}){
const pmrem=new T.PMREMGenerator(renderer);const room=new RoomEnvironment();let environment=pmrem.fromScene(room,.08);scene.environment=environment.texture;scene.environmentIntensity=.45;room.dispose();
const probeTarget=new T.WebGLCubeRenderTarget(128,{type:T.HalfFloatType});const probe=new T.CubeCamera(.1,65,probeTarget);probe.position.set(0,2.4,1);

const ivory=material('#14283e'),navy=material('#0c1d32'),ceiling=material('#52677e'),iron=material('#171b23'),velvet=upholstery||material('#49232e');
// Human-scale dado panels, deep skirting and a coffered plaster ceiling.
for(const x of [-17.65,17.65]){const interior=Math.abs(x)<7;for(const [length,center]of(interior?[[13.2,-7.2],[5.1,11.2]]:[[27.2,0]])){box(.1,1.15,length,x,.575,center,ivory);box(.15,.1,length,x,1.19,center,stone);box(.17,.17,length,x,.09,center,iron)}for(let z=-12;z<=12;z+=2.4){if(interior&&z>-1.5&&z<9.5)continue;box(.07,.72,1.8,x+(x<0?.07:-.07),.6,z,navy)}}
for(const z of [-13.65,13.65]){box(35.2,1.15,.1,0,.575,z,ivory);box(35.2,.1,.17,0,1.2,z,stone);box(35.2,.17,.17,0,.09,z,iron);for(let x=-16;x<=16;x+=2.4)box(1.8,.72,.07,x,.6,z+(z<0?.07:-.07),navy)}
// Architectural arch surrounds emphasize the passages between galleries.
// Wall-mounted exhibition lighting: warm, focused beams and actual soft shadows.
for(const x of [-12,0,12]){const track=box(5.8,.08,.09,x,5.1,-10.2,iron);for(const offset of [-1.5,1.5]){const fixture=cyl(.08,.09,.22,x+offset,4.98,-10.2,iron);fixture.rotation.x=Math.PI/4;const spot=new T.SpotLight('#ffe4bd',42,14,.48,.85,2);spot.position.set(x+offset,4.82,-10.15);spot.target.position.set(x+offset*.45,2.7,-13.5);scene.add(spot,spot.target);if(offset<0){spot.castShadow=true;spot.shadow.mapSize.set(1024,1024);spot.shadow.bias=-.0005;spot.shadow.normalBias=.035;spot.shadow.camera.near=.5;spot.shadow.camera.far=14}scene.add(spot)}}
// Detailed exhibit cases have slim structural frames, linen bases and information cards.
for(const[x,z]of[[-14,4],[15,4],[-12,10],[-8,7],[8,-9],[15,-1],[-15,-12]]){const wide=x===-14||x===15&&z===4||x===-12?1.35:1.5,depth=wide===1.35?1.35:1;const top=wide===1.35?1.88:1.575;for(const s of [-1,1])for(const d of [-1,1])box(.025,top-.96,.025,x+s*wide/2,(top+.96)/2,z+d*depth/2,iron);box(wide+.04,.035,depth+.04,x,top,z,iron);box(.22,.015,.12,x+.35,1.01,z+.23,stone);label('COLLECTION  /  '+String(Math.abs(x*11+z)).padStart(3,'0'),x,.58,z+depth/2+.02,0,1)}
// More convincing upholstery, subtle feet and carved plinths.
for(const x of[-2,2]){box(2.2,.12,.84,x,.51,4,velvet);for(const side of[-1,1]){box(.12,.18,.9,x+side*1.14,.53,4,wood);for(const z of[3.68,4.32])cyl(.035,.045,.52,x+side*.95,.26,z,iron)}}
for(const[x,z]of[[-15,-9],[-10,-5],[-3,-7],[11,8]]){box(1.24,.06,1.24,x,.16,z,stone);box(1.24,.04,1.24,x,.95,z,stone)}
// Museum wayfinding, air vents, security cameras and illuminated exit signs.
for(const x of[-12,12]){box(1.1,.25,.025,x,3.2,13.48,iron);label('GALLERY '+(x<0?'I  /  ANTIQUITIES':'III  /  PORTRAITS'),x,3.2,13.44,Math.PI,1);for(let i=0;i<9;i++)box(.7,.018,.03,x,4.7+i*.04,13.5,iron)}
box(.7,.24,.04,0,3.85,13.5,new T.MeshBasicMaterial({color:'#2e715e'}));label('EXIT',0,3.85,13.45,Math.PI,.45);for(const x of[-16.5,16.5]){const camera=box(.15,.14,.35,x,5,11.8,ivory);camera.rotation.x=.35;mesh(new T.SphereGeometry(.045,12,12),iron,x,4.94,11.6)}
// Ambient contact shadows anchor display bases even on lower-end devices.
const c=document.createElement('canvas');c.width=c.height=128;const p=c.getContext('2d'),gradient=p.createRadialGradient(64,64,5,64,64,62);gradient.addColorStop(0,'rgba(0,0,0,.45)');gradient.addColorStop(1,'rgba(0,0,0,0)');p.fillStyle=gradient;p.fillRect(0,0,128,128);const texture=new T.CanvasTexture(c);for(const[x,z]of[[-15,-9],[-10,-5],[-3,-7],[11,8],[-14,4],[15,4],[-12,10],[-8,7],[8,-9],[15,-1],[-15,-12],[-16,0]]){const o=mesh(new T.PlaneGeometry(2.2,2.2),new T.MeshBasicMaterial({map:texture,transparent:true,depthWrite:false,polygonOffset:true,polygonOffsetFactor:-1}),x,.018,z);o.rotation.x=-Math.PI/2;o.userData.nonBlocking=true}
const release=()=>{environment.dispose();probeTarget.dispose();pmrem.dispose()};
release.refreshEnvironment=()=>{
 const hidden=[];scene.traverse(o=>{if(o.isReflector||o.isPoints){hidden.push([o,o.visible]);o.visible=false}});
 const target=renderer.getRenderTarget();
 try{probe.update(renderer,scene);const next=pmrem.fromCubemap(probeTarget.texture);scene.environment=next.texture;environment.dispose();environment=next}
 finally{renderer.setRenderTarget(target);hidden.forEach(([o,v])=>o.visible=v)}
};return release;
}
