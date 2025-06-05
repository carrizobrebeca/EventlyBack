const { FollowRequest, User, Notification } = require('../db');

const acceptFollowRequestFromNotification = async (req, res) => {
  const notificationId = req.params.notificationId;

  try {
    // Buscar la notificación
    const notification = await Notification.findByPk(notificationId);

    if (!notification) {
      return res.status(404).json({ message: "Notificación no encontrada" });
    }

    const actorId = notification.actorId;       // quien envió la solicitud
    const targetId = notification.recipientId;  // quien la recibe y acepta

    // Validar que el usuario que acepta es el destinatario de la notificación
    if (targetId !== req.userId) {
      return res.status(403).json({ message: "No autorizado" });
    }

    // Buscar la solicitud pendiente de seguimiento
    const request = await FollowRequest.findOne({
      where: { requesterId: actorId, targetId: targetId, status: 'pending' },
    });

    if (!request) {
      return res.status(404).json({ message: "Solicitud de seguimiento no encontrada" });
    }

    // Cambiar estado a aceptada
    request.status = 'accepted';
    await request.save();

    // Crear la relación de seguimiento
    const follower = await User.findByPk(actorId);
    const following = await User.findByPk(targetId);

    await follower.addFollowing(following);

    // Crear notificación que la solicitud fue aceptada
    await Notification.create({
      type: "request_accepted",
      recipientId: actorId, // quien envió la solicitud recibe la notificación
      actorId: targetId,    // quien aceptó la solicitud
    });

    res.json({ message: 'Solicitud aceptada correctamente.' });
  } catch (error) {
    console.error("Error al aceptar solicitud:", error);
    res.status(500).json({ message: "Error interno" });
  }
};

module.exports = {
  acceptFollowRequestFromNotification,
};