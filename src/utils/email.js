/**
 * ============================================================================
 * NOVA DISPATCH ENGINE — EMAIL NOTIFICATION SERVICE
 * ============================================================================
 * Handles real-time dual dispatch via EmailJS:
 *  1. Admin Notification (template_7o5tasj) -> VITE_ADMIN_EMAIL
 *  2. User Welcome Email (template_b3yly2t) -> User's registered email
 * ============================================================================
 */

export const generateUserWelcomeHtml = (params) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>✦ Welcome to Nova Portal</title>
</head>
<body style="margin: 0; padding: 24px 0; background-color: #030005; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased; color: #f8fafc;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #030005;">
    <tr>
      <td align="center" style="padding: 16px;">
        <!-- Email Container -->
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #09020a; border: 1px solid #7f1d1d; border-radius: 16px; overflow: hidden; box-shadow: 0 10px 40px rgba(185, 28, 28, 0.25);">
          
          <!-- Banner / Header with Nova Emblem -->
          <tr>
            <td style="background: linear-gradient(135deg, #450a0a 0%, #1c0303 50%, #2e0854 100%); padding: 36px 28px; text-align: center; border-bottom: 2px solid #d97706;">
              <div style="display: inline-block; padding: 10px 18px; background: rgba(0, 0, 0, 0.5); border: 1px solid #f59e0b; border-radius: 9999px; margin-bottom: 14px;">
                <span style="color: #fbbf24; font-size: 13px; font-weight: 700; letter-spacing: 2.5px; text-transform: uppercase;">✦ NOVA PORTAL ✦</span>
              </div>
              <h1 style="color: #ffffff; font-size: 26px; font-weight: 800; margin: 0; letter-spacing: 0.5px; line-height: 1.2;">
                Welcome to Nova Portal
              </h1>
              <p style="color: #fca5a5; font-size: 14px; margin: 10px 0 0 0; font-weight: 500; letter-spacing: 0.5px;">
                Your journey with Nova begins here. 🚀
              </p>
            </td>
          </tr>

          <!-- Main Welcome Content -->
          <tr>
            <td style="padding: 32px 28px; background: #09020a; background-image: radial-gradient(circle at 50% 0%, rgba(220, 38, 38, 0.12) 0%, transparent 75%);">
              
              <p style="color: #f1f5f9; font-size: 16px; line-height: 1.7; margin: 0 0 16px 0;">
                Hello <strong style="color: #fbbf24;">${params.name}</strong>,
              </p>

              <p style="color: #e2e8f0; font-size: 15px; line-height: 1.7; margin: 0 0 24px 0;">
                Your registration has been successfully completed. Welcome to the Nova Portal family — we're excited to have you on board!
              </p>

              <!-- Mission Highlight Callout -->
              <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background: linear-gradient(90deg, rgba(153, 27, 27, 0.2) 0%, rgba(88, 28, 135, 0.2) 100%); border-left: 4px solid #f59e0b; border-radius: 0 10px 10px 0; margin: 20px 0;">
                <tr>
                  <td style="padding: 16px 20px;">
                    <div style="color: #fbbf24; font-size: 16px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase;">
                      Explore. Connect. Grow.
                    </div>
                    <div style="color: #cbd5e1; font-size: 13px; margin-top: 6px; line-height: 1.5;">
                      Your beacon signal has been harmonized with the constellation network.
                    </div>
                  </td>
                </tr>
              </table>

              <!-- Registration Record Card -->
              <div style="margin: 28px 0 20px 0;">
                <div style="color: #f87171; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 12px;">
                  ▶ REGISTRATION DETAILS
                </div>
                <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-radius: 10px;">
                  <tr>
                    <td style="padding: 16px 20px;">
                      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="font-size: 13px; line-height: 1.8;">
                        <tr>
                          <td style="color: #94a3b8; width: 40%; font-weight: 500;">Beacon / User ID:</td>
                          <td style="color: #fbbf24; font-family: monospace; font-weight: 700;">${params.beacon_id}</td>
                        </tr>
                        <tr>
                          <td style="color: #94a3b8; font-weight: 500;">Registered Name:</td>
                          <td style="color: #ffffff; font-weight: 600;">${params.name}</td>
                        </tr>
                        <tr>
                          <td style="color: #94a3b8; font-weight: 500;">Classification:</td>
                          <td style="color: #c084fc;">${params.classification}</td>
                        </tr>
                        <tr>
                          <td style="color: #94a3b8; font-weight: 500;">Priority:</td>
                          <td style="color: #fca5a5; font-weight: 600;">${params.priority}</td>
                        </tr>
                        <tr>
                          <td style="color: #94a3b8; font-weight: 500;">Account Status:</td>
                          <td style="color: #34d399; font-weight: 600;">${params.account_status}</td>
                        </tr>
                        <tr>
                          <td style="color: #94a3b8; font-weight: 500;">Timestamp:</td>
                          <td style="color: #cbd5e1;">${params.timestamp}</td>
                        </tr>
                      </table>
                    </td>
                  </tr>
                </table>
              </div>

              <!-- Grievance / Story Section -->
              <div style="margin: 24px 0;">
                <div style="color: #f87171; font-size: 12px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; margin-bottom: 10px;">
                  ▶ SUBMITTED GRIEVANCE / STORY DETAILS
                </div>
                <div style="background: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.08); border-left: 4px solid #f59e0b; border-radius: 0 10px 10px 0; padding: 16px 20px; color: #f1f5f9; font-size: 14px; line-height: 1.6;">
                  ${(params.grievance || params.story || params.problem || 'No details provided.').replace(/\n/g, '<br/>')}
                </div>
              </div>

              <!-- Assistance & Support Note -->
              <p style="color: #cbd5e1; font-size: 14px; line-height: 1.7; margin: 24px 0 20px 0;">
                For any assistance, contact us at <a href="mailto:${params.support_email}" style="color: #fbbf24; text-decoration: none; font-weight: 600;">${params.support_email}</a>.
              </p>

              <div style="text-align: center; margin: 30px 0;">
                <a href="${params.portal_url}" style="background: linear-gradient(135deg, #b91c1c 0%, #f59e0b 100%); color: #ffffff; padding: 12px 24px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Access Your Account</a>
              </div>

              <!-- Sign off -->
              <div style="margin-top: 28px; padding-top: 20px; border-top: 1px solid rgba(255, 255, 255, 0.1);">
                <p style="color: #94a3b8; font-size: 14px; margin: 0 0 4px 0;">Best regards,</p>
                <p style="color: #ffffff; font-size: 15px; font-weight: 700; margin: 0;">The Nova Portal Team</p>
              </div>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background-color: #040105; padding: 18px 24px; text-align: center; border-top: 1px solid #1f1f23;">
              <p style="color: #64748b; font-size: 11px; margin: 0; line-height: 1.5;">
                Nova Portal System • Automated Dispatch Confirmation • All rights reserved
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
};

export const generateAdminNotificationHtml = (params) => {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>✦ NOVA ADMIN TRIAGE DISPATCH ✦</title>
</head>
<body style="margin: 0; padding: 24px 0; background-color: #040103; font-family: 'Courier New', Courier, monospace; color: #f8fafc;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color: #040103;">
    <tr>
      <td align="center" style="padding: 16px;">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width: 600px; background-color: #0a0a0a; border: 1px solid #450a0a; border-radius: 12px; overflow: hidden; box-shadow: 0 0 20px rgba(153, 27, 27, 0.4);">
          
          <tr>
            <td style="background: linear-gradient(to right, #450a0a, #78350f, #3b0764); padding: 24px; text-align: center; border-bottom: 2px solid #fbbf24;">
              <h2 style="color: #fbbf24; margin: 0; font-size: 20px; letter-spacing: 2px; text-transform: uppercase;">✦ NOVA BEACON TRANSMISSION ✦</h2>
              <p style="color: #cbd5e1; margin: 10px 0 0 0; font-size: 12px; letter-spacing: 1px;">THE CELESTIAL WEAVER • ADMIN TRIAGE ALERT</p>
            </td>
          </tr>

          <tr>
            <td style="padding: 28px; background-color: #0a0a0a;">
              <div style="margin-bottom: 20px;">
                <p style="margin: 4px 0;"><strong style="color: #94a3b8;">Beacon ID:</strong> <span style="color: #fbbf24;">${params.beacon_id}</span></p>
                <p style="margin: 4px 0;"><strong style="color: #94a3b8;">Status:</strong> <span style="color: #34d399;">${params.status}</span></p>
                <p style="margin: 4px 0;"><strong style="color: #94a3b8;">Category:</strong> <span style="color: #c084fc;">${params.category}</span></p>
                <p style="margin: 4px 0;"><strong style="color: #94a3b8;">Urgency:</strong> <span style="color: #ef4444;">${params.urgency}</span></p>
                <p style="margin: 4px 0;"><strong style="color: #94a3b8;">Timestamp:</strong> <span style="color: #cbd5e1;">${params.timestamp}</span></p>
              </div>
              
              <div style="border-top: 1px dashed #475569; margin: 20px 0;"></div>
              
              <h3 style="color: #f87171; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px;">▶ SPEAKER DETAILS</h3>
              <div style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); padding: 14px; border-radius: 8px;">
                <p style="margin: 4px 0;"><strong style="color: #94a3b8;">Name:</strong> ${params.name}</p>
                <p style="margin: 4px 0;"><strong style="color: #94a3b8;">Age:</strong> ${params.age}</p>
                <p style="margin: 4px 0;"><strong style="color: #94a3b8;">Location:</strong> ${params.location}</p>
                <p style="margin: 4px 0;"><strong style="color: #94a3b8;">Contact Email:</strong> <span style="color: #60a5fa;">${params.contact_email}</span></p>
              </div>
              
              <div style="border-top: 1px dashed #475569; margin: 20px 0;"></div>
              
              <h3 style="color: #f87171; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 12px;">▶ GRIEVANCE SUMMARY</h3>
              <div style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); padding: 16px; border-radius: 8px; line-height: 1.6; color: #f1f5f9;">
                ${params.grievance.replace(/\n/g, '<br/>')}
              </div>
            </td>
          </tr>

          <tr>
            <td style="background-color: #020617; padding: 14px; text-align: center; border-top: 1px solid #1e293b;">
              <p style="color: #475569; font-size: 11px; margin: 0;">Nova Dispatch System • Admin Triage Payload • End of Transmission</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`.trim();
};

/**
 * Main dispatch function sending real-time notification to ADMIN_EMAIL and User Welcome
 * @param {Object} userData - User / Beacon registration details
 * @returns {Promise<{adminSent: boolean, userSent: boolean}>}
 */
export const sendNovaBeaconEmail = async (userData = {}) => {
  const EMAILJS_SERVICE_ID        = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'service_7sr3n07';
  const EMAILJS_ADMIN_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_ADMIN_TEMPLATE_ID || 'template_7o5tasj';
  const EMAILJS_USER_TEMPLATE_ID  = import.meta.env.VITE_EMAILJS_USER_TEMPLATE_ID || 'template_b3yly2t';
  const EMAILJS_PUBLIC_KEY        = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 't7RGK3htj8Y8KyxmE';
  const ADMIN_EMAIL               = import.meta.env.VITE_ADMIN_EMAIL || 'saniarajesh7205@gmail.com';
  const PORTAL_URL                = import.meta.env.VITE_PORTAL_URL || 'https://nova-inky-beta.vercel.app/';

  const now = new Date();
  const registrationDate = now.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const registrationTime = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true });

  const realName = (userData.name || userData.full_name || 'Citizen').trim();
  const realEmail = (userData.email || '').trim();
  const realAge = (userData.age || 'N/A').toString().trim();
  const realLocation = (userData.location || userData.phone || 'N/A').trim();
  const realCategory = (userData.category || userData.role || 'General Distress').trim();
  const realGrievance = (userData.grievance || userData.problem || 'No grievance specified').trim();
  const realUrgency = (userData.urgency || 'High').trim();
  const realBeaconId = userData.id || userData.beacon_id || userData.user_id || ('NOVA-' + Math.random().toString(36).substring(2, 9).toUpperCase());
  const realTimestamp = `${registrationDate} ${registrationTime}`;

  const adminParams = {
    // ── routing (load-bearing) ──────────────────────────────
    to_email:          ADMIN_EMAIL,
    reply_to:          realEmail || ADMIN_EMAIL,
    from_name:         'Nova Portal Dispatch',
    // ── beacon header ──────────────────────────────────────
    beacon_id:         realBeaconId,
    id:                realBeaconId,
    user_id:           realBeaconId,
    status:            'TRANSMITTED & ACTIVATED',
    urgency:           realUrgency,
    // ── speaker name (all aliases the dashboard may use) ───
    name:              realName,
    full_name:         realName,
    user_name:         realName,
    // ── speaker contact ────────────────────────────────────
    email:             realEmail,
    user_email:        realEmail,
    contact_email:     realEmail,
    phone:             realLocation,    // dashboard label = "Phone"
    location:          realLocation,
    age:               realAge,
    // ── classification ─────────────────────────────────────
    category:          realCategory,
    role:              realCategory,
    // ── grievance ──────────────────────────────────────────
    grievance:         realGrievance,
    problem:           realGrievance,
    // ── time (split + combined) ────────────────────────────
    registration_date: registrationDate,
    registration_time: registrationTime,
    timestamp:         realTimestamp,
    // ── portal URL & link aliases ──────────────────────────
    portal_url:        PORTAL_URL,
    url:               PORTAL_URL,
    link:              PORTAL_URL,
    action_url:        PORTAL_URL,
    account_url:       PORTAL_URL,
    access_url:        PORTAL_URL,
    button_url:        PORTAL_URL,
    portal_link:       PORTAL_URL,
    website_url:       PORTAL_URL,
    app_url:           PORTAL_URL,
    login_url:         PORTAL_URL
  };

  const adminHtml = generateAdminNotificationHtml(adminParams);
  
  const adminPlaintext = `✦ NOVA BEACON TRANSMISSION ✦
Beacon ID: ${adminParams.beacon_id}
Status: ${adminParams.status}
Category: ${adminParams.category}
Urgency: ${adminParams.urgency}
Timestamp: ${adminParams.timestamp}

▶ SPEAKER DETAILS:
Name: ${adminParams.name}
Age: ${adminParams.age}
Location: ${adminParams.location}
Contact Email: ${adminParams.contact_email}

▶ GRIEVANCE:
${adminParams.grievance}`.trim();

  adminParams.html_message = adminHtml;
  adminParams.message = adminPlaintext;

  const userParams = {
    // ── routing (load-bearing) ──────────────────────────────
    to_email:          realEmail,
    email:             realEmail,
    user_email:        realEmail,
    reply_to:          ADMIN_EMAIL,
    from_name:         'NOVA TEAM',
    // ── name (all aliases the dashboard may use) ───────────
    name:              realName,
    full_name:         realName,
    user_name:         realName,
    // ── beacon ─────────────────────────────────────────────
    beacon_id:         realBeaconId,
    id:                realBeaconId,
    user_id:           realBeaconId,
    // ── classification ─────────────────────────────────────
    role:              realCategory,
    category:          realCategory,
    classification:    realCategory,
    urgency:           realUrgency,
    priority:          realUrgency,
    // ── account ────────────────────────────────────────────
    account_status:    '🟢 Active & Transmitted',
    // ── time (split + combined) ────────────────────────────
    registration_date: registrationDate,
    registration_time: registrationTime,
    timestamp:         realTimestamp,
    // ── grievance / story (all aliases) ────────────────────
    grievance:         realGrievance,
    story:             realGrievance,
    problem:           realGrievance,
    message:           realGrievance,
    description:       realGrievance,
    details:           realGrievance,
    grievance_story:   realGrievance,
    // ── speaker contact & info ─────────────────────────────
    age:               realAge,
    location:          realLocation,
    phone:             realLocation,
    contact_email:     realEmail,
    // ── support & portal / link aliases ─────────────────────
    support_email:     ADMIN_EMAIL,
    admin_email:       ADMIN_EMAIL,
    portal_url:        PORTAL_URL,
    url:               PORTAL_URL,
    link:              PORTAL_URL,
    action_url:        PORTAL_URL,
    account_url:       PORTAL_URL,
    access_url:        PORTAL_URL,
    button_url:        PORTAL_URL,
    portal_link:       PORTAL_URL,
    website_url:       PORTAL_URL,
    app_url:           PORTAL_URL,
    login_url:         PORTAL_URL
  };

  const userHtml = generateUserWelcomeHtml(userParams);

  const userPlaintext = `### ✦ Welcome to Nova Portal

Your journey with Nova begins here. 🚀

Your registration has been successfully completed. Welcome to the Nova Portal family — we're excited to have you on board!

Explore. Connect. Grow.

Registration Details:
- Beacon / User ID: ${userParams.beacon_id}
- Registered Name: ${userParams.name}
- Classification: ${userParams.classification}
- Priority: ${userParams.priority}
- Account Status: ${userParams.account_status}
- Timestamp: ${userParams.timestamp}

▶ Submitted Grievance / Story:
${userParams.grievance}

For any assistance, contact us at ${userParams.support_email}.
Access Your Account: ${userParams.portal_url}

Best regards,
The Nova Portal Team`.trim();

  userParams.html_message = userHtml;
  userParams.message = userPlaintext;

  let adminSent = false;
  let userSent = false;

  // 1. Dispatch Admin Notification (template_7o5tasj) to ADMIN_EMAIL
  try {
    const adminResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_ADMIN_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: adminParams
      })
    });

    if (adminResponse.ok) {
      adminSent = true;
      console.log(`[Nova Dispatch] Admin notification sent successfully to ${ADMIN_EMAIL}`);
    } else {
      const errText = await adminResponse.text();
      console.error('[Nova Dispatch] Admin email failed:', errText);
    }
  } catch (err) {
    console.error('[Nova Dispatch] Exception sending Admin email:', err);
  }

  // 2. Dispatch User Welcome Email (template_b3yly2t) if valid user email is present
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (realEmail && emailRegex.test(realEmail)) {
    // 600ms delay to prevent EmailJS concurrency throttle
    await new Promise(resolve => setTimeout(resolve, 600));

    try {
      const userResponse = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          service_id: EMAILJS_SERVICE_ID,
          template_id: EMAILJS_USER_TEMPLATE_ID,
          user_id: EMAILJS_PUBLIC_KEY,
          template_params: userParams
        })
      });

      if (userResponse.ok) {
        userSent = true;
        console.log(`[Nova Dispatch] User Welcome email sent successfully to ${realEmail}`);
      } else {
        const errText = await userResponse.text();
        console.error('[Nova Dispatch] User Welcome email failed:', errText);
      }
    } catch (err) {
      console.error('[Nova Dispatch] Exception sending User Welcome email:', err);
    }
  } else {
    console.warn(`[Nova Dispatch] Skipping user welcome dispatch: No valid user email provided ('${realEmail}')`);
  }

  return { adminSent, userSent };
};
