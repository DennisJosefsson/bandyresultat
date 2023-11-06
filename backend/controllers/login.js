const router = require('express').Router()
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const dayjs = require('dayjs')

const jwtSecret = process.env.JWT_SECRET

router.get('/logout', (req, res, next) => {
  console.log(req.cookies)
  console.log('logga ut')
  res.clearCookie('bandykaka')
  res.json({ success: true, message: 'Tillbakakaka' })
})

router.post('/', async (req, res) => {
  const user = await User.findOne({ where: { userName: req.body.userName } })
  if (!user) {
    res.json({ success: false, message: 'User does not exist' })
  } else {
    if (user.authenticate(req.body.password)) {
      const userForToken = { user: user.userName, admin: user.admin }
      const token = jwt.sign(userForToken, jwtSecret)

      res.cookie('bandykaka', token, {
        httpOnly: true,
        sameSite: true,
        secure: true,
        expires: dayjs().add(1, 'days').toDate(),
      })

      res.json({ success: true, message: 'Logged in' })
    } else {
      res.json({ success: false, message: 'Wrong password' })
    }
  }
})

module.exports = router
