import jwt from 'jsonwebtoken';

export const authenticateToken = async (req, res, next) => {
  const accessToken = req.cookies.accessToken;
  const refreshToken = req.cookies.refreshToken;

  if (accessToken) {
      const payload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET);
      req.user = { id: payload.id, is_admin: payload.is_admin };
      return next();
  }

  if (!refreshToken) {
    return res.status(401).send({ message: 'Refresh token is missing' });
  }

  try {
    const payload = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
    const newAccessToken = jwt.sign(
      { id: payload.id, is_admin: payload.is_admin },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: '15m' }
    );
    
    res.cookie('accessToken', newAccessToken, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
    });
    
    req.user = { id: payload.id, is_admin: payload.is_admin };
    return next();
  } catch (refreshError) {
    return res.status(403).send({ message: 'Invalid or expired refresh token' });
  }
};

export const isAdmin = (req, res, next) => {
  if (req.user && req.user.is_admin) {
    return next();
  }
  return res.status(403).send({ message: 'Access denied. Admin privileges required.' });
};