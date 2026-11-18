import * as T from 'three';
// Keep decoration on gallery edges so the central walkways and fragment approaches stay clear.
export function decorateMuseum({scene,mesh,box,cyl,label,painting,material,gold,stone,wood}){
const red=material('#3e202b'),black=material('#10131e'),silver=material('#8b9bb0',.7),blue=material('#18396b'),ivory=material('#b6b4ba'),paper=material('#c2b69b');
// Crimson gallery runners and gilded wall panels.
for(const x of [-12,0,12]){box(3.2,.015,21,x,.025,0,red);for(const side of [-1,1])box(.035,.018,21,x+side*1.5,.035,0,gold)}
for(const x of [-17.72,17.72])for(const z of [-11,-3,5,11]){const curtain=box(.12,3.7,1.2,x,2.8,z,red);for(let i=0;i<5;i++)cyl(.035,.035,3.7,x+(x<0?.09:-.09),2.8,z-.5+i*.25,red);box(.2,.16,1.5,x,4.7,z,gold)}
for(const x of [-16,-8,8,16]){box(.6,4.7,.6,x,2.35,12.8,black,true);cyl(.34,.4,.18,x,4.75,12.8,gold);cyl(.4,.4,.16,x,.14,12.8,gold)}
// Bronze shields, crossed ceremonial blades and red backing boards.
for(const [x,z] of [[-17.5,-3],[-17.5,8],[17.5,3]]){const g=new T.Group();g.position.set(x,2.7,z);g.rotation.y=x<0?Math.PI/2:-Math.PI/2;scene.add(g);mesh(new T.BoxGeometry(1.6,2.3,.08),red,0,0,0,g);const shield=mesh(new T.SphereGeometry(.56,20,16),gold,0,0,.12,g);shield.scale.set(1,1.2,.17);mesh(new T.SphereGeometry(.11,12,12),silver,0,0,.25,g);for(const side of [-1,1]){const blade=mesh(new T.BoxGeometry(.045,1.8,.04),silver,side*.15,-.1,.08,g);blade.rotation.z=side*.65;const guard=mesh(new T.BoxGeometry(.28,.045,.06),gold,side*.55,-.65,.1,g);guard.rotation.z=side*.65}}
// Open book cabinet and porcelain collection.
for(const [x,z] of [[-8,-11],[8,11]]){box(2.3,2.3,.65,x,1.15,z,wood,true);for(const y of [.15,.85,1.6,2.3])box(2.4,.1,.8,x,y,z,black);for(let row=0;row<3;row++)for(let i=0;i<8;i++){const h=.35+(i%3)*.1;const b=box(.16,h,.35,x-.9+i*.25,.25+row*.73+h/2,z+.17,[red,blue,black,paper][i%4]);box(.11,.025,.02,x-.9+i*.25,.4+row*.73,z+.36,gold)}}
for(const [x,z] of [[-16,10],[16,10],[-8,-4],[8,-4]]){box(.9,.95,.9,x,.475,z,black,true);box(1.05,.08,1.05,x,1,z,gold);const p=[[.17,0],[.3,.15],[.27,.5],[.12,.65],[.15,.85]].map(([r,y])=>new T.Vector2(r,y));mesh(new T.LatheGeometry(p,24),blue,x,1.05,z);for(const y of [1.2,1.5,1.8]){const ring=mesh(new T.TorusGeometry(y===1.8?.14:.27,.015,8,24),gold,x,y,z);ring.rotation.x=Math.PI/2}label('IMPERIAL PORCELAIN',x,.65,z+.46,0,1)}
// A suit of ceremonial armor guards Antiquities.
box(1.2,.3,1.2,-16,.15,0,black,true);const armor=new T.Group();armor.position.set(-16,.3,0);scene.add(armor);const chest=mesh(new T.SphereGeometry(.4,20,16),silver,0,1.3,0,armor);chest.scale.set(1,1.2,.65);mesh(new T.SphereGeometry(.26,20,16),silver,0,1.99,0,armor);mesh(new T.BoxGeometry(.38,.06,.04),black,0,2.03,.24,armor);for(const s of [-1,1]){mesh(new T.CylinderGeometry(.09,.12,.8,12),silver,s*.19,.42,0,armor);mesh(new T.SphereGeometry(.2,12,12),silver,s*.4,1.6,0,armor);const arm=mesh(new T.CylinderGeometry(.09,.11,.7,12),silver,s*.48,1.2,0,armor);arm.rotation.z=s*.15}label('CEREMONIAL ARMOR',-16,.12,.7,0,1.7);
// Small glass cabinets: coins, crowns, antique navigation instruments.
for(const [i,x,z] of [[0,-8,7],[1,8,-9],[2,15,-1],[3,-15,-12]]){box(1.4,.85,.9,x,.425,z,black,true);box(1.5,.08,1,x,.9,z,gold);box(1.5,.65,1,x,1.25,z,new T.MeshPhysicalMaterial({color:'#849ed4',transparent:true,opacity:.12,depthWrite:false,roughness:.1}));if(i%2===0){for(let n=0;n<7;n++){const coin=mesh(new T.CylinderGeometry(.09,.09,.018,16),gold,x-.45+(n%4)*.28,.98,z-.2+Math.floor(n/4)*.3);coin.rotation.z=.1}}else{cyl(.25,.3,.18,x,1.03,z,gold);for(let n=0;n<6;n++)mesh(new T.ConeGeometry(.07,.24,8),gold,x+Math.cos(n*Math.PI/3)*.25,1.23,z+Math.sin(n*Math.PI/3)*.25)}label(i%2?'ROYAL TREASURY':'ANCIENT COIN COLLECTION',x,.55,z+.47,0,1.3)}
// Framed reproductions on the entrance walls, leaving the centre doorway clear.
painting('./art/mona.jpg',-12,3.1,13.6,1.8,2.7,Math.PI);
// Brass rope barriers beneath paintings.
for(const [x,z] of [[0,-11.7],[-12,-11.7],[12,-11.7]]){for(const s of [-1,1]){cyl(.04,.05,.85,x+s*2,.45,z,gold);mesh(new T.SphereGeometry(.09,12,12),gold,x+s*2,.9,z);cyl(.18,.2,.05,x+s*2,.04,z,gold)}const curve=new T.CatmullRomCurve3([new T.Vector3(x-2,.85,z),new T.Vector3(x,.65,z),new T.Vector3(x+2,.85,z)]);mesh(new T.TubeGeometry(curve,20,.035,8,false),red,0,0,0)}
// Blue moonlight and restrained crimson light pools; artifacts remain readable.
for(const x of [-17,17]){const light=new T.PointLight('#829abf',2,10,2);light.position.set(x,3,0);scene.add(light)}for(const x of [-12,0,12]){const light=new T.PointLight('#b65c6c',.8,8,2);light.position.set(x,1.5,12);scene.add(light)}
}
