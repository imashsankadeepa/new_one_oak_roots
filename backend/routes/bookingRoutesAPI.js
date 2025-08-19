// backend/routes/bookingRoutesAPI.js
const express = require("express");
const router = express.Router();
const { createBooking } = require("../controllers/BookingHandler");

// POST booking route
router.post("/create", createBooking);

module.exports = router;
