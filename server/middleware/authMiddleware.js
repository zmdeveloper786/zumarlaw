import jwt from 'jsonwebtoken';
import User from '../models/User.js'; // ✅ Make sure the path is correct

// ✅ General User Auth Middleware
export const verifyJWT = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  // 🔒 Check for Bearer token
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'No token provided' });
  }

  const token = authHeader.split(' ')[1];

  if (!process.env.JWT_SECRET) {
    return res.status(500).json({ message: 'JWT_SECRET not set in environment' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 🔍 Check if user exists in DB
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User not found. Logging out.' });
    }

    req.user = {
      id: user._id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
    };

    next(); // ✅ Proceed to route
  } catch (error) {
    return res.status(401).json({ message: 'Invalid or expired token' });
  }
};


// ✅ Admin-Specific Auth Middleware
export const authenticateAdmin = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token =
    req.cookies?.token || (authHeader?.startsWith('Bearer ') ? authHeader.split(' ')[1] : null);

  if (!token) {
    console.warn('Admin auth failed: No token provided');
    return res.status(401).json({ message: 'Not authorized' });
  }

  try {
    if (!process.env.JWT_SECRET) {
      throw new Error('JWT_SECRET is not defined in environment');
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded?.id) {
      return res.status(401).json({ message: 'Invalid token payload' });
    }

    req.admin = {
      id: decoded.id,
      email: decoded.email
    };

    return next();
  } catch (error) {
    if (error.name === 'TokenExpiredError') {
      console.warn('Admin token expired');
      return res.status(401).json({ message: 'Token expired' });
    }

    console.error('Admin token verification failed:', error.message);
    return res.status(401).json({ message: 'Token is invalid or expired' });
  }
};
