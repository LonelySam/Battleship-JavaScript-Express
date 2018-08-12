const connectionDB = require('../database/ConnectionDB.js');
const generateBoardSchema = require('../models/BoardSchemaDB.js');
const generateGameSchema = require('../models/GameSchemaDB.js');
const generatePlayerSchema = require('../models/PlayerSchemaDB.js');
const generatePositioningShipSchema = require('../models/PositioningShipSchemaDB.js');
const ValidateShip = require('./ValidateShip');

class Board {
  static createPositioningShip({gameId = 0, playerId = 0, shipsArray = []} = {}) {
    const boardModel = generateBoardSchema(connectionDB);
    const gameModel = generateGameSchema(connectionDB);
    const playerModel = generatePlayerSchema(connectionDB);
    const positioningShipModel = generatePositioningShipSchema(connectionDB);
    
    return gameModel.findOne( { where: {id: gameId} } )
      .then(gameFound => {
        return playerModel.findOne({
          where: {
            id: playerId,
            game_id: gameFound.dataValues.id
          }
        });
      })
      .then(playerFound => {
        return boardModel.findOne({ where: { player_id: playerFound.dataValues.id } });
      })
      .then(boardFound => {
        const boardId = boardFound.dataValues.id;
        const rows = boardFound.dataValues.rows;
        const cols = boardFound.dataValues.cols;
        return ValidateShip.numberOfShips(shipsArray)
          .then(() => ValidateShip.isInBoard({rows, cols, shipsArray}))
          .then(result => {
            if (result.success)
            {
              shipsArray.forEach(ship => ship.board_id = boardId);
              //Maybe here we should register the data with FindOrCreate if the user can somehow change the position of the ships
              return positioningShipModel.bulkCreate(shipsArray);
            } else {
              throw result;
            }
          })
      })
      .then(() => {
        return "Positions saved successfully";
      })
      .catch(error => {
				console.log(error);
				throw error;
			});
  }
}

module.exports = Board;
