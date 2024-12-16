const express = require('express');
const { getAppointments, createAppointment } = require('../controllers/appointmentController');
const router = express.Router();

router.get('/:userId', getAppointments);

router.post('/', createAppointment);

module.exports = router;