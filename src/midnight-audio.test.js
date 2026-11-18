import test from'node:test';
import assert from'node:assert/strict';
import{createMidnightAudio,audioModeForScreen}from'./midnight-audio.js';

test('only the first two screens get music; only live museum play gets ambience',()=>{
 assert.equal(audioModeForScreen('title'),'music');assert.equal(audioModeForScreen('intro'),'music');assert.equal(audioModeForScreen('play'),'museum');
 for(const screen of['pause','puzzle','statue','celebration','restart'])assert.equal(audioModeForScreen(screen),'silent');
});

test('music keeps one clock across screen changes, mutes, resumes and cleans up',async()=>{
 const beforeWindow=globalThis.window,beforeDocument=globalThis.document,doc=new EventTarget(),timers=new Map();let context,id=0;
 doc.hidden=false;
 const parameter=()=>({value:0,setValueAtTime(){},exponentialRampToValueAtTime(){},setTargetAtTime(){}});
 const node=()=>({gain:parameter(),frequency:parameter(),connect(target){return target},disconnect(){},start(){},stop(){}});
 class AudioContext{
  constructor(){context=this;this.state='suspended';this.currentTime=0;this.sampleRate=1000;this.destination=node();this.tones=0}
  createGain(){return node()}createConvolver(){return node()}createBiquadFilter(){return node()}createBufferSource(){return node()}
  createOscillator(){this.tones++;return node()}
  createBuffer(channels,length){const data=Array.from({length:channels},()=>new Float32Array(length));return{getChannelData:i=>data[i]}}
  async resume(){this.state='running'}async close(){this.state='closed'}
 }
 globalThis.window={AudioContext};globalThis.document=doc;
 let music;
 try{
  music=createMidnightAudio({schedule:fn=>{timers.set(++id,fn);return id},unschedule:key=>timers.delete(key)});
  assert.equal(timers.size,0,'no autoplay before Start');
  await music.start();music.setPlaying(true);assert.equal(timers.size,1);assert.ok(context.tones>=6,'melody, chord and bass are scheduled');
  const voices=context.tones;await music.start();music.setPlaying(true);assert.equal(timers.size,1);assert.equal(context.tones,voices,'entering another screen does not restart the score');
  context.currentTime=1;[...timers.values()][0]();
  context.currentTime=2;[...timers.values()][0]();assert.ok(context.tones>voices);
  music.setMode('museum');assert.equal(timers.size,0,'entering the museum stops the musical clock');
  const walking=context.tones;music.footstep();assert.equal(context.tones,walking+1,'museum steps have a low heel tone');
  music.setMode('silent');const silent=context.tones;music.footstep();assert.equal(context.tones,silent,'menus have no footsteps');
  music.setMode('music');const welcome=context.tones;music.footstep();assert.equal(context.tones,welcome,'no walking sounds on the welcome');
  music.setMode('museum');music.setPlaying(false);assert.equal(timers.size,0);const muted=context.tones;music.footstep();assert.equal(context.tones,muted);
  music.setMode('music');
  music.setPlaying(true);assert.equal(timers.size,1);
  doc.hidden=true;doc.dispatchEvent(new Event('visibilitychange'));assert.equal(timers.size,0);
  doc.hidden=false;doc.dispatchEvent(new Event('visibilitychange'));assert.equal(timers.size,1);
  music.dispose();assert.equal(timers.size,0);assert.equal(context.state,'closed');
  doc.dispatchEvent(new Event('visibilitychange'));assert.equal(timers.size,0);
 }finally{music?.dispose();globalThis.window=beforeWindow;globalThis.document=beforeDocument}
});
