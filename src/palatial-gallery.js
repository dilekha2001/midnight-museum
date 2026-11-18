import * as T from 'three';

export function addOpenColonnades({box,cyl,stone,gold}){
 for(const x of[-6,6])for(const z of[-11,5,11]){
  cyl(.29,.34,4.12,x,2.45,z,stone);
  for(let i=0;i<16;i++){const a=i*Math.PI/8;cyl(.018,.018,3.7,x+Math.cos(a)*.3,2.48,z+Math.sin(a)*.3,stone)}
  box(.86,.18,.86,x,.09,z,stone,true);
  for(const [y,r,h,mat]of[[.25,.39,.14,stone],[.38,.35,.1,gold],[4.51,.37,.1,gold],[4.63,.43,.14,gold]])cyl(r,r,h,x,y,z,mat);
  box(.92,.12,.92,x,4.76,z,stone);
 }
}

export function createVaultGeometry(skylight=false){
 const positions=[],uv=[],indices=[],nx=64,nz=40;
 for(let j=0;j<=nz;j++)for(let i=0;i<=nx;i++){
  const a=i/nx*Math.PI;positions.push(Math.cos(a)*5.6,4.65+Math.sin(a)*.88,-13.4+j/nz*26.8);uv.push(i/nx*3,j/nz*8);
 }
 for(let j=0;j<nz;j++)for(let i=0;i<nx;i++){
  const x=Math.cos((i+.5)/nx*Math.PI)*5.6,z=-13.4+(j+.5)/nz*26.8;
  if(skylight&&Math.abs(x)<2.2&&z>-4.7&&z<2.8)continue;
  const a=j*(nx+1)+i,b=a+nx+1;indices.push(a,b,a+1,b,b+1,a+1);
 }
 const geo=new T.BufferGeometry();geo.setAttribute('position',new T.Float32BufferAttribute(positions,3));geo.setAttribute('uv',new T.Float32BufferAttribute(uv,2));geo.setIndex(indices);geo.computeVertexNormals();return geo;
}

// Repeated architectural details are merged with the other static exhibits.
export function addPalatialGallery({scene,mesh,box,cyl,material,gold,stone,velvet:upholstery}){
 const blue=material('#21324a'),recess=material('#0b1a2e'),velvet=upholstery||material('#381025');
 const bead=new T.SphereGeometry(.045,8,6),leaf=new T.SphereGeometry(1,8,6);
 function flourish(parent,x,y,z,size=.16){
  for(const side of[-1,1]){
   const scroll=mesh(new T.TorusGeometry(size,.025,6,16,Math.PI*1.65),gold,x+side*size*.65,y,z,parent);
   scroll.rotation.z=side*.4;
   const petal=mesh(leaf,gold,x+side*size*.8,y+size,z,parent);petal.scale.set(size*.35,size*.85,.035);petal.rotation.z=-side*.5;
  }
 }
 // Deep blue wall panels edged in thin gilt, never across connecting doors.
 for(const z of[-13.38,13.38])for(let x=-16.2;x<17;x+=2.7){
  box(2.42,.84,.035,x,.64,z,recess);
  for(const y of[.21,1.07])box(2.46,.025,.045,x,y,z+(z<0?.025:-.025),gold);
  for(const dx of[-1.22,1.22])box(.025,.87,.045,x+dx,.64,z,gold);
 }
 // Monumental fluted pilasters, layered bases and gold acanthus capitals.
 for(const x of[-17.38,17.38])for(const z of[-11,-5,5,11]){
  const side=x<0?1:-1;
  box(.42,4.5,.67,x,2.7,z,blue);
  for(let i=0;i<7;i++)cyl(.028,.028,3.55,x+side*.24,2.65,z-.26+i*.087,stone);
  for(const[y,w,h,d]of[[.12,.78,.2,.94],[.31,.65,.12,.82],[.43,.58,.08,.76],[4.53,.65,.13,.85],[4.75,.79,.17,.99],[4.93,.88,.11,1.08]]){
   box(w,h,d,x,y,z,y>4.5?gold:stone);
  }
  const detail=new T.Group();detail.position.set(x+side*.42,4.61,z);detail.rotation.y=side*Math.PI/2;scene.add(detail);
  for(const a of[-.23,0,.23])flourish(detail,a,0,0,.09);
 }
 // Shallow barrel vaults spring from column capitals, not from the floor.
 const vaultMaterial=new T.MeshStandardMaterial({color:'#1c2c42',roughness:.86,side:T.DoubleSide});
 for(const x of[-12,0,12]){
  const vault=mesh(createVaultGeometry(x===0),vaultMaterial,x,0,0);vault.name='Supported barrel vault';
  for(const z of[-11,5,11]){
   for(const[offset,width,mat]of[[0,.09,stone],[.16,.022,gold],[-.16,.022,gold]]){
    const points=[];for(let i=0;i<=64;i++){const a=i/64*Math.PI;points.push(new T.Vector3(Math.cos(a)*5.6,4.65+Math.sin(a)*.88,offset))}
    mesh(new T.TubeGeometry(new T.CatmullRomCurve3(points),64,width,8,false),mat,x,0,z);
   }
   for(let i=1;i<24;i++){const a=i*Math.PI/24;mesh(bead,gold,x+Math.cos(a)*5.6,4.63+Math.sin(a)*.88,z+.12)}
  }
 }
 // Gilded velvet benches along the outer walls, outside all fragment approaches.
 for(const side of[-1,1])for(const z of[-2,8]){
  const x=side*16.6;
  box(.8,.16,2.35,x,.32,z,gold,true);box(.76,.12,2.26,x,.46,z,velvet);
  for(const dz of[-.84,-.56,-.28,0,.28,.56,.84])mesh(new T.SphereGeometry(.025,8,6),velvet,x,.518,z+dz);
  for(const dx of[-.28,.28])for(const dz of[-.92,.92])cyl(.035,.065,.35,x+dx,.175,z+dz,gold);
 }
}
