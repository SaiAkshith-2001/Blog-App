import { User } from "../models/user.Schema.js";
//  Get All Users
// export const getAllUsers = async (req, res) => {
//   try {
//     const users = await User.find();
//     res.status(200).json({
//       status: 'success',
//       results: users.length,
//       data: { users }
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: 'error',
//       message: error.message
//     });
//   }
// };
// // Get User by ID
// export const getUserById = async (req, res) => {
//   try {
//     const user = await User.findById(req.params.id);
//     if (!user) {
//       return res.status(404).json({
//         status: 'fail',
//         message: 'User not found'
//       });
//     }
//     res.status(200).json({
//       status: 'success',
//       data: { user }
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: 'error',
//       message: error.message
//     });
//   }
// };
// Create User
export const createUser = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({
      status: "success",
      data: { user: newUser },
    });
  } catch (error) {
    res.status(400).json({
      status: "error",
      message: error.message,
    });
  }
};
// // Update User
// export const updateUser = async (req, res) => {
//   try {
//     const updatedUser = await User.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true, runValidators: true }
//     );

//     if (!updatedUser) {
//       return res.status(404).json({
//         status: 'fail',
//         message: 'User not found'
//       });
//     }

//     res.status(200).json({
//       status: 'success',
//       data: { user: updatedUser }
//     });
//   } catch (error) {
//     res.status(400).json({
//       status: 'error',
//       message: error.message
//     });
//   }
// };
// // Delete User
// export const deleteUser = async (req, res) => {
//   try {
//     const user = await User.findByIdAndDelete(req.params.id);

//     if (!user) {
//       return res.status(404).json({
//         status: 'fail',
//         message: 'User not found'
//       });
//     }
//     res.status(204).json({
//       status: 'success',
//       data: null
//     });
//   } catch (error) {
//     res.status(500).json({
//       status: 'error',
//       message: error.message
//     });
//   }
// };
