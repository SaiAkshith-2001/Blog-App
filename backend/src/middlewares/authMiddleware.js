// import jwt from 'jsonwebtoken';
// import User from '../models/User.js';

// export const authMiddleware = async (req, res, next) => {
//   try {
//     // Get token from header
//     const token = req.header('Authorization')?.replace('Bearer ', '');

//     if (!token) {
//       return res.status(401).json({
//         status: 'fail',
//         message: 'No token, authorization denied'
//       });
//     }

//     // Verify token
//     const decoded = jwt.verify(token, process.env.JWT_SECRET);

//     // Find user
//     const user = await User.findOne({
//       _id: decoded.id
//     });

//     if (!user) {
//       throw new Error();
//     }

//     // Attach user to request
//     req.user = user;
//     req.token = token;

//     next();
//   } catch (error) {
//     res.status(401).json({
//       status: 'fail',
//       message: 'Please authenticate'
//     });
//   }
// };
