# Midnight Museum — The Starry Night Heist

**[Play Midnight Museum](https://dilekha2001.github.io/midnight-museum/)** — Open in your browser on desktop or mobile. No GitHub account required.

A first-person 3D museum game built with React, Three.js, and Vite. A custom illustrated opening page introduces a masked art thief carrying a glowing canvas fragment. Enter the museum, find six pieces in three galleries, then rebuild The Starry Night to win.

## Start

```powershell
npm.cmd install
npm.cmd run dev
```

Refresh the localhost link and choose **Enter the museum**. Existing saves offer **Continue the heist**. Requires a WebGL-capable browser.

## Controls

- WASD: move. Q/E or left/right arrows: turn.
- Drag the scene to look around.
- Approach a glowing fragment and click it, or aim the crosshair and press F.
- I or Satchel: open the painting puzzle. Select a fragment, then its correct position.
- Escape: pause/return. Touch arrows support movement and turning.

Two fragments are in each of Antiquities, Grand Gallery, and Portrait Gallery. Doorways at either side of the central hall connect the galleries. Hints identify the next missing piece. The puzzle offers a reference image. Restoring all six pieces wins and reveals the finished painting on the gallery wall.

Progress saves automatically using localStorage. Returning to the opening page preserves the game. Restart clears progress after confirmation.

## Artwork

The original opening illustration is `public/art/thief-hero.png`, generated with the built-in image generation tool. See [ART_DIRECTION.md](ART_DIRECTION.md) for the complete prompt and integration notes. All assets are stored locally.

## Validation

```powershell
node --test src/game-state.test.js
npm.cmd run build
```

Four logic tests cover saved-state validation, duplicate pickups, incorrect placements, and the complete win/save flow. Browser visual verification remains pending because desktop preview access timed out during development.
## Art credits

Faithful reproductions of public-domain paintings downloaded from Wikimedia Commons:

- [The Starry Night — Vincent van Gogh](https://commons.wikimedia.org/wiki/File:Van_Gogh_-_Starry_Night_-_Google_Art_Project.jpg)
- [Mona Lisa — Leonardo da Vinci](https://commons.wikimedia.org/wiki/File:Mona_Lisa,_by_Leonardo_da_Vinci,_from_C2RMF_retouched.jpg)
- [Girl with a Pearl Earring — Johannes Vermeer](https://commons.wikimedia.org/wiki/File:Meisje_met_de_parel.jpg)

The museum is fictional; its exhibits are game representations. Museum objects are built from procedural 3D geometry.

## Publish to GitHub Pages

Push this repository to main and enable Pages with GitHub Actions as the source. The included workflow builds and deploys the static game; Vite uses relative asset paths. No deployment has been performed from this workspace.



## Midnight interior and victory celebration

The galleries use midnight blue walls, obsidian display cabinets, blue moonlight, crimson light accents, red curtains, velvet runners, and brass details. Additional exhibits include ceremonial armor, shields and blades, porcelain, books, coins and crowns. Edge placement keeps the gallery passages and fragment locations open.

The final correct fragment triggers a celebration popup with confetti, starbursts, a Master Thief badge, the restored painting, and sequential serif lettering that matches the opening page. Players can admire the artwork, return to exploring, restart, or replay the confetti. The celebration can also be reopened from a completed puzzle. Reduced-motion preferences disable the animated effects.

Run `node --test src/game-state.test.js src/decor.test.js` to check the puzzle rules, decoration geometry, and clear doorways/fragment locations.

## Realistic gallery finish

The interior now uses locally generated plaster, veined marble, wood-grain and aged-brass surface maps. Physical materials, an indoor reflection environment, warm wall-directed spotlights with soft shadows, moonlit windows and contact shadows give exhibits depth. Architectural details include stone dado panels, skirting, coffered ceilings and arched passage surrounds. Display cases have slim metal edges and collection labels; benches have upholstery and wooden armrests. The sculpture includes carved facial details. Blue and black remain the main architectural colors, with red limited to fabric and small accents.

The environment is procedural game geometry, rather than a photographic scan. The thief opening illustration, six-fragment game, saved progress and celebration remain intact.

## Readable mystery atmosphere

The gallery lighting has been brightened with stronger indirect light, warmer artwork spotlights and less screen-edge darkening. Celestial spheres, a glass hourglass, the curator’s atlas desk, letters, lanterns, carved crests and metal floor inlays add narrative detail. Gentle dust motes and faint moonlight shafts create atmosphere without hiding objects; reduced-motion preferences stop dust movement.

The opening title uses the locally stored **Cinzel Decorative** font, with an engraved gold treatment and ornamental divider. Its SIL Open Font License is included at `public/fonts/OFL-CinzelDecorative.txt`.

## Expanded Van Gogh collection

Five additional public-domain reproductions are displayed across the museum: The Bedroom (1889), Self-Portrait (1887), The Poet’s Garden (1888), The Drinkers (1890), and Fishing in Spring (1887). They use local image assets, individual frames, and title/year plaques. Repeated Starry Night reproductions were replaced to give the collection more variety; the central Starry Night puzzle remains unchanged. See [VAN_GOGH_CREDITS.md](VAN_GOGH_CREDITS.md) for museum records and image sources.

## Night rendering pipeline

The 3D view now uses EffectComposer with half-resolution SSAO, depth-aware ray-marched fog/light shafts, restrained bloom, ACES output, subtle film grain, a vignette and blue-shadow/warm-highlight color grading. Fog ray marching stops at scene depth, so it does not draw beams through exhibits. Dust uses soft alpha sprites. Arched moonlit windows, a recessed glazed skylight, layered cornices, column fluting and emissive blinking camera LEDs complete the night architecture.

PBR surfaces use local 512px material maps and generated normal maps. The marble floor blends a low-resolution, lightly blurred planar reflection over its stone texture. Glass cases, artwork, statues, ropes and benches remain in place. Existing contact-shadow decals are precomputed textures; the three spotlight shadow maps are cached until the scene changes. This is not a fully offline-baked indirect-lighting solution.

**Performance:** static opaque exhibits are merged by material and gallery, while collectible pieces, the final canvas, glass and animated LEDs remain separate. Reflection updates are throttled. Auto quality lowers resolution after sustained slow frame times; smaller screens start in Performance mode. SSAO and bloom run below full resolution, with 10–24 fog samples depending on quality. Rendering stops while the document is hidden and remains static behind paused/opening screens. Art and material assets are local. Engine and post-processing code are split into separate bundles.

Open **Pause → Visual quality** to select Auto, High, Balanced or Performance. **Gallery brightness** adjusts exposure without changing the puzzle. Native browser access was unavailable during this session, so appearance, GPU shader execution and actual device frame rates still need an in-browser walkthrough.

Validation: `node --test src/game-state.test.js src/decor.test.js src/render-quality.test.js`. In addition to game and geometry checks, tests verify batching world transforms, protected interactive/dynamic objects and bounded quality presets.

## Real heritage sculptures

Three locally stored 3D scans now form a small ancient sculpture collection: a kouros head replacing the simplified bust, a woman wearing a peplos in Antiquities, and a headless seated Buddha in the Portrait Gallery. Each has a pedestal and a clickable history plaque; aim and press F, or click nearby, to read its description. Original gaps and missing parts are preserved. Fragment positions and saved progress remain unchanged.

The models use embedded PBR textures and Draco compression, with two decoding workers. All three assets together are about 3.5 MB and contain approximately 200,000 triangles. Tests decode the actual files, check their source checksums, verify pedestal placement, and enforce model-size/triangle budgets.

**Asset rights:** these scans are by Scan the World and carry CC BY-NC-SA 4.0 (noncommercial) terms. See [STATUE_CREDITS.md](STATUE_CREDITS.md) for full attribution, source records, display changes and reuse details. This differs from the public-domain painting images.

Run all checks with `node --test src/game-state.test.js src/decor.test.js src/render-quality.test.js src/statues.test.js`.

## Midnight ambience

The after-hours treatment emphasizes cool blue window beams, slightly denser low haze and warm islands of exhibit lighting while preserving the brightness control. The fictional museum clock reads 12:07 AM. The HUD uses quieter blue accents and an after-hours message.

**Sound off / Sound on** toggles an optional, low-volume synthesized soundscape: filtered air, a low room tone and soft clock ticks. It starts muted, requires a user click, and fades out in menus. Web Audio nodes and timers are cleaned up when the game closes; there are no audio downloads or music assets.

## Interior clarity update

Desktop surface maps now use 1024px textures (512px on smaller screens), with matching generated normal maps. Painting textures use anisotropic filtering and a very low emissive contribution to preserve detail in dim galleries. Display glass has subtler tint and smoother reflections. A restrained edge-clarity pass follows anti-aliasing, and film grain strength is halved.

Balanced and High presets now allocate more resolution to rendering, ambient occlusion and marble reflections; High reflections use a 1024px target. Performance mode keeps its lower budgets. Browser visual/performance verification remains pending.

To publish these local changes to the existing GitHub Pages site, upload and commit the updated `src` folder. The deployment workflow then rebuilds the public game. No new dependencies or public assets are required for this update.

## Mobile landscape mode

Phones now show a Rotate button in the game header. On entering the museum in portrait, a landscape recommendation pauses movement and audio, with options to **Rotate & play fullscreen** or **Continue in portrait**. The Rotate button requests fullscreen, then a landscape orientation lock when the browser allows it. Unsupported or denied requests show manual rotation instructions instead of blocking gameplay. Fullscreen has an exit control.

Landscape phones use a shorter HUD layout with larger touch buttons, safe-area-aware edges, and repositioned status/actions so the museum is not cropped by the old portrait minimum height. The renderer resizes automatically when orientation changes. Native orientation APIs vary by browser; actual phone testing is still needed.

Orientation behavior is covered by `node --test src/display-mode.test.js`, including unsupported APIs, denied fullscreen/rotation, existing fullscreen and clean exit.

## The thief’s animated welcome

The opening page now includes a speech bubble beside the thief: “Welcome to the show, partner. Let’s make the night a little more interesting… together. Click ‘Enter the museum’ and let the midnight adventure begin!” The button name changes to Continue the heist for returning players.

The text types at a varied pace with pauses at punctuation. **Enable typing sound** starts quiet, synthesized typewriter clicks after a user tap and replays the message; sound can be muted. Skip and Replay controls keep the invitation optional. The complete message is available to screen readers without announcing every letter. Reduced-motion preferences reveal the message immediately. Timers and audio are disposed when the opening page closes.

The speech bubble sits beside the thief on desktop and below the character on portrait phones. Publishing this update requires committing the updated src folder to the GitHub repository.

## Default sound behavior

The welcome bubble no longer shows Sound on or Enable typing sound text. Typing audio unlocks on the first tap/click/key interaction, as required by browser autoplay policies, without a separate sound prompt. Clicking Enter the museum (or Continue the heist) starts the room soundscape automatically. The in-game mute control remains available, and menus/rotation prompts still pause ambience.
