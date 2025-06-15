const { User, Post } = require('../db');

const getPostLikers = async (req, res) => {
  const postId = req.params.id;

  try {
    const post = await Post.findByPk(postId, {
      include: [{ model: User, as: 'Likers', attributes: ['id', 'name', 'image'] }]
    });

    if (!post) return res.status(404).json({ error: 'Post no encontrado' });

    return res.status(200).json({
      totalLikes: post.Likers.length,
      likers: post.Likers
    });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
module.exports = getPostLikers;



