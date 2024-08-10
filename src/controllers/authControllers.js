import User from '../models/userModel.js';
import {
  comparePassword,
  hashPassword,
  generateTokens,
} from '../utils/authUtils.js';

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ where: { username: username } });
    
    if (!user || !comparePassword(password, user.password)) {
      return res.status(401).send({ message: 'Username or password is wrong' });
    }
    
    const { accessToken, refreshToken } = await generateTokens(user);
    
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });
    res.cookie('refreshToken', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    
    res.send({ message: 'Login successful' });
  } catch (error) {
    res.status(500).send({
      message: 'An error occurred during login',
      error: error.message,
    });
  }
};

export const signup = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    const existingEmail = await User.findOne({ where: { email } });
    if (existingEmail) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const newUser = await User.create({
      username,
      password: await hashPassword(password),
      email,
    });

    res.status(201).json({
      message: 'User created successfully',
      user: {
        id: newUser.id,
        username: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.clearCookie('accessToken');
    res.clearCookie('refreshToken');
    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).json({
      message: 'An error occurred while logging out',
      error: error.message,
    });
  }
};
