# Rddly / ردلي

Arabic-first Instagram sales workspace built with Next.js 16, React 19 and PostgreSQL.

**Status: development foundation, NOT a completed three-stage product or production-ready SaaS.** The UI and implemented server paths build successfully without credentials. Real account, payment, database and messaging flows still require configuration and integration acceptance tests. Unimplemented connectors are explicitly labelled in the UI.

## Implemented in source

- Arabic RTL responsive workspace, landing page, registration, login, password recovery forms.
- Scrypt password hashes, 30-day hashed session tokens, HttpOnly cookies, same-origin mutations, PostgreSQL rate limits.
- Tenant-scoped CRUD for automations, contacts, products, services, orders, campaign links, knowledge and templates; CSV export with spreadsheet formula escaping.
- Workspace membership roles, switching between agency workspaces, internal audit log.
- Instagram OAuth, encrypted access tokens, webhook verification, comment keyword matching with Arabic normalization, stable A/B reply assignment and duplicate prevention.
- Durable private-reply jobs. Uncertain sends go to manual review instead of blind retry. Minimal worker endpoint.
- Instagram incoming text conversation storage and manual reply within a checked 24-hour window.
- AI reply draft generation from product/knowledge records. Human review is required.
- Public service booking with transaction-level staff lock and overlap checks; admin cancellation.
- Whop checkout/cancellation adapters, verified webhook receiver, payment/commission tables and manual affiliate approval/payout recording.
- First-touch referral cookie (30 days), 25% draft commission policy for 12 months, 14-day hold.
- Setup-aware integration cards; no invented customer data or invented sales metrics.

These are **implemented paths**, not claims that live integrations have passed end-to-end verification.

## Local setup

```sh
npm ci
# Copy .env.example to .env.local and populate values (never commit secrets).
node --env-file=.env.local scripts/migrate.mjs
npm run dev
```

Database migration is explicit, not run inside the build. Use a PostgreSQL connection with TLS configured by the database provider. Never disable certificate verification as a convenience.

```sh
npm test
npm run build
```

## Required configuration

| Variable | Purpose |
| --- | --- |
| DATABASE_URL | PostgreSQL connection; run db/schema.sql before use |
| APP_URL | Exact HTTPS public origin; must match OAuth and mutation origin |
| ENCRYPTION_KEY | 32 random bytes encoded as 64 hex characters; encrypts channel tokens |
| ADMIN_USER_ID | Your users.id UUID, copied after you create your account; never chosen from an unverified email |
| META_APP_ID, META_APP_SECRET | Instagram app credentials |
| META_VERIFY_TOKEN | Random webhook verification value |
| META_API_VERSION | Supported Meta Graph API version, explicitly pinned |
| WHOP_API_KEY, WHOP_WEBHOOK_SECRET | Checkout API and webhook verification |
| WHOP_PLAN_STARTER, WHOP_PLAN_GROWTH, WHOP_PLAN_AGENCY | Existing Whop plan identifiers |
| AI_API_KEY, AI_MODEL, AI_BASE_URL | OpenAI-compatible model endpoint; server-only credentials |
| RESEND_API_KEY, EMAIL_FROM | Recovery emails from a verified sender |
| CRON_SECRET | Protect the worker endpoint; configure a scheduler before live usage |

Generate ENCRYPTION_KEY locally with `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`. Store the value only in your environment secret manager.

Instagram OAuth redirect: `APP_URL/api/connect/instagram/callback`.
Meta webhook: `APP_URL/api/webhooks/meta`, subscribe to comments and messages with the permissions required by the chosen Instagram Login API version.
Whop webhook: `APP_URL/api/webhooks/whop`, API v1. Pin and test the current payload version. Subscribe to membership activation/deactivation and payment success; refund/dispute handling must be acceptance-tested before enabling commissions for real payouts.
Worker: `GET APP_URL/api/worker` with `Authorization: Bearer CRON_SECRET`. It is not scheduled automatically. The webhook attempts an immediate bounded drain after persisting jobs; a scheduler is essential to recover remaining jobs.

## Important unfinished work / launch blockers

- Drag-and-drop branching flow runtime, delays, questions, tag actions, safe outgoing webhooks, attachments/buttons, story/live/ad triggers, stop/opt-out enforcement, automatic token refresh and operational queue recovery.
- Public comment reply field is currently saved but NOT sent; do not advertise it as working.
- Automatic AI conversations, AI flow editor, voice transcription, customer language translation.
- WhatsApp, Messenger, Telegram, Google Calendar/Sheets, Shopify/WooCommerce, Make/Zapier.
- Automatic product recommendations/orders, inventory transactions, store payment attribution, booking reschedule/reminders/deposits and staff availability exceptions.
- Full contact identity reconciliation and automatic CRM creation from every channel event.
- Subscription entitlement/usage enforcement, pricing approved by the owner, billing reconciliation for out-of-order events, partial refunds and disputes, affiliate fraud checks/minimum payout/discount codes/click analytics.
- Email verification, emailed team invitations, account self-deletion and Meta deletion/deauthorization callbacks.
- White-label domains/reports, marketplace purchases/payouts and native mobile apps. The web manifest is not a native app and offline support is not implemented.
- Legal entity/contact details, final privacy/terms/refund/affiliate policies and Meta app review/business verification.
- Database migration and tenant-isolation integration tests against a real PostgreSQL instance; real OAuth, sandbox checkout/refund and delivery tests; monitoring, backups and dependency security review.

Do not accept payments or real customer data until those launch gates are reviewed. Never describe this repository as “all three stages complete” or “only keys remain”.

## Deployment

Vercel project: `rddly` (project ID `prj_FqH258HHPQQSrxbWVlCftU2NFJuv`).
Source of truth: https://github.com/muhammed050/rddly, branch `main`.
Set framework to Next.js, root to repository root, build `npm run build`. Source is also deployed through the connected Vercel deployment tool; do not assume continuous Git deployments are linked unless confirmed in the project settings.

## Verification recorded during creation

- Production build and TypeScript compilation passed.
- 8 engine unit tests passed (Arabic normalization, keyword matching, split consistency, reply window, CSV escaping, commission rounding, safe URL and automation validation).
- No real database or external account credentials were supplied; database/provider flows have NOT been verified live.

## Reference docs

- https://docs.whop.com/developer/guides/webhooks
- https://docs.whop.com/api-reference/payments/payment-succeeded
- https://docs.whop.com/api-reference/checkout-configurations/create-checkout-configuration
- https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/

Meta documentation was intermittently inaccessible during implementation. Verify each scope, API version, token refresh and private-reply constraint against the app dashboard/current official documentation before launch.
