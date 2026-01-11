import twilio from 'twilio';

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const twilioWhatsAppNumber = process.env.TWILIO_WHATSAPP_NUMBER; // Format: whatsapp:+14155238886
const hyamWhatsAppNumber = process.env.HYAM_WHATSAPP_NUMBER; // Format: whatsapp:+506XXXXXXXX

interface BuyerDetails {
  name: string;
  email: string;
  budget_range: string;
  timeline: string;
  intended_use: string;
  area_interest: string;
}

export async function notifyHyamOfNewBuyer(buyer: BuyerDetails): Promise<boolean> {
  // Skip if Twilio is not configured
  if (!accountSid || !authToken || !twilioWhatsAppNumber || !hyamWhatsAppNumber) {
    console.log('WhatsApp notification skipped: Twilio not configured');
    return false;
  }

  const client = twilio(accountSid, authToken);

  const message = `🏠 New Buyer Inquiry

*Name:* ${buyer.name}
*Email:* ${buyer.email}
*Budget:* ${buyer.budget_range}
*Timeline:* ${buyer.timeline}
*Intended Use:* ${buyer.intended_use}
*Areas of Interest:* ${buyer.area_interest}

Reply to this lead at your convenience.`;

  try {
    await client.messages.create({
      body: message,
      from: twilioWhatsAppNumber,
      to: hyamWhatsAppNumber,
    });
    console.log('WhatsApp notification sent to Hyam');
    return true;
  } catch (error) {
    console.error('Failed to send WhatsApp notification:', error);
    return false;
  }
}
