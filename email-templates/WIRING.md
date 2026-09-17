# Nova Portal — EmailJS Variable Wiring Reference

> Repo: `nova-portal`. Client-side React/Vite app, no backend.
> Every completed beacon fires **two emails** from `src/utils/email.js`.
> This document maps how a value travels from `.env` to a rendered email,
> and what must change together when you touch it.

---

## The Chain

```
.env (VITE_*)  ?  import.meta.env in src/utils/email.js  ?  template_params object
              ?  POST api.emailjs.com/api/v1.0/email/send  ?  EmailJS template
              ?  {{placeholder}} in Subject / Content / To / Reply To  ?  delivered mail
```

A value that exists in only one of those links **renders blank**. Nothing warns you.

---

## Env Vars (`.env`, gitignored — `.env.example` is the tracked copy)

| Var | Value in use | Consumed at | Notes |
|---|---|---|---|
| `VITE_EMAILJS_SERVICE_ID` | `service_7sr3n07` | both sends | Gmail service |
| `VITE_EMAILJS_PUBLIC_KEY` | `t7RGK3htj8Y8KyxmE` | both sends | sent as `user_id` |
| `VITE_EMAILJS_ADMIN_TEMPLATE_ID` | `template_7o5tasj` | admin send | dashboard name "Admin Triage" (was "Welcome") |
| `VITE_EMAILJS_USER_TEMPLATE_ID` | `template_b3yly2t` | user send | dashboard name "User Welcome" (was "Auto-Reply") |
| `VITE_ADMIN_EMAIL` | `saniarajesh7205@gmail.com` | admin `to_email`, user `reply_to`/`support_email` | |
| `VITE_PORTAL_URL` | `http://localhost:3000` | `portal_url` in both | **change to the deployed URL before shipping**; falls back to `window.location.origin` |

> **Security note.** Every `VITE_*` value is inlined into `dist/assets/*.js` at build time
> and is readable by anyone who opens the site. That is inherent to browser-side EmailJS.
> Protect the quota with the domain allowlist under **Account ? Security**, not by hiding
> these values.

---

## Template 1 — Admin Triage (`template_7o5tasj`)

**Source file:** `email-templates/admin-template_7o5tasj.html`
**Dashboard settings verified:** 2026-09-17

| Setting | Value |
|---|---|
| Subject | `New Registration Received — Nova Portal` |
| To Email | `{{to_email}}` ? probe-verified |
| Reply To | `{{reply_to}}` (changed from hardcoded address — replies now reach the speaker) |
| Bcc | *(cleared — was `{{admin_email}}`, which duplicated every mail to admin)* |
| From Email | Use Default Email Address |

### Placeholder ? Param ? Origin Map

| Placeholder | `template_params` key | Value origin |
|---|---|---|
| `{{to_email}}` | `to_email` | `VITE_ADMIN_EMAIL` |
| `{{reply_to}}` | `reply_to` | user address if it passes `isValidEmail`, else admin |
| `{{admin_email}}` | `admin_email` | `VITE_ADMIN_EMAIL` (alias) |
| `{{name}}` | `name` | chat intake step 1 |
| `{{age}}` | `age` | step 2 |
| `{{location}}` | `location` | step 3 |
| `{{email}}` | `email` | step 4, or `Not Provided` |
| `{{contact_email}}` | `contact_email` | step 4 (used in HTML body) |
| `{{category}}` | `category` | prompt-starter choice, default `General Distress` |
| `{{urgency}}` | `urgency` | `Critical` for grievances, else `High`/`Standard` |
| `{{status}}` | `status` | literal `TRANSMITTED & ACTIVATED` |
| `{{beacon_id}}` | `beacon_id` | generated `NOVA-XXXXXXX` at step 5 |
| `{{grievance}}` | `grievance` | step 5 full text |
| `{{timestamp}}` | `timestamp` | send time, `en-US` locale |
| `{{portal_url}}` | `portal_url` | `VITE_PORTAL_URL` |

---

## Template 2 — User Welcome (`template_b3yly2t`)

**Source file:** `email-templates/user-template_b3yly2t.html`
**Dashboard settings verified:** 2026-09-17

| Setting | Value |
|---|---|
| Subject | `Welcome to Nova Portal` |
| To Email | `{{to_email}}` ? probe-verified (**was `{{user_email}}` until 2026-09-17**) |
| Reply To | `{{reply_to}}` ? resolves to the admin address |
| From Name | `NOVA TEAM` |

### Placeholder ? Param ? Origin Map

| Placeholder | `template_params` key | Value origin |
|---|---|---|
| `{{to_email}}` | `to_email` | the address the user typed at step 4 |
| `{{name}}` | `name` | step 1 |
| `{{user_name}}` | `user_name` | alias of `name` |
| `{{beacon_id}}` | `beacon_id` | same ID as the admin mail — they pair up |
| `{{classification}}` | `classification` | alias of `category` |
| `{{role}}` | `role` | alias of `category` |
| `{{urgency}}` / `{{priority}}` | `urgency` / `priority` | step-5 classification |
| `{{account_status}}` | `account_status` | literal `Active & Transmitted` |
| `{{timestamp}}` | `timestamp` | send time, `en-US` locale |
| `{{support_email}}` | `support_email` | `VITE_ADMIN_EMAIL` |
| `{{portal_url}}` | `portal_url` | `VITE_PORTAL_URL` |

> **This payload must never carry `grievance`, `age`, or `location`.** The user mail is
> a receipt; triage detail belongs only in template 1.

---

## Aliases — Why Duplicates Exist

Each payload sends several names for the same value (`name`/`full_name`/`user_name`,
`id`/`beacon_id`/`user_id`, `category`/`role`, `grievance`/`problem`,
`to_email`/`email`/`user_email`). This is deliberate: the dashboard templates are edited
by hand and a renamed placeholder would otherwise render blank with no error. The aliases
cost nothing.

`to_email` is the one that is genuinely load-bearing — remove it and the API returns
`422 The recipients address is empty`.

Both templates also receive `message`/`content` (plaintext) and `html_message`
(pre-rendered HTML from the generator functions). They are unused while the dashboard
templates hold their own markup. To switch a template to the code-generated body instead,
set its Content to `{{{html_message}}}` — triple braces, or the HTML arrives escaped.

---

## Rules When Changing Anything

1. **New field in an email** ? add it to `template_params` in `src/utils/email.js` AND
   to the dashboard template. One without the other renders blank.
2. **Renaming a placeholder in the dashboard** ? add the new name to `template_params`
   first, deploy, then rename. Never the reverse.
3. **Changing a To Email field** ? the send breaks instantly if the new variable is not in
   the payload. `to_email` is in both payloads; anything else is not guaranteed.
4. **Keep `email-templates/*.html` in sync** with the dashboard. They are the versioned
   copy of what is live; each file's header comment records the dashboard settings and the
   date they were verified.

---

## How to Verify Without Sending Mail

EmailJS rejects non-browser callers on this account (403), so probes need browser headers.
A deliberately malformed recipient tells you which variable the To field reads —
`corrupted` means the variable resolved, `empty` means it did not:

```bash
curl -s -X POST https://api.emailjs.com/api/v1.0/email/send \
  -H 'Content-Type: application/json' \
  -H 'Origin: http://localhost:3000' -H 'Referer: http://localhost:3000/' \
  -H 'User-Agent: Mozilla/5.0 (X11; Linux x86_64) Chrome/126.0 Safari/537.36' \
  -d '{"service_id":"service_7sr3n07","template_id":"template_b3yly2t",
       "user_id":"t7RGK3htj8Y8KyxmE","template_params":{"to_email":"bad-addr"}}'
```

Placeholder/param parity check: extract `{{...}}` from each file in `email-templates/`
and diff against the keys of the matching `template_params` object in `src/utils/email.js`.
Every placeholder needs a source; params with no consumer are the intentional aliases above.

To exercise the real dispatcher in Node, copy `src/utils/email.js` with `import.meta.env`
rewritten to a `globalThis.__ENV` object, wrap `globalThis.fetch` to inject the three
browser headers, then call `sendNovaBeaconEmail(...)`. Mock the fetch to test the failure
paths (invalid recipient, non-2xx, thrown network error) without spending quota — the free
tier is 200 requests/month.

---

## Downstream Consumer

`sendNovaBeaconEmail` resolves `{ adminSent, userSent }`.

`ChatGptPortal.jsx` receives this result and passes it to `BeaconReceipt` as
`beaconData.emailStatus`, which drives:
- The two status lines on the receipt UI.
- The `Admin Triage Email: Delivered|Failed` lines in the downloaded PDF.

**If you change the shape of that return value, these three places change with it:**
- `src/components/ChatGptPortal.jsx` — dispatch result handler
- `src/components/BeaconReceipt.jsx` — receipt UI status lines
- The jsPDF generation block inside `BeaconReceipt.jsx` — PDF status lines

---

*Last verified: 2026-09-17. Update this file whenever you verify or change dashboard settings.*
