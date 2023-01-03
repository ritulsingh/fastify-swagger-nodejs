require("dotenv").config();
const fastify = require("fastify")({ logger: true })
const swagger = require("./swagger")
const PORT = 5000

fastify.register(require('@fastify/swagger'), swagger)
fastify.register(require('@fastify/swagger-ui'))
fastify.register(require("./routes/items"))

fastify.listen(PORT, (err) => {
    if (err) {
        console.log("We Got an error in listening " + err)
        process.exit(1)
    }
})
