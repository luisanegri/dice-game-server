const { Router } = require('express');
const Game = require('./model');
const auth = require('../auth/middleware')



function gameFactory (update) {
  const router = new Router();
  router.post('/game', async (request, response) => {
    const game = await Game.create(request.body)

    await update()

    response.send(game)
  });

  ///DICE WORK 
  router.put('/roll', auth, async (request, response, next) => {
    //
    const { user } = request

    const game = await Game.findOne({ where: { roomId: user.roomId } })

    // check data
    if (!user) {
      return next('No user found');
    }

    if (!game) {
      return next('This user is not playing a game')
    }

    if (user.active === true){
    const number = Math.ceil(Math.random() * 6)

    if ( number !== 1){
    await user.update({ currentscore: user.currentscore + number })
    } else {
      await user.update({ currentscore: 0 })
      await user.update({ active: false })
    }
    const updated = await game.update({ dice: number })

    await update()

    response.send(updated)
  } else {
    response.send('not your turn, you cant roll dice now ')
  }
  })

  //HOLD ROUTE 
  router.put('/hold', auth, async (request, response, next) => {
    //
    const { user } = request

    const game = await Game.findOne({ where: { roomId: user.roomId } })

    // check data
    if (!user) {
      return next('No user found');
    }

    if (!game) {
      return next('This user is not playing a game')
    }

    if (user.active === true){

    await user.update({ score: user.currentscore + user.score })
    await user.update({ active: false })
    const updated = await game.update({ dice: 0 })
    if (user.score >= 100){
      await user.update({ winner: true })
    }
    await update()

    response.send(updated)
  } else {
  response.send('not your turn')
}
  })

  return router
}


module.exports = gameFactory;