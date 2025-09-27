import { Router } from "express";
import swaggerJSDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'

const swaggerOptions = {
  swaggerDefinition: {
    myapi: '3.0.0',
    info: {
      title: 'JAC',
      version: '1.0.0',
      description: 'Documentação da Api',
    },
    servers: [
      {
        url: 'http://localhost:3000',
      },
    ],
  },
  apis: ['./modules/*.ts'],
};

const swaggerDocument = swaggerJSDoc(swaggerOptions)

const router = Router()

router.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

export {swaggerDocument}