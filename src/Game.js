const connectionDB = require('../database/ConnectionDB.js');
const idHelper = require('./IdHelper.js');
const generateBoardSchema = require('../models/BoardSchemaDB.js');
const generateGameSchema = require('../models/GameSchemaDB.js');
const generatePlayerSchema = require('../models/PlayerSchemaDB.js');

//Changes their value only with create method. Default value 10 if not created
let rowsTemporary = 10;
let colsTemporary = 10;

class Game {
	static create({cols = 10, rows = 10} = {}) {
		const playerId = idHelper();
		const token = idHelper();
		let response = {}
		const newGame = generateGameSchema(connectionDB)
			.build({
				token: token
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
						rows: rows,
						cols: cols,
						player_id: player.dataValues.id
					})
					.save();
			})
			.then(board => {
				rowsTemporary = rows;
				colsTemporary = cols;
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
		let response = {};
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
						rows: rowsTemporary,
						cols: colsTemporary,
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
