const express = require('express');


const jwt = require('jsonwebtoken');
const { User } = require('../db');

const login = async (req, res) => {
 try {
 const { userName, password } = req.body;

  const user = await User.findOne({ where: { userName } });
  if (!user) {
    return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
  }

  if (!user.validPassword(password)) {
    return res.status(401).json({ message: 'Usuario o contraseña incorrectos' });
  }

  // Aquí generas el token JWT o sesión
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1d' });
console.log(token);

  res.json({ token, user });
} catch (error) {
  // return res.status(500).json({ message: "Error en el servidor" });
    console.error("ERROR POST /post:", error); 
}
};
module.exports = login;