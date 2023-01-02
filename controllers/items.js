const items = require("../Items")

const getItems = (req, res) => {
    res.send(items)
}

const getItem  = (req, res) => {
    const {id} = req.params
    const item = items.find((item) => item.id === id)
    res.send(item)
}

const postItem = (req, res) => {

}

module.exports = {getItems, getItem, postItem}