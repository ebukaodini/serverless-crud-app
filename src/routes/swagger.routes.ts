import express from "express";
import swaggerJsdoc from "swagger-jsdoc";

// const router = express.Router();

// import swaggerUi from "swagger-ui-express";
// import swaggerDocument from "../../swagger.json";

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

const options = {
  definition: {
    openapi: "3.0.0", // Specify the version of OpenAPI
    info: {
      title: "Serverless CRUD App",
      version: "1.0.0",
      description: "Serverless CRUD App",
    },
  },
  apis: ["./*.ts"], // Specify the path to your API route files
};

const specs = swaggerJsdoc(options);

export default specs;
