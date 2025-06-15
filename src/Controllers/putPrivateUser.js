const { User } = require("../db");

const putPrivateUser = async (id) => {


  try {
    const user = await User.findByPk(id);

    if (!user) return 'Usuario no encontrado';

    user.isPrivate = !user.isPrivate; // toggle
    await user.save();

  return user;
  } catch (error) {
 'Error al cambiar la privacidad' ;
  }
}

module.exports = putPrivateUser;