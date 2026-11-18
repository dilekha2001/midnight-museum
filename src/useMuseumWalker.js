import{useState,useRef,useEffect}from'react';
import{floorRoutes,floorDistance,walkingPath}from'./museum-walk';
export default function useMuseumWalker(room,active){
 const[position,setPosition]=useState(floorRoutes[room].nodes[0]),[walking,setWalking]=useState(false),[facing,setFacing]=useState(1),[destination,setDestination]=useState(null);
 const current=useRef(position),frame=useRef(),token=useRef(0);
 function cancel(){token.current++;cancelAnimationFrame(frame.current);setWalking(false);setDestination(null)}
 useEffect(()=>{cancel();current.current=floorRoutes[room].nodes[0];setPosition(current.current);return()=>{token.current++;cancelAnimationFrame(frame.current)}},[room]);
 useEffect(()=>{if(!active)cancel()},[active]);
 function walk(to,onArrival){
  if(!active)return;cancel();const serial=token.current,path=walkingPath(room,current.current,to),last=path.at(-1);
  setDestination(last);
  if(matchMedia('(prefers-reduced-motion: reduce)').matches){current.current=last;setPosition(last);setDestination(null);onArrival?.();return}
  let segment=1,stamp;setWalking(true);
  function tick(time){if(serial!==token.current)return;const dt=stamp===undefined?0:Math.min((time-stamp)/1000,.05);stamp=time;
   let budget=dt*24;
   while(segment<path.length){const target=path[segment],distance=floorDistance(current.current,target);if(distance<.01){segment++;continue}
    setFacing(previous=>target[0]<current.current[0]?-1:target[0]>current.current[0]?1:previous);
    if(budget>=distance){current.current=target;budget-=distance;segment++}else{const t=budget/distance;current.current=[current.current[0]+(target[0]-current.current[0])*t,current.current[1]+(target[1]-current.current[1])*t];break}
   }
   setPosition([...current.current]);if(segment>=path.length){setWalking(false);setDestination(null);onArrival?.();return}frame.current=requestAnimationFrame(tick);
  }
  frame.current=requestAnimationFrame(tick);
 }
 return{position,walking,facing,destination,walk};
}
