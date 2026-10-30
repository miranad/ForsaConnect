# Preserving the **actual Claude Version 3**

**Recommended route:**
1. In the Claude conversation that contains the Version 3 artifact, open the artifact's code view and use any available **Download / Export** action to save the source. If Claude only offers a single code file, save that file; ask Claude to provide all files needed to run it as a ZIP, including assets and package metadata. Do not assume the exported file is a full source repository.
2. Keep a safe offline backup. Check for package.json, HTML entry, source components, dependencies and image files. Exclude any keys, passwords, .env files, private customer information before uploading to GitHub.
3. In GitHub, create a private repository and commit **the exported Claude project** at its root. If it is a single JSX/HTML component, include a runnable package scaffold; Claude can generate the missing wiring.
4. In Google AI Studio open **Build**, click the **+** add-files menu in the prompt box, select **Import from GitHub**, and choose the repository. This is the official documented code-import method, not direct ZIP upload.
5. After import, paste the Google AI Studio master prompt with the spec/dataset/logo as reference. Make sure the prompt says **preserve the imported source**.

**Alternative if you cannot export from Claude:**
- Use `starter_web_app/` inside this package; it is a reconstructed React/Vite prototype, **NOT Version 3 source**. Upload its contents into a GitHub repository and import the repo into Google AI Studio. Or start with a blank web Build and paste the master prompt, attaching screenshots/JSON/logo as inputs where supported.

**Google AI Studio supports:** React web app generation, Node server functionality, Firebase Firestore and Authentication integration, source export and GitHub import/sync. AI Studio can help add these features, but public deployment, correct rules, and operational testing remain separate tasks.

Official docs: https://ai.google.dev/gemini-api/docs/aistudio-build-mode
https://ai.google.dev/gemini-api/docs/aistudio-fullstack.md
