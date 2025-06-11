const { Router } = require("express");
const { postChatHandler } = require("../Handlers/chatHandler");

const chatRouter = Router();
// chatRouter.get("/", getUsersHandler);
chatRouter.post("/", postChatHandler);

module.exports = chatRouter;