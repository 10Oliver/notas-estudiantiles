const User = require('../models/User');
const jwt = require('jsonwebtoken');

const createToken = (user) => {
  return jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });
}

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.scope('withPassword').findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }
    const isMatch = await user.validPassword(password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }
    const token = createToken(user);
    res.status(200).json({ token });
  } catch (error) {
    next(error);
  }
}

const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const newUser = await User.create({ username, email, password });
    const userResponse = newUser.toJSON();
    delete userResponse.password;
    res.status(201).json(userResponse);
  } catch (error) {
    next(error);
  }
}

const getProfile = async (req, res, next) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'Usuario no encontrado' });
    }
  } catch (error) {
    next(error);
  }
}

module.exports = {
  loginUser,
  registerUser,
  getProfile,
};
