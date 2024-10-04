import nodemailer from 'nodemailer';
import ejs from 'ejs';
import path from 'path';
import { fileURLToPath } from 'url';

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST, 
  port: Number(process.env.SMTP_PORT),
  auth: {
    user: process.env.SMTP_USER, 
    pass: process.env.SMTP_PASS, 
  },
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
export const sendEmail = async (options) => {
  const { email, subject, template, data } = options;
  const templatePath = path.join(__dirname, '../Emails', template);
  try {
    const htmlContent = await ejs.renderFile(templatePath, data);
    const mailOptions = {
      from: "amirsaeed.gcuf@gmail.com",
      to: email,
      subject,
      html: htmlContent,
    };
    const response = await transporter.sendMail(mailOptions);
    console.log('Email sent successfully:', response);

  } catch (error) {
    console.error('Error sending email:', error.message || error);

    if (error.responseCode === 535 || error.response?.includes('Invalid login')) {
      console.error('Unauthorized: Invalid SMTP credentials. Please verify your SMTP credentials.');
    }
    throw new Error(error);
  }
};

export default sendEmail;
