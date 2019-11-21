const Sequelize = require('sequelize')
const db = require('../db')
const Room = require('../room/model')

const Game = db.define('game',{
    score1: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      score2: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      currentscore1: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
     currentscore2: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    dice: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
  },{
      timestamps: false,
      tableName: 'game'
    })

    
module.exports = Game