export const vanGoghCollection=[
{title:'The Bedroom',year:'1889',file:'vangogh-bedroom.jpg',source:'https://www.artic.edu/artworks/28560',x:-12,y:2.8,z:-13.6,width:4,height:3.13,rotation:0},
{title:'Self-Portrait',year:'1887',file:'vangogh-self-portrait.jpg',source:'https://www.artic.edu/artworks/80607',x:12,y:3.1,z:13.6,width:2.13,height:2.7,rotation:Math.PI},
{title:"The Poet’s Garden",year:'1888',file:'vangogh-poets-garden.jpg',source:'https://www.artic.edu/artworks/14586',x:-17.6,y:3.1,z:-8.7,width:3.1,height:2.45,rotation:Math.PI/2},
{title:'The Drinkers',year:'1890',file:'vangogh-drinkers.jpg',source:'https://www.artic.edu/artworks/79349',x:5.72,y:3.1,z:-7,width:3.05,height:2.45,rotation:-Math.PI/2},
{title:'Fishing in Spring',year:'1887',file:'vangogh-fishing-spring.jpg',source:'https://www.artic.edu/artworks/109314',x:17.6,y:3.1,z:8.4,width:3.1,height:2.61,rotation:-Math.PI/2}
];
export function hangVanGoghCollection({painting,label,box,material}){const plaque=material('#152038');for(const art of vanGoghCollection){painting('./art/'+art.file,art.x,art.y,art.z,art.width,art.height,art.rotation);const dx=Math.sin(art.rotation)*.2,dz=Math.cos(art.rotation)*.2;const y=art.y-art.height/2-.36;const plate=box(2.1,.24,.025,art.x+dx,y,art.z+dz,plaque);plate.rotation.y=art.rotation;label('VAN GOGH / '+art.title.toUpperCase()+' / '+art.year,art.x+dx*1.08,y,art.z+dz*1.08,art.rotation,1.95)}}
