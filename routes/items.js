const { getItems, getItem, addItem, deleteItem, updateItem } = require('../controllers/items')

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
        parameters: {
            type: 'object',
            required: ['id'],
            // description: "ID of the item",
            properties: {
                id: { type: 'string' }
            }
        },
        response: {
            200: item
        }
    },
    handler: getItem
}

const postItemOpts = {
    schema: {
        body: {
            type: 'object',
            required: ['name'],
            properties: {
                name: { type: 'string' }
            }
        },
        response: {
            201: item
        },
    },
    handler: addItem
}

const deleteItemOpts = {
    schema: {
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' }
                },
            },
        },
    },
    handler: deleteItem,
}

const updateItemOpts = {
    schema: {
        response: {
            200: item
        }
    },
    handler: updateItem
}

function itemRoutes(fastify, options, done) {
    // Get all items
    fastify.get('/items', getItemsOpts)

    // Get single item
    fastify.get('/items/:id', getItemOpts)

    // Add single item
    fastify.post('/items', postItemOpts)

    // Delete single item
    fastify.delete('/items/:id', deleteItemOpts)

    // Update single item
    fastify.put('/items/:id', updateItemOpts)

    done()
}

module.exports = itemRoutes;