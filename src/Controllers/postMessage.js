const { Chat, Message } = require("../db");

const postMessage = async (chatId, senderId, content) => {
  try {
    
    // const chat = await Chat.findOne({ where: chatId === chatId });
    // const idChat = chat.id;
  return await Message.create({
    chatId, 
    senderId, 
    content
  });
  } catch (error) {
      console.error("ERROR POST /postmesssage controller:", error); 
  }

};

module.exports = postMessage;
