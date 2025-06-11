const { Router } = require("express");
const { postMessageHandler, getMessageHandler } = require("../Handlers/messageHandler");


const messageRouter = Router();
// messageRouter.get("/", getUsersHandler);
messageRouter.post("/", postMessageHandler);
messageRouter.get("/:chatId", getMessageHandler);
module.exports = messageRouter;