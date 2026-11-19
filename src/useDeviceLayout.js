import{useEffect,useState}from'react';
import{viewportMetrics}from'./device-layout';

export default function useDeviceLayout(){
 const[layout,setLayout]=useState(()=>viewportMetrics());
 useEffect(()=>{
  let frame,settleTimer;const root=document.documentElement;
  const update=()=>{cancelAnimationFrame(frame);frame=requestAnimationFrame(()=>{const next=viewportMetrics();setLayout(previous=>previous.width===next.width&&previous.height===next.height&&previous.touch===next.touch?previous:next)})};
  const rotate=()=>{update();clearTimeout(settleTimer);settleTimer=setTimeout(update,250)};
  const pointer=matchMedia('(any-pointer: coarse)');
  window.addEventListener('resize',update);window.addEventListener('orientationchange',rotate);window.addEventListener('pageshow',update);window.screen.orientation?.addEventListener?.('change',rotate);
  window.visualViewport?.addEventListener('resize',update);window.visualViewport?.addEventListener('scroll',update,{passive:true});pointer.addEventListener?.('change',update);
  return()=>{cancelAnimationFrame(frame);clearTimeout(settleTimer);window.removeEventListener('resize',update);window.removeEventListener('orientationchange',rotate);window.removeEventListener('pageshow',update);window.screen.orientation?.removeEventListener?.('change',rotate);window.visualViewport?.removeEventListener('resize',update);window.visualViewport?.removeEventListener('scroll',update);pointer.removeEventListener?.('change',update);delete root.dataset.deviceLayout;delete root.dataset.welcomeLayout;delete root.dataset.touch;for(const key of['--app-height','--app-width','--stick-size','--action-size','--welcome-header-height'])root.style.removeProperty(key)};
 },[]);
 useEffect(()=>{const root=document.documentElement;root.dataset.deviceLayout=layout.kind;root.dataset.welcomeLayout=layout.welcomeLayout;root.dataset.touch=String(layout.touch);root.style.setProperty('--app-height',layout.height+'px');root.style.setProperty('--app-width',layout.width+'px');root.style.setProperty('--stick-size',layout.stick+'px');root.style.setProperty('--action-size',layout.action+'px');root.style.setProperty('--welcome-header-height',layout.welcomeHeader+'px')},[layout]);
 return layout;
}
