import{useEffect,useState}from'react';
import{viewportMetrics}from'./device-layout';

export default function useDeviceLayout(){
 const[layout,setLayout]=useState(()=>viewportMetrics());
 useEffect(()=>{
  let frame;const root=document.documentElement;
  const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>setLayout(viewportMetrics()))};
  const pointer=matchMedia('(any-pointer: coarse)');
  window.addEventListener('resize',update);window.screen.orientation?.addEventListener?.('change',update);
  window.visualViewport?.addEventListener('resize',update);pointer.addEventListener?.('change',update);
  return()=>{cancelAnimationFrame(frame);window.removeEventListener('resize',update);window.screen.orientation?.removeEventListener?.('change',update);window.visualViewport?.removeEventListener('resize',update);pointer.removeEventListener?.('change',update);delete root.dataset.deviceLayout;delete root.dataset.touch;for(const key of['--app-height','--app-width','--stick-size','--action-size'])root.style.removeProperty(key)};
 },[]);
 useEffect(()=>{const root=document.documentElement;root.dataset.deviceLayout=layout.kind;root.dataset.touch=String(layout.touch);root.style.setProperty('--app-height',layout.height+'px');root.style.setProperty('--app-width',layout.width+'px');root.style.setProperty('--stick-size',layout.stick+'px');root.style.setProperty('--action-size',layout.action+'px')},[layout]);
 return layout;
}
