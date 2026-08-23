# to-understand

**POPCORN Prompt Synthesizer** — LCARS 4.7 console for building POPCORN prompts (persona, objective, process, context, output, restrictions, nature).

Live (Vercel, `main`): [to-understand](https://to-understand.vercel.app)  
Repo: [apollo-n23/to-understand](https://github.com/apollo-n23/to-understand)

Void Cube (Neon Dash) moved to [apollo-n23/void-cube](https://github.com/apollo-n23/void-cube) / [void-cube-seven.vercel.app](https://void-cube-seven.vercel.app).

## Run locally

Static files only. From the repo root:

```bash
python -m http.server 5173
```

Then open [http://127.0.0.1:5173/](http://127.0.0.1:5173/).

## Files

| Path | What it is |
|---|---|
| `index.html` | POPCORN synthesizer markup + JS |
| `assets/lcars.css` | TNG LCARS visual system (Antonio + Share Tech Mono) |
| `assets/*.jpg` / `*.png` | POPCORN LCARS stills (Earth, pale blue dot, End Guardian, Enterprise, nebula, mode selector, console grain, channel + FAB glyphs) |
| `vercel.json` | Redirects `/prompt-builder` → `/` |
| `project-context.md` | Continuation notes for agents and future sessions |

## POPCORN (index.html)

Seven drag-reorderable channels compile to Markdown or XML. Persistence is `localStorage`:

- `lcarsPromptData` — field values
- `lcarsPromptFormat` — `markdown` | `xml`
- `lcarsPanelOrder` — panel id order

**Limits:** persona 300, objective 400, process 1500, context 1500, output 900, restrictions 1500, nature 300. Near-limit at 85%.

**Actions:** CLEAR ALL, COMPUTER (`https://grok.com/`), Copy / Preview / Download (floating bar). Ctrl/Cmd+Enter copies. Download is always `popcorn-prompt-{timestamp}.txt`.

**Integrity:** weighted 25% char-quota milestones (`INTEGRITY_WEIGHTS`: context 25, output/restrictions 20, process 15, objective 10, persona/nature 5).

**Chrome:** left rail (slices, Earth still, Pale Blue Dot), right rail (scan readouts, VOID CUBE PROTOCOL → https://void-cube-seven.vercel.app, End Guardian, tactical star map, Enterprise plate). FAB icons are transparent PNG masks (`icon-copy.png`, `icon-preview.png`, `icon-download.png`) so they sit as ink on the color bars. JS `flashButton()` still swaps button `innerHTML`; do not put `<img>` inside the FAB buttons.

Visual tokens and layout live in `assets/lcars.css`. Do not put prompt text into generated images.

## Deploy

Push `main` to GitHub. Vercel project **to-understand** (team `grok-playground`) is linked to `apollo-n23/to-understand` and deploys production from `main`.
