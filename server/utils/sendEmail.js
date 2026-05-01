import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // Fallback to console logging if SMTP is not configured
  if (!process.env.SMTP_HOST || process.env.SMTP_HOST.includes('your_smtp') || process.env.SMTP_PASSWORD?.includes('PASTE_YOUR')) {
    console.log('-----------------------------------------');
    console.log('⚠️  EMAIL SIMULATION ACTIVE');
    console.log('Reason: SMTP credentials (SMTP_HOST or SMTP_PASSWORD) are missing or default.');
    console.log('Action: If you are on Render, add these to your Environment Variables dashboard.');
    console.log(`To: ${options.email}`);
    console.log(`Subject: ${options.subject}`);
    console.log('-----------------------------------------');
    return;
  }

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: process.env.SMTP_PORT,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASSWORD,
    },
  });

  const message = {
    from: `${process.env.FROM_NAME || 'VoltNest'} <${process.env.FROM_EMAIL || 'noreply@voltnest.com'}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  const info = await transporter.sendMail(message);
  console.log('Message sent: %s', info.messageId);
};

export default sendEmail;
