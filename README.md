# Midnight Museum — The Starry Night Heist

[Published demo](https://dilekha2001.github.io/midnight-museum/) — local changes appear online after committing and pushing.

A first-person art heist in one continuous 3D museum. Walk freely past paintings, antique display cases and ancient statues, collect six canvas fragments, then reconstruct The Starry Night to win. Open colonnades mark the west wing, main hall and east wing; these are areas of the same space, with no room-selection screens, teleportation or scene loading between them.

## Run locally

```powershell
npm.cmd install
npm.cmd run dev
```

Open the Local URL printed in the terminal and choose Enter the museum. A WebGL-capable browser is required.

## Play

- WASD walks. Click an empty part of the gallery for mouse look; click or F interacts. Drag to look is the fallback when mouse capture is unavailable. Q/E or left/right arrows also turn.
- Desktop release: keyboard and mouse required. Phones and touch-only tablets show a shareable desktop invitation instead of loading the 3D game.
- Walk close to a fragment and select it. The first fragment is on the stand ahead of the entrance.
- Satchel or I opens the painting puzzle. Select a recovered piece, then its matching space.
- Place all six pieces to win. Escape releases the mouse and pauses; Escape again resumes. Switching tabs or windows pauses automatically.
- H toggles hints, G toggles the museum map, M toggles sound. Fullscreen is available in supported browsers.
- Pause includes graphics quality, brightness and mouse sensitivity. Settings and progress save separately in localStorage.

The floor-plan labels indicate your current wing. They do not switch rooms. Hints guide the next search or puzzle step. Progress saves in localStorage on the same browser. Sound starts on entry and can be muted. The opening thief jumps in, delivers a silent typed greeting, then leaves.

## Appearance and technology

React + Vite + Three.js + CSS. Navy blue plaster, gilt ornament, fluted columns, marble reflections, moonlit arched windows, warm exhibit lighting, fog, dust and post-processing give the museum its midnight atmosphere. Graphics quality adapts to the device. No backend is required.

The earlier illustrated scene and walking components remain as unused prototype files. Gameplay uses src/museum.js. Gallery background generation is documented in GALLERY_ART.md, and character art in ART_DIRECTION.md and WALKING_ART.md.

## Validation

52 automated checks pass, including desktop input eligibility and persisted settings validation. Production build verified. A hands-on desktop browser walkthrough is still required to confirm mouse capture, audio balance and visual layout.

Asset attribution and licenses are retained in the project source and model credit files. Updates on main are published automatically by the GitHub Pages workflow.


## Museum realism update

Supported barrel vaults and fluted colonnades replace the low decorative ribs. The existing footprint and connected wings are preserved. Physically based marble, plaster, aged wood, gold and velvet use local color, surface-detail and roughness maps. A cached cube capture of the gallery supplies metallic reflections. Floor reflections use a subtle grazing-angle response. Windows have deeper surrounds and a more detailed moonlit sky; artwork lighting is warm, fog and bloom restrained.

The first-person camera remains at a human eye height of 1.68m. Acceleration and deceleration are smoothed, and movement is subdivided for collision checks against plinths, sculptures, barriers and walls. Existing saves, collection, puzzle, controls, welcome and celebration are preserved. See MUSEUM_REALISM.md for source details and verification limits.

## Screen-specific audio

The title and thief welcome pages use an original piano-and-pad score, with autoplay attempted as soon as the title page loads. If browser policy blocks audible autoplay, the first pointer or keyboard interaction retries it. Entering the museum fades the musical bus and stops its scheduler. Only wind and footsteps play during museum exploration; pickup chimes are removed. Footsteps trigger every 0.95m of actual movement, so standing still or pushing against an obstacle does not produce walking sounds. Pause, puzzle, statue information and celebration screens are silent. Mute remains available throughout. All audio is synthesized locally with Web Audio. Audio and movement tests pass; listening and volume balance require review on actual speakers or headphones.



## Desktop release

The objective panel is smaller so the gallery remains visible. The map opens on demand. Menus and the restoration table scroll within the window, trap keyboard focus, and keep background controls inactive. The title and welcome retain the Starry Night lettering, thief entrance and lingering mist. Reduced-motion preferences are respected. This release targets laptops and desktop computers with a precise pointer and hover; a touch-capable laptop with a mouse remains eligible. Existing phone controls and orientation modules are retained only as unused prototype source.
