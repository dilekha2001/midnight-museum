import test from'node:test';
import assert from'node:assert/strict';
import{thiefGreeting,typingDelay}from'./thief-dialogue.js';
test('the thief invitation names the button actually shown to the player',()=>{assert.ok(thiefGreeting().includes('“Enter the museum”'));assert.ok(thiefGreeting('Continue the heist').includes('“Continue the heist”'));assert.ok(!thiefGreeting('Continue the heist').includes('Enter the museum'))});
test('typing adds deliberate pauses after punctuation while normal letters remain quick',()=>{assert.ok(typingDelay('…',4)>typingDelay(',',4));assert.ok(typingDelay(',',4)>typingDelay('a',4));for(let i=0;i<10;i++)assert.ok(typingDelay('x',i)>=28&&typingDelay('x',i)<=55)});
