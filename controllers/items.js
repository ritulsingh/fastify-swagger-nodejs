let items = require("../Items")
const { v4: uuidV4 } = require("uuid")

const getItems = (req, res) => {
    res.send(items)
}

const getItem = (req, res) => {
    const { id } = req.params
    const item = items.find((item) => item.id === id)
    res.send(item)
}

const addItem = (req, res) => {
    const { name } = req.body
    const item = {
        id: uuidV4(),
        name,
    }
    items = [...items, item]
    res.code(201).send(item)
}

const deleteItem = (req, res) => {
    const { id } = req.params
    items = items.filter(item => item.id !== id)
    res.send({ message: `Item ${id} deleted` })
}

const updateItem = (req, res) => {
    const { id } = req.params
    const { name } = req.body

    items = items.map(item => (item.id === id ? {id, name} : item))
    console.log(items)
    const item = items.find((item) => item.id === id)
    console.log(item)

    res.send(item)
}

module.exports = { getItems, getItem, addItem, deleteItem, updateItem }