// Installed apps may permit immediate locking; ordinary browsers need a tap.
export async function tryInitialLandscape({mobile,orientation,isLandscape}){
 if(!mobile)return{status:'skipped'};
 if(typeof orientation?.lock==='function'){try{await orientation.lock('landscape');return{status:'locked'}}catch{/* The Start/Rotate gesture retries with fullscreen. */}}
 return{status:isLandscape()?'landscape':'manual'};
}
