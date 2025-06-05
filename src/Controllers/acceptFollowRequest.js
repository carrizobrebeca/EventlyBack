const { FollowRequest,  Notification } = require('../db');

const acceptFollowRequest = async (req, res) => {
 try {
    const { requesterId, targetId } = req.body; // lo mandás desde el frontend

    if (!requesterId || !targetId) {
      return res.status(400).json({ error: "Faltan requesterId o targetId" });
    }

    // Buscá el follow request que coincida con esos dos ID
    const followRequest = await FollowRequest.findOne({
      where: {
        requesterId,
        targetId,
      },
    });

    if (!followRequest) {
      return res.status(404).json({ error: "Solicitud de seguimiento no encontrada" });
    }

    // Marcá como aceptada
    followRequest.status = "accepted";
    await followRequest.save();

    // Buscá la notificación correspondiente (si querés marcarla como leída o procesada)
    const notification = await Notification.findOne({
      where: {
        actorId: requesterId,
        recipientId: targetId,
        type: "follow_request", // o el tipo que usás
      },
    });

    if (notification) {
      notification.isRead = true; // o lo que necesites hacer
      await notification.save();
    }

    res.json({ message: "Solicitud aceptada", followRequest });
  } catch (error) {
    console.error("❌ Error al aceptar solicitud:", error);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};



module.exports = {acceptFollowRequest};
