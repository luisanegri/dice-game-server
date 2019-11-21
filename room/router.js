const { Router } = require('express');
const Room = require('./model');
const User = require('../user/model');
const auth = require('../auth/middleware');

function roomFactory(update) {
  const router = new Router();

  router.post('/room', async (request, response) => {
    const room = await Room.create(request.body);

    await update()

    // Just for testing
    response.send(room);
  });

  //http PUT :4000/join/Room authorization:'Bearer *INSERT JWT CREATED WHEN LOGGED IN*'
  router.put('/join/:name', auth, async (req, res, next) => {
    // gather data
    const { user } = req;

    // check data
    if (!user) {
      return next('No user found');
    }

    // modify db
    const { name } = req.params;

    const room = await Room.findOne({ where: { name } });

    const updatedUser = await user.update({ roomId: room.id });

    // update the stream
    await update()

    res.send(updatedUser);
  })

  return router;
};


module.exports = roomFactory;
