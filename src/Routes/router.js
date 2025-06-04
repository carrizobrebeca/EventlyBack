// console.log('requireAuth:', typeof requireAuth);
// console.log('sendFollowRequest:', typeof sendFollowRequest);
// console.log('acceptFollowRequest:', typeof acceptFollowRequest);
// console.log('rejectFollowRequest:', typeof rejectFollowRequest);
// console.log('getFollowRequests:', typeof getFollowRequests);
// console.log('login:', typeof login);
// 
const {Router} = require('express');
const { User } = require('../db');
const usersRouter = require('./usersRouter');
const eventRouter = require('./eventRouter');
const postRouter = require('./postRouter');
const login = require('../Controllers/login');
const { rejectFollowRequest } = require('../Handlers/rejectFollowHandler');
const { acceptFollowRequest } = require('../Handlers/acceptFollowHandler');
const { sendFollowRequest } = require('../Handlers/followRequestHandler');
const requireAuth = require('../middlewares/middlewere');
const getFollowRequests = require('../Controllers/getFollowRequests');


const router = Router();


router.post('/request/:id', requireAuth, sendFollowRequest);
router.put('/accept/:requestId', requireAuth, acceptFollowRequest);
router.put('/reject/:requestId', requireAuth, rejectFollowRequest);
router.get('/requests', requireAuth, getFollowRequests);

router.use("/users", usersRouter);
router.use("/event", eventRouter);
router.use("/post", postRouter);
router.post("/login", login);
router.get('/validate-token', requireAuth, async (req, res) => {
  try {
    const user = await User.findByPk(req.userId);
    if (!user) {
      return res.status(401).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Token válido', user: { id: user.id, userName: user.userName } });
  } catch (error) {
    res.status(500).json({ message: 'Error del servidor' });
  }
});
 module.exports = router;

 