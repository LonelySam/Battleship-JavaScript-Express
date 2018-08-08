const dbGame = [];
const idHelper = require('./IdHelper.js');
const connectionDB = require('./ConnectionDB.js');
const generateSchemaGame = require('./SchemaGameDB.js');

class Game {
	constructor({cols = 10, rows = 10} = {}){
		this.cols = cols;
		this.rows = rows;
	}
	static create({cols = 10, rows = 10} = {}) {
		// const challenger = idHelper();
		// const token = idHelper();
		//
		// const newGame = generateSchemaGame(connectionDB)
		// .build({
		// 	challenger: challenger,
		// 	token: token
		// });
		// newGame.save()
		// .then(game => {
		// 	return new Promise((resolve, reject) => {
		// 		resolve({
		// 			id: game.dataValues.id,
		// 			session: `http://localhost:3000/game?token=${game.dataValues.token}`,
		// 			playerId : game.dataValues.playerId
		// 		});
		// 	});
		// })
		// .catch(error => console.log(error))

		// const game = new Game({cols,rows});
		// game.id = dbGame.length + 1;
		// game.playerId = idHelper();
		// const token = idHelper();
		// game.token = token
		// dbGame.push(game);
		// game.session = `http://localhost:3000/game?token=${token}`;
		//
		// return Promise.resolve({
		// 	id : game.id,
		// 	session : game.session,
		// 	playerId : game.playerId
		// })
	}

	static join(token) {
		const game = dbGame.find(game => game.token === token);
		if(game === undefined) {
			return Promise.reject()
		}
		return Promise.resolve({
			id : game.id,
			playerId : idHelper()
		});
	}
}

module.exports = Game
