import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config(); // Load environment variables

const sendemail = async function (email, subject, message) {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT), // Ensure port is a number
      secure: process.env.SMTP_PORT === "465", // Use `true` only for port 465
      auth: {
        user: process.env.SMTP_USERNAME,
        pass: process.env.SMTP_PASSWORD,
      },
      tls: {
        rejectUnauthorized: false, // ✅ Prevent self-signed certificate errors
      },
    });

    let info = await transporter.sendMail({
      from: process.env.SMTP_FROM_EMAIL, // Sender address
      to: email, // Recipient
      subject: subject, // Email subject
      html: message, // Email body
    });

    console.log("Email sent successfully:", info.messageId);
    return true;
  } catch (error) {
    console.error("Error sending email:", error);
    return false;
  }
};

export default sendemail;
