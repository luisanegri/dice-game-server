const { Router } = require('express')
const { toJWT, toData } = require('./auth/jwt')
const User = require('./user/model')
const auth = require('./auth/middleware')
const bcryptjs = require('bcryptjs')
const Sse = require('json-sse')
const stream = new Sse()
const streams = {}
const router = new Router()

function send (data) {
  const string = JSON.stringify(data)
  stream.send(string)
}


//here is the rooms object
const rooms = {}

///Create Room route
router.post(
  '/room',
  (request, response, next) => {
    const { name } = request.body

    send(name)
    rooms[name] = []
    streams[name] = new Sse()
    response.send(name)
  }
)


//List of Rooms 
router.get(
  '/room',
  (request, response, next) => {
    // const messages = { a: 1, b: 2 }
    const roomsList = Object.keys(rooms)
    // rooms === ['a', 'b']

    const string = JSON
      .stringify(roomsList)

    stream.updateInit(string)

    stream.init(request, response)
    
  }
)








module.exports = router