const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const SALT_ROUNDS = 10;

const UserController = {
  async register(req, res) {
    try {
      const { username, email, password } = req.body;
      console.log("req.body", req.body) // aquin esta
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'El usuario ya existe' });
      }
      
      // Hash de la contraseña (refactorizar)
      const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
      
      const user = await User.create({
        username,
        email,
        password: hashedPassword
      });
      
      // Generamos el token JWT (refactorizar)
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      
      const formatedUser = {
        id: user.id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      }
      res.status(201).json({
        user: formatedUser,
        token
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async login(req, res) {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ where: { email } });
      
      if (!user) {
        return res.status(401).json({ error: 'Credenciales inválidad' });
      }

      const isValidPassword = await bcrypt.compare(password, user.password);
      
      if (!isValidPassword) {
        return res.status(401).json({ error: 'Credenciales inválidas' });
      }

      // Generamos el token JWT (refactorizar)
      const token = jwt.sign(
        { id: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );
      const formatedUser = {
        id: user.id,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      }
      res.json({
        user: formatedUser,
        token
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  },

  async getUser(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      const { password: _, ...userWithoutPassword } = user.toJSON();
      res.json(userWithoutPassword);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
};

module.exports = UserController;