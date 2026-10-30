# Firebase integration and activation

This branch preserves the original 25-record JSON catalog and visual system. It replaces browser-only moderation with Firestore submissions, Firebase email/password administrator sign-in, and a two-step approval/publication workflow. Source changes and live activation are tracked separately below.

## Activation progress

The owner approved accepting Firebase terms and creating the database in Madrid. Project `forsaconnect-e019d` and its Standard `(default)` Firestore database in `europe-southwest1` now exist on Spark ($0/month), with optional Analytics, Developer Program enrollment, paid backups and billing left disabled. The database was initialized in production mode (deny all client access). Email/Password and Anonymous Authentication were enabled, and the existing web client registered. Public web configuration was set in the private development environment, never administrator credentials. Reviewed application rules, administrator provisioning, live workflow validation, unattended ingestion and public Hosting publication remain pending.

## Automatic deadline visibility

The public catalog hides listings with expired, unambiguous deadlines, without deleting source records or database documents. ISO dates (`YYYY-MM-DD`, optionally followed by a parenthetical note without numbers) remain visible through that day in Africa/Casablanca. Exact ISO timestamps must include a timezone (`Z` or numeric offset). Other text, invalid dates, and unclear hours/timezones require manual review and are never guessed. The catalog refreshes the clock every minute and on window focus. This applies to bundled and Firestore listings, home counts, activities, search and detail routes. An accurate device clock and current timezone data are required. This is presentation filtering, not a server-side deletion or access restriction.

## Before activation

Use the existing ForsaConnect Firebase project if one exists. No Firebase projects were listed for the selected Google account during this review. Creating one currently requires accepting Firebase's terms. The owner must authorize that agreement. Obtain explicit approval before choosing a Firestore location: its location cannot be changed after provisioning. Keep billing disabled, do not upgrade the plan, do not enable Analytics or optional Google Developer Program enrollment, and do not deploy Hosting.

1. Register a web app in the selected Firebase project. Copy its public web configuration into the four `VITE_FIREBASE_*` variables documented in `.env.example`. These are web identifiers, not administrator secrets. Never commit private keys, service account JSON, passwords or refresh tokens.
2. Enable Anonymous Authentication for opportunity submitters and Email/Password Authentication for administrators. Visitors do not create passwords or supply personal details.
3. Create Firestore in production mode, after the owner approves its region. Deploy only the reviewed `firestore.rules` with `firebase deploy --only firestore:rules --project EXACT_APPROVED_PROJECT_ID`. Do not use a bare `firebase deploy`.
4. Create the administrator account using a trusted owner-operated process, verify its email, and set its `admin: true` custom claim using the Admin SDK in a trusted environment. Preserve any existing claims. Never set claims from browser code or trust a frontend email allowlist. The user must authorize the exact account that receives administrator access.
5. Sign out and sign back in after setting the claim. Both the UI and Firestore require the verified email and administrator claim. Admin sessions use tab/session persistence. No shared password is embedded in this repository.
6. Test with disposable data in a staging project. Confirm an anonymous submission becomes pending, the admin can inspect its source and write notes, approval does not publish, and a second explicit publication action updates the public catalog. Confirm the original 25 records remain unchanged.
7. Before any public launch, configure abuse protection (for example App Check enforcement after verifying legitimate clients), review Authentication password policy and quotas, and decide how to handle removal of published material. Anonymous Authentication alone does not stop determined spam. Source-URL hashing prevents ordinary duplicate sends, but security rules cannot validate the client-computed hash and do not guarantee malicious duplicates are impossible.

## Data and lifecycle

- `submissions/{id}`: create-only pending submissions from authenticated visitors, private reads for administrators, immutable source fields. Server timestamps and submitter UID are enforced. Review decisions store an internal note, reviewer UID and server timestamp.
- Pending → approved or rejected; approved → published or rejected. Approval and publication are separate actions. Publication writes the public record and final submission state in one Firestore transaction; rules reject incomplete writes or altered public projections.
- `publishedOpportunities/{id}`: public projection without submitter UID or internal review notes. All clients are denied editing and deleting published records in this first increment. Rejected submissions remain private.
- Publication does not claim independently verified registration availability. Original source checking remains a human responsibility.
- The original research catalog is bundled and remains available when Firebase is unconfigured or unreachable. Failed submissions retain entered fields and never show success. Old simulated localStorage approvals are deliberately not imported into the public catalog.
- Admin queries show up to 200 submissions in the selected state; the public subscription retrieves up to 500 published additions. Pagination, withdrawal of published items, history of every review decision, and migration of old local drafts are future work. Automatic deadline visibility is described above; uncertain free-text deadlines still need review.

## Validation

```sh
npm ci
npm test
npm run typecheck
npm run test:rules
npm run build
```

The Firestore test uses a `demo-forsaconnect` project and an emulator, never production. Firebase CLI 15 requires Java 21 for emulator tests; CI uses Java 21. The final local security test run used an official Temurin Java 21 runtime. Firebase JS 12 and rules-unit-testing 5 support the existing AI Studio Node 22 environment. A compatible gRPC patch is pinned to address upstream advisories. The emulator tests cover anonymous and non-admin restrictions, verified claims, forged submissions, unsafe URLs, duplicate writes, immutable source fields, allowed review states, private rejection, and atomic public publication.

To test against local Auth and Firestore emulators, use demo project configuration in `.env.local`, set `VITE_USE_FIREBASE_EMULATORS=true`, and run `firebase emulators:start --only auth,firestore --project demo-forsaconnect`. The browser must run on the machine hosting the emulators (127.0.0.1). Production builds ignore this emulator switch.

## Review results — 30 October 2026

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
