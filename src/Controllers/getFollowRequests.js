const { FollowRequest, User } = require('../db');

const getFollowRequests = async (req, res) => {
try {
    const targetId = req.userId; // <- este valor viene del middleware `requireAuth`

    const requests = await FollowRequest.findAll({
     
      include: [
    { model: User, as: 'requester', attributes: ['id', 'name', 'image'] },
    { model: User, as: 'target', attributes: ['id'] }, 
  ]
    
    });

    // console.log("Solicitudes encontradas:", requests.length);
    // console.log("Solicitudes encontradas:", JSON.stringify(requests, null, 2));
    res.json(requests);
  } catch (error) {
    console.error("ERROR GETfOLLOWrEQ /GFR:", error);
    res.status(500).json({ message: "Error al obtener solicitudes" });
  }
};

module.exports = getFollowRequests;