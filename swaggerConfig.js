const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

const configureSwagger = (app) => {
    // Configuração do Swagger
    const swaggerOptions = {
        swaggerDefinition: {
            openapi: '3.0.0',
            info: {
                title: 'Documentação da API do Clima',
                version: '1.0.0',
                description: 'Documentação da API de Clima utilizando Swagger',
            },
            servers: [
                {
                    url: 'http://localhost:3000', // URL base da sua API
                    description: 'Servidor Local',
                },
            ],
            components: {
                schemas: {
                    WeatherData: {
                        type: 'object',
                        properties: {
                            // Defina as propriedades do seu modelo WeatherData aqui
                            id: { type: 'integer' },
                            city_name: { type: 'string' },
                            temperature: { type: 'number' },
                            humidity: { type: 'number' },
                            wind_speed: { type: 'number' },
                            wind_degrees: { type: 'number' },
                            weather_description: { type: 'string' },
                            createdAt: { type: 'string', format: 'date-time' },
                            updatedAt: { type: 'string', format: 'date-time' },
                        },
                    },
                    Subscription: {
                        type: 'object',
                        properties: {
                            id: { type: 'string', format: 'uuid' },
                            email: { type: 'string', format: 'email' },
                            frequency: {
                                type: 'string',
                                enum: ['weekly', 'biweekly', 'monthly', 'semiannually'],
                            },
                        },
                    },
                },
            },
        },
        apis: ['./src/app/controllers/*.js'], // Caminho dos arquivos que contêm os comentários JSDoc
    };

    const swaggerSpec = swaggerJSDoc(swaggerOptions);
    app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerSpec));
};

module.exports = configureSwagger;
