import * as T from'three';

export function createGildedFrame(width,height){
 const border=.18,shape=new T.Shape(),hole=new T.Path();
 shape.moveTo(-width/2-border,-height/2-border);shape.lineTo(width/2+border,-height/2-border);shape.lineTo(width/2+border,height/2+border);shape.lineTo(-width/2-border,height/2+border);shape.closePath();
 hole.moveTo(-width/2,-height/2);hole.lineTo(-width/2,height/2);hole.lineTo(width/2,height/2);hole.lineTo(width/2,-height/2);hole.closePath();shape.holes.push(hole);
 const geometry=new T.ExtrudeGeometry(shape,{depth:.12,bevelEnabled:true,bevelSegments:3,steps:1,bevelSize:.025,bevelThickness:.025,curveSegments:8});
 geometry.translate(0,0,-.06);return geometry;
}
