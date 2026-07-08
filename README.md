# Arsenal — bowling ball comparison app

A Vite + React app for comparing bowling ball specs and visualizing where
each ball sits on a Length vs. Hook Potential dot plot (modeled after how
Storm/Motiv chart their own lineups).

## Setup

```bash
npm install
npm run dev
```

Then open the local URL Vite prints (usually http://localhost:5173).

## What's here

- `src/data/balls.json` — the 142-ball dataset (9 brands), converted from
  the master CSV. Each ball also has `hook_score` and `length_score`
  (numeric 1–6 scales) derived from the free-text `hook_potential` and
  `length` fields, so the dot plot has something numeric to plot against.
- `src/components/BallBrowser.jsx` — left sidebar: search, brand filter
  chips, and the full ball list. Click a ball to add/remove it from the
  plot.
- `src/components/SelectedTray.jsx` — removable chip row showing which
  balls are currently selected.
- `src/components/DotPlot.jsx` — the Recharts scatter plot. Only renders
  balls you've selected (per the original spec — no firehose of all 142
  balls at once). Markers are styled as little bowling balls (3 finger
  holes), colored by brand.
- `src/brandColors.js` — the brand → color mapping used across the app.

## Design notes

- Palette and type system lean into the subject: dark lane-wood
  background (`--lane`), an oil-sheen amber accent (`--oil-amber`), and a
  condensed scoreboard-style display face (Oswald) for headings, paired
  with Inter for body text and JetBrains Mono for spec numbers.
- The plot background has a subtle vertical rule pattern suggesting lane
  boards.

## Known simplifications (worth revisiting)

- `length_score` is a judgment-call mapping from messy free text (e.g.
  "Medium (early/blendy)") onto a 1–6 scale. It's a reasonable
  approximation for plotting, not a precise measurement — worth
  sanity-checking against real ball behavior as you go.
- Two Radical balls (Evil Eye / Evil Eye Pearl) have "tunable" differential
  specs. The plotted/numeric value uses the base spec; the full original
  text is preserved in `differential_raw` / `intermediate_differential_raw`
  and shown in the tooltip.
- The DV8 "Verge" naming question flagged earlier in the project (5
  related entries: Verge, Verge Solid, Verge Hybrid, Damn Good Verge,
  Damn Good Verge Pearl) hasn't been resolved — all 5 are in the dataset
  as-is.

## Next steps (per project plan)

1. Sanity-check the dot plot placement against real-world ball behavior.
2. Build the trajectory graph (second visualization) — approximate
   physics curve down a 60ft lane based on RG/diff/coverstock/length/
   hook/backend.
3. Resolve the open data flags (Verge duplicate question, overseas-ball
   keep/drop, 15lb standard confirmation, notes column fate).
