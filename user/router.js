const {Router} = require('express')
const User = require('./model')
const router = new Router()
const bcryptjs = require('bcryptjs')


  //add user
router.post('/user', (req,res,next) => {
    const user = {
        email: req.body.email,
        password: bcryptjs.hashSync(req.body.password, 10)
    }
    User.create(user)
    .then(logins => res.send(logins))
    .catch(next)
})

  module.exports= router