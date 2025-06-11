const postChat = require("../Controllers/postChat");


// const geChatHandler = async (req, res)=>{
//     const {name} = req.query;
//     try {
//       const result = name ? await getUser(name) : await getUser();
//       res.status(200).json(result);
    
//     } catch (error) {
      
//     }
//  }
const postChatHandler = async (req, res) => {
  const { user1Id, user2Id } = req.body;
  
  try {
    const response = await postChat(user1Id, user2Id);
 res.status(200).json(response.chat);
      
 } catch (error) {
   console.error("ERROR POST /post:", error); 
    res.status(400).json({error: error.message});
 }  
};

module.exports = {
  // geChatHandler,
  postChatHandler,
};