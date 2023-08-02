const router = require('express').Router()
const axios = require('axios')
const { User } = require('../models')
const jwt = require('jsonwebtoken')
const dayjs = require('dayjs')

const jwtSecret = process.env.JWT_SECRET

router.post('/', async (req, res) => {
  console.log(req.body)
  const baseUrl = 'https://www.googleapis.com/oauth2/v3/userinfo?access_token='

  const response = await axios.get(`${baseUrl}${req.body.access_token}`)
  const loginEmail = response.data.email
  const user = await User.findOne({ where: { email: loginEmail } })
  if (!user) {
    res.json({ success: false, message: 'User does not exist' })
  } else {
    const token = jwt.sign(user.toJSON(), jwtSecret)

    res
      .cookie('bandykaka', token, {
        httpOnly: true,
        sameSite: true,
        secure: true,
        expires: dayjs().add(1, 'days').toDate(),
      })
      .json({ success: true, message: 'Logged in' })
  }
})

module.exports = router
