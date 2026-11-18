// Original, locally synthesized score: no downloads or external music service.
const chords=[[50,57,62,65],[46,53,58,62],[48,55,60,64],[45,52,57,61]];
const melody=[74,null,77,null,81,79,77,null,74,null,72,null,69,72,74,null,76,null,79,null,76,74,72,null,73,null,76,null,69,73,74,null];
const hz=midi=>440*Math.pow(2,(midi-69)/12);
export const audioModeForScreen=screen=>screen==='title'||screen==='intro'?'music':screen==='play'?'museum':'silent';
export function createMidnightAudio({schedule=setInterval,unschedule=clearInterval}={}){
 const Audio=window.AudioContext||window.webkitAudioContext;if(!Audio)return null;
 const context=new Audio(),master=context.createGain(),music=context.createGain(),scoreBus=context.createGain(),effects=context.createGain(),voices=new Set(),sources=[];
 master.gain.value=0;music.gain.value=.8;music.connect(scoreBus);scoreBus.connect(master);effects.connect(master);master.connect(context.destination);
 let timer=null,disposed=false,wanted=false,nextTime=0,beat=0,mode='music',foot=0;
 // A short stereo room impulse makes the notes belong to the museum.
 const reverb=context.createConvolver(),wet=context.createGain(),impulse=context.createBuffer(2,context.sampleRate*2.4,context.sampleRate);
 let seed=19;const random=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296};
 for(let channel=0;channel<2;channel++){const data=impulse.getChannelData(channel);for(let i=0;i<data.length;i++)data[i]=(random()*2-1)*Math.pow(1-i/data.length,3)*.4}
 reverb.buffer=impulse;wet.gain.value=.25;music.connect(reverb);reverb.connect(wet);wet.connect(scoreBus);
 function tone(midi,time,duration,volume,pad=false){
  const oscillator=context.createOscillator(),gain=context.createGain(),filter=context.createBiquadFilter();
  oscillator.type=pad?'sine':'triangle';oscillator.frequency.value=hz(midi);
  filter.type='lowpass';filter.frequency.value=pad?700:1700;gain.gain.setValueAtTime(.0001,time);
  gain.gain.exponentialRampToValueAtTime(volume,time+(pad?1.5:.025));
  gain.gain.exponentialRampToValueAtTime(.0001,time+duration);
  oscillator.connect(filter).connect(gain).connect(music);voices.add(oscillator);
  oscillator.onended=()=>{voices.delete(oscillator);oscillator.disconnect();filter.disconnect();gain.disconnect()};
  oscillator.start(time);oscillator.stop(time+duration+.05);
 }
 function score(){
  if(disposed||!wanted||mode!=='music'||document.hidden||context.state!=='running')return;
  nextTime=Math.max(nextTime,context.currentTime+.04);
  while(nextTime<context.currentTime+.35){
   const step=beat%32;
   if(step%8===0)chords[Math.floor(step/8)].forEach((note,i)=>tone(note,nextTime+i*.08,6.8,.021,true));
   if(melody[step]!==null)tone(melody[step],nextTime,2.7,.065);
   if(step%4===0)tone(chords[Math.floor(step/8)][0]-12,nextTime,3,.038,true);
   nextTime+=.78;beat++;
  }
 }
 // Low, filtered room air underneath the musical score.
 const buffer=context.createBuffer(1,context.sampleRate*4,context.sampleRate),data=buffer.getChannelData(0);let last=0;
 for(let i=0;i<data.length;i++){last=(last+(random()*2-1)*.025)/1.025;data[i]=last*.7}
 const wind=context.createBufferSource(),filter=context.createBiquadFilter(),air=context.createGain();wind.buffer=buffer;wind.loop=true;filter.type='lowpass';filter.frequency.value=480;air.gain.value=0;wind.connect(filter).connect(air).connect(master);wind.start();sources.push(wind);
 const stepBuffer=context.createBuffer(1,Math.ceil(context.sampleRate*.14),context.sampleRate),stepData=stepBuffer.getChannelData(0);
 for(let i=0;i<stepData.length;i++)stepData[i]=(random()*2-1)*Math.pow(1-i/stepData.length,3);
 function footstep(){
  if(disposed||!wanted||mode!=='museum'||document.hidden||context.state!=='running')return;
  const now=context.currentTime,tap=context.createBufferSource(),low=context.createBiquadFilter(),gain=context.createGain(),body=context.createOscillator(),bodyGain=context.createGain();
  tap.buffer=stepBuffer;low.type='lowpass';low.frequency.value=foot++%2?1150:900;
  gain.gain.setValueAtTime(.0001,now);gain.gain.exponentialRampToValueAtTime(.12,now+.006);gain.gain.exponentialRampToValueAtTime(.0001,now+.13);
  body.type='sine';body.frequency.setValueAtTime(115,now);body.frequency.exponentialRampToValueAtTime(58,now+.11);
  bodyGain.gain.setValueAtTime(.065,now);bodyGain.gain.exponentialRampToValueAtTime(.0001,now+.14);
  tap.connect(low).connect(gain).connect(effects);body.connect(bodyGain).connect(effects);voices.add(tap);voices.add(body);
  tap.onended=()=>{voices.delete(tap);tap.disconnect();low.disconnect();gain.disconnect()};
  body.onended=()=>{voices.delete(body);body.disconnect();bodyGain.disconnect()};
  tap.start(now);tap.stop(now+.15);body.start(now);body.stop(now+.16);
 }
 function update(){
  if(disposed)return;const playing=wanted&&!document.hidden&&context.state==='running';
  master.gain.setTargetAtTime(playing?.45:0,context.currentTime,.18);
  scoreBus.gain.setTargetAtTime(mode==='music'?1:0,context.currentTime,.1);
  air.gain.setTargetAtTime(mode==='museum'?.35:0,context.currentTime,.2);
  effects.gain.setTargetAtTime(playing&&mode==='museum'?1:0,context.currentTime,.05);
  const musical=playing&&mode==='music';
  if(musical&&timer===null){nextTime=Math.max(nextTime,context.currentTime+.06);score();timer=schedule(score,100)}
  if(!musical&&timer!==null){unschedule(timer);timer=null}
 }
 const visibility=()=>update();document.addEventListener('visibilitychange',visibility);
 return{
  footstep,
  setMode(value){mode=['music','museum','silent'].includes(value)?value:'silent';update()},
  async start(){if(disposed)return;await context.resume();update()},
  setPlaying(playing){wanted=Boolean(playing);update()},
  dispose(){if(disposed)return;disposed=true;document.removeEventListener('visibilitychange',visibility);if(timer!==null)unschedule(timer);for(const source of[...sources,...voices]){try{source.stop()}catch{}source.disconnect()}master.disconnect();music.disconnect();scoreBus.disconnect();effects.disconnect();reverb.disconnect();wet.disconnect();context.close().catch(()=>{})}
 };
}
