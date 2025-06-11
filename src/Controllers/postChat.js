const { Chat, User } = require("../db");
const { Op } = require("sequelize");

const postChat = async (user1Id, user2Id) => {
  // Asegurarse de que user1Id siempre sea menor para evitar duplicados (opcional pero recomendado)
  const [A, B] = user1Id < user2Id ? [user1Id, user2Id] : [user2Id, user1Id];

  const [chat, created] = await Chat.findOrCreate({
    where: {
      [Op.or]: [
        { user1Id: A, user2Id: B },
        { user1Id: B, user2Id: A },
      ]
    },
    defaults: {
      user1Id: A,
      user2Id: B,
    },
    include: [
      { model: User, as: 'user1' },
      { model: User, as: 'user2' },
    ],
  });

  return { chat, created }; // Podés retornar también { chat, created } si querés saber si lo creó o no
};

module.exports = postChat;