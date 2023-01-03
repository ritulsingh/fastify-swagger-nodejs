const mongoose = require("mongoose");
const connection = require("../dbConnection")
// let items = require("../Items")
const { v4: uuidV4 } = require("uuid")
var crypto = require("crypto");

connection()
const conn = mongoose.connection;

conn.on("error", console.error.bind(console, "Mongodb connection error"))

let itemSchema = mongoose.Schema({
    id: String,
    name: String,
    date: String,
    mobileNumber: String
})

let items = mongoose.model("items", itemSchema, "items")

const getItems = (req, res) => {
    result = items.find().exec(function (err, result) {
        if (result.length === 0) {
            res.send("There are no items")
        }
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
}

const getItem = (req, res) => {
    const { id } = req.params
    result = items.find({ 'id': id }).exec(function (err, result) {
        if (result.length === 0) {
            res.send("There are no items")
        }
        if (err) {
            console.log(err)
        }
        res.send(result)
    })
}

const addItem = (req, res) => {
    const id = crypto.randomBytes(3).toString('hex')
    const { name } = req.body
    const date = new Date(Date.now()).toISOString()
    const { mobileNumber } = req.body

    let ite = new items({ id: id, name: name, date: date, mobileNumber: mobileNumber })

    ite.save(function (err, items) {
        if (err) return console.error(err);
        console.log(ite.name + " saved successfully");
    })
    res.code(201).send(ite)
}

const deleteItem = (req, res) => {
    const { id } = req.params
    const filter = { id: id }
    items.findOneAndRemove(filter, function (err, item) {
        if (err) {
            console.log(err);
        } else {
            res.send(`Item id ${id} deleted successfully`)
        }
    })
}

const updateItem = (req, res) => {
    const { id } = req.params
    const { name } = req.body
    const { mobileNumber } = req.body

    const filter = { id: id }
    const update = { name: name, mobileNumber: mobileNumber }
    items.findOneAndUpdate(filter, update, { new: true }, function (err, item) {
        if (err) {
            console.log(err);
        } else {
            res.send(`Item id ${id} updated successfully`)
        }

    })
}

module.exports = { getItems, getItem, addItem, deleteItem, updateItem }