import React from'react';

export default function TitleScreen({onStart}){
 return <section className="title-screen" aria-labelledby="title-screen-name">
  <img className="title-screen-background" src="./art/museum-opening-backdrop.png" alt="" fetchPriority="high"/>
  <div className="title-screen-shade"/>
  <div className="title-screen-content">
   <h1 id="title-screen-name" className="opening-game-title art-filled-title"><span className="title-art-word">Midnight</span>{' '}<span className="title-art-word">Museum</span></h1>
   <button className="title-start" onClick={onStart}>Start <span aria-hidden="true">→</span></button>
  </div>
 </section>
}
