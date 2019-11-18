const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const parser = bodyParser.json()
const JwtRouter = require('./auth/router')
const userRouter = require('./user/router')

const cors = require('cors')
const roomRouter =  require('./router')


const port = process.env.PORT || 4000;
const corsMiddleware = cors()



app.use(parser)
app.use(corsMiddleware)
app.use(JwtRouter)
app.use(roomRouter)
app.use(userRouter)
app.get('/', (req, res, next) => {
  res.send('Hola')
})













app.listen(port, () => console.log(`listeninig at Port ${port}`));

