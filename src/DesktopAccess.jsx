import React,{useEffect,useState}from'react';
import{supportsDesktopInput}from'./desktop-support';
export function useDesktopInput(){
 const get=()=>supportsDesktopInput({fine:matchMedia('(any-pointer: fine)').matches,hover:matchMedia('(any-hover: hover)').matches});
 const[ready,setReady]=useState(get);
 useEffect(()=>{const queries=['(any-pointer: fine)','(any-hover: hover)'].map(q=>matchMedia(q));const update=()=>setReady(get());queries.forEach(q=>q.addEventListener('change',update));return()=>queries.forEach(q=>q.removeEventListener('change',update))},[]);
 return ready;
}
export default function DesktopAccess(){
 const[copied,setCopied]=useState(false);
 return <main className="desktop-required"><div className="desktop-required-card"><span className="eyebrow">THE STARRY NIGHT HEIST</span><h1 className="art-filled-title">Midnight Museum</h1><h2>The night awaits on desktop.</h2><p>Explore the museum with a keyboard and mouse. Open this link on your laptop or desktop computer to begin the heist.</p><div className="desktop-required-controls"><span>WASD to walk</span><span>Mouse to look</span><span>F to collect</span></div><label htmlFor="desktop-link">Your invitation</label><input id="desktop-link" readOnly value={location.href} onFocus={e=>e.target.select()}/><button className="primary" onClick={async()=>{try{await navigator.clipboard.writeText(location.href);setCopied(true)}catch{document.getElementById('desktop-link')?.select()}}}>{copied?'Link copied':'Copy game link'}</button><p role="status" className="desktop-required-note">Your saved desktop progress stays in that browser.</p></div></main>;
}
