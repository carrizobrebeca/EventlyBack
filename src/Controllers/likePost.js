const { User, Post, Notification  } = require('../db');
const getUpdatedLikes = async (postId) => {
  const post = await Post.findByPk(postId, {
    include: [{ model: User, as: 'Likers' }]
  });
  return post.Likers.length;
};

const likePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.body.userId;

  try {
    const user = await User.findByPk(userId);
    const post = await Post.findByPk(postId);

    if (!user || !post) {
      return res.status(404).json({ error: 'Usuario o Post no encontrado' });
    }

    const alreadyLiked = await user.hasLikedPost(post);
    if (alreadyLiked) {
      return res.status(400).json({ message: 'Ya diste like a este post' });
    }

    await user.addLikedPost(post);

if (post.userId !== userId) { // evitar notificaciones a uno mismo
      await Notification.create({
       type: 'like',
        actorId: userId,// el que dio like
        recipientId: post.userId,// dueño del post
        postId: post.id,
         postId,
        isRead: false        
      });
    }
    const totalLikes = await getUpdatedLikes(postId);

    return res.status(200).json({
      message: 'Like agregado con éxito',
      totalLikes,
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

const dislikePost = async (req, res) => {
  const postId = req.params.id;
  const userId = req.body.userId;

  try {
    const user = await User.findByPk(userId);
    const post = await Post.findByPk(postId);

    if (!user || !post) {
      return res.status(404).json({ error: 'Usuario o Post no encontrado' });
    }

    const alreadyLiked = await user.hasLikedPost(post);
    if (!alreadyLiked) {
      return res.status(400).json({ message: 'Este post no tiene like tuyo para quitar' });
    }

    await user.removeLikedPost(post);

    const totalLikes = await getUpdatedLikes(postId);

    return res.status(200).json({
      message: 'Like eliminado con éxito',
      totalLikes,
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};


module.exports = {
  likePost,
  dislikePost,
};