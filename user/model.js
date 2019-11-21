const Sequelize = require('sequelize')
const db = require('../db')


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
        tableName: 'game'
      })

    
    
module.exports = User