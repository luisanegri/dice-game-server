const express = require('express');
const app = express();
const port = process.env.PORT || 4000;


app.get('/', (re, res, next) => {
  res.send('Hola')
})











app.listen(port, () => console.log(`listeninig at Port ${port}`));

