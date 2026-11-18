// Artist-authored floor routes keep feet out of the painted exhibits.
export const floorRoutes={
 'Grand Gallery':{nodes:[[48,94],[48,84],[55,77],[55,71],[28,76],[77,77],[54,67]],edges:[[0,1],[1,2],[2,3],[1,4],[2,5],[3,6]],door:[54,67],approaches:{1:[77,77],4:[28,76]}},
 'Antiquities':{nodes:[[55,94],[55,82],[50,73],[50,66],[42,72],[65,71],[50,61]],edges:[[0,1],[1,2],[2,3],[2,4],[2,5],[3,6]],door:[50,61],approaches:{0:[42,72],3:[65,71]}},
 'Portrait Gallery':{nodes:[[55,94],[55,83],[56,75],[55,68],[43,78],[72,73],[54,63]],edges:[[0,1],[1,2],[2,3],[1,4],[2,5],[3,6]],door:[54,63],approaches:{2:[72,73],5:[43,78]}}
};
export const floorDistance=(a,b)=>Math.hypot(a[0]-b[0],(a[1]-b[1])*4/3);
function project(point,a,b){
 const dx=b[0]-a[0],dy=(b[1]-a[1])*4/3;
 const t=Math.max(0,Math.min(1,((point[0]-a[0])*dx+(point[1]-a[1])*4/3*dy)/(dx*dx+dy*dy||1)));
 return[a[0]+(b[0]-a[0])*t,a[1]+(b[1]-a[1])*t];
}
function nearest(route,point){let best;route.edges.forEach((edge,i)=>{const position=project(point,route.nodes[edge[0]],route.nodes[edge[1]]),distance=floorDistance(point,position);if(!best||distance<best.distance)best={edge,index:i,position,distance}});return best}
export function walkingPath(room,from,to){
 const route=floorRoutes[room],a=nearest(route,from),b=nearest(route,to),nodes=[...route.nodes,a.position,b.position],start=nodes.length-2,end=nodes.length-1;
 const edges=[...route.edges,...a.edge.map(n=>[start,n]),...b.edge.map(n=>[end,n])];if(a.index===b.index)edges.push([start,end]);
 const distance=nodes.map(()=>Infinity),previous=[],pending=new Set(nodes.map((_,i)=>i));distance[start]=0;
 while(pending.size){const at=[...pending].reduce((x,y)=>distance[x]<distance[y]?x:y);pending.delete(at);if(at===end)break;
  for(const edge of edges){const next=edge[0]===at?edge[1]:edge[1]===at?edge[0]:null;if(next===null||!pending.has(next))continue;const cost=distance[at]+floorDistance(nodes[at],nodes[next]);if(cost<distance[next]){distance[next]=cost;previous[next]=at}}
 }
 const path=[];for(let at=end;at!==undefined;at=previous[at]){path.unshift(nodes[at]);if(at===start)break}
 return path.filter((p,i)=>i===0||floorDistance(p,path[i-1])>.01);
}
