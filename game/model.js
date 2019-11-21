const Sequelize = require('sequelize')
const db = require('../db')
const Room = require('../room/model')

const Game = db.define('game',{
    dice: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
  },{
      timestamps: false,
      tableName: 'game'
    })

    
module.exports = Game