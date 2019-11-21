const { Router } = require('express');
const Room = require('./model');
const User = require('../user/model');
const auth = require('../auth/middleware');

function roomFactory(stream) {
  const router = new Router();

  router.post('/room', async (request, response) => {
    const room = await Room.create(request.body);

    const action = {
      type: 'ROOM',
      payload: room
    };
    const string = JSON.stringify(action);

    stream.send(string);

    // Just for testing
    response.send(room);
  });

  router.put('/join', auth, async (req, res) => {
    const { user } = req;

    res.send(user);
  });
  // hellos
  //http PUT :4000/join/Room authorization:'Bearer *INSERT JWT CREATED WHEN LOGGED IN*'
  router.put('/join/:name', auth, async (req, res, next) => {
    const { user } = req;

    if (!user) {
      return next('No user found');
    }

    const { name } = req.params;

    const room = await Room.findOne({ where: { name } });

    const updatedUser = await user.update({ roomId: room.id });

    const rooms = await Room
        .findAll({ include: [User, Game] })

    const action = {
      type: 'UPDATE_ROOMS',
      payload: rooms
    };

      const string = JSON
        .stringify(action)

      stream.send(string)

      res.send(updatedUser);
    }
  )
  return router;
  };


module.exports = roomFactory;
