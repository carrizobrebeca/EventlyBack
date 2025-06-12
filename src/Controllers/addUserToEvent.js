const { User, Event } = require('../db');

const addUserToEvent = async (eventId, userIds) => {
  const event = await Event.findByPk(eventId);
  if (!event) throw new Error('Evento no encontrado');

  const users = await User.findAll({ where: { id: userIds } });
  await event.addAttendees(users); // <-- usa la relación de UserEvent

  return { message: 'Usuarios invitados con éxito' };
}


module.exports = {addUserToEvent};