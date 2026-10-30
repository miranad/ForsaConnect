# Input field schema

`ForsaConnect_25_Opportunities_Research.json` contains `{platform, verified_on, count, opportunities:[...]}`.

Each record: `id`, `title_ar`, `category`, `scope`, `location`, `organization`, `description_ar`, `eligibility_ar`, `event_date`, `application_deadline`, `cost_ar`, `application_method_ar`, `verification_status`, `source_url`, `notes_ar`, `verified_on`.

Add `moderationStatus='needs_review'`, `registrationStatus='unconfirmed'` and individual fresh verification timestamp **when seeding a real backend**, rather than assuming existing records are open.
