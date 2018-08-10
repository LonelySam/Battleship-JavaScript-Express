const express = require('express');
const bodyParser = require('body-parser');
const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const Game = require('./src/Game.js')
const connectionDB = require('./src/ConnectionDB.js');
const generateGameSchema = require('./src/GameSchemaDB.js');

app.get('/game',(req, res) => {
  Game.join(req.query.token)
  .then(game => {
      res.send(game)
    })
  .catch(error => console.error(error))
})

app.post('/game', (req, res) => {
  Game.create(req.body)
    .then(game => {
      res.send(game)
    })
    .catch(error => console.error(error))
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
  connectionDB
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
      return generateGameSchema(connectionDB)
        .sync({force: false})
    })
    .then(() => console.log("Creation of table Game succesful"))
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
})
