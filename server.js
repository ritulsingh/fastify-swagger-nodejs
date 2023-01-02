const fastify = require("fastify")({ logger: true })

const PORT = 5000

fastify.register(require('@fastify/swagger'), {
    exposeRoute: true,
    routePrefix: "/docs",
    swagger: {
        info: {
            title: "Fastify-Api Documentation",
            description: "Campaign Builder using Omnichannel Communication API",
            version: "0.1.0"
        },
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

fastify.register(require("./routes/items"), {
    prefix: "items",
})

fastify.listen(PORT, (err) => {
    if (err) {
        console.log("We Got an error in listening " + err)
        process.exit(1)
    }
})
