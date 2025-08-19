// backend/controllers/BookingHandler.js
const nodemailer = require("nodemailer");
const Booking = require("../models/BookingModel");

// Load SMTP config (put your credentials in config/smtpconfig.js)
const {
  smtpHost,
  smtpPort,
  smtpSecure,
  smtpUsername,
  smtpPassword,
  emailFrom,
  emailFromName,
} = require("../smtpconfig");

async function createBooking(req, res) {
  const { name, email, phone, service, date, message } = req.body;

  try {
    // Save booking to DB
    const newBooking = new Booking({ name, email, phone, service, date, message });
    await newBooking.save();

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpSecure, // true for 465, false for 587
      auth: {
        user: smtpUsername,
        pass: smtpPassword,
      },
    });

    // Email to business
    const mailOptions = {
      from: `"${emailFromName}" <${emailFrom}>`,
      to: "info@oakrootscleaning.uk", // business email
      subject: "New Booking Request - Oak Roots Cleaning",
      html: `
        <h2>New Booking Request</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Service:</strong> ${service}</p>
        <p><strong>Date:</strong> ${date}</p>
        <p><strong>Message:</strong> ${message || "N/A"}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.json({ success: true, message: "Booking saved and email sent!" });
  } catch (error) {
    console.error("❌ Error in booking:", error);
    res.status(500).json({ success: false, message: "Failed to process booking: " + error.message });
  }
}

module.exports = { createBooking };
