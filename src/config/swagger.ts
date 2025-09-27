import swaggerAutogen from 'swagger-autogen';

const swagger = swaggerAutogen({ openapi: '3.0.0' })

const doc = {
    info: {
        version: "1.0.0",
        title: "My API",
        description: "Some description..."
    },
    servers: [
        {
            url: 'http://localhost:3000'
        }
    ],
    components: {
        securitySchemes:{
            bearerAuth: {
                type: 'http',
                scheme: 'bearer'
            }
        }
    }
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['../routes/index.ts'];

swagger(outputFile, endpointsFiles, doc).then(() => {
    require('../app');
});