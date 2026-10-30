# Google AI Studio — follow-up prompts (send one phase at a time)

## Phase 1 — verify the UI and imported records
Review this ForsaConnect application. Confirm all 25 records from the provided research dataset are visible and filters return 17 Morocco, 3 international, 5 remote. Test search + combined filters, opportunity detail views, official links, Arabic RTL/mobile layout. Mark current registration availability as unconfirmed unless a fresh official source explicitly confirms open applications. Give me a QA report and correct errors in code. Do not change brand design.

## Phase 2 — Firebase cloud backend
Now add **Cloud Firestore and Firebase Authentication** using Google AI Studio's native Firebase integration. Ask me to approve any project/account provisioning. Create `opportunities`, `submissions`, and `adminRoles`/claims with secure rules. Guests may read approved opportunities only and submit a limited validated pending record; they may not edit published records. Only authenticated authorized admins may edit, approve, reject, and archive. Add timestamps and a clear privacy policy. Never put admin secrets in client code. Explain exact access rules and how to test them before claiming it is secure.

## Phase 3 — migration/seeding and audit
Import the 25 JSON seed records with `moderationStatus: needs_review` and `registrationStatus: unconfirmed` unless newer verified evidence exists. Preserve original links and record IDs, skip duplicates on repeated imports. Provide a secure admin-only review and bulk approval workflow. Test that a rejected or unapproved record is invisible publicly.

## Phase 4 — deploy only after approval
Prepare but **do not execute a paid deployment without asking me**. Test end-to-end public submissions on another device, admin login and approval, and public visibility; check URL safety, spam controls and user privacy. Present a written list of deployed features, known limitations, hosting choice, recurring costs, and the public URL verification steps.
