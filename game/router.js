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

  router.put('/roll', auth, async (request, response, next) => {
    //
    const { user } = request

    console.log('user test:', user)

    const game = await Game.findOne({ where: { roomId: user.roomId } })

    // check data
    if (!user) {
      return next('No user found');
    }

    if (!game) {
      return next('This user is not playing a game')
    }

    const number = Math.ceil(Math.random() * 6)

    await user.update({ currentscore: user.currentscore + number })

    const updated = await game.update({ dice: number })

    await update()

    response.send(updated)
  })

  return router
}


module.exports = gameFactory;