# Ball Motion Explorer

A React + Vite app for comparing bowling balls by their motion characteristics. The interface lets you browse a curated dataset, filter by brand, and compare up to six balls side by side through a radar-style motion chart.

## What the app does

- Search and filter the ball catalog by name, brand, or coverstock
- Compare selected balls with a radar chart across length, midlane read, flare, backend, and hook
- View each ball's core specs such as RG, differential, and intermediate differential
- Score motion traits using a lightweight heuristic model based on the ball's physical attributes

## Tech stack

- React
- Vite
- JavaScript
- Recharts
- Lucide React

## Project structure

```text
src/
├── App.jsx
├── components/
│   ├── BallCard.jsx
│   ├── Bar.jsx
│   ├── ComparisonPanel.jsx
│   └── FilterBar.jsx
├── data/
│   └── balls.json
├── index.css
├── lib/
│   ├── ScoreBall.js
│   └── constants.js
└── main.jsx
```

## Data and scoring

The ball catalog lives in [src/data/balls.json](src/data/balls.json). Each ball includes specs such as RG, differential, intermediate differential, finish grit, and coverstock type. Some aspect of the finish grit was hard to normalize, so I estimated that the balls that had a Polish finish was estimated to have 4000 grit finish, Reacta Gloss finish was estimated to have 5000 grit finish, and Compound finish was estimated to have 3000 grit finish.
The scoring logic in [src/lib/ScoreBall.js](src/lib/ScoreBall.js) normalizes the values and converts them into motion scores for the comparison view.

## Development

Install dependencies:

```bash
npm install
```

Start the local dev server:

```bash
npm run dev
```

Create a production build:

```bash
npm run build
```

## Notes

The motion scoring is an approximation intended for comparison and visualization rather than a precise physics model. It is useful for exploring how different ball specs may influence motion on the lanes.

## AI Collaboration

This project was completed as part of Anthropic's **AI Fluency: Framework & Foundations** course, which focuses on responsible human-AI collaboration.

Claude AI served as my primary development assistant, generating much of the application's codebase and assisting with data organization. My responsibilities included defining the project's scope, researching and selecting the bowling balls, cleaning and validating the dataset, managing version control, testing the application, identifying UI issues, and refining the final product.

This project demonstrates my ability to effectively direct AI tools while maintaining responsibility for project planning, data quality, testing, and final implementation decisions.

## Acknowledgements

This project was completed as part of Anthropic's **AI Fluency: Framework & Foundations** course, exploring effective and responsible AI-assisted software development using Claude AI.

