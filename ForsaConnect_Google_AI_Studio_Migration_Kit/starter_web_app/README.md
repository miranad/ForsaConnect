# ForsaConnect — Google AI Studio starter (NOT Claude V3 export)

This is a **reconstructed fallback starter**, created from earlier ForsaConnect briefs, screenshots, and the 25 research records. It is **not** the actual Claude Version 3 source code. Preserve the original code by exporting from Claude separately.

## Run

```bash
npm install
npm run dev
```

Open the local URL Vite reports. Run basic data tests with `npm test`.

## Features included
- RTL Arabic React/Vite frontend, responsive layout and ForsaConnect branding
- 25 opportunity records, filters, search, details and original source links
- 7-person survey summary with sample-size warning
- **Local-only** draft opportunity form (browser localStorage). No backend, no secure admin, no live submission or deployment.

## In Google AI Studio
Upload this code to GitHub and use Build > (+ Add files) > Import from GitHub. See `../START_HERE.md`. Or prompt Build with `../GOOGLE_AI_STUDIO_MASTER_PROMPT.md` and attach the dataset/brand assets as references.

## Security
Never claim local drafts are submitted. Never expose admin privileges from UI alone. Cloud Firestore and Authentication integration must enforce authorization in security rules and/or server handlers.
