// const postChat = require("../Controllers/postChat");
const getMessage = require("../Controllers/getMessage");
const postMessage = require("../Controllers/postMessage");


const getMessageHandler = async (req, res)=>{
    try {
    const { chatId } = req.params;
    const messages = await getMessage(chatId);
    res.status(200).json(messages);
  } catch (error) {
     console.error("ERROR POST /getmesssagehandler:", error); 
    res.status(400).json({ error: error.message });
  }
 }
const postMessageHandler = async (req, res) => {
  const {chatId, senderId, content } = req.body;
  
  try {
    const response = await postMessage(chatId, senderId, content);
 res.status(200).json(response.chat);
      
 } catch (error) {
   console.error("ERROR POST /postmesssage:", error); 
    res.status(400).json({error: error.message});
 }  
};

module.exports = {
 getMessageHandler,
  postMessageHandler,
};