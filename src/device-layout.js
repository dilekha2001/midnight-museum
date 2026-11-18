const clamp=(value,min,max)=>Math.min(max,Math.max(min,value));
export function deviceProfile({width,height,touch=false}){
 width=Number.isFinite(width)&&width>0?width:360;height=Number.isFinite(height)&&height>0?height:640;
 const portrait=height>width,short=Math.min(width,height);
 const kind=!touch?'desktop':!portrait&&height<600?'phone-landscape':width<650?'phone-portrait':'tablet';
 return{width,height,touch,portrait,kind,stick:Math.round(clamp(short*.23,80,128)),action:Math.round(clamp(short*.16,52,76))};
}
export function viewportMetrics(view=window,nav=navigator){
 const visual=view.visualViewport,useVisual=visual&&Math.abs((visual.scale??1)-1)<.01;
 return deviceProfile({width:useVisual?visual.width:view.innerWidth,height:useVisual?visual.height:view.innerHeight,touch:(nav.maxTouchPoints||0)>0||view.matchMedia('(any-pointer: coarse)').matches});
}
export function automaticQuality({width,height,touch=false}){return width<700||touch&&Math.min(width,height)<600?'low':'balanced'}
