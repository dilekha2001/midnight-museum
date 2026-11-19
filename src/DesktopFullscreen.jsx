import React,{useEffect,useState}from'react';
export default function DesktopFullscreen({onNotice}){
 const[full,setFull]=useState(Boolean(document.fullscreenElement));
 useEffect(()=>{const update=()=>setFull(Boolean(document.fullscreenElement));document.addEventListener('fullscreenchange',update);return()=>document.removeEventListener('fullscreenchange',update)},[]);
 if(!document.fullscreenEnabled)return null;
 return <button className="glass-button" onClick={async()=>{try{if(document.fullscreenElement)await document.exitFullscreen();else await document.documentElement.requestFullscreen()}catch{onNotice('Fullscreen is unavailable. You can continue in this window.')}}}>{full?'Exit fullscreen':'Fullscreen'}</button>;
}
