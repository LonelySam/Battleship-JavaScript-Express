const bodyParser = require('body-parser');
const express = require('express');

const app = express()

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

const Board = require('./src/Board.js')
const Database = require('./database/Database.js');
const Game = require('./src/Game.js')
const Server = require('./server/Server.js');

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

app.put('/game/:gameId/player/:playerId/board', (req, res) => {
  const gameId = req.params.gameId;
  const playerId = req.params.playerId;
  const shipsArray = req.body;
  Board.createPositioningShip({gameId, playerId, shipsArray})
    .then(result => {
      res.send(result)
    })
    .catch(error => {
      res.send(error)
      console.error(error)
    })
})

Database.init()
  .then(() => {
    // return Server.init({ port: 3000 }) //Analyze why it is not working if listening in other file
    return app.listen(3000);
  })
  .then(() => {
    console.log('Battleship listening on port 3000!')
  })
  .catch(error => {
    console.log('Unable to start the application', error);
  });
