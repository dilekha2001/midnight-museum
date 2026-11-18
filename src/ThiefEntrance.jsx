import React,{useEffect,useState}from'react';
import ThiefWelcome from'./ThiefWelcome';
import StarryMist from'./StarryMist';
export default function ThiefEntrance({buttonLabel}){
 const[phase,setPhase]=useState('waiting');
 const reduced=matchMedia('(prefers-reduced-motion: reduce)').matches;
 useEffect(()=>{const next={entering:'speaking',hold:'leaving',leaving:'gone'}[phase];if(!next)return;
 const delay=phase==='hold'?3000:reduced?0:phase==='entering'?1100:850;
 const timer=setTimeout(()=>setPhase(next),delay);return()=>clearTimeout(timer);
 },[phase,reduced]);
 const speaking=phase==='speaking'||phase==='hold';
 return <div className={'thief-performance phase-'+phase}>
 <StarryMist visible={phase==='leaving'||phase==='gone'}/>
 <div className="thief-stage" aria-hidden="true"><div className="thief-landing-shadow"/><img className="thief-character" src="./art/thief-cutout.png" alt="" fetchPriority="high" onLoad={()=>setPhase(p=>p==='waiting'?'entering':p)} onError={()=>setPhase('speaking')}/></div>
 <ThiefWelcome buttonLabel={buttonLabel} active={speaking} onFinished={()=>setPhase(p=>p==='speaking'?'hold':p)}/>
 {phase==='gone'&&<button className="welcome-replay" onClick={()=>setPhase('entering')}>✦ Replay the thief’s welcome ↺</button>}
 </div>
}
