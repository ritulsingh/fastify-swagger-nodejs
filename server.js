const fastify = require("fastify")({ logger: true })

const PORT = 5000

fastify.register(require('@fastify/swagger'), {
    exposeRoute: true,
    routePrefix: "/docs",
    swagger: {
        info: {
            title: "Fastify-Api Documentation",
            description: "Implementing the concept of API documentation using Fastify, Swagger, and Node.js",
            version: "1.1.0"
        },
        tags: [
            {
                name: 'items',
                description: 'Operations related to items'
            }
        ],
        externalDocs: {
            url: 'https://swagger.io',
            description: 'Find more info here'
        },
        schemes: ["http", "https"],
        consumes: ["application/json"],
        produces: ["application/json"]
    }
})

fastify.register(require('@fastify/swagger-ui'));

fastify.register(require("./routes/items"))

fastify.listen(PORT, (err) => {
    if (err) {
        console.log("We Got an error in listening " + err)
        process.exit(1)
    }
})
