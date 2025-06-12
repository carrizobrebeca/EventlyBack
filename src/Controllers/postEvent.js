const { Event } = require('../db');
const moment = require('moment');
const postEvent = async (name, title, image, type, location, creatorId, eventDate, eventTime) => {
  try {
  
  return await Event.create({ name, title, image, type, location, creatorId, eventDate, eventTime});
  } catch (error) {
      console.error("ERROR POST /post:", error); 
  }


};

module.exports = {postEvent};
