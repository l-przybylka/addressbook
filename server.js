const express = require('express')
const app = express()
const MongoClient = require('mongodb').MongoClient
const PORT = 3000

let db
    dbName = 'address'

app.listen(PORT, console.log("Server running"))

MongoClient.connect('mongodb+srv://admin:admin@cluster0.k3icy.mongodb.net/?retryWrites=true&w=majority', {useUnifiedTopology: true})
    .then(client => {
        console.log(`Connected to ${dbName} Database`)
        db = client.db(dbName)
    })

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/', async (req,res) => {
    res.render('index.ejs')
})

app.post('/addAddress', (req,res) => {
    db.collection('addresses').insertOne({
        name: req.body.nameEntry,
        address: req.body.addressEntry,
        phone: req.body.phoneEntry

    })
    .then(result => {
        console.log('New address added')
        res.redirect('/')
    })
})