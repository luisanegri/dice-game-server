const Sequelize = require('sequelize')
const db = require('../db')
const Room = require('../room/model')

const User = db.define('user',{
    name: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
    }, {
      timestamps: false,
      tableName: 'users'
    })

    User.belongsTo(Room)
    
module.exports = User