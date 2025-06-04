const { User } = require("../db");

const postUser = async (name, userName, city, password, image) => {
const existingUser = await User.findOne({ where: { userName } });

  if (existingUser) {
    throw new Error("Nombre de usuario ya registrado");
  }

  return await User.create({
    name,
    userName,
    city,
    password,
    image,
  });

};

module.exports = postUser;
