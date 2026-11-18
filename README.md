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

- Desktop: WASD walks, drag looks around, Q/E or arrow keys turn, F interacts.
- Mobile: left joystick walks, swipe the right side to look, Collect/Inspect interacts.
- Walk close to a fragment and select it. The first fragment is on the stand ahead of the entrance.
- Satchel or I opens the painting puzzle. Select a recovered piece, then its matching space.
- Place all six pieces to win. Escape opens the pause menu.
- Pause includes graphics quality and brightness controls.

The floor-plan labels indicate your current wing. They do not switch rooms. Hints guide the next search or puzzle step. Progress saves in localStorage on the same browser. Sound starts on entry and can be muted. The opening thief jumps in, delivers a silent typed greeting, then leaves.

## Appearance and technology

React + Vite + Three.js + CSS. Navy blue plaster, gilt ornament, fluted columns, marble reflections, moonlit arched windows, warm exhibit lighting, fog, dust and post-processing give the museum its midnight atmosphere. Graphics quality adapts to the device. No backend is required.

The earlier illustrated scene and walking components remain as unused prototype files. Gameplay uses src/museum.js. Gallery background generation is documented in GALLERY_ART.md, and character art in ART_DIRECTION.md and WALKING_ART.md.

## Validation

34 game, input, statue, movement, geometry and rendering tests pass, including a continuous cross-hall aisle test. Production build verified. Visual desktop/mobile walkthrough remains to be completed; automated checks do not establish that the scene matches the reference image.

Asset attribution and licenses are retained in the project source and model credit files. Updates on main are published automatically by the GitHub Pages workflow.


## Museum realism update

Supported barrel vaults and fluted colonnades replace the low decorative ribs. The existing footprint and connected wings are preserved. Physically based marble, plaster, aged wood, gold and velvet use local color, surface-detail and roughness maps. A cached cube capture of the gallery supplies metallic reflections. Floor reflections use a subtle grazing-angle response. Windows have deeper surrounds and a more detailed moonlit sky; artwork lighting is warm, fog and bloom restrained.

The first-person camera remains at a human eye height of 1.68m. Acceleration and deceleration are smoothed, and movement is subdivided for collision checks against plinths, sculptures, barriers and walls. Existing saves, collection, puzzle, controls, welcome and celebration are preserved. See MUSEUM_REALISM.md for source details and verification limits.

## Screen-specific audio

The title and thief welcome pages use an original piano-and-pad score, with autoplay attempted as soon as the title page loads. If browser policy blocks audible autoplay, the first pointer or keyboard interaction retries it. Entering the museum fades the musical bus and stops its scheduler. Only wind and footsteps play during museum exploration; pickup chimes are removed. Footsteps trigger every 0.95m of actual movement, so standing still or pushing against an obstacle does not produce walking sounds. Pause, puzzle, statue information and celebration screens are silent. Mute remains available throughout. All audio is synthesized locally with Web Audio. Audio and movement tests pass; listening and volume balance require review on actual speakers or headphones.


## Landscape from launch

On mobile, the page attempts an orientation lock immediately, including on the title screen. Browsers that require interaction show the rotation prompt from launch; Rotate requests fullscreen then landscape. Start also retries when the player has not chosen Continue in portrait. Unsupported browsers retain the manual-rotation fallback. Ten orientation API tests pass; a physical-device walkthrough is still required because fullscreen and orientation support vary by browser.

## Adaptive mobile layout

The layout now measures the available visual viewport and reacts to orientation, browser-toolbar height and touch capability. It supports compact portrait/landscape phones and larger tablets without relying on a device-name list or a maximum tablet width. Safe-area insets protect controls from notches and home indicators. Joystick size follows the screen's shorter edge; touch actions retain large tap areas. The compact HUD keeps the objective while reducing decorative headings and map clutter. Menus and the restoration puzzle scroll within the available height. The welcome page stacks on portrait touch screens and its entry button remains above noninteractive decorative layers. Movement and looking maintain separate pointer-cancellation handling.

45 automated checks pass, including profiles for 320x568, 390x844, 430x932, short landscape phones, and tablets through 1366x1024. A 390x844 portrait title/welcome preview was inspected in Chrome device emulation. Physical-device touch, safe-area, fullscreen and performance testing is still needed; these checks do not guarantee every browser or device.
