# Museum realism implementation

This modifies the existing React, Vite and Three.js museum. The floor plan remains one continuous 36 × 28m space with three collection wings. The reference guides the midnight blue, gold, marble and burgundy palette; no static gallery picture replaces the 3D environment.

## Architecture and materials

- `src/palatial-gallery.js`: shallow barrel vaults spring from capitals at 4.65m, with roof clearance below 5.8m and a central skylight opening. Fluted columns and layered capitals support the ribs. Bench seat heights are closer to ordinary museum seating.
- `src/gallery-geometry.js`: extruded, beveled gilded frames catch light across their edges while preserving the artwork opening.
- `src/museum-surfaces.js`: seeded local plaster, veined stone, wood grain, floor tiles, roughness and velvet weave maps. Color textures use sRGB; roughness and weave data stay linear. Marble is dielectric rather than metallic; gold is metallic with surface roughness; velvet has soft sheen.
- `src/night-architecture.js`: deeper window surrounds, layered stone and gilt molding, detailed lunar discs and layered clouds.

## Lighting and rendering

- `src/realism.js`: warm artwork spotlights, low fill and a cached 128px cube capture of the actual gallery, filtered by PMREM for metallic reflection. Captures are debounced when artwork textures and sculpture scans load; they do not run every frame.
- `src/night-renderer.js`: softened AO, restrained bloom and atmospheric scattering, subtle grain and grading, blurred floor reflection with angle-dependent dielectric strength, FXAA and bounded render resolution.
- `src/render-quality.js`: existing automatic quality adjustment and static exhibit batching remain active. High and balanced modes render at higher resolution; performance mode remains capped.
- `src/museum.js`: side-wall art has focused picture lights and slightly more natural viewing heights. The existing restoration artwork and interactive targets remain.

## Walking and gameplay

`src/visitor-motion.js` keeps a 1.68m eye height, 0.24m horizontal visitor radius and 2.65m/s walking speed. Exponential acceleration/deceleration and small collision substeps reduce abrupt movement and tunneling; separate axis movement slides along obstructions. Existing keyboard and touch input feed this controller.

Plinths, barriers and scan bounds protect exhibits. Nearby-fragment assistance also checks occlusion. Pause and blur clear motion. Save keys and fragment IDs are unchanged; inventory, puzzle, mobile display controls, thief introduction, music and victory still use their existing logic.

## Verification and limits

34 automated tests cover geometry, vault/roof clearance, frame openings, movement and thin-barrier collision, open walking routes, sculpture loading, rendering quality, mobile display fallback, saved progress and the six-piece win condition. The production build is checked separately.

Computer Use ended during local browser review because it could not determine the current URL confidently enough to enforce policy. No rendered walkthrough or frame-rate measurement was completed. These changes improve the scene's physical construction and shading; pixel-exact correspondence or photorealism is not established by the automated tests.
