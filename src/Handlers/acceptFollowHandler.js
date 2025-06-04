const { FollowRequest, User, Notification} = require('../db');

const acceptFollowRequest = async (req, res) => {
  const requestId = req.params.requestId;

  const request = await FollowRequest.findByPk(requestId);

  if (!request || request.targetId !== req.userId) {
    return res.status(403).json({ message: 'No autorizado' });
  }

  request.status = 'accepted';
  await request.save();

  // Ahora se crea la relación en Follow
  const follower = await User.findByPk(request.requesterId);
  const following = await User.findByPk(request.targetId);

  await follower.addFollowing(following);
 await Notification.create({
      type: "request_accepted",
      recipientId: request.requesterId, // el que mandó la solicitud
      actorId: req.user.id,          // el que aceptó
    });
  res.json({ message: 'Solicitud aceptada.' });
};

module.exports= {
   acceptFollowRequest
}