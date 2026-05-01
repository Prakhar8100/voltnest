import { Resend } from 'resend';

const sendEmail = async (options) => {
  const apiKey = process.env.RESEND_API_KEY || process.env.SMTP_PASSWORD;

  // Fallback to console logging if API Key is missing or default
  if (!apiKey || apiKey.includes('PASTE_YOUR')) {
    console.log('-----------------------------------------');
    console.log('⚠️  EMAIL SIMULATION ACTIVE');
    console.log('Reason: RESEND_API_KEY is missing or default.');
    console.log('Action: If you are on Render, add RESEND_API_KEY to your Environment Variables.');
    console.log(`To: ${options.email}`);
    console.log(`Subject: ${options.subject}`);
    console.log('-----------------------------------------');
    return;
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send({
      from: `${process.env.FROM_NAME || 'VoltNest'} <${process.env.FROM_EMAIL || 'onboarding@resend.dev'}>`,
      to: [options.email],
      subject: options.subject,
      text: options.message,
      html: options.html,
    });

    if (error) {
      console.error('Resend Error:', error);
      throw new Error(error.message);
    }

    console.log('Email sent successfully via Resend SDK:', data.id);
  } catch (err) {
    console.error('Failed to send email:', err.message);
    throw err;
  }
};

export default sendEmail;
