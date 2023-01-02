const { getItems, getItem, postItem } = require('../controllers/items')

// item schema
const item = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
    },
}

// Options for getting of all items
const getItemsOpts = {
    schema: {
        response: {
            200: {
                type: 'array',
                items: item
            },
        },
    },
    handler: getItems
}

// Options for getting of single item
const getItemOpts = {
    schema: {
        response: {
            200: item
        }
    },
    handler: getItem
}

const postItemOpts = {
    schema:{
        response:{
            200: item
        },
    },
    handler: postItem
}

function itemRoutes(fastify, options, done) {
    // Get all items
    fastify.get('/items', getItemsOpts)

    // Get single item
    fastify.get('/items/:id', getItemOpts)

    
    fastify.post('/items', postItemOpts)
    done()
}

module.exports = itemRoutes;