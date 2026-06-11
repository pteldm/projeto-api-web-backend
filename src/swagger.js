import swaggerJSDoc from 'swagger-jsdoc';

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Produtos",
      version: "1.0.0",
      description: "Documentação com Swagger"
    }
  },
  apis: ["./src/routes/*.js"],
}

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;