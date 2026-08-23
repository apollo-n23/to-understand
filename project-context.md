# Grok-to-Understand Project Context Summary (for Continuation)

**Date/Context**: 2026-08-23. Workspace: C:\Users\antho\grok-to-understand. This repo is **prompt-builder only** — the **POPCORN Prompt Synthesizer** (`index.html` + `assets/lcars.css` + Imagine stills in `assets/`). Neon Dash / Void Cube **moved** to `C:\Users\antho\void-cube` / https://github.com/apollo-n23/void-cube / https://void-cube-seven.vercel.app. VOID CUBE PROTOCOL on the right rail links out to that live game (new tab). Live: Vercel project `to-understand` from GitHub `apollo-n23/to-understand` `main`. Docs: `README.md`, this file.

**Current snapshot (2026-08-23, prompt-builder only)**:
- This repo no longer ships Neon Dash levels, `assets/neon/`, game tests, or `sound-design-bible.md`. The game lives in the void-cube repo.
- POPCORN UI: Markup/JS stay in `index.html`; chrome is `assets/lcars.css` (Antonio + Share Tech Mono, TNG 2357 flats, elbows, 3-col `168px | 1fr | 188px`). Earth, pale-blue-dot, End Guardian, Enterprise, nebula, mode selector, console grain, and channel/FAB glyphs are files under `assets/` — not inline SVGs.
- FAB Copy/Preview/Download: wide bottom rail (`min(720px, 100% - 32px)`), `::before` **mask** icons (`icon-copy.png` / `icon-preview.png` / `icon-download.png`, black knocked out). Do **not** put `<img>` inside the buttons — `flashButton()` replaces `innerHTML`. Mobile (≤640px): stack full-width, body `padding-bottom: 180px`, toast `bottom: 172px`.
- JS contract unchanged: field ids, `data-panel-id`, `lcarsPromptData` / `lcarsPromptFormat` / `lcarsPanelOrder`, integrity bar `#integrity-bar-fill` width %, star-map group ids + nebula gradient defs, `.star-hit` immediately before `.star-point`. Star map also paints `assets/nebula-starfield.jpg` into `#star-map-bg`.
- VOID CUBE PROTOCOL (`a.sim-link`) points at `https://void-cube-seven.vercel.app` (`target="_blank"` `rel="noopener noreferrer"`).
- Git: prefer a normal `git push origin main`. Do **not** force-push. `mcps/` and `__pycache__/` are gitignored.

---

# Historical notes — Neon Dash (MOVED to apollo-n23/void-cube)

The Neon Dash / Void Cube game no longer lives in this repo. Notes below are kept as historical reference for the **moved** project. Treat them as relocated, not as current site source for `to-understand`.

# Historical notes (pre–L6 / pre–LCARS overhaul)

The rest of this file is still useful for Neon Dash L1–L5 mechanics, spawn-safety, and POPCORN JS behavior. Treat visual descriptions of Earth SVG / pill borders / “no external assets on index.html” as **superseded** by the snapshot above.

**Core Gameplay (shared across levels)**:
- Player: cube (w:26, h:26) with gravity, jumping, stomping enemies from above, collecting (neonOrbs), climbing ladders (UP key) to levelExit portal (triggers gameState='complete' at t>=1 with badass concentric swirls/glow/lightning particles).
- Mechanics: physics (vx/vy, landing on ground/platforms/trampolines), AABB collisions (with shield/invuln handling), particles (explosions, dust, smoke, etc.), parallax drawing (wx - scrollX * factor), procedural spawns, Web Audio sounds.
- Game loop: update() (gravity/landing/wasAirborne, input, overWaterGap, collisions/death, spawns with guards, AI/movement for enemies/projectiles, collect, climb logic, NPC approach, levelExit spawn at specific wx), draw() (layers: sky/bg, elements, ground/pits, platforms, enemies, NPCs, levelExit/building, particles, UI), gameLoop() with RAF, init/startPlaying with listeners (SPACE/click start + getAudioCtx, 'm' mute, 'r' reset, ArrowDown ice).
- State: gameState ('start'/'playing'/'over'/'complete'), scrollX, score, frame, keys, arrays (obstacles/triangles, platforms, specials/blobs, neonOrbs, pteros/drones, waterGaps/slime pits, poisonDarts/slimeballs, projectiles, endFireballs, levelExit, powerUp/icePowerUp, endPyramid, friendlyNPC, octopoppStart/Mid, ceilingFlowers, slimePuddles, backgroundElements/floral, particles, etc.), player (wx, y, vx, vy, w, h, hasShield, hasIceBlast, isClimbing, invulnUntil, drowningStart, climbProgress etc.), sound state (audioCtx, muted, masterVol~0.25, wasAirborne).
- End condition: levelExit spawn (L5 direct at ~6740 for ~10% length extension vs L4 6127; no boss in L5), climb to portal. L4 → Leve5 → Level6 on complete + cumulative score via localStorage.
- FPS counter, wouldBeTooCloseToHazards helper (60px edge sep for spawns), plus spike-vs-trampoline overlap helpers. Visuals come from `assets/neon/` with canvas fallbacks.

**L5-Specific Theme/Reskin (Pink Alien Biosphere + Floral)**:
- Platforms/floors/walls: deep/dark pinks (#4a2233, #3a1a2a, #552244 etc. + sin/phase variation).
- Lava gaps (waterGaps): pink slime (#3a1a2a base, #ff77cc/#ff88cc drips/blobs/ooze; animated downward flow, drips, bubbles via sin(frame*rate + phase + wx); deadly pits with sinking timer + playDeath('lava'/'hazard')).
- Erupting projectiles (poisonDarts from pits): pink goo blobs (rounder ellipses + drips; reskinned from red-orange fireballs).
- Pteros: purple drones (geometric/tech body/wings/rotors in #4a1a7a/#6622aa + cyan #88ddff accents; spit → purple laser bolts/thin beams + sparks; reuse pteros array + playPteroSpit/playLaser).
- Background: floral (stems #44aa66, petals #ff88cc/#ff66aa/#cc4499, blooms/vines with sway/floralPulse in largeBloom/midStalk types; replaced volcanoes/crags in initBackgroundElements + draw).
- Glowing orbs (neonOrbs): tall vertical neon rectangles/bars (thin fillRect + outer glow/inner core/top cap; pulse on height; keep isGreen/colors/pulse/collect).
- End building: "Neon Control Zone" (golden aura, panels, open door at lx+~55 + label text + glow); spawns endPyramid (golden pyramid, wide white eyes #ffffff + dark pupils; bob/float; approached=true on near door/ground/!isClimbing); bubble (dark box + pointer; exact 2-line text "There's so much chaos in here! I cant let you in right now, get to the next level!"; onscreen npcX guard); blocks player (clamp wx/vx past door unless isClimbing; allow ladder climb to finish). Use NPC style like Octopopp/friendly.
- Octopopp NPCs: two (octopoppStart at wx~175 after player.wx>100; octopoppMid ~3200-3600); like L2's mrOctopoop (bouncePhase + approached on dx/dy<80/60; draw pink octagon #ff88dd + blue eyes + bob; bubbles with exact texts + onscreen guards + pointer; playNPCApproach).
- Other: 3x ice spawns (adjusted targets, first-only no tutorial), friendlyNPC/Octopopp, cumulative score carry, FPS, particles on events.

**L6-Specific (Deep Water + Hydro Shop)** — `Level6.html`:
- Underwater gravity (`WATER_GRAVITY` 0.34, pit 0.16). Oxygen bar: `OXYGEN_MAX` 100, drain 0.17, refill 1.15 inside air bubbles.
- Air bubbles: `MAX_AIR_BUBBLES = 8`, spawn min/span **43/35** (frequency −20% vs the prior 34/28 pass); seed 2–3 near start; sprite is translucent (knocked-out grey disk + `globalAlpha` 0.82). Collision radii unchanged. `playBubbleChirp()` on collect/refill.
- Ground hazards drawn as **spiky coral reef** (teal/pink polyps, same ~27×h triangle hitbox + patrol/wiggle).
- End portal: pink-purple concentric rift (not cyan). Hydro shop at the end building: fade → counter; shield 20 neon, ice 25; purchases persist (`saveOwnedPowerups`). **`exitShop` resumes `playing`** with player at `doorL - player.w - 8`, camera snap; `shopVisited` prevents re-entry. Ladder climb still the only complete path.
- Next-level from L5: `Leve5.html` `#next-level-link` href `Level6.html`.

**Sounds (Consistent Web Audio across all 5 levels; engine from prior + agents)**:
- audioCtx, masterVol~0.25, muted + 'm' toggle, getAudioCtx on gestures/startPlaying/keydown.
- Helpers: playTone(freq,dur,type,vol,attack,decay), playNoise.
- Wrappers (all files): playJump/playLand (wasAirborne tracking on jumps/lands), playCollect(isGreen), playPowerup('shield'/'ice'), playTrampoline, playLadderGrab (on climb start), playLadderStep (rhythmic frame%7), playPortal (at t>=1/'complete'), playIceBlast (detonate), playPteroSpit/playLaser (on spits), playShieldPop (absorbs), playDeath(cause: 'lava'/'ptero'/'hazard' etc. at every 'over'), playBossStomp (where active), + L5/new: playPyramidEmerge/playPyramidChat (door/pyramid), playBuildingHum (zone), playGooPop (slime/pops/splats), playNPCApproach (Octopopp/friendly/mrOcto approaches), playBlock (barriers/door).
- Calls in update/collect/death/climb/complete/spit/NPC/building/puddle sections. L1 baseline; fixed sparse/missing calls in L2-4 (and L5 full incl. new). Unlocks + respect muted. Recent: fixed L5 jump (missing playJump() call in landed block).

**Spawn Safety (cross all 6 levels)**:
- No objects (obstacles/triangles, specials/enemies, waterGaps/lava/slime, verticals, pteros/drones, neonOrbs, powerUp/icePowerUp, lowWalls, trampolines, poison*, backgroundElements, flyingShips, alienTrees, ceilingFlowers, slimePuddles) spawn directly touching end ladder.
- On every levelExit spawn: ladderCenter + safeMargin=100 + extended filters (x-dist for ground; + y > GROUND_Y-420 for tall) + cleanup for all arrays (plus power/ice nulling in L4/L5). Guards in individual spawn ifs (if(!levelExit || abs(...) > 100)). Platform canSpawn checks preserved. (L4 has dual paths due to old boss logic.) Recent additions (ceilingFlowers, slimePuddles) respect this.
- **Spikes vs trampolines:** triangular ground hazards must never sit on bounce pads. Helpers `spikeOverlapsAnyTrampoline(wx, patrolAmp)` and `trampolineOverlapsAnySpike(tWX, tW)` (10px visual pad, spike half-width 14, includes `patrolAmp` envelope) run on both spawn directions in L1–L6. L5/L6 patrol amp also uses trampolines as left and right bounds so the live `sin` walk cannot overlap a pad.

**Cross-Level/Shared**:
- Ladder climb with sounds/UP, portal badass concentric swirls/glow/lightning in all.
- levelExit barrier, cumulative score via localStorage in some.
- NPC bubbles with onscreen guards.
- L4 → Leve5 → Level6 on complete (visibility funcs, saveCumulativeForNextLevel).
- FPS, particles. Neon Dash now **does** use shared files under `assets/neon/` (`draw-sprites.js`, `chrome.css`, Imagine PNGs/JPGs). Gameplay JS still lives in each level HTML. POPCORN uses `assets/lcars.css` + stills.

**POPCORN Prompt Synthesizer (`index.html` + `assets/lcars.css`)**:
- LCARS 4.7 UI (visuals in CSS + `assets/` stills as of 2026-08-22); 7 POPCORN channels: persona, objective, process, context, output, restrictions, nature.
- **Layout**: all 7 sections in a single-column `#panels-container`; **drag-reorderable** via `::` handles (`.drag-handle` only is `draggable="true"`; panels are not). Order persisted in `localStorage` key `lcarsPanelOrder`; `panelOrder` drives compile order in `buildPromptMarkdown()` / `buildPromptXml()`.
- **Per-section char limits** (`CHAR_LIMITS` + `maxlength`): persona 300, objective 400, process 1500, context 1500, output **900**, restrictions 1500, nature 300. Header `.char-count` shows `entered / limit`; `.near-limit` amber at ≥85%, `.at-limit` red at cap. `enforceCharLimit()` on input + after `loadFromStorage()`.
- **Top toolbar** (`.toolbar-menu`): CLEAR ALL + **COMPUTER** link (`https://grok.com/`, new tab); right side = BUFFER total compiled char count + Markdown/XML format slider (`#format-toggle`). Format persisted in `localStorage` key `lcarsPromptFormat`.
- **Compile formats** (`buildPrompt()` dispatches on `promptFormat`):
  - **markdown** (default): `SECTION:\n{text}` blocks joined by `\n\n` (only non-empty sections, in `panelOrder`).
  - **xml**: `<prompt>` root with child tags; `escapeXml()` on content; only non-empty sections included.
- **Floating action bar** (`.floating-actions`, fixed bottom): Copy, Preview, Download. Desktop: wide rail + PNG mask icons, body `padding-bottom: 88px`, toast `bottom: 80px`. Mobile ≤640px: stacked buttons, body `padding-bottom: 180px`, toast `bottom: 172px`. Keep button text-only for `flashButton()`.
- **Preview modal** (`#preview-modal`): read-only `<pre>`; synced Markdown/XML toggle in modal header; Copy + Return to Edit; dismiss via ×, backdrop, or Escape.
- **Download**: always `popcorn-prompt-{timestamp}.txt` (content reflects active format; extension is always `.txt`).
- **Clipboard**: `writeToClipboard()` with `execCommand` fallback; `showToast()`, `flashButton()`.
- **Persistence**: field values → `lcarsPromptData`; format → `lcarsPromptFormat`; panel order → `lcarsPanelOrder`.
- **Left sidebar**: 9 LCARS slice buttons (main + cap); Earth-from-orbit still (`assets/earth-orbit.jpg`); Pale Blue Dot plate (`assets/pale-blue-dot.jpg`) + Carl Sagan excerpt.
- **Right sidebar** (top → bottom): **`.scan-readouts`** → STATUS → SIMULATIONS (VOID CUBE PROTOCOL → https://void-cube-seven.vercel.app, class `sim-link`) → LCARS control slices → End Guardian (`assets/end-guardian.jpg`) → **Tactical Star Map** → Enterprise plate (`assets/enterprise.jpg`).
- **Scan readouts**:
  1. **TOTAL CHARS** (`#char-count`) — compiled prompt length
  2. **EST. TOKENS** — `prompt.length / 3.8`
  3. **PROMPT INTEGRITY** — starts **0%**; weighted milestones + `#integrity-bar-fill`
  4. **SECTIONS ACTIVE** — non-empty count `0 / 7`
- **Prompt integrity** (`calculatePromptIntegrity()` + `INTEGRITY_WEIGHTS`): per section, award at each 25% char-quota milestone (4 steps); weights sum to 100% — persona **5**, objective **10**, process **15**, context **25**, output **20**, restrictions **20**, nature **5**. LCARS bar beneath percentage fills in sync (blue→orange gradient + orange endcap + blue rail).
- **Tactical Star Map** (interactive SVG in right sidebar):
  - Dynamic `viewBox` via `resizeStarMap()` + `ResizeObserver` (`MAP_WIDTH=148`, height scales to container aspect).
  - **28 stars** (`STAR_MAP_CATALOG`), incl. 2 red stars (Aldebaran, Beta Hydri); clickable with yellow reticule + readout (`TARGET: NAME • MAG brightness`).
  - **World labels** (7.6px yellow) on 3 dispersed stars: Earth (Epsilon Eridani), Vulcan (Rigel), Andoria (Regulus).
  - **9 Starfleet vessels** (`STAR_MAP_VESSELS`): selectable; top-down Enterprise-style silhouettes (saucer, engineering hull, warp nacelles, Bussard caps; 1.8× prior size); curved pink trajectory paths (quadratic Bézier via `vesselCurvePath()`).
  - Vessel names: USS Enterprise, Farragut, Stargazer, Defiant, Voyager, Excelsior, Reliant, Discovery, Prometheus — shown in blue beside reticule when selected; readout `VESSEL: NAME • STARFLEET`.
  - `initStarMap()`, `buildStarMapContent()`, `lastMapSelection` restores selection after resize.
- **Live stats**: `updateLiveStats()` — per-section counts, buffer length, token est, integrity %, integrity bar width, sections active. Ctrl/Cmd+Enter copies prompt.
- **Key JS**: `ids`, `panelOrder`, `PANEL_ORDER_KEY`, `SECTION_META`, `CHAR_LIMITS`, `INTEGRITY_WEIGHTS`, `NEAR_LIMIT_THRESHOLD`, `initPanelDragDrop()`, `reorderPanel()`, `calculatePromptIntegrity()`, star-map symbols (`STAR_MAP_CATALOG`, `STAR_MAP_VESSELS`, `buildStarMapContent()`, `initStarMap()`), `buildPrompt()`, `init()`.
- Prompt UI now depends on `assets/lcars.css` and the Imagine stills listed in `README.md`. Neon Dash moved to apollo-n23/void-cube. COMPUTER still links to `https://grok.com/`.

**Recent Agent-Driven Changes (Neon Dash; prior sessions; 1+ subagents per issue, parallel often with worktree isolation/read-write; reports with excerpts; safe merges via search_replace on main with unique anchors)**:
- Sun (L5): orange → deep pink/purple (#ff88cc/#ff77cc/#cc66ee etc.), 2x size (radii scaled e.g. 15→30, 68→136), surrounded by beaming/shimmering concentric circles (6 stroked rings at [44,60,...148] with per-ring shimmer=sin(frame*0.027+phase)*2.4 radius offset + alpha flicker 0.13+sin*0.17 clamped + phases/lineWidth; + 6 thin radial beams with lenShimmer + slow rotation). Updated comments. (Subagent 1.)
- Orange triangles/obstacles (L5): reskinned to purple/pink biosphere (main #2a1f2b, lip #ff77cc pink, cracks #ff88cc, stroke #552244, accent #4a2233; + NEW pulsing magenta vein rect + soft pink rim highlight stroke). Added slow side-to-side patrol ~player width (26px total travel; amp<=13). Safety: spawn-time computeSafeTrianglePatrolAmp (nearest waterGaps left/right bounds + MARGIN=25 + triHalf + conservative vs other ground objs/low/tramp using their patrol extents; amp=min(...,13); 0 if <4). Data: base wx immutable + patrolAmp/Phase/Rate on obj. getTriangleCurrentWX(o) for live pos (sin low-freq). wouldBe extended for oPatrol extents. checkCollision/draw use live (wiggle layered on patrol). Prune/ice/cleanup use base. Comments updated ("pink biosphere living organic/crystal hazards that patrol + wiggle"). (Subagent 2 review/plan + subagent 3 execute with sub2 oversight via resume; 10 steps followed.)
- Level 4 boss fight: only way to die = boss lands directly on top and crushes (suppress all other deaths during inBossFight = endBoss && !bossDefeated && gameState==='playing': lava/overWaterGap/drowning, poisonDarts, pteros, specials, triangles, projectiles, endFireballs etc. via guards + if(inBossFight){suppress} else {original death}; crush branch kept as sole active 'over' with refined isCrush for "directly on top" + vy/descend; stomp-3x to defeat 100% preserved; side non-crush overlaps survivable. Boss AI/physics/shots/particles/sounds/ladder post-defeat intact. (Subagent deployed/reviewed/changed/merged.)
- L5 jump sound: was missing (playJump defined with muted guard + tones but never called in jump if after vy/jumpCount/dust). Fixed: added `playJump();` (consistent placement; wasAirborne absent in L5 so not added).
- L5 pink slime + platforms: waterGaps (gaps/slime pits) reskinned (draw: pink ooze/flow downward with sin(frame*rate+phase+wx) for vertical drips/blobs from edges+bottom + pulsing bubbles + flowing highlights; deep pinks #3a1a2a/#4a2233/#552244 + #ff77cc accents; comments "pink slime pits"/"biosphere goo"; deadly logic preserved). Platforms: thicker (height:13), bubblegum pink (#ff77cc/#ff88cc bodies + #ffbbdd sheen/bubbles; no lava orange), bubble texture (5+ seeded/pulsing semi-trans ellipses + accents via sin(frame + wx/phase + floatPhase)). Spawn: sway prob ↑0.65 (more L/R), ~28% new floatAmp/floatPhase (18+rand*25; yAnim in physics/landing/draw for up/down). (Subagents 2/3 in triple-task deployment.)
- L5 ceiling hazard: pink snake-like flower (ceilingFlowers array). "From time to time" spawn (periodic + rand, !levelExit, ahead wx, baseY near ceiling ~28-60, length:0, maxLength:160+rand*78 < H/2~260, extendRate~0.68+rand*0.32, wigglePhase). Guards (ladder/end + platforms/verticals/pteros/other flowers x-dist). Update: slow extend if < max (wiggle in draw). Draw: after tramps/before platforms (post-bg/floral); wiggly segmented vine (7 segs, woff=sin(frame*0.029+phase+t*2.1)*amp growing with t/len), thick stem (#2f7a4a + lighter + pink vein), flower head at tip (glow + layered petals #ff88cc/#ff77cc + #cc66ee center + petalPulse/headRot/anim + ceiling nub). Collision: whole-vine AABB (thick x for wiggle) → 'over' + playDeath('hazard') + explosion + pink petal particles. Integrated (reset, prune wx, ladder filter y-tall + safeMargin comment, ice killList as 'hazard'). (Subagent in triple-task.)
- L5 fireballs → slimeballs + puddles: poisonDarts/projectiles/endFireballs ("lava and enemies spit out") visuals replaced with bubbling purple slimeballs (2x size: r~8-9 + pulse vs original ~4-5; outer glow rgba purple/magenta, main #aa66ff/#9933cc, internal animated lighter bubbles #ff88cc/#ff77cc pulsing sin(frame+offset), core #cc99ff/#dd99ff; headers/comments updated to "slimeballs"/"bubbling purple"; related coll/prune/spawn comments updated). On ground hit (y checks in move loops for poisonDarts/endFireballs/projectiles): splat (playGooPop()) + create short-lived puddle (life:300/~5s, size~14-18). Puddles: new array + full lifecycle (decl/reset/prune/ladder filter/ice killList); no move (static); draw after slime pits (alpha=life/300 fade, base ellipse #6622aa + lighter edge + 4 pulsing internal bubbles #ff88cc; floor level). Player touch puddle → 'over' + playDeath('hazard') + explosion + optional splice. (Direct edits post prior subagent pattern.)
- Level 4 boss (prior): only crush death active (inBossFight guards suppressed lava/fireballs/enemies etc.; stomp-3x win preserved).
- Sun + triangles (prior subagents): as detailed above.
- Workflow: subagents (often parallel/worktree) for review/plan/execute/oversight (resume_from); reports with excerpts/line refs; safe search_replace merges on main using unique anchors from reports + reads; todos for tracking; verification (greps/re-reads/checklists/PASS on theme/safety/behavior preservation).

**Recent Agent-Driven Changes (index.html; 2026-07-02 sessions)**:
- **Phase 1** (4 parallel subagents + overseer): floating action bar (Copy/Preview/Download); preview modal; per-section char counts + limits; toolbar (Clear All + buffer + Markdown/XML toggle); format-aware `buildPrompt()`.
- **Phase 2 — sidebars & polish**: output limit 600→**900**; download always **`.txt`**; left sidebar LCARS slices + Earth SVG + enlarged Pale Blue Dot pane; right sidebar LCARS controls + End Guardian thumb; COMPUTER link to grok.com; preview modal format toggle synced with toolbar; near-limit amber warning at 85%.
- **Phase 3 — layout & drag-drop**: replaced side-by-side persona/objective with single-column **drag-reorderable** panels; `lcarsPanelOrder` persistence; fixed broken DnD (draggable on handle only, not whole panel).
- **Phase 4 — tactical star map**: interactive SVG below End Guardian; dynamic viewBox (no stretch); 28 stars + 2 red; curved pink vessel paths; world labels Earth/Vulcan/Andoria; selectable Starfleet vessels with Enterprise silhouettes + blue name beside reticule.
- **Phase 5 — scan readouts & integrity**: reordered readouts (tokens → integrity → sections active); enlarged `.scan-readouts` styling; **prompt integrity** 0–100% with weighted 25% milestones (`INTEGRITY_WEIGHTS`: context 25%, process 15%, output/restrictions 20% each, objective 10%, persona/nature 5% each); LCARS integrity progress bar. (Later the live sidebar also shows TOTAL CHARS above tokens.)
- **Phase 6 — 2026-08-22 visual overhaul**: extracted CSS to `assets/lcars.css`; Imagine stills for Earth, pale blue dot, End Guardian, Enterprise, nebula, mode selector, console grain, 7 channel icons, 3 FAB glyphs (JPGs plus transparent PNGs for FAB masks); authentic TNG flats/elbows/type; FAB overlap/black-square fix (masks + wider rail + mobile stack). JS ids/hooks preserved. Pushed `main` (force-with-lease) so Vercel production matches.

**Key Decisions/Requirements**:
- L5: no boss/tutorials (direct levelExit like L1-3; 3x ice even spawns no tutorial; keep climb hazards/endFireballs as non-active bg danger).
- Theme fidelity: pink/purple floral (no orange/lava reds in reskinned areas); sin/phase anim for living feel (sway/pulse/melt/bubble).
- Safety: extended ladder guards for all new arrays (ceilingFlowers, slimePuddles, etc.); spawn-time patrol bounds for moving triangles (never through objs/gaps).
- Sounds: full consistent wrappers/calls; wasAirborne for reliable jump/land; playGooPop for slime/pops/splats.
- Puddles: only on ground hit (not air expire/player hit); 5s fade; deadly touch; bubble anim.
- Slimeballs: 2x size bubbling purple; splat+puddle only on ground; preserve original spit/move/coll.
- Boss L4: sole death = direct land/crush (suppress externals during fight; keep shots/AI/stomp-3x).
- General: shared patterns (ladder/portal/NPC bubbles/onscreen guards); Imagine sprites in `assets/neon/` with canvas fallbacks; perf (reduced polys, batch alpha, onscreen culls); recent subagents for parallel issues + safe merges.
- Prompt builder: LCARS theme fidelity via `assets/lcars.css` + stills; copy/preview/download respect active format; floating bar always visible (mask icons, no img children); per-field limits + near-limit warnings; panel drag order persisted; integrity scoring weights context/process heavily, persona/nature lightly; star map + vessels decorative but interactive (selection/reticule) with nebula still behind SVG; download always `.txt`.
- Git/history: agents/merges/commits; branch may diverge; prefer relative paths; use todos for multi-step.

**Code Structure (typical for Leve5.html; similar in others)**:
- Top: <!DOCTYPE> + <html><head> (canvas#game + link containers e.g. level3-link for replay/next, <style>, <script>).
- Top-level: const canvas/ctx/W/H/GROUND_Y (~418); let player={wx,vy,vx,w,h,...}, arrays (obstacles=[], platforms=[], specials=[], neonOrbs=[], pteros=[], waterGaps=[], poisonDarts=[], projectiles=[], endFireballs=[], levelExit=null, powerUp/icePowerUp=null, endPyramid=null, friendlyNPC=null, octopoppStart/Mid=null, ceilingFlowers=[], slimePuddles=[], backgroundElements=[], flyingShips=[], particles=[], lowWalls=[], trampolines=[], alienTrees=[], verticalEnemies=[], poisonClouds=[]), keys={}, gameState='start', scrollX/score/best/frame/jumpCount/last* (lastSpawnWX etc.), sound (audioCtx/muted/masterVol/wasAirborne), FPS vars.
- Sound engine: getAudioCtx(), playTone, playNoise; wrappers (playJump etc. as listed); toggleMute().
- Helpers: resetGame() (clear arrays + states + seeds early objs + initBackgroundElements() floral + initFlyingShips()), loadBest/saveBest, spawnExplosion, wouldBeTooCloseToHazards (60px sep bidirectional vs waterGaps/obstacles/low/tramps; extended for patrol), spawnSlimePuddle (inline or helper), computeSafe* (for triangles).
- update() (if 'playing'): frame++, input (ax for left/right), gravity/landing (wasAirborne + playLand), clamps, overWaterGap (for slime/lava), collisions (player vs all: obstacles/tris use checkCollision with live pos for moving, specials/blobs stomp/side with shield, pteros/darts/endFireballs/projectiles/puddles with invuln/shield/'over'+playDeath+explosion, verticals, etc.), spawns (with ladder guards/filters + !levelExit; triangles use wouldBe + now patrolAmp compute; platforms sway/float + guards; waterGaps/slime + poisonClouds/darts; specials/blobs; verticals; pteros/drones; neonOrbs; power/ice; ceilingFlowers "from time to time" + guards; levelExit at 6740+ with heavy cleanup; Octopopp/friendly/endPyramid approach + bubbles/playNPCApproach; endPyramid block if near door !climbing; boss remnants if any), movement/AI (drones glide/bob/spit; verticals sin; endFireballs arc; triangles patrol live wx; puddles fade; projectiles vx/vy + life + trail), collects (orbs/power/ice → playCollect/playPowerup + particles + splice), deaths (set 'over' + playDeath(cause) + explosion + best/save), climb (if isClimbing: progress + playLadder* + pos to ladder + t>=1 → 'complete' + playPortal + particles), Octopopp/friendly/endPyramid approach (dx/dy, approached, playNPCApproach), endPyramid block (clamp if near door !climbing), etc.
- draw(): clear/layers (sky/bg/floral or volcanic remnants, flyingShips, ground/lava → pink slime pits + goo/ooze/drips/bubbles, platforms (pink variation + bubbles + float/sway), lowWalls/tramps, enemies (drones with lasers, blobs reskinned), NPCs (Octopopp/friendly/endPyramid with bubbles if approached+onscreen), levelExit (ladder + badass portal or L5 building "Neon Control Zone" + pyramid), slimePuddles (floor ellipses + bubbles fade), particles, UI (score/distance/fps/overlays if 'playing'; replay/next links on complete via visibility).
- gameLoop(): update(); draw(); raf(gameLoop).
- init(): loadBest(), baseScore, resetGame(), link visibility, key/mouse/touch listeners (SPACE/click → startPlaying() + getAudioCtx; 'm' mute; 'r' reset; ArrowDown ice), initial draw() + gameLoop().
- startPlaying(): set 'playing' or reset + play, visibility updates.
- L5 specifics: Octopopp spawns (start/mid exact texts), end building + endPyramid (approach spawn, block, exact bubble), no boss, extended length, pink/floral/rect orbs/drone visuals + sounds (playPyramid*/playBuildingHum/playGooPop/playBlock/playNPCApproach), spawn guards everywhere, new ceilingFlowers/slimePuddles, platforms with float + thicker/bubble, waterGaps full pink slime ooze, sun reskinned, triangles patrol+reskin, fireballs→slimeballs + puddles (splat on ground + deadly), jump sound fixed.
- Other: Parallax (wx - scrollX * factor), sin(frame * rate + phase) anim, AABB (shield/invuln guards), levelExit for barrier/climb/portal (badass in all; L5 building variant), cumulative score carry. (L4 has boss specifics: endBoss AI bounce/chase to land, stomp-3x vs crush, endFireballs from "boss", inBossFight guards for only-crush death.)

**Code Structure (index.html)**:
- Top: LCARS engineering bar (stardate ticker) + `.console` (bg litter, 3-col `.main-grid`: left sidebar / `.work-area` / right sidebar).
- Work area: `.work-title` → `.toolbar-menu` → `#panels-container` (7 reorderable `.input-panel` blocks with `.drag-handle`).
- Right sidebar: `.scan-readouts` → status → simulations → `.right-lcars-controls` → `.end-boss-thumb` → `.star-map-pane` (#star-map-svg layers: bg, grid, vessels, stars, reticule) → Enterprise footer.
- Outside console: `#toast`, `.floating-actions`, `#preview-modal`.
- Script: DOMContentLoaded → `init()` (`loadPanelOrder` → `applyPanelOrder` → `loadFromStorage` → `loadFormatFromStorage` → `updateLiveStats` → `attachListeners` → `initPanelDragDrop` → `initStarMap`). Compile via `buildPrompt()`; order via `panelOrder`.

**Open Tasks/Continuation Notes** (from history + agents):
- Polish: minor stale comments (e.g. some "Lava pterodactyl"/"volcanic" or "fireballs" remnants in L5 if not fully swept; "Level 4" in L5 console/replay links — non-blocking); ensure wasAirborne/land calls only where active (L2-4); cross-level links (L4 → Leve5 on complete); potential more sounds/events or optimizations (e.g. dead code/comments/dups/guards per prior optimize agent).
- Git: commits for agents/merges (spawn/sound/optimize/fixes/sun/triangles/boss/slime/flower/slimeballs/puddles etc.); branch may be behind/ahead origin/main (per initial status; clean working tree often).
- Future/agents pattern: continue using spawn_subagent (worktree for isolation) for parallel issues, then safe search_replace merges on main + commit. Third/optimize-style agent for cleanup post-changes. Recent diagnose (crash) + fix (pVar) + agents for ice (3x even spawns + first-only tutorial), NPC offscreen, pteros (drones), Octopoop in L2, portal badass (all levels), L5 reskin/floral/rects, spawn prevention, sounds audit/fix (L2-4 + L5), etc.
- Test/verify: load Leve5.html (no crash, platforms pink bubble + thicker + more movers + float up/down, Octopopp at start+mid with bubbles, approach door → pyramid + block + text, must ladder to finish, sounds trigger incl. fixed jump + goo on splats, no bad spawns near ladder, floral/pink theme, sun pink/purple 2x concentric, triangles pink + slow safe patrol, ceiling flowers appear/extend/deadly, slime pits ooze/flow pink + no orange, fireballs/slimeballs 2x bubbling purple from pits/enemies + ground splat to ~5s fading deadly puddles, L4 boss only crush death, etc.).
- Other files: keep patterns consistent (sounds engine, ladder logic, NPC speech vs help UI, portal in L1–6, below-canvas nav). L5/L6 + Imagine overhaul as of 2026-08-22 are on `main`. `index.html` requires `assets/`; every level HTML requires `assets/neon/`.
- Prompt builder polish (optional): export filename customization; prompt templates/presets; integrity threshold indicators per section; additional star-map vessels or sector labels. Mobile FAB stack and mask icons already landed.
- Potential (Neon Dash): more polish (e.g. upper sky haze tint for sun, update remaining "acid vats" comments, full cross-level sound parity, perf if needed).
- Test/verify prompt-builder: floating Copy/Preview/Download on scroll; preview modal + synced format toggle; char counts amber at 85% / red at cap; panel drag-reorder persists on reload; integrity starts 0% and climbs with weighted milestones + bar fill; readout order tokens→integrity→sections; star map fills sidebar height without stretch; star + vessel selection/reticule/readout; world labels + vessel names; download always `.txt`; format + fields + panel order persist.

**Notes for Continuation**: Prefer relative paths. Use subagents for complex/parallel work (with detailed prompts including context excerpts). Always verify post-edit (re-reads, greps for old strings vs new, checklists). Safe merges only (unique anchors). This md for handoff.

(Concise synthesis of full conversation history, initial requirements, agent reports, code reads/greps, and edits.)
