const express = require('express');
const app = express();
const db = require('./db')
const user = require('./user/model')
const userRouter = require('./user/router')
const port = process.env.PORT || 4000;

app.use(userRouter)
app.get('/', (req, res, next) => {
  res.send('Hola')
})











app.listen(port, () => console.log(`listeninig at Port ${port}`));

