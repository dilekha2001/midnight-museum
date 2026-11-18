# Opening artwork

Asset: `public/art/thief-hero.png`
Created using the built-in image generation tool. Original illustration; no reference images.

## Final prompt

Use case: stylized-concept. Create an original polished hero illustration for the opening screen of an indie game called Midnight Museum, a whimsical art heist about collecting pieces of The Starry Night. Portrait 3:4 composition. A single charismatic adult masked art thief, full body in a crouched sneaking pose, wearing a dark navy knit cap, black domino eye mask, fitted midnight teal coat, leather gloves and a weathered cross-body canvas satchel. Expressive mischievous eyes, small confident smile. They carefully hold one small glowing blue-and-gold painted canvas fragment that casts warm light on their face. A grand old museum behind them: antique bronze urn, framed paintings in soft focus, tall arched moonlit window. Swirling cobalt starlight subtly curls from the fragment like a ribbon, forming a visual halo. High-end stylized 3D animated-film illustration, tactile fabrics, painterly surfaces, sophisticated cinematic lighting, rich midnight blue and deep teal palette with antique gold accents. The character dominates the center and right, strong readable silhouette, artful perspective, dramatic but inviting mood, beautiful detailed face and hands. Keep the full hat and shoes within frame. No text, no lettering, no logos, no watermarks. Opaque dark museum background that fades toward deep navy at the left edge.

## Integration

The opening page pairs the illustration with a mission brief and Enter the museum / Continue the heist button. Desktop uses a cinematic split composition; phones show the character above the mission text. Image alt text describes the character and scene. The game begins only after pressing the entry button. Returning to the opening screen from Pause preserves progress.

## Animated character layers

Generated from the original thief-hero.png with imagegen. The transparent character moves independently while the gallery stays still. Original generated PNGs copied without alteration to public/art/thief-cutout.png and public/art/museum-opening-backdrop.png.

Character prompt:
Use case: background-extraction. Edit the supplied Midnight Museum image to make a production-ready transparent character cutout for a website animation. Preserve the exact masked adult thief's identity, expressive face, navy knit hat, dark teal long coat, gloves, crouched pose, boots, Starry Night canvas fragment in the hand, and worn cross-body satchel. Isolate ONLY the complete thief plus held fragment and satchel on a genuinely transparent alpha background. Remove every museum object, window, floor, pedestal, urn and the floating swirling star ribbon. No ground shadow or background haze. Keep the character's original cinematic stylized 3D-rendered appearance and fabric detail. Fit the complete hat, coat tails, fingers and boots inside the portrait canvas with a small transparent margin, without changing the recognizable character. No text, no logos, no border.

Background prompt:
Use case: precise-object-edit. Create the clean background plate from the supplied Midnight Museum illustration. Remove the entire thief, clothing, boots, satchel, held canvas fragment, and every floating swirl of stars. Reconstruct the empty museum naturally behind the removed character: polished dark stone floor continuing into the hall, framed old paintings along the walls, antique bronze urn at the right, tall arched blue moonlit window at upper right. Preserve the original camera perspective, portrait composition, rich midnight navy and blue lighting, antique gold details and stylized cinematic finish. The left edge should stay very dark navy, suitable for a title overlay. Absolutely no people, silhouettes, text, logos or floating artwork fragments.
