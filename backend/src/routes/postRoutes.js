import express from "express";
import {
  createPost,
  readAllPosts,
  readPostById,
  readPostByAuthor,
  updatePostById,
  deletePostById,
  updatePostByIdPatch,
} from "../controllers/postController.js";
import authentication from "../middlewares/authentication.js";
import authorization from "../middlewares/authorization.js";
import { ROLES } from "../models/role.Schema.js";
import roles from "../helper/roles.js";
import apiKeyAuth from "../middlewares/apiKey.js";
import { permissions } from "../helper/permission.js";
import { PERMISSION } from "../models/apiKey.Schema.js";

const router = express.Router();

router.use(authentication);

/**
 * @openapi
 * components:
 *  securitySchemes:
 *    cookieAuth:
 *      type: apiKey
 *      in: cookie
 *      name: accessToken
 *  schemas:
 *     PostCreate:
 *       type: object
 *       required:
 *         - title
 *         - body
 *       properties:
 *         title:
 *           type: string
 *           description: description of title
 *         body:
 *           type: object
 *           description: detailed description of body
 *           properties:
 *              content:
 *                type: string
 *                description: detailed description of body
 *
 *     PostResponse:
 *         type: object
 *         description: description of title
 *         properties:
 *           title:
 *            type: string
 *            description: description of title
 *           body:
 *            type: object
 *            properties:
 *              content:
 *                type: string
 *                description: detailed description of body
 */

/**
 * @openapi
 * /api/posts/write:
 *    post:
 *      tags:
 *        - Posts
 *      summary: Create a new Post
 *      security:
 *        - cookieAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/PostCreate'
 *      responses:
 *        "201":
 *          description: Post created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/PostResponse'
 *        "400":
 *          description: Invalid input data
 *        "401":
 *          description: Not authenticated
 */

router
  .route("/write")
  .post(
    apiKeyAuth,
    permissions(PERMISSION.general),
    roles(ROLES.user),
    authorization,
    createPost
  );

// router.route("/read").get(paginationMiddleware(Post), (req, res) => {
//   res.json(res.paginatedResults);
// });

/**
 * @openapi
 * /api/posts/read:
 *  get:
 *    tags:
 *      - Posts
 *    summary: All posts
 *    security:
 *      - cookieAuth: []
 *    responses:
 *      200:
 *        description: List of posts
 *        content:
 *          application/json:
 *            schema:
 *              type: array
 *              items:
 *                $ref: '#/components/schemas/PostResponse'
 *      400:
 *        description: Not authenticated
 */

router
  .route("/read")
  .get(
    apiKeyAuth,
    permissions(PERMISSION.general),
    roles(ROLES.user),
    authorization,
    readAllPosts
  );
/**
 * @openapi
 * /api/posts/read/post/{id}:
 *  get:
 *    tags:
 *      - Posts
 *    summary: Get a post
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          description: postId
 *    responses:
 *      200:
 *        description: post
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/PostResponse'
 *      400:
 *        description: Not authenticated
 */

router
  .route("/read/post/:id")
  .get(
    apiKeyAuth,
    permissions(PERMISSION.general),
    roles(ROLES.user),
    authorization,
    readPostById
  );
/**
 * @openapi
 * /api/posts/read/post/{id}:
 *  put:
 *    tags:
 *      - Posts
 *    summary: Edit a post
 *    security:
 *      - cookieAuth: []
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/PostCreate'
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          description: postId
 *    responses:
 *      200:
 *        description: post
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/PostResponse'
 *      400:
 *        description: Not authenticated
 */

router
  .route("/read/post/:id")
  .put(
    apiKeyAuth,
    permissions(PERMISSION.general),
    roles(ROLES.user),
    authorization,
    updatePostById
  );

/**
 * @openapi
 * /api/posts/read/post/{id}:
 *  patch:
 *    tags:
 *      - Posts
 *    summary: Update a post
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          description: postId
 *    responses:
 *      200:
 *        description: post
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/PostResponse'
 *      400:
 *        description: Not authenticated
 */

router
  .route("/read/post/:id")
  .patch(
    apiKeyAuth,
    permissions(PERMISSION.general),
    roles(ROLES.user),
    authorization,
    updatePostByIdPatch
  );

/**
 * @openapi
 * /api/posts/read/post/{id}:
 *  delete:
 *    tags:
 *      - Posts
 *    summary: Delete a post
 *    security:
 *      - cookieAuth: []
 *    parameters:
 *      - in: path
 *        name: id
 *        required: true
 *        schema:
 *          type: string
 *          description: postId
 *    responses:
 *      204:
 *        description: successfully deleted post
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              items:
 *                $ref: '#/components/schemas/PostResponse'
 *      400:
 *        description: Not authenticated
 */

router
  .route("/read/post/:id")
  .delete(
    apiKeyAuth,
    permissions(PERMISSION.general),
    roles(ROLES.user),
    authorization,
    deletePostById
  );

/**
 * @openapi
 * /api/posts/read/user:
 *  get:
 *    tags:
 *      - Users
 *    summary: Get a posts by authors
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
 *                $ref: '#/components/schemas/PostResponse'
 *      400:
 *        description: Not authenticated
 */

router.route("/read/user").get(readPostByAuthor);

export default router;
