const express = require('express');
const app = express();
const bodyParser= require('body-parser')
const parser = bodyParser.json()

const userRouter = require('./user/router')
const port = process.env.PORT || 4000;


app.use(parser)
app.use(userRouter)
app.get('/', (req, res, next) => {
  res.send('Hola')
})













app.listen(port, () => console.log(`listeninig at Port ${port}`));

