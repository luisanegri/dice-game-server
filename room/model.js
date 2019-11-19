const Sequelize = require('sequelize')
const db = require('../db')

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

   
module.exports = Room