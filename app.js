const express = require("express");
const path = require("path")
const app = express();
var mongoose = require('mongoose');
const bodyparser = require("body-parser")

mongoose.connect('mongodb://localhost/ContactDance', { useNewUrlParser: true, useUnifiedTopology: true });
const port = 600;

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String,
    desc: String
});

const Contact = mongoose.model('Contact', contactSchema);

app.use('/static', express.static('static'))
app.use(express.urlencoded())

app.set('view engine', 'pug')
app.set('views', path.join(__dirname, 'views'))

app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('home.pug', params);
});

app.get('/contact', (req, res) => {
    const params = {}
    res.status(200).render('contact.pug', params);
});

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    myData.save().then(()=>{
        res.send("The details have been saved to the database")
    }).catch(()=>{
        res.status(400).send("Details were not saved to the database")
    });

    // res.status(200).render('contact.pug');
});

app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});