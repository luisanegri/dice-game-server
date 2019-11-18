const { Router } = require('express')
const Room = require('./model')

function roomFactory(stream){
  const router = new Router()
///Create Room route
router.post(
  '/room',
  (request, response, next) => {
    Room
    .create(request.body)
    .then(room => {
      const data = JSON.stringify(room)
      stream.send(data)
      response.send(room)
    })
  }
)
return router
}









module.exports = roomFactory