const { Router } = require("express");
const {
  postUsersHandler,
  getUsersHandler,
  putPrivateUserHandler,
} = require("../Handlers/usersHandler");
const { getUserInvitations } = require("../Controllers/getUserInvitations");




const usersRouter = Router();

usersRouter.get("/", getUsersHandler);
usersRouter.post("/", postUsersHandler);
usersRouter.get("/:userId/invitations", getUserInvitations);
usersRouter.put('/:id/toggle-privacy', putPrivateUserHandler);
module.exports = usersRouter;
