# grok-to-understand

Two tracks in one static site:

1. **POPCORN Prompt Synthesizer** — LCARS 4.7 console for building POPCORN prompts (persona, objective, process, context, output, restrictions, nature).
2. **Neon Dash** — HTML5 Canvas side-scroller: a nine-year-old’s daydream of the universe, six levels, Web Audio, no build step.

Live (Vercel, `main`): [to-understand](https://to-understand-git-main-grok-playground.vercel.app/)  
Repo: [apollo-n23/to-understand](https://github.com/apollo-n23/to-understand)

## Run locally

Static files only. From the repo root:

```bash
python -m http.server 5173
```

Then open [http://127.0.0.1:5173/](http://127.0.0.1:5173/) (POPCORN) or a level HTML file.

## Files

| Path | What it is |
|---|---|
| `index.html` | POPCORN synthesizer markup + JS |
| `assets/lcars.css` | TNG LCARS visual system (Antonio + Share Tech Mono) |
| `assets/*.jpg` / `*.png` | POPCORN LCARS stills (Earth, pale blue dot, End Guardian, Enterprise, nebula, mode selector, console grain, channel + FAB glyphs) |
| `assets/neon/` | Neon Dash Imagine sprites (player/hazard/orb/portal/enemy per theme) + `draw-sprites.js` |
| `tests/neon-mechanics.test.js` | Loads shipped `checkCollision`, collect loop, and L6 `leaveShop` from the HTML files |
| `void-cube.html` | Neon Dash Level 1 (void) |
| `level2.html` | Level 2 (Mr Octopoop) |
| `Level3.html` | Level 3 |
| `Level4.html` | Level 4 (lava + crush-only boss) |
| `Leve5.html` | Level 5 (pink alien biosphere; filename is historical) |
| `Level6.html` | Level 6 (deep water, oxygen, Hydro shop) |
| `vercel.json` | Redirects `/prompt-builder` → `/` |
| `project-context.md` | Continuation notes for agents and future sessions |
| `sound-design-bible.md` | Canonical Neon Dash Web Audio calls and aesthetic |

Level filenames are inconsistent on purpose (`level2.html` vs `Level3.html` vs `Leve5.html`) — do not rename without updating every next-level link.

## POPCORN (index.html)

Seven drag-reorderable channels compile to Markdown or XML. Persistence is `localStorage`:

- `lcarsPromptData` — field values
- `lcarsPromptFormat` — `markdown` \| `xml`
- `lcarsPanelOrder` — panel id order

**Limits:** persona 300, objective 400, process 1500, context 1500, output 900, restrictions 1500, nature 300. Near-limit at 85%.

**Actions:** CLEAR ALL, COMPUTER (`https://grok.com/`), Copy / Preview / Download (floating bar). Ctrl/Cmd+Enter copies. Download is always `popcorn-prompt-{timestamp}.txt`.

**Integrity:** weighted 25% char-quota milestones (`INTEGRITY_WEIGHTS`: context 25, output/restrictions 20, process 15, objective 10, persona/nature 5).

**Chrome:** left rail (slices, Earth still, Pale Blue Dot), right rail (scan readouts, VOID CUBE PROTOCOL → `void-cube.html`, End Guardian, tactical star map, Enterprise plate). FAB icons are transparent PNG masks (`icon-copy.png`, `icon-preview.png`, `icon-download.png`) so they sit as ink on the color bars. JS `flashButton()` still swaps button `innerHTML`; do not put `<img>` inside the FAB buttons.

Visual tokens and layout live in `assets/lcars.css`. Do not put prompt text into generated images.

## Neon Dash

Shared loop: gravity cube (26×26), stomp from above, collect neon orbs, climb the exit ladder (`UP`) into a portal. Mute `m`, reset `r`, ice blast `ArrowDown`. Cumulative neon via `localStorage` on later levels.

| Level | File | Theme / exit |
|---|---|---|
| 1 | `void-cube.html` | Void cube; first protocol from POPCORN |
| 2 | `level2.html` | Mr Octopoop |
| 3 | `Level3.html` | Industrial |
| 4 | `Level4.html` | Lava; crush-only boss (stomp ×3); next → `Leve5.html` |
| 5 | `Leve5.html` | Pink biosphere, floral, drones, slime; next → `Level6.html` |
| 6 | `Level6.html` | Underwater: oxygen drain, air bubbles, spiky coral, pink-purple portal. Hydro shop at the end door sells shield (20 neon) / ice (25) with carryover. Leaving the shop returns to **play** beside the door — climb the ladder to complete. |

Spawn-safety rule: nothing spawns on the end ladder (`safeMargin` ≈ 100). Sound wrappers must match `sound-design-bible.md` (`playJump`, `playLand`, `playDeath(cause)`, …). Level 6 also has `playBubbleChirp()`.

**Sprites:** each level loads `assets/neon/draw-sprites.js` and calls `NeonDashSprites.theme(...)`. `drawSprite` uses `canvas.drawImage` scaled to the existing entity box (player stays 26×26). Thematic `sky-*.jpg` plates scroll as a far layer; `plat-*.png` tiles the floor and floating platforms (visual height only — hitboxes unchanged). L4 boss uses 8 Imagine-video idle frames via `drawBoss`. Primitive canvas drawing remains as a fallback if an image has not loaded.

```bash
node tests/neon-mechanics.test.js
node tests/sprite-wiring-check.js
```

## Deploy

Push `main` to GitHub. Vercel project **to-understand** (team `grok-playground`) is linked to `apollo-n23/to-understand` and deploys production from `main`.
