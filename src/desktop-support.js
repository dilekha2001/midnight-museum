export function supportsDesktopInput({fine,hover}){return Boolean(fine&&hover)}
export function normalizeSettings(value){
 const clamp=(n,min,max,fallback)=>Number.isFinite(n)?Math.min(max,Math.max(min,n)):fallback;
 return {quality:['auto','high','balanced','low'].includes(value?.quality)?value.quality:'auto',brightness:clamp(value?.brightness,1,2,1.38),sensitivity:clamp(value?.sensitivity,.5,2,1),sound:typeof value?.sound==='boolean'?value.sound:true};
}
export function readSettings(){try{return normalizeSettings(JSON.parse(localStorage.getItem('midnight-settings-v1')))}catch{return normalizeSettings(null)}}
