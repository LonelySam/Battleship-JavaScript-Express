const Sequelize = require('sequelize');

const generateBoardSchema = require('./BoardSchemaDB.js');

function positioningShipSchema(sequelizeInstance) {
  return sequelizeInstance.define('PositioningShip', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    orientation: {
      type: Sequelize.STRING,
      allowNull: false
    },
    type: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    x: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    y: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    board_id: {
      type: Sequelize.INTEGER,
      references: {
        model: generateBoardSchema(sequelizeInstance),
        key: 'id'
      }
    }
  },
  {
    timestamps: false,
    tableName: 'PositioningShip',
    freezeTableName: true,
  });
}

module.exports = positioningShipSchema;
