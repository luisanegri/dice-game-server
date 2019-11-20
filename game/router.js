const { Router } = require('express');
const Game = require('./model');

function gameFactory(stream) {
  const router = new Router();
  router.post('/game', async (request, response) => {
    const game = await Game
    .create(request.body)

    const action = {
      type:'GAME',
      payload: game
    }
    const string = JSON
    .stringify(action)

    stream.send(string)
    //for testing '
    response.send(game)
  });

  router.post('/game/:gameid/update', 
  async (request, response) => {
    const gameid = request.params.gameid
    const toUpdate = await Game
    .findByPk(gameid);
    const updated = await toUpdate.update(request.body)
    const action = {
      type:'UPDATE',
      payload: updated
    }
    const string = JSON
    .stringify(action)

    stream.send(string)
    
  });
return router
}


module.exports = gameFactory;