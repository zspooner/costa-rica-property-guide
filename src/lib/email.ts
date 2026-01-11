import { Resend } from 'resend';

const resend = process.env.RESEND_API_KEY ? new Resend(process.env.RESEND_API_KEY) : null;
const notificationEmail = process.env.NOTIFICATION_EMAIL || '';

interface BuyerDetails {
  name: string;
  email: string;
  budget_range: string;
  timeline: string;
  intended_use: string;
  area_interest: string;
}

export async function notifyHyamOfNewBuyer(buyer: BuyerDetails): Promise<boolean> {
  if (!resend || !notificationEmail) {
    console.log('Email notification skipped: Resend not configured');
    return false;
  }

  try {
    await resend.emails.send({
      from: 'Costa Rica Property Guide <notifications@resend.dev>',
      to: notificationEmail,
      subject: `New Buyer Inquiry: ${buyer.name}`,
      html: `
        <div style="font-family: system-ui, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #15803d;">New Buyer Inquiry</h2>

          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">Name</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${buyer.name}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">Email</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">
                <a href="mailto:${buyer.email}">${buyer.email}</a>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">Budget</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${buyer.budget_range}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">Timeline</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${buyer.timeline}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee; font-weight: 600;">Intended Use</td>
              <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${buyer.intended_use}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; font-weight: 600; vertical-align: top;">Areas of Interest</td>
              <td style="padding: 8px 0;">${buyer.area_interest}</td>
            </tr>
          </table>

          <p style="margin-top: 24px; color: #666;">
            Reply to this lead at your convenience.
          </p>
        </div>
      `,
    });
    console.log('Email notification sent to Hyam');
    return true;
  } catch (error) {
    console.error('Failed to send email notification:', error);
    return false;
  }
}
