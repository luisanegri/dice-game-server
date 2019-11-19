const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const parser = bodyParser.json();
const JwtRouter = require('./auth/router');
const userRouter = require('./user/router');
const Sse = require('json-sse');
const roomFactory = require('./room/router');
const Room = require('./room/model');

const stream = new Sse();
const roomRouter = roomFactory(stream);
const cors = require('cors');

const port = process.env.PORT || 4000;
const corsMiddleware = cors();

app.use(parser);
app.use(corsMiddleware);
app.use(roomRouter);
app.use(JwtRouter);
app.use(userRouter);

// List of Rooms
app.get('/stream', async (request, response, next) => {
  const rooms = await Room.findAll();
  const action = {
    type: 'UPDATE_ROOMS',
    payload: rooms
  };
  const string = JSON.stringify(action);
  stream.updateInit(string);
  stream.init(request, response);
});

app.listen(port, () => console.log(`listeninig at Port ${port}`));
