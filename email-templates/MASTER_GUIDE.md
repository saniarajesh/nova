# Nova Portal — EmailJS Master Prompt & Replication Guide

Hand this file to a person or an agent setting the Nova Portal email system up on a new
machine. It describes the whole pipeline — env, code, payloads, dashboard, verification —
against the **same EmailJS account and the same two templates** that are live today.
Nothing here needs to be rediscovered; everything below was verified against the live API
on 2026-09-17.

---

## 1. What the System Does

Every completed beacon in the AI Dispatch Portal sends **two different emails from two
different EmailJS templates**. They are not interchangeable.

| # | Purpose | Template ID | Env var | Recipient | Reply-To | Carries the grievance? |
|---|---|---|---|---|---|---|
| 1 | Admin triage alert | `template_7o5tasj` | `VITE_EMAILJS_ADMIN_TEMPLATE_ID` | the admin address | the user | **yes** — full case file |
| 2 | User welcome / confirmation | `template_b3yly2t` | `VITE_EMAILJS_USER_TEMPLATE_ID` | the address the user typed | the admin | **no** — receipt only |

Both go out from the browser. There is no backend, no server key, no queue.

---

## 2. The Chain a Value Travels

```
.env (VITE_*)
  ? import.meta.env in src/utils/email.js
    ? template_params object (one per template)
      ? POST https://api.emailjs.com/api/v1.0/email/send
        ? EmailJS template: Subject / Content / To Email / Reply To
          ? {{placeholder}} substitution
            ? delivered mail
```

A name that exists in only one of those links renders **blank, silently**. There is no
warning, no error, no log. This is the single most important fact about EmailJS.

---

## 3. Files That Matter

| Path | Role |
|---|---|
| `src/utils/email.js` | `sendNovaBeaconEmail(userData)` — both sends, both HTML generators |
| `src/components/ChatGptPortal.jsx` | the only caller; 5-step chat intake, dispatch at step 5 |
| `src/components/BeaconReceipt.jsx` | renders delivery status, generates the PDF receipt |
| `email-templates/admin-template_7o5tasj.html` | versioned copy of dashboard template 1 |
| `email-templates/user-template_b3yly2t.html` | versioned copy of dashboard template 2 |
| `email-templates/WIRING.md` | concise placeholder/param map and change rules |
| `.env` | live credentials — **gitignored, never committed** |
| `.env.example` | the tracked template of `.env` |

`src/components/Chatbot.jsx` also contains an intake form but is **not mounted** in
`App.jsx`. It sends no email. Ignore it.

---

## 4. Environment

`.env` in the project root. Vite only exposes variables prefixed `VITE_`, and it reads the
file **at dev-server startup** — restart `npm run dev` after any change.

```env
VITE_EMAILJS_SERVICE_ID=service_7sr3n07
VITE_EMAILJS_PUBLIC_KEY=t7RGK3htj8Y8KyxmE
VITE_EMAILJS_ADMIN_TEMPLATE_ID=template_7o5tasj
VITE_EMAILJS_USER_TEMPLATE_ID=template_b3yly2t
VITE_ADMIN_EMAIL=saniarajesh7205@gmail.com
VITE_PORTAL_URL=https://nova-inky-beta.vercel.app/
```

`src/utils/email.js` hardcodes these same values as fallbacks, so the app still works if
`.env` is missing — which also means a typo in `.env` fails quietly rather than loudly.

**`VITE_PORTAL_URL` is the one to change per environment.** It is the href of the "Open
Nova Portal" button in both emails. Set it to the deployed URL before shipping; an
unset value falls back to `window.location.origin`.

### Security Reality

Every `VITE_*` value is inlined into `dist/assets/*.js` at build time and is readable by
anyone who opens the site. That is inherent to browser-side EmailJS — the public key is
designed to be public. Do not attempt to hide it. Protect the account instead:

- EmailJS dashboard ? Account ? Security ? **domain allowlist** for the deployed domain.
- Leave **"Allow API access from non-browser environments" OFF** (it is off today). It
  only affects curl/server callers, never the app.
- Free tier is **200 requests/month**. Check Statistics before load-testing.

---

## 5. The Two Templates, as Configured in the Dashboard

Verified live 2026-09-17 by API probe plus dashboard screenshots.

### Template 1 — Admin Triage, `template_7o5tasj`

| Dashboard field | Value |
|---|---|
| Template name | "Welcome" (misleading — rename to "Admin Triage") |
| Subject | `New Registration Received — Nova Portal` |
| To Email | `{{to_email}}` |
| Reply To | `{{reply_to}}` |
| Bcc | empty (was `{{admin_email}}`, which duplicated every mail) |
| From Email | Use Default Email Address |

Placeholders used by the content: `{{to_email}}`, `{{reply_to}}`, `{{admin_email}}`,
`{{name}}`, `{{age}}`, `{{location}}`, `{{email}}`, `{{category}}`, `{{urgency}}`,
`{{beacon_id}}`, `{{grievance}}`, `{{timestamp}}`, `{{portal_url}}`.

### Template 2 — User Welcome, `template_b3yly2t`

| Dashboard field | Value |
|---|---|
| Template name | "Auto-Reply" (rename to "User Welcome") |
| Subject | `Welcome to Nova Portal` |
| To Email | `{{to_email}}` — **was `{{user_email}}` until 2026-09-17** |
| Reply To | `{{reply_to}}` ? resolves to the admin |
| From Name | `NOVA TEAM` |

Placeholders used by the content: `{{to_email}}`, `{{user_name}}`, `{{name}}`,
`{{beacon_id}}`, `{{role}}`, `{{urgency}}`, `{{account_status}}`,
`{{registration_date}}`, `{{registration_time}}`, `{{support_email}}`, `{{portal_url}}`.

---

## 6. Variable Map — Payload Key ? Placeholder ? Origin

### Admin Payload (`template_7o5tasj`)

| Key sent | Placeholder | Where the value comes from |
|---|---|---|
| `to_email` | `{{to_email}}` | `VITE_ADMIN_EMAIL` — **load-bearing** |
| `reply_to` | `{{reply_to}}` | the user's address if it passes `isValidEmail`, else admin |
| `admin_email` | `{{admin_email}}` | `VITE_ADMIN_EMAIL` |
| `name`, `full_name`, `user_name` | `{{name}}` | chat intake step 1 |
| `age` | `{{age}}` | step 2 |
| `location` | `{{location}}` | step 3 |
| `email`, `user_email` | `{{email}}` | step 4, or `Not Provided` |
| `contact_email` | `{{contact_email}}` | step 4 (used in HTML body) |
| `category`, `role` | `{{category}}` | prompt-starter choice, default `General Distress` |
| `urgency` | `{{urgency}}` | `Critical` for grievances, else `High` / `Standard` |
| `status` | `{{status}}` | literal `TRANSMITTED & ACTIVATED` |
| `beacon_id`, `id`, `user_id` | `{{beacon_id}}` | generated `NOVA-XXXXXXX` at step 5 |
| `grievance`, `problem` | `{{grievance}}` | step 5 |
| `timestamp` | `{{timestamp}}` | send time, `en-US` locale |
| `registration_date`, `registration_time` | — | send time, split |
| `portal_url` | `{{portal_url}}` | `VITE_PORTAL_URL` |
| `message`, `content` | — | plaintext body, unused while the dashboard holds its own markup |
| `html_message` | — | pre-rendered HTML from `generateAdminNotificationHtml` |

### User Payload (`template_b3yly2t`)

| Key sent | Placeholder | Where the value comes from |
|---|---|---|
| `to_email` | `{{to_email}}` | the address typed at step 4 — **load-bearing** |
| `reply_to` | `{{reply_to}}` | `VITE_ADMIN_EMAIL` |
| `name`, `full_name`, `user_name` | `{{user_name}}`, `{{name}}` | step 1 |
| `beacon_id`, `id`, `user_id` | `{{beacon_id}}` | same ID as the admin mail — they pair up |
| `classification`, `role`, `category` | `{{role}}` | step-5 classification |
| `urgency`, `priority` | `{{urgency}}` | step-5 classification |
| `account_status` | `{{account_status}}` | literal `?? Active & Transmitted` |
| `registration_date`, `registration_time`, `timestamp` | `{{registration_date}}`, `{{registration_time}}` | send time |
| `support_email`, `admin_email` | `{{support_email}}` | `VITE_ADMIN_EMAIL` |
| `portal_url` | `{{portal_url}}` | `VITE_PORTAL_URL` |
| `message`, `content`, `html_message` | — | alternate bodies, unused today |

> **This payload must never carry `grievance`, `age` or `location`.** The user mail is a
> receipt; triage detail belongs only in the admin mail.

### Why the Aliases Exist

Several names carry the same value on purpose. The dashboard templates are hand-edited by
a human, and a renamed placeholder would otherwise render blank with no error anywhere.
The aliases cost nothing and absorb that class of mistake. `to_email` is the one that is
genuinely required — remove it and the API answers `422 The recipients address is empty`.

### Switching a Template to the Code-Generated HTML

Both payloads carry `html_message`, a fully rendered email built in `src/utils/email.js`.
To use it instead of the dashboard's own markup, set that template's Content to
`{{{html_message}}}` — **triple braces**, or the HTML arrives escaped as visible tags.

---

## 7. Dispatch Behavior — the Contract

`sendNovaBeaconEmail(userData)` resolves `{ adminSent, userSent }` and never throws.

| Input | Admin mail | User mail |
|---|---|---|
| valid user email | sent | sent |
| blank user email | sent, `reply_to` falls back to admin | skipped |
| malformed email (`not-an-email`) | sent, `reply_to` falls back to admin | skipped |
| admin send returns non-2xx | attempted, `adminSent: false` | still attempted |
| admin send throws | attempted, `adminSent: false` | still attempted |

Rules the implementation must keep:

- One `isValidEmail` regex (`/^[^\s@]+@[^\s@]+\.[^\s@]+$/`) drives **both** the
  user-send gate and the reply-to choice. Never emit a malformed `reply_to` — EmailJS
  answers `422 The recipients address is corrupted`.
- **600 ms delay** between the two sends, or EmailJS throttles the second one.
- Independent `try`/`catch` per send — one failure must not suppress the other.
- The dispatch is **not** conditional on unrelated props. An earlier version sat inside
  `if (onComplete) { ... }`, so a missing callback meant zero emails with no error.
- `ChatGptPortal` captures the result via `.then(result => setEmailNotificationSent(result))`.
  The receipt renders two status lines from it, and the PDF prints
  `Admin Triage Email: Delivered|Failed` / `User Confirmation Email: Delivered|Not delivered`.
  Changing the return shape means changing all three places:
  - `src/components/ChatGptPortal.jsx` — dispatch result handler
  - `src/components/BeaconReceipt.jsx` — receipt UI status lines
  - The jsPDF generation block inside `BeaconReceipt.jsx` — PDF status lines

---

## 8. Replicating on a New Machine

The EmailJS account, service and both templates already exist and are shared —
**do not create new ones**, or the IDs stop matching this document.

```bash
git clone git@github.com:saniarajesh/nova.git
cd nova
npm install
cp .env.example .env          # then fill in the values from section 4
npm run dev                   # http://localhost:3000
```

Then, without spending a single send:

1. Confirm the env reached the bundle:
   ```bash
   npm run build
   grep -l service_7sr3n07 dist/assets/*.js
   ```
2. Confirm both templates still read `{{to_email}}` (section 9).
3. Confirm placeholder/param parity (section 9).
4. Walk the chat intake with a real address you can check, and read the console for
   `[Nova Dispatch] ...` lines.

`.env` is gitignored, so it never arrives with the clone. Copy it across out of band, or
retype it from section 4. Do not email it to yourself through this very system.

---

## 9. Verification Without Spending Quota

### Which Variable Does a To Email Field Read?

EmailJS rejects non-browser callers on this account, so a probe needs browser headers. A
deliberately malformed recipient tells you whether the variable resolved — `corrupted`
means yes, `empty` means the field is reading some **other** name:

```bash
curl -s -X POST https://api.emailjs.com/api/v1.0/email/send \
  -H 'Content-Type: application/json' \
  -H 'Origin: http://localhost:3000' -H 'Referer: http://localhost:3000/' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) Chrome/126.0 Safari/537.36' \
  -d '{"service_id":"service_7sr3n07","template_id":"template_b3yly2t",
       "user_id":"t7RGK3htj8Y8KyxmE","template_params":{"to_email":"bad-addr"}}'
```

No mail is sent — the request dies at address validation. Swap `to_email` for any other
name to discover what a mystery template actually expects.

### Placeholder / Param Parity

Extract `{{...}}` from each file in `email-templates/`, diff against the keys of the
matching `template_params` object in `src/utils/email.js`, and report **both** directions.
Every placeholder needs a source. Params with no consumer are the aliases from section 6.

### Exercising the Real Dispatcher in Node

Copy `src/utils/email.js` with `import.meta.env` rewritten to a `globalThis.__ENV`
object, wrap `globalThis.fetch` to inject the three browser headers, then call
`sendNovaBeaconEmail(...)`. Mock the fetch to walk every failure path from section 7
without touching the quota.

---

## 10. Error Dictionary

| Response | Meaning | Fix |
|---|---|---|
| `422 The recipients address is empty` | To Email field reads a variable not in the payload | add that key, or point the field at `{{to_email}}` |
| `422 The recipients address is corrupted` | the variable resolved but the value is not a valid address | gate it behind `isValidEmail` |
| `400 The template ID not found` | wrong `template_id` for this service | check `.env` against the dashboard |
| `400 The Public Key is invalid` | wrong `user_id` | copy it from Account ? General |
| `403 API access from non-browser environments is currently disabled` | a curl/server call with no browser headers | expected; add `Origin`/`Referer`/`User-Agent`, or leave the account setting off |
| `200 OK` but nothing arrives | accepted and then lost downstream | Email History tab ? per-mail status; then Spam/Promotions; then the Suppressions tab |

`200 OK` means EmailJS accepted the request, **not** that a human received mail.
Email History is the only source of truth for delivery.

---

## 11. Rules for Changing Anything Later

1. **New field in an email** ? add it to `template_params` in `src/utils/email.js` **and**
   to the dashboard template. One without the other renders blank.
2. **Renaming a placeholder in the dashboard** ? add the new name to `template_params`
   first, deploy, *then* rename. Never the reverse.
3. **Changing a To Email field** ? the send breaks instantly if the new variable is not in
   the payload. Only `to_email` is guaranteed present in both.
4. **Keep `email-templates/*.html` in sync** with the dashboard. They are the versioned
   record of what is live; each file's header comment carries the dashboard settings and
   the date they were verified. Update that date when you re-verify.
5. **Never put the grievance in the user payload.**
6. **Never commit `.env`.** It is covered by `.gitignore`.

---

*Last verified: 2026-09-17. Update this file whenever you verify or change dashboard settings.*
