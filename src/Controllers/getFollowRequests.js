const { FollowRequest, User } = require('../db');

const getFollowRequests = async (req, res) => {
try {
    const targetId = req.userId; // <- este valor viene del middleware `requireAuth`

    const requests = await FollowRequest.findAll({
      where: { targetId }, // <---- FILTRA por el usuario autenticado
      include: [{ model: User, as: 'requester' }],
      order: [['createdAt', 'DESC']],
    });

    console.log("Solicitudes encontradas:", requests.length);
    res.json(requests);
  } catch (error) {
    console.error("ERROR GETfOLLOWrEQ /GFR:", error);
    res.status(500).json({ message: "Error al obtener solicitudes" });
  }
};

module.exports = getFollowRequests;