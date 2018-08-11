const idHelper = require('./IdHelper.js');
const connectionDB = require('../database/ConnectionDB.js');
const generateGameSchema = require('../models/GameSchemaDB.js');

class Game {
	constructor({cols = 10, rows = 10} = {}){
		this.cols = cols;
		this.rows = rows;
	}
	static create({cols = 10, rows = 10} = {}) {
		const challenger = idHelper();
		const token = idHelper();

		const newGame = generateGameSchema(connectionDB)
			.build({
				challenger: challenger,
				token: token
			});
		return newGame.save()
			.then(game => {
				return {
					id: game.dataValues.id,
					session: `http://localhost:3000/game?token=${game.dataValues.token}`,
					playerId : game.dataValues.playerId
				}
			})
			.catch(error => {
				console.log(error);
				throw error;
			});
	}

	static join(token) {
		const gameModel = generateGameSchema(connectionDB);
		return gameModel.findOne({ where: {token: token} })
		  .then((gameFound) => {
				const idAdversary = idHelper();
				return gameFound.update({
					adversary: idAdversary
				});
			})
			.then(savedGame => savedGame.dataValues)
			.catch(error => {
				console.log(error);
				throw error;
			});
	}
}

module.exports = Game
