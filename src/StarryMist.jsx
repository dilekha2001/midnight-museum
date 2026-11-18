import React from'react';

const currents=[
 'M 180 680 C 340 740 760 610 755 415 C 750 210 425 210 438 405 C 447 535 685 527 669 383 C 656 281 505 313 521 398 C 534 463 629 427 591 373',
 'M 260 720 C 440 620 920 710 900 420 C 885 220 650 130 665 253 C 676 334 838 311 801 220 C 753 101 490 151 406 265 C 270 450 475 610 751 545',
 'M 160 595 C 310 535 331 405 260 373 C 185 338 154 439 219 455 C 307 477 340 303 435 204 C 550 85 745 160 827 88',
 'M 325 735 C 459 627 614 665 744 599 C 883 529 837 356 702 328 C 567 300 538 469 658 467 C 741 465 730 380 678 392',
 'M 410 690 C 571 711 919 604 885 372 C 854 165 583 133 453 229 C 309 336 368 527 527 571'
];
const stars=Array.from({length:24},(_,i)=>({x:21+(i*37%73),y:12+(i*29%75),size:i%5===0?5:2,delay:-(i*1.7),duration:12+i%7*2}));
export default function StarryMist({visible}){
 return <div className={'starry-mist '+(visible?'is-visible':'')} aria-hidden="true">
  <div className="starry-mist-haze"><i/><i/><i/></div>
  <svg className="starry-mist-currents" viewBox="0 0 1000 800" fill="none">
   <g className="starry-mist-bloom">{currents.map((d,i)=><path key={i} d={d} stroke={i%2?'#3679da':'#87b7e9'} strokeWidth={i%2?32:18}/>)}</g>
   <g className="starry-mist-ribbons">{currents.map((d,i)=><path key={i} d={d} className={'mist-ribbon mist-ribbon-'+i} pathLength="1000" stroke={i===2?'#d7bc76':i%2?'#4e85cf':'#9ac9e9'} strokeWidth={i===2?1.3:2.5}/>)}</g>
   <g className="starry-mist-brushwork">{currents.slice(0,4).map((d,i)=><path key={i} d={d} pathLength="1000" stroke={i%2?'#f0ce77':'#a3cef1'} strokeWidth="1" strokeDasharray="2 11 4 18" style={{animationDelay:-i*4+'s'}}/>)}</g>
  </svg>
  <div className="starry-mist-stars">{stars.map((s,i)=><span key={i} style={{left:s.x+'%',top:s.y+'%',width:s.size,height:s.size,'--mist-delay':s.delay+'s','--mist-duration':s.duration+'s'}}/>)}</div>
 </div>
}
