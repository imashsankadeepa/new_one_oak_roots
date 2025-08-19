// backend/config/smtpconfig.js
require("dotenv").config();

module.exports = {
  smtpHost: process.env.SMTP_HOST, // usually mail.yourdomain.com
  smtpPort: process.env.SMTP_PORT, // 465 for SSL, 587 for TLS
  smtpSecure: process.env.SMTP_SECURE, 
  smtpUsername: process.env.SMTP_USERNAME,
  smtpPassword: process.env.SMTP_PASSWORD,
  emailFrom: process.env.EMAIL_FROM,
  emailFromName: process.env.EMAIL_FROM_NAME
};
