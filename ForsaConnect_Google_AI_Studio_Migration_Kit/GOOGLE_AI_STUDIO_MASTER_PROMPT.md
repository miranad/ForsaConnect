# Paste this into Google AI Studio → Build

You are the implementation agent for **ForsaConnect**, a Moroccan nonprofit youth-opportunities web platform. Build a working web application in **React** (web, not native Android), using the attached project specification, branded logo, Arabic research data, and Version 3 reference screenshots. Preserve the established V3 visual identity: Arabic RTL, youth-focused blue/green palette (#1667A5, #259A6A, #F5F8FC), Cairo Bold headings, Tajawal body text, open-door/road logo. Tagline: «طريقك نحو الفرص». Do **not** rename the platform.

IMPORTANT MIGRATION PRIORITY:
- If the original **Claude Version 3 exported source** is available in this workspace or imported GitHub repository, **inspect and preserve the existing codebase**, routes and components, rather than replacing it. Adapt rather than restart.
- If only screenshots/references are available, say explicitly that this is a reconstruction and use the included `starter_web_app` as the functional baseline. Screenshots are not source code.

DATA:
- Load the 25 real researched entries from `data/ForsaConnect_25_Opportunities_Research.json` or `src/data/opportunities.json` (17 Morocco, 3 international, 5 remote). Read the actual data, do not invent listings.
- Preserve original organizer, title, Arabic description, eligibility, location, dates, price/support, notes, and `source_url` for every entry. Check that each card has an official-link button. Do not link to Instagram reposts as if they were original opportunities.
- Source review date is 2026-10-29; do not claim 'currently open' without a fresh independent check. Clearly mark examples or unverified availability. Differentiate activity date versus application deadline.
- Preserve actual survey counts (sample 7): 6/7 missed an opportunity, 5/7 would use the platform, 7/7 interested in optional fee-based workshops; do not generalize.

USER EXPERIENCE:
- Excellent responsive Arabic RTL layout first, readable on 360px mobile and desktop. Accessible controls, search by keyword, filter by Morocco/international/remote, category, and city. Expandable detail views or proper detail route.
- Short welcoming homepage with real logo, browse CTA, opportunities section, submit opportunity, about/trust, partners and contact. No pretend partners or fake contact address.
- External official links open safely in new tab. Make loading/empty/error states useful.

REAL FUNCTIONALITY STAGES:
1. Start with an interactive preview and ensure all 25 imported listings are visible, searchable and filterable. Do not claim live data.
2. After confirming basic UI, integrate Google AI Studio **Firebase Firestore + Firebase Authentication** (Google Sign-In) for persistent shared data. The agent may provision these; explain any permission steps. Implement protected admin role with security rules and/or server authorization; public users can only view approved records. No admin via client-only password.
3. Submission form: server-side validation, anti-spam, avoid unnecessary personal data, save proposals as **pending**; only authorized admins approve/edit/reject/archive. Do not accept untrusted user URLs without validation. Add duplicate checks and audit timestamps.
4. Import seed dataset with approved status only after an admin reviews correctness and recency; otherwise flag `needs_review` and prevent misleading publication.
5. Test cross-device persistence: submit on one browser, approve on another admin account, show publicly on third; test negative cases; describe exact results and unknowns.
6. Add security/privacy notices, especially protecting minors, and deployment checklist. Do not publish or configure paid cloud resources without my explicit approval.

PROJECT DELIVERABLES:
- Working preview; source files; list of implemented vs simulated features; data-import count 25 and scope counts 17/3/5; links/error/expiry audit; steps and costs/requirements for Firebase and hosting.
- Keep responding in English for technical updates, but public-facing UI and opportunity descriptions should be fully Arabic (official brand/organization names may remain original).

FIRST ACTION: inspect the files, summarize the app and what is missing, then construct or enhance the responsive preview. Do not start backend deployment before confirming the UI stage.
