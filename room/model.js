const Sequelize = require('sequelize')
const db = require('../db')
const Game = require('../game/model')
const User = require('../user/model')



const Room = db.define('room',{
    name: {
        type: Sequelize.STRING,
        allowNull: false
      },
    }, {
      timestamps: false,
      tableName: 'room'
    })

    Game.belongsTo(Room)
    User.belongsTo(Room)
    Room.hasMany(User)
    Room.hasOne(Game)
   
module.exports = Room