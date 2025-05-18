import swaggerAutogen from 'swagger-autogen';

const doc = {
    info: {
        version: '1.0.0',
        title: 'NE NodeJS Rest API',
        description: ''
    },
    host: 'localhost:5001',
    basePath: '/api/v1',
    schemes: ['http'],
    consumes: ['application/json'],
    produces: ['application/json'],
    tags: [
       
        {
            name: 'User',
            description: 'Users endpoints'
        },
        {
            name: 'Tasks',
            description: 'Tasks endpoints'
        }
        
    ],
    securityDefinitions: {
        bearerAuth: {
            type: 'apiKey',
            name: 'Authorization',
            in: 'header'
        }
    },
    security: [
        {
            bearerAuth: [] // Apply Bearer token globally
        }
    ],
    definitions: {}
};

const outputFile = './src/swagger/doc/swagger.json';
const routes = ['./src/routes/index.ts'];

swaggerAutogen()(outputFile, routes, doc).then(async () => {
    await import('../index');
});