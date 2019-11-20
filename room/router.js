const { Router } = require('express');
const Room = require('./model');

function roomFactory(stream) {
  const router = new Router()

  router.post(
    '/room',
    async (request, response) => {
      const room = await Room
        .create(request.body)

      const action = {
        type: 'ROOM',
        payload: room
      }

      const string = JSON
        .stringify(action)

      stream.send(string)

      // Just for testing
      response.send(room)
    }
  )

  router.put(
    '/join/:name',
    async (request, response, next) => {
      const userId = 1

      const user = await User
        .findByPk(userId)

      

      if (!user) {
        return next('No user found')
      }

      const { name } = request.params

      const room = await Room.findOne(
        { where: { name } }
      )

      const updated = await user
        .update({ roomId: room.id })

      const rooms = await Room
        .findAll({ include: [User, Game] })

      const action = {
        type: 'ROOMS',
        payload: rooms
      }

      const string = JSON
        .stringify(action)

      stream.send(string)

      response.send(updated)
    }
  )
  return router
}


module.exports = roomFactory;
