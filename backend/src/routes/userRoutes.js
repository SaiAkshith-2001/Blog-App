import express from "express";
import { body } from "express-validator";
// import { authMiddleware } from "../middlewares/authMiddleware.js";
import authentication from "../middlewares/authentication.js";
import authorization from "../middlewares/authorization.js";
import {
  login,
  logout,
  register,
  updateUserById,
  deleteUserById,
  getUserProfileById,
  refreshAccessToken,
} from "../controllers/userController.js";
import roles from "../helper/roles.js";
import { Roles } from "../models/role.Schema.js";

const router = express.Router();
/**
 * @openapi
 * components:
 *  securitySchemes:
 *    cookieAuth:
 *      type: apiKey
 *      in: cookie
 *      name: accessToken
 *  schemas:
 *    UserRegister:
 *      type: object
 *      required:
 *        - username
 *        - email
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          description: enter username
 *        email:
 *          type: string
 *          description: enter email
 *        password:
 *          type: string
 *          format: password
 *          description: enter password
 *    UserResponse:
 *      type: object
 *      description: welcome
 *      properties:
 *        username:
 *          type: string
 *          description: username
 *        role:
 *          type: string
 *          description: user
 *        email:
 *          type: string
 *          description: email@example.com
 */

/**
 * @openapi
 * /api/user/register:
 *  post:
 *    tags:
 *      - Users
 *    summary: Register user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserRegister'
 *    responses:
 *      200:
 *        description: user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserResponse'
 *      400:
 *        description: Invalid Inputs
 */

router.post(
  "/register",
  [
    body("username")
      .trim()
      .isLength({ min: 6 })
      .withMessage("Username must be at least 6 characters"),
    body("email").isEmail().withMessage("Invalid email address"),
    body("password")
      .isLength({ min: 8 })
      .withMessage("Password must be at least 8 characters"),
  ],
  register
);
/**
 * @openapi
 * /api/user/login:
 *  post:
 *    tags:
 *      - Users
 *    summary: Login user
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/UserRegister'
 *    responses:
 *      200:
 *        description: user
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/UserResponse'
 *      400:
 *        description: Invalid input
 */

router.post(
  "/login",
  [
    body("username").notEmpty().withMessage("Invalid username address"),
    body("password").notEmpty().withMessage("Password is required"),
  ],
  login
);

/**
 * @openapi
 * /api/user/logout:
 *  post:
 *    tags:
 *      - Users
 *    summary: Logout currently logged in User
 *    responses:
 *      200:
 *        description: User logged out successfully
 *      400:
 *        description: Invalid input
 */

router.post("/logout", logout);

// router.use(async (req, res, next) => {
//   if (req.tokenExipred) {
//     return res.status(401).json({ message: "access token expired" });
//   }
//   next();
// }, refreshAccessToken);
router.post("/refresh-token", refreshAccessToken);
router.use(authentication);
/**
 * @openapi
 * /api/user/profile/:id:
 *  get:
 *    tags:
 *      - Users
 *    summary: Get user profile
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      200:
 *        description: post
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: './components/schemas/Post'
 *      400:
 *        description: Not authenticated
 */

router.route("/profile/:id").get(getUserProfileById);
router
  .route("/profile/:id")
  .patch(roles(Roles.user), authorization, updateUserById);
router
  .route("/profile/:id")
  .delete(roles(Roles.user), authorization, deleteUserById);

export default router;
