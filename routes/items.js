const { getItems, getItem, addItem, deleteItem, updateItem } = require('../controllers/items')

// item schema
const item = {
    type: 'object',
    properties: {
        id: { type: 'string' },
        name: { type: 'string' },
        date: { type: 'string' },
        mobileNumber: { type: 'string' }
    },
}

// Options for getting of all items
const getItemsOpts = {
    schema: {
        summary: 'Get all items',
        response: {
            200: {
                type: 'array',
                items: item
            },
            404: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                }
            },
            500: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                }
            }
        },
        tags: ['items'],
    },
    handler: getItems
}

// Options for getting of single item
const getItemOpts = {
    schema: {
        summary: 'Getting single item using id',
        params: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    description: 'The ID of the Item to retrieve'
                },
            },
            required: ['id']
        },
        response: {
            200: {
                type: 'array',
                items: item
            },
            404: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                }
            },
            500: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                }
            }
        },
        tags: ['items'],
    },
    handler: getItem
}

// Options for adding single item
const postItemOpts = {
    schema: {
        summary: 'Update a single item using the specified',
        body: {
            type: 'object',
            required: ['name', 'mobileNumber'],
            properties: {
                name: {
                    type: 'string',
                    description: 'Enter the name of the item to add'
                },
                mobileNumber: {
                    type: 'string',
                    description: 'Enter the mobile number of the item to add'
                }
            }
        },
        response: {
            201: item,
            404: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                }
            },
            500: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                }
            }
        },
        tags: ['items'],
    },
    handler: addItem
}

// Options for deleting a single item
const deleteItemOpts = {
    schema: {
        summary: 'Delete a single item using id',
        params: {
            type: 'object',
            properties: {
                id: {
                    type: 'string',
                    description: 'The ID of the Item to delete',
                },
            },
            required: ['id']
        },
        response: {
            200: {
                type: 'object',
                properties: {
                    message: { type: 'string' }
                },
            },
            404: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                }
            },
            500: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                }
            }
        },
        tags: ['items'],
    },
    handler: deleteItem,
}

// Options for updating a single item
const updateItemOpts = {
    schema: {
        summary: 'For the update of a single item using id',
        body: {
            type: 'object',
            required: ['name', 'mobileNumber'],
            properties: {
                name: {
                    type: 'string',
                    description: 'Enter the name of the item to add'
                },
                mobileNumber: {
                    type: 'string',
                    description: 'Enter the mobile number of the item to add'
                }
            }
        },
        params: {
            type: 'object',
            properties: {
                id: { 
                    type: 'string',
                    description: 'The ID of the Item to update'
                },
            },
            required: ['id']
        },
        response: {
            200: item,
            404: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                }
            },
            500: {
                type: 'object',
                properties: {
                    error: { type: 'string' }
                }
            }
        },
        tags: ['items'],
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