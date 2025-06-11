const { Chat, User, Message } = require("../db");

const getMessage = async (chatId) => {
  try {
    const messages = await Message.findAll({
      where: { chatId },
      include: [
        {
          model: User,
          attributes: ["id", "name", "image"]
        }
      ],
      order: [["createdAt", "DESC"]]
    });

    return messages;

  } catch (error) {
    console.error("ERROR GET /messages:", error);
    throw new Error("No se pudieron obtener los mensajes");
  }
};

module.exports = getMessage;
