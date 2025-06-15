const { User, Notification } = require('../db');
const getNotifications = async (req, res) => {
  try {
    const { userId } = req.params;
    const notifications = await Notification.findAll({
      where: { recipientId: userId },
      include: [{ model: User, as: 'actor', attributes: ['name','userName', 'image'] }],
      order: [['createdAt', 'ASC']]
    });
    res.json(notifications);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
module.exports = {getNotifications};


