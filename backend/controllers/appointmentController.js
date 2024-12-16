const { Appointment, User, sequelize } = require("../models");
const moment = require("moment-timezone");

exports.getAppointments = async (req, res) => {
  const { userId } = req.params;
  try {
    // Ambil semua appointment berdasarkan creator_id
    const appointments = await Appointment.findAll({
      where: {
        creator_id: userId,
      },

      include: {
        model: User,
        as: "participants",
      },
    });
    return res.json({
      message: "Datas found",
      datas: appointments,
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error fetching appointments", error: error.message });
  }
};

exports.createAppointment = async (req, res) => {
  const { title, start, end, participants, userId } = req.body;

  // Validasi input awal
  if (!title || !start || !end || !Array.isArray(participants)) {
    return res.status(400).json({ message: "Invalid input data" });
  }

  if (moment(start).isAfter(moment(end))) {
    return res
      .status(400)
      .json({ message: "Start time must be before end time" });
  }

  const transaction = await sequelize.transaction();
  try {
    // Dapatkan data creator (user yang membuat janji temu)
    const userInstance = await User.findOne({ where: { id: userId } });

    if (!userInstance) {
      return res.status(404).json({ message: "Creator user not found" });
    }

    // Konversi waktu input ke UTC berdasarkan zona waktu creator
    const startUTC = moment
      .tz(start, userInstance.preferred_timezone)
      .utc()
      .toDate();
    const endUTC = moment
      .tz(end, userInstance.preferred_timezone)
      .utc()
      .toDate();

    // Validasi jam kerja creator
    const startTimeCreator = moment
      .tz(start, userInstance.preferred_timezone)
      .hour();
    const endTimeCreator = moment
      .tz(end, userInstance.preferred_timezone)
      .hour();

    if (
      startTimeCreator < 8 ||
      startTimeCreator > 17 ||
      endTimeCreator < 8 ||
      endTimeCreator > 17
    ) {
      return res.status(400).json({
        message:
          "Appointment must be scheduled within working hours (8:00 - 17:00) for creator.",
      });
    }

    // Ambil data peserta berdasarkan ID
    const participantsData = await User.findAll({
      where: { id: participants },
    });

    if (participantsData.length !== participants.length) {
      return res.status(400).json({ message: "Some participants are invalid" });
    }

    // Validasi jam kerja untuk setiap peserta
    for (const participant of participantsData) {
      const participantStartTime = moment
        .tz(start, participant.preferred_timezone)
        .hour();
      const participantEndTime = moment
        .tz(end, participant.preferred_timezone)
        .hour();

      if (
        participantStartTime < 8 ||
        participantStartTime > 17 ||
        participantEndTime < 8 ||
        participantEndTime > 17
      ) {
        return res.status(400).json({
          message: `Appointment must be within working hours (08:00 - 17:00) for participant ${participant.name}.`,
        });
      }
    }

    // Buat janji temu baru
    const appointment = await Appointment.create(
      {
        title,
        start: startUTC, // Simpan dalam UTC
        end: endUTC, // Simpan dalam UTC
        creator_id: userInstance.id,
      },
      { transaction }
    );

    // Tambahkan peserta ke janji temu
    await appointment.addParticipants(participantsData, { transaction });

    // Commit transaksi
    await transaction.commit();

    return res.status(201).json({
      code: res.statusCode,
      message: "Appointment created successfully",
      data: appointment,
    });
  } catch (error) {
    // Rollback jika ada kesalahan
    await transaction.rollback();
    console.error("Error creating appointment:", error);
    return res.status(500).json({
      message: "Error creating appointment",
      error: error.message,
    });
  }
};
