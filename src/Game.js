const idHelper = require('./IdHelper.js');
const connectionDB = require('../database/ConnectionDB.js');
const generateGameSchema = require('../models/GameSchemaDB.js');
const generatePlayerSchema = require('../models/PlayerSchemaDB.js');

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
			.then(player => {
				response.playerId = player.dataValues.id;
				return response;
			})
			.catch(error => {
				console.log(error);
				throw error;
			});
	}
}

module.exports = Game
