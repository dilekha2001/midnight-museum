export const visitor={eyeHeight:1.68,radius:.24,speed:2.65,bounds:{x:17.25,z:13.1}};
export function isBlocked(x,z,obstacles,bounds=visitor.bounds,radius=visitor.radius){
 if(Math.abs(x)>bounds.x||Math.abs(z)>bounds.z)return true;
 return obstacles.some(o=>{
  const dx=Math.max(Math.abs(x-o.x)-o.w,0),dz=Math.max(Math.abs(z-o.z)-o.d,0);
  return dx*dx+dz*dz<radius*radius;
 });
}
export function moveVisitor(position,delta,obstacles,bounds=visitor.bounds){
 let {x,z}=position;const steps=Math.max(1,Math.ceil(Math.hypot(delta.x,delta.z)/.08)),dx=delta.x/steps,dz=delta.z/steps;
 for(let i=0;i<steps;i++){
  if(!isBlocked(x+dx,z,obstacles,bounds))x+=dx;
  if(!isBlocked(x,z+dz,obstacles,bounds))z+=dz;
 }
 return{x,z};
}
export function smoothVelocity(velocity,target,dt){
 const blend=1-Math.exp(-Math.min(Math.max(dt,0),.1)*(Math.hypot(target.x,target.z)>.001?10:15));
 return{x:velocity.x+(target.x-velocity.x)*blend,z:velocity.z+(target.z-velocity.z)*blend};
}
