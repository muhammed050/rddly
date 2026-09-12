# Supabase connection

Project: `jbzgpfcvtqjspvuuhogx` (`rddly`, eu-central-1).

The 18 application tables from schema.sql were installed in public on 2026-09-12. RLS is enabled on all of them. anon, authenticated, service_role and PUBLIC have no direct table access. The application uses server-side PostgreSQL sessions, not Supabase Auth or browser Data API calls. Do not add permissive policies to make the frontend access password/session tables.

A transaction-only test inserted a temporary user, workspace and membership and successfully joined them, then rolled back. RLS and anon/authenticated SELECT denial were verified. Advisors report informational RLS-without-policy notices, intentional for this server-only model.

## Remaining connection step

In the Supabase project, choose Connect > Transaction pooler and copy the exact URI, including its actual host. Replace the password placeholder with the database password (URL-encode reserved characters). Add it as encrypted DATABASE_URL in Vercel project rddly for the intended environments, and redeploy. Never put this value in source, NEXT_PUBLIC variables or a public issue.

No database password was supplied or reset. The Vercel runtime connection has NOT yet been completed or tested. Once configured, test registration, login, tenant isolation, record persistence and booking transactions through the deployed app. No migration rerun is needed for this project's current schema.

Docs: https://supabase.com/docs/guides/database/connecting-to-postgres
