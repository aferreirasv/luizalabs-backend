import * as HapiSwagger from 'hapi-swagger';

const swaggerOptions: HapiSwagger.RegisterOptions = {
    info: {
      title: 'Orders API',
      description: 'Orders API Documentation',
      version: '1.0',
    },
    tags: [{
        name: 'order',
        description: 'Orders resource'
    }],
    swaggerUI: true,
    documentationPage: true,
    documentationPath: '/docs'
}

export default swaggerOptions