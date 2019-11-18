const Sequelize = require('sequelize')
const db = require('../db')

console.log('model test')

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