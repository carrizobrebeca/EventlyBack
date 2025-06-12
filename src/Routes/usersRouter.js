const { Router } = require("express");
const {
  postUsersHandler,
  getUsersHandler,
} = require("../Handlers/usersHandler");
const { getUserInvitations } = require("../Controllers/getUserInvitations");




const usersRouter = Router();

usersRouter.get("/", getUsersHandler);
usersRouter.post("/", postUsersHandler);
usersRouter.get("/:userId/invitations", getUserInvitations);

module.exports = usersRouter;
