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
const Database = require('./database/Database.js');
const Server = require('./server/Server.js');

Database.init()
  .then(() => {
    return Server.init({ port: 3000 })
  })
  .then(() => {
    console.log('Battleship listening on port 3000!')
  })
  .catch(error => {
    console.error('Unable to start the application', error);
  });

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
