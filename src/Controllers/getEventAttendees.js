const { Event } = require('../db');

const getEventAttendees = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findByPk(eventId, {
      include: {
        association: 'attendees', // alias definido en tu relación
        attributes: ['id', 'name', 'image', 'userName'], // lo que quieras mostrar
        through: { attributes: [] } // no mostrar la tabla pivote
      },
    });

    if (!event) {
      return res.status(404).json({ message: 'Evento no encontrado' });
    }

    res.status(200).json(event.attendees);
  } catch (error) {
    console.error('Error al obtener los invitados:', error);
    res.status(500).json({ message: 'Error al obtener los invitados' });
  }
};

module.exports = { getEventAttendees };