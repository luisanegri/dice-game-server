const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const parser = bodyParser.json();
const JwtRouter = require('./auth/router');
const userRouter = require('./user/router');
const User = require ('./user/model')
const Sse = require('json-sse');
const roomFactory = require('./room/router');
const Room = require('./room/model');
const gameFactory = require('./game/router')
const Game = require('./game/model')

const stream = new Sse();

async function update () {
  const rooms = await Room
      .findAll({ include: [User, Game] }) // ALWAYS INCLUDE EVERYTHING

  const action = {
    type: 'UPDATE_ROOMS',
    payload: rooms
  };

  const string = JSON
    .stringify(action)

  stream.send(string)
}



const roomRouter = roomFactory(update);
const gameRouter= gameFactory(update);
const cors = require('cors');

const port = process.env.PORT || 4000;
const corsMiddleware = cors()



app.use(corsMiddleware)
app.use(parser)
app.use(roomRouter)
app.use(gameRouter)
app.use(JwtRouter)
app.use(userRouter)



// //List of Rooms 

app.get(
  '/stream',
  async (request, response) => {
    const rooms = await Room.findAll({
      include: [User, Game]
    })

    const action = {
      type: 'UPDATE_ROOMS',
      payload: rooms
    }

    const string = JSON
      .stringify(action)

    stream.updateInit(string)

    stream.init(request, response)
  }
)














app.listen(port, () => console.log(`listeninig at Port ${port}`));
