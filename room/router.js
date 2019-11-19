const { Router } = require('express');
const Room = require('./model');

function roomFactory(stream) {
  const router = new Router();
  ///Create Room route
  router.post('/room', (request, response, next) => {
    Room.create(request.body).then(() => {
      Room.findAll().then(rooms => {
        console.log({ allRooms: rooms.map(r => r.dataValues) });
        stream.send(rooms);
      });
      //console.log({ roomData: room });
      //response.send(room);
    });
  });
  return router;
}

module.exports = roomFactory;
