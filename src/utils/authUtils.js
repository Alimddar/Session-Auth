import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const hashPassword = async (password) => {
  try {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  } catch (error) {
    throw new Error('Error hashing password');
  }
};

export const comparePassword = async (password, hashedPassword) => {
  try {
    return await bcrypt.compare(password, hashedPassword);
  } catch (error) {
    throw new Error('Error comparing passwords');
  }
};

export const generateTokens = async (user) => {
  try {
    const accessToken = jwt.sign(
      { id: user.id, is_admin: user.is_admin },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );
    const refreshToken = jwt.sign(
      { id: user.id, is_admin: user.is_admin },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );
    return { accessToken, refreshToken };
  } catch (error) {
    console.error(`Error occurred while generating token ${error}`);
    throw error;
  }
};