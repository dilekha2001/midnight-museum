import React,{useState,useEffect,useRef}from'react';
import{thiefGreeting,typingDelay}from'./thief-dialogue';
export default function ThiefWelcome({buttonLabel='Enter the museum',active=true,onFinished}){
 const message=thiefGreeting(buttonLabel),[count,setCount]=useState(0),done=useRef(onFinished),skip=useRef(false);done.current=onFinished;
 const finished=count>=message.length;
 useEffect(()=>{skip.current=false;setCount(0);if(!active)return;
 if(matchMedia('(prefers-reduced-motion: reduce)').matches){setCount(message.length);done.current?.();return}
 let index=0,timer;function advance(){if(skip.current)return;index++;setCount(index);if(index<message.length)timer=setTimeout(advance,typingDelay(message[index-1],index));else done.current?.()}
 timer=setTimeout(advance,250);return()=>clearTimeout(timer);
 },[message,active]);
 function finish(){skip.current=true;setCount(message.length);done.current?.()}
 return <aside className={'thief-welcome '+(finished?'finished':'typing')} aria-label="A message from the thief" aria-hidden={!active} inert={!active}>
 <div className="welcome-speaker"><span aria-hidden="true">✦</span> THE MIDNIGHT COLLECTOR <i aria-hidden="true"/></div>
 <p className="sr-only">{message}</p><div className="welcome-lines" aria-hidden="true"><p className="welcome-reserve">{message}<span>▏</span></p><p className="welcome-written">{message.slice(0,count)}{!finished&&<span className="type-caret">▏</span>}</p></div>
 <div className="welcome-buttons">{!finished?<button onClick={finish}>Skip text →</button>:<span className="welcome-exit-note">The night is yours…</span>}</div></aside>
}
