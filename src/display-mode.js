// Browser APIs are optional; usable landscape does not depend on fullscreen.
function fullscreenRequest(element,doc){
 if(typeof element?.requestFullscreen==='function'&&doc.fullscreenEnabled!==false)return element.requestFullscreen;
 if(typeof element?.webkitRequestFullscreen==='function'&&doc.webkitFullscreenEnabled!==false)return element.webkitRequestFullscreen;
 return null;
}
export const supportsFullscreen=(element,doc)=>Boolean(fullscreenRequest(element,doc));
const isFullscreen=doc=>Boolean(doc.fullscreenElement||doc.webkitFullscreenElement);
export function landscapeNotice(result){
 if(result.status==='manual')return 'Turn your phone sideways. If it stays upright, switch off Portrait Orientation Lock. Your browser may keep its toolbar visible.';
 if(result.fullscreen)return 'Landscape fullscreen is ready.';
 return 'Landscape view is ready. Your browser kept its toolbar visible; the game fits the available space.';
}
export async function requestLandscape({element,document:doc,orientation,isLandscape}){
 const request=fullscreenRequest(element,doc);let fullscreenDenied=false;
 if(!isFullscreen(doc)&&request){try{await request.call(element)}catch{fullscreenDenied=true}}
 const result=status=>({status,fullscreen:isFullscreen(doc),fullscreenSupported:Boolean(request),fullscreenDenied});
 if(typeof orientation?.lock==='function'){try{await orientation.lock('landscape');return result('locked')}catch{/* Manual landscape remains usable. */}}
 return result(isLandscape()?'landscape':'manual');
}
export async function exitLandscape({document:doc,orientation}){try{orientation?.unlock?.()}catch{}try{const exit=doc.exitFullscreen||doc.webkitExitFullscreen;if(isFullscreen(doc)&&exit)await exit.call(doc)}catch{}}
