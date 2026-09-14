export const sendNovaBeaconEmail = async (beaconData) => {
  // =========================================================================
  // EMAIL JS CONFIGURATION — keys are loaded from .env (never hardcoded)
  // =========================================================================
  const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID;
  const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
  const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
  const ADMIN_EMAIL         = import.meta.env.VITE_ADMIN_EMAIL;

  
  // The beautiful HTML email body
  const htmlContent = `
    <div style="font-family: 'Courier New', Courier, monospace; max-width: 600px; margin: 0 auto; color: #f8fafc; background-color: #040103; border: 1px solid #450a0a; border-radius: 12px; overflow: hidden; box-shadow: 0 0 20px rgba(153, 27, 27, 0.4);">
      <div style="background: linear-gradient(to right, #450a0a, #78350f, #3b0764); padding: 24px; text-align: center; border-bottom: 2px solid #fbbf24;">
        <h2 style="color: #fbbf24; margin: 0; font-size: 20px; letter-spacing: 2px; text-transform: uppercase;">✦ NOVA BEACON TRANSMISSION ✦</h2>
        <p style="color: #cbd5e1; margin: 10px 0 0 0; font-size: 12px; letter-spacing: 1px;">THE CELESTIAL WEAVER • STAR VEILS</p>
      </div>
      <div style="padding: 32px; background-color: #0a0a0a; background-image: radial-gradient(circle at center, rgba(153, 27, 27, 0.1) 0%, transparent 70%);">
        <div style="margin-bottom: 24px;">
          <p style="margin: 4px 0;"><strong style="color: #94a3b8;">Beacon ID:</strong> <span style="color: #fbbf24;">${beaconData.id}</span></p>
          <p style="margin: 4px 0;"><strong style="color: #94a3b8;">Status:</strong> <span style="color: #34d399;">TRANSMITTED & ACTIVATED</span></p>
          <p style="margin: 4px 0;"><strong style="color: #94a3b8;">Category:</strong> <span style="color: #c084fc;">${beaconData.category || 'General Distress'}</span></p>
        </div>
        
        <div style="border-top: 1px dashed #475569; margin: 24px 0;"></div>
        
        <h3 style="color: #f87171; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 16px;">▶ SPEAKER DETAILS</h3>
        <div style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); padding: 16px; border-radius: 8px;">
          <p style="margin: 4px 0;"><strong style="color: #94a3b8;">Name:</strong> ${beaconData.name}</p>
          <p style="margin: 4px 0;"><strong style="color: #94a3b8;">Age:</strong> ${beaconData.age}</p>
          <p style="margin: 4px 0;"><strong style="color: #94a3b8;">Location:</strong> ${beaconData.location}</p>
          <p style="margin: 4px 0;"><strong style="color: #94a3b8;">Contact Email:</strong> ${beaconData.email}</p>
        </div>
        
        <div style="border-top: 1px dashed #475569; margin: 24px 0;"></div>
        
        <h3 style="color: #f87171; font-size: 14px; letter-spacing: 1px; text-transform: uppercase; margin-bottom: 16px;">▶ GRIEVANCE SUMMARY</h3>
        <div style="background-color: rgba(255, 255, 255, 0.03); border: 1px solid rgba(255, 255, 255, 0.1); padding: 16px; border-radius: 8px; line-height: 1.6;">
          ${(beaconData.problem || "").replace(/\n/g, '<br/>')}
        </div>
        
        <div style="margin-top: 40px; padding: 20px; background-color: rgba(234, 179, 8, 0.05); border-left: 4px solid #fbbf24; border-radius: 0 8px 8px 0;">
          <p style="color: #fbbf24; font-style: italic; margin: 0 0 8px 0; font-size: 14px;">"Every voice deserves to be heard." — NOVA</p>
          <p style="color: #94a3b8; margin: 0; font-size: 12px; line-height: 1.5;">Your signal has been safely locked in my constellation. The Harmonic Lens is analyzing your resonance, and you are not alone.</p>
        </div>
      </div>
      <div style="background-color: #020617; padding: 16px; text-align: center; border-top: 1px solid #1e293b;">
        <p style="color: #475569; font-size: 10px; margin: 0;">Nova Dispatch System • Client-Side Verification Complete • End of Transmission</p>
      </div>
    </div>
  `;

  try {
    const response = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        service_id: EMAILJS_SERVICE_ID,
        template_id: EMAILJS_TEMPLATE_ID,
        user_id: EMAILJS_PUBLIC_KEY,
        template_params: {
          to_email: beaconData.email,         // Receiver's email
          admin_email: ADMIN_EMAIL,           // Your admin email
          reply_to: beaconData.email,
          name: beaconData.name || 'Citizen',
          age: beaconData.age || 'N/A',
          location: beaconData.location || 'N/A',
          email: beaconData.email || '',
          category: beaconData.category || 'General Distress',
          urgency: beaconData.urgency || 'High',
          beacon_id: beaconData.id || ('NOVA-' + Math.random().toString(36).substring(2, 8).toUpperCase()),
          id: beaconData.id || 'NOVA-BEACON',
          grievance: beaconData.grievance || beaconData.problem || 'No grievance specified',
          problem: beaconData.problem || beaconData.grievance || 'No grievance specified',
          timestamp: new Date().toLocaleString(),
          html_message: htmlContent           // In case {{{html_message}}} is used
        }
      })
    });
    
    if (!response.ok) {
      console.error('Failed to send EmailJS:', await response.text());
      return false;
    }
    
    return true;
  } catch (error) {
    console.error('Error sending EmailJS:', error);
    return false;
  }
};
