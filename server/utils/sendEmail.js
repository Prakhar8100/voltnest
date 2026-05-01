import nodemailer from 'nodemailer';

const sendEmail = async (options) => {
  // Fallback to console logging if SMTP is not configured
  if (!process.env.SMTP_HOST || process.env.SMTP_HOST.includes('your_smtp')) {
    console.log('-----------------------------------------');
    console.log('📧 EMAIL SIMULATION (SMTP not configured)');
    console.log(`To: ${options.email}`);
    console.log(`Subject: ${options.subject}`);
    console.log(`Message: ${options.message}`);
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
