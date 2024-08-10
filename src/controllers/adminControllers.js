import User from '../models/userModel.js';
import { hashPassword } from '../utils/authUtils.js';

export const createUser = async (req, res) => {
  try {
    const { username, password, is_admin } = req.body;

    if (!username || !password) {
      return res.status(400).json({ success: false, message: 'Username and password are required' });
    }

    const existingUser = await User.findOne({ where: { username } });
    if (existingUser) {
      return res.status(409).json({ success: false, message: 'Username already exists' });
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await User.create({
      username,
      password: hashedPassword,
      is_admin: is_admin || false,
    });

    const { password: _, ...userData } = newUser.toJSON();
    return res.status(201).json({ success: true, data: userData });
  } catch (error) {
    console.error('Error in createUser:', error);
    return res.status(500).json({ success: false, message: 'An error occurred while creating the user' });
  }
};

export const getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    const { password: _, ...userData } = user.toJSON();
    return res.status(200).json({ success: true, data: userData });
  } catch (error) {
    console.error('Error in getUser:', error);
    return res.status(500).json({ success: false, message: 'An error occurred while fetching the user' });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json({ success: true, data: users });
  } catch (error) {
    console.error('Error in getUsers:', error);
    return res.status(500).json({ success: false, message: 'An error occurred while fetching users' });
  }
};

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password, is_admin } = req.body;

    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    if (username) {
      const existingUser = await User.findOne({ where: { username } });
      if (existingUser && existingUser.id !== user.id) {
        return res.status(409).json({ success: false, message: 'Username already exists' });
      }
      user.username = username;
    }

    if (password) {
      user.password = await hashPassword(password);
    }

    if (is_admin !== undefined) {
      user.is_admin = is_admin;
    }

    await user.save();

    const { password: _, ...userData } = user.toJSON();
    return res.status(200).json({ success: true, data: userData });
  } catch (error) {
    console.error('Error in updateUser:', error);
    return res.status(500).json({ success: false, message: 'An error occurred while updating the user' });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }

    await user.destroy();
    return res.status(200).json({ success: true, message: 'User deleted successfully' });
  } catch (error) {
    console.error('Error in deleteUser:', error);
    return res.status(500).json({ success: false, message: 'An error occurred while deleting the user' });
  }
};