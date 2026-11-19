import test from'node:test';import assert from'node:assert/strict';
import{deviceProfile,viewportMetrics,automaticQuality}from'./device-layout.js';
test('small and tall phones, tablets and touch laptops get a usable profile',()=>{
 for(const[w,h,kind]of[[320,568,'phone-portrait'],[390,844,'phone-portrait'],[430,932,'phone-portrait'],[568,320,'phone-landscape'],[932,430,'phone-landscape'],[768,1024,'tablet'],[1024,1366,'tablet'],[1366,1024,'tablet']]){
  const p=deviceProfile({width:w,height:h,touch:true});assert.equal(p.kind,kind);assert.ok(p.stick>=80&&p.stick<=128);assert.ok(p.action>=52);
  assert.ok(p.stick+184+48<=w,'Joystick and compact action row must fit '+w);
 }
 assert.equal(deviceProfile({width:1440,height:900}).kind,'desktop');
});
test('browser chrome resizes the available viewport without breaking pinch zoom',()=>{
 const nav={maxTouchPoints:1},view={innerWidth:390,innerHeight:844,matchMedia:()=>({matches:false}),visualViewport:{width:390,height:720,scale:1}};
 assert.equal(viewportMetrics(view,nav).height,720);
 view.visualViewport={width:195,height:360,scale:2};assert.equal(viewportMetrics(view,nav).height,844);
});
test('large tablets retain touch support and landscape phones keep performance mode',()=>{
 const p=viewportMetrics({innerWidth:1366,innerHeight:1024,matchMedia:()=>({matches:false})},{maxTouchPoints:5});assert.equal(p.touch,true);
 assert.equal(automaticQuality({width:932,height:430,touch:true}),'low');
 assert.equal(automaticQuality({width:1366,height:1024,touch:true}),'balanced');
 assert.equal(automaticQuality({width:1440,height:900}),'balanced');
});
test('iPhone 12 mini uses the compact welcome with Safari bars open or closed',()=>{
 for(const height of[375,342,311,280,256]){
  const profile=deviceProfile({width:812,height,touch:true});
  assert.equal(profile.welcomeLayout,'compact-landscape');
  assert.ok(profile.welcomeHeader<=52);
  assert.ok(height-profile.welcomeHeader-44-8-32>0,'The copy area and independent 44px entry row have positive space');
 }
 assert.equal(deviceProfile({width:375,height:812,touch:true}).welcomeLayout,'standard');
 assert.equal(deviceProfile({width:1024,height:768,touch:true}).welcomeLayout,'standard');
});
test('Safari toolbar expansion updates compact sizing while keeping landscape',()=>{
 const view={innerWidth:812,innerHeight:375,visualViewport:{width:812,height:311,scale:1},matchMedia:()=>({matches:true})},nav={maxTouchPoints:5};
 assert.equal(viewportMetrics(view,nav).welcomeHeader,44);
 view.visualViewport.height=375;assert.equal(viewportMetrics(view,nav).welcomeHeader,52);
 view.visualViewport.height=280;assert.equal(viewportMetrics(view,nav).height,280);
 assert.equal(viewportMetrics(view,nav).welcomeLayout,'compact-landscape');
});
