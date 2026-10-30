# ForsaConnect → Google AI Studio migration kit

**Created 2026-10-29**. Prepared from the conversation's existing ForsaConnect files, logo, initial web prototype, 25 researched opportunity records, and Version 2 / Version 3 screenshots. **It is not an export of Claude Version 3 source code.**

## What to do first
**If you want the exact current Claude design:** follow `docs/CLAUDE_EXPORT_AND_IMPORT.md` to export the actual code and import it from GitHub into Google AI Studio Build. Then attach the JSON, logo and master instructions here.

**If you want to start immediately without the Claude code:** use `starter_web_app/` as a runnable React/Vite fallback baseline. It includes real research data, but it is a reconstruction, **not your exact Claude application**. Place it in a private GitHub repo, open Google AI Studio Build, choose **+ → Import from GitHub**, and then paste `GOOGLE_AI_STUDIO_MASTER_PROMPT.md`.

**If you do not want GitHub right now:** open https://aistudio.google.com/ → **Build → Web app**, paste `GOOGLE_AI_STUDIO_MASTER_PROMPT.md` into the app description and provide the separate JSON, logo, and screenshots as reference attachments **if the interface accepts them**. Paste the project spec inline if necessary. Google AI Studio will generate a new app, not import the current source.

## Package contents
- `GOOGLE_AI_STUDIO_MASTER_PROMPT.md` — instructions for Google AI Studio Build agent.
- `PROJECT_SPEC_AR.md` — official project concept, branding and actual survey results.
- `brand/ForsaConnect_Logo.png` — project logo reference.
- `data/ForsaConnect_25_Opportunities_Research.json` — 25 sourced listings (17 Morocco, 3 abroad, 5 remote). Current registration availability needs verification.
- `claude_reference/` — prior screenshots and original earlier HTML test (not current V3).
- `starter_web_app/` — React/Vite fallback with functioning offline search/filters/details and explicitly local-only draft form.
- `docs/CLAUDE_EXPORT_AND_IMPORT.md` and `docs/WORKFLOW_AND_CHECKLIST.md`.

## Security and truthfulness
- The starter is a prototype, not a live multi-user platform.
- Do not paste API keys into prompts or commit `.env`/service-account secrets to a repo. Use Secrets in AI Studio for keys.
- Firebase data persistence, public deployment, and real administrator moderation are **not enabled** here.
- The JSON `verification_status` field refers to the state when the official source was reviewed on October 29, 2026. It is **not proof that registration is open now**.

Official resources: https://aistudio.google.com/ , https://ai.google.dev/gemini-api/docs/aistudio-build-mode
