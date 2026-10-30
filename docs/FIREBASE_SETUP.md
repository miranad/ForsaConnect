# Firebase integration and activation

This branch preserves the original 25-record JSON catalog and visual system. It replaces browser-only moderation with Firestore submissions, Firebase email/password administrator sign-in, and a two-step approval/publication workflow. Source changes and live activation are tracked separately below.

## Activation progress

The owner approved Firebase terms and Madrid. Project `forsaconnect-e019d` and its Standard `(default)` Firestore database in `europe-southwest1` exist on Spark ($0/month), with billing, optional Analytics, Developer Program enrollment and paid backups disabled. Email/Password, Anonymous and Google Authentication are enabled. The public web configuration is set in the private development environment. Google uses the owner-approved project support address. Only the existing AI Studio preview hostname was added for OAuth. The chosen administrator Google account has completed authentication; the owner-selected administrator role was activated and the live submission, approval and publication workflow was verified in the private preview. Public Hosting and unattended ingestion remain pending.

Cloud Shell returns “Site Unavailable” in this browser. To avoid service-account keys, the owner can activate a verified Firebase user through `administrators/{AUTH_UID}` with boolean `active: true`, using the Firebase console under the existing project-owner account. Every web/mobile client, including app administrators, is denied creating, changing, listing or deleting administrator role records; a verified user can only fetch their own role. Firestore checks this protected record for every moderation operation. Set `active: false` in the owner console to revoke this path immediately. The UI watches server role changes and fails closed on errors or cached-only role snapshots. Server-issued `admin: true` custom claims remain supported for a separately managed trusted-server setup; any such claim must also be revoked when withdrawing that path. No frontend email allowlist confers authority.

Google sign-in requests only the standard profile/email scopes, uses tab/session persistence and handles blocked/cancelled popups. Google sign-in alone never grants administrator access.

## Automatic deadline visibility

The public catalog hides listings with expired, unambiguous deadlines, without deleting source records or database documents. ISO dates (`YYYY-MM-DD`, optionally followed by a parenthetical note without numbers) remain visible through that day in Africa/Casablanca. Exact ISO timestamps must include a timezone (`Z` or numeric offset). Other text, invalid dates, and unclear hours/timezones require manual review and are never guessed. The catalog refreshes the clock every minute and on window focus. This applies to bundled and Firestore listings, home counts, activities, search and detail routes. An accurate device clock and current timezone data are required. This is presentation filtering, not a server-side deletion or access restriction.

## Before activation

Use the existing ForsaConnect Firebase project if one exists. No Firebase projects were listed for the selected Google account during this review. Creating one currently requires accepting Firebase's terms. The owner must authorize that agreement. Obtain explicit approval before choosing a Firestore location: its location cannot be changed after provisioning. Keep billing disabled, do not upgrade the plan, do not enable Analytics or optional Google Developer Program enrollment, and do not deploy Hosting.

1. Register a web app in the selected Firebase project. Copy its public web configuration into the four `VITE_FIREBASE_*` variables documented in `.env.example`. These are web identifiers, not administrator secrets. Never commit private keys, service account JSON, passwords or refresh tokens.
2. Enable Anonymous Authentication for opportunity submitters and Email/Password Authentication for administrators. Visitors do not create passwords or supply personal details.
3. Create Firestore in production mode, after the owner approves its region. Deploy only the reviewed `firestore.rules` with `firebase deploy --only firestore:rules --project EXACT_APPROVED_PROJECT_ID`. Do not use a bare `firebase deploy`.
4. Authenticate the owner-approved administrator using Google, verify its UID against the exact email in Authentication, then use the trusted project-owner console to create `administrators/{UID}` with boolean `active: true`. Do not add that user to project IAM. Alternatively, a trusted server can issue an admin claim. Never trust a frontend email allowlist or allow app clients to edit roles.
5. Sign out and sign back in after activation. Both the UI and Firestore require the verified email and protected role (or trusted server-issued administrator claim). Admin sessions use tab/session persistence. No shared password is embedded in this repository.
6. Test with disposable data in a staging project. Confirm an anonymous submission becomes pending, the admin can inspect its source and write notes, approval does not publish, and a second explicit publication action updates the public catalog. Confirm the original 25 records remain unchanged.
7. Before any public launch, configure abuse protection (for example App Check enforcement after verifying legitimate clients), review Authentication password policy and quotas, and decide how to handle removal of published material. Anonymous Authentication alone does not stop determined spam. Source-URL hashing prevents ordinary duplicate sends, but security rules cannot validate the client-computed hash and do not guarantee malicious duplicates are impossible.

## Data and lifecycle

- `submissions/{id}`: create-only pending submissions from authenticated visitors, private reads for administrators, immutable source fields. Server timestamps and submitter UID are enforced. Review decisions store an internal note, reviewer UID and server timestamp.
- Pending → approved or rejected; approved → published or rejected. Approval and publication are separate actions. Publication writes the public record and final submission state in one Firestore transaction; rules reject incomplete writes or altered public projections.
- `publishedOpportunities/{id}`: public projection without submitter UID or internal review notes. All clients are denied editing and deleting published records in this first increment. Rejected submissions remain private.
- Publication does not claim independently verified registration availability. Original source checking remains a human responsibility.
- The original research catalog is bundled and remains available when Firebase is unconfigured or unreachable. Failed submissions retain entered fields and never show success. Old simulated localStorage approvals are deliberately not imported into the public catalog.
- Admin queries show up to 200 submissions in the selected state; the public subscription retrieves up to 500 published additions. Pagination, history of every review decision, and migration of old local drafts remain future work. Catalog content corrections and reversible withdrawal are supported through protected catalog edit records. Automatic deadline visibility is described above; uncertain free-text deadlines still need review.

## Validation

```sh
npm ci
npm test
npm run typecheck
npm run test:rules
npm run build
```

The Firestore test uses a `demo-forsaconnect` project and an emulator, never production. Firebase CLI 15 requires Java 21 for emulator tests; CI uses Java 21. The final local security test run used an official Temurin Java 21 runtime. Firebase JS 12 and rules-unit-testing 5 support the existing AI Studio Node 22 environment. A compatible gRPC patch is pinned to address upstream advisories. The emulator tests cover anonymous and non-admin restrictions, verified claims, protected owner-managed roles, role revocation, prevention of self-promotion, forged submissions, unsafe URLs, duplicate writes, immutable source fields, allowed review states, private rejection, and atomic public publication.

To test against local Auth and Firestore emulators, use demo project configuration in `.env.local`, set `VITE_USE_FIREBASE_EMULATORS=true`, and run `firebase emulators:start --only auth,firestore --project demo-forsaconnect`. The browser must run on the machine hosting the emulators (127.0.0.1). Production builds ignore this emulator switch.

## Historical initial review results — 30 October 2026

- `npm test`: 7 passed.
- `npm run test:rules`: 6 passed, including the actual application persistence and transaction functions through submission, approval and publication.
- `npm run typecheck` and `npm run build`: passed. Vite reports a large bundle advisory; the Firebase SDK is currently bundled eagerly.
- Browser review: home, catalog, Casablanca filtering, submission form and administrator configuration guard rendered correctly. Narrow iframe previews used CSS widths of 360px, 390px and 768px; inner viewport widths were 352px, 382px and 768px after scrollbars. Each had equal document content and viewport widths, with no horizontal overflow. Desktop catalog also had no horizontal overflow.
- Live Firebase Authentication and cloud submissions have not been tested. No Firebase project, administrator account, custom claim or database was provisioned. The preview intentionally disables submission and admin login until configuration exists. Firestore rules were tested only in the emulator and have not been deployed.
- Google AI Studio's existing ForsaConnect project was opened successfully. Its workspace was not overwritten; source changes are prepared as a tested update package. GitHub branch creation returned HTTP 403 Resource not accessible by integration; no branch or pull request was created.

## Organisation identity

The supplied Voluntary Scout Organization logo is used without image modification in the home brand card, footer and About page. The project is identified as تابع لمنظمة الكشاف التطوعي. A home section lists up to six published opportunities whose organiser matches the organisation name in Arabic or English; it has an honest empty state until activities are provided. The submission form can prefill the organisation name. New activities still require the normal administrator review and publication process; no events or dates have been invented.

## Presentation and discovery updates

Public pages no longer display a fixed catalog review/update date or hardcoded 25-record wording. Actual activity dates and application deadlines remain intact, and live result/filter counts still reflect the catalog. Verification metadata is preserved internally. The ForsaConnect Opportunity Scout automation searches at 09:00 and 18:00 Africa/Casablanca time for the requested opportunity categories, checks official sources and prepares Arabic records. It currently performs discovery only; live writes await the configured backend and a separately authorized automation identity. No shared human administrator credentials are stored in the task.

Final dependency audit: zero high or critical findings; five moderate findings remain in the Firebase CLI development dependency tree. Do not interpret passing tests as a claim of a vulnerability-free dependency tree.


## Full application content administration

The owner selected `elmzourihiba@gmail.com` as the application administrator. Its verified Firebase Auth UID is bound to a protected administrator record; no Google Cloud project-owner or billing permissions are granted by this application role.

The administrator can submit new records, review, approve, reject and publish suggestions, and manage both the original bundled opportunities and later published additions. `catalogEdits/{id}` stores a validated public opportunity plus a `visible` flag, server timestamp and editor UID. Only verified administrators can create/update these records; clients cannot delete records or modify administrator assignments. The public catalog overlays these edits by ID without changing the original JSON. Visibility overrides are never truncated. Initial catalog rendering waits for overrides when Firebase is configured, so a fresh load does not briefly show withdrawn items before the overrides arrive.

In the dashboard, search under إدارة محتوى دليل الفرص, select تعديل وإدارة الظهور, edit the public fields/deadline, choose إظهار الإعلان في الدليل, confirm review and save. Re-enabling visibility does not override an expired deadline: correct the deadline only when supported by the official source. Hiding is reversible catalog withdrawal, not deletion or confidentiality; previously public record data remains readable in Firestore and may exist in earlier caches. Keep private submitter details and review notes out of catalog edits.

Live cloud verification before this extension: anonymous submission received a persisted ID; the verified administrator approved it; the public document did not exist at approval; a separate publication action created the public projection with the expected administrator UID and server timestamp. The clearly labelled internal test used an expired deadline and returned zero public search results after publication. The public catalog retained its 25 original records. The mobile admin and catalog preview had viewport/content widths 367/367 with no horizontal overflow. No website was publicly deployed. The opportunity scout remains discovery/preparation only until a stable public submission endpoint and supported automation write path are configured.

Live full-content verification on 30 October 2026: Google sign-in showed `elmzourihiba@gmail.com` in the dashboard. The administrator withdrew original FC-001, received a Firestore save acknowledgement, and the catalog changed from 25 to 24 entries with FC-001 absent. Restoring visibility received a server acknowledgement and returned the catalog to 25 with FC-001 present. The original JSON remained byte-for-byte unchanged. The administrator changed public notes on the clearly labelled expired internal QA record and withdrew it; it remains archived, not deleted. The mobile editor and dashboard each had viewport/content widths 367/367, with no horizontal overflow. All 12 unit tests, 8 emulator security/workflow tests, TypeScript and production build passed; the large bundle advisory remains. The active cloud rules match the tested rules source SHA256 `85e1bb848e2e22fee5dbf1fa110a578cc905db8b4644b62605bcd772b817948f`.
