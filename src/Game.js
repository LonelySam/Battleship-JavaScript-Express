const connectionDB = require('../database/ConnectionDB.js');
const idHelper = require('./IdHelper.js');
const generateBoardSchema = require('../models/BoardSchemaDB.js');
const generateGameSchema = require('../models/GameSchemaDB.js');
const generatePlayerSchema = require('../models/PlayerSchemaDB.js');

const MAX_SHIPS = 5;

class Game {
	static create({cols = 10, rows = 10} = {}) {
		const playerId = idHelper();
		const token = idHelper();
		const response = {}
		const newGame = generateGameSchema(connectionDB)
			.build({
				token: token,
				rows: rows,
				cols: cols,
				max_ships: MAX_SHIPS
			});
		return newGame.save()
			.then(game => {
				response.gameId = game.dataValues.id;
				response.session = `http://localhost:3000/game?token=${game.dataValues.token}`;
				return generatePlayerSchema(connectionDB)
					.build({
						id: playerId,
						game_id: game.dataValues.id
					})
					.save();
			})
			.then((player) => {
				response.playerId = player.dataValues.id;
				return generateBoardSchema(connectionDB)
					.build({
						player_id: player.dataValues.id
					})
					.save();
			})
			.then(board => {
				response.boardId = board.dataValues.id;
				return response;
			})
			.catch(error => {
				console.log(error);
				throw error;
			});
	}

	static join(token) {
		const gameModel = generateGameSchema(connectionDB);
		const response = {};
		return gameModel.findOne({ where: {token: token} })
		  .then((gameFound) => {
				response.gameId = gameFound.dataValues.id;
				const playerId = idHelper();
				return generatePlayerSchema(connectionDB)
					.build({
						id: playerId,
						game_id: gameFound.dataValues.id
					})
					.save();
			})
			.then((player) => {
				response.playerId = player.dataValues.id;
				return generateBoardSchema(connectionDB)
					.build({
						player_id: player.dataValues.id
					})
					.save();
			})
			.then(board => {
				response.boardId = board.dataValues.id;
				return response;
			})
			.catch(error => {
				console.log(error);
				throw error;
			});
	}
}

module.exports = Game
