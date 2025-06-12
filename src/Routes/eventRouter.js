const { Router } = require("express");
const { getEventHandler, postEventHandler, addUsersEventHandler } = require("../Handlers/eventHandler");
const { getEventAttendees } = require("../Controllers/getEventAttendees");


const eventRouter = Router();

eventRouter.get("/", getEventHandler);
eventRouter.post("/", postEventHandler);
eventRouter.post('/:eventId/invite', addUsersEventHandler);

eventRouter.get('/:eventId/attendees', getEventAttendees);
module.exports = eventRouter;
