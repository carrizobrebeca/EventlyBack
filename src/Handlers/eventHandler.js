const { addUserToEvent } = require("../Controllers/addUserToEvent");
const { getEvent } = require("../Controllers/getEvent");
const { postEvent } = require("../Controllers/postEvent");

const getEventHandler = async (req, res)=>{
    const {name} = req.query;
    try {
      const result = name ? await getEvent(name) : await getEvent();
      res.status(200).json(result);
    } catch (error) {
       res.status(400).json({error: error.message});
    }
 }
 const postEventHandler = async (req, res)=>{
 const { name, title, image, type, location, creatorId, eventDate, eventTime} = req.body;
 try {
    const response = await postEvent( name, title, image, type, location, creatorId, eventDate, eventTime);
    res.status(200).json(response);
 } catch (error) {
    res.status(400).json({error: error.message});
     console.error("ERROR POST /post:", error); 
 }  

}

const addUsersEventHandler = async (req, res) => {
  const { eventId } = req.params;
  const { userIds } = req.body; 

  try {
     const response = await addUserToEvent(eventId, userIds );
    res.status(200).json(response);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Error al invitar usuarios' });
  }
}
 
module.exports= {
    postEventHandler,
    getEventHandler,
    addUsersEventHandler
}