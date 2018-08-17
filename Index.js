const Board = require('./src/Board.js')
const Database = require('./database/Database.js');
const Game = require('./src/Game.js')
const Server = require('./server/Server.js');
const app = Server.getExpressInstance();

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
  Board.createShipSetup({gameId, playerId, shipsArray})
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
    return Server.init({ port: 3000 })
  })
  .then(() => {
    console.log('Battleship listening on port 3000!')
  })
  .catch(error => {
    console.log('Unable to start the application', error);
  });
