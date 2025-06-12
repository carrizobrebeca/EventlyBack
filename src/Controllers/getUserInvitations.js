const { User, Event } = require('../db');

const getUserInvitations = async (req, res) => {
   const { userId } = req.params;

  try {
    // Buscamos al usuario con sus eventos a los que está invitado (attendingEvents)
    const user = await User.findByPk(userId, {
      include: {
        model: Event,
        as: 'attendingEvents', // El alias que usaste en la asociación
        through: { attributes: [] }, // Para no traer info de la tabla pivote UserEvent
      },
    });

    if (!user) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    // Devolvemos la lista de eventos (invitaciones)
    res.status(200).json(user.attendingEvents);
  } catch (error) {
    console.error("Error al obtener invitaciones:", error);
    res.status(500).json({ message: "Error al obtener invitaciones" });
  }
};

module.exports = { getUserInvitations };