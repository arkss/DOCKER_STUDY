const express = require("express");
const bodyParser = require('body-parser');

const db = require('./db');

const app = express();

app.use(bodyParser.json());

db.pool.query(`CREATE TABLE lists (
    id INTEGER AUTO_INCREMENT,
    value TEXT, 
    PRIMARY KEY (id)
)`, (err, results, fileds) => {
    console.log('results', results)
})

app.get('/api/hi', function (req, res) {
   res.status(200).send('good')
})




app.get('/api/values', function (req, res) {
    db.pool.query('SELECT * FROM lists;',
        (err, results, fileds) => {
            if (err)
                return res.status(500).send(err)
            else
                return res.json(results)
        })
})

app.post('/api/value', function (req, res, next) {
    db.pool.query(`INSERT INTO lists (value) VALUES("${req.body.value}")`,
        (err, results, fileds) => {
            if (err)
                return res.status(500).send(err)
            else
                return res.json({ success: true, value: req.body.value })
        })
})




app.listen(5000, () => {
    console.log('start, 5000 port')
})
