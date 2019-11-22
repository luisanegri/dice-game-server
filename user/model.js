const Sequelize = require('sequelize')
const db = require('../db')


const User = db.define('user',{
    name: {
        type: Sequelize.STRING,
        allowNull: false
      },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: true
      },
    winner: {
        type: Sequelize.BOOLEAN,
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
      score: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
      currentscore: {
        type: Sequelize.INTEGER,
        allowNull: true
      },
    },{
        timestamps: false,
        tableName: 'user'
      })

    
    
module.exports = User