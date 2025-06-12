const { EventInvitation, User } = require('../db');

const getEventInvitations = async (req, res) => {
  const { eventId } = req.params;

  try {
    const invitations = await EventInvitation.findAll({
      where: { eventId },
      include: [{ model: User }], // Trae info del usuario invitado
    });

    res.status(200).json(invitations);
  } catch (err) {
    console.error("Error al obtener invitados del evento:", err);
    res.status(500).json({ message: "No se pudieron obtener los invitados" });
  }
};

module.exports = { getEventInvitations };