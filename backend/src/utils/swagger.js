import { Router } from "express";
import { port } from "../config/constants.js";
import swaggerJSDoc from "swagger-jsdoc";
import SwaggerUi from "swagger-ui-express";
import swagger from "swagger-model-validator";
const router = Router();
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Blog",
      version: "1.0.0",
      description: "My Blog APIs documentation",
    },
    tags: [
      { name: "Posts", description: "Posts api" },
      { name: "Users", description: "Users api" },
    ],
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "dev",
      },
    ],
    components: {
      securitySchemes: {
        cookieAuth: {
          type: "apiKey",
          in: "cookie",
          name: "accessToken",
        },
        ApiKeyAuth: {
          type: "apiKey",
          in: "header",
          name: "x-api-key",
          description: "API key authorization of an API",
        },
      },
    },
    // schemas: {
    //   Post: {
    //     type: "object",
    //     required: ["title", "body"],
    //     properties: {
    //       title: {
    //         type: "string",
    //         description: "Title of the post",
    //       },
    //       body: {
    //         type: "object",
    //         description: "Detailed description of the post ",
    //         properties: {
    //           content: {
    //             type: "string",
    //             description: "Detailed description of the post content",
    //           },
    //         },
    //       },
    //     },
    //   },
    // },
  },
  apis: ["./src/routes/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);
swagger(swaggerSpec);

router.get("/json", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.send(swaggerSpec);
});

router.use("/", SwaggerUi.serve, SwaggerUi.setup(swaggerSpec));

export default router;
