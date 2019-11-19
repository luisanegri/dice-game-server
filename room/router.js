const { Router } = require('express');
const Room = require('./model');

function roomFactory(stream) {
  const router = new Router();
  ///Create Room route
  router.post('/room', async (request, response, next) => {
    const room = await Room.create(request.body);

    const action = {
      type: 'ROOM',
      payload: room
    };

    const string = JSON.stringify(action);

    stream.send(string);
    response.send(room);
  });
  return router;
}

module.exports = roomFactory;
