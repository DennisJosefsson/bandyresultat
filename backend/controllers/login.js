const router = require('express').Router()
const { OAuth2Client } = require('google-auth-library')
const { User } = require('../models')

router.post('/', async (req, res) => {
  const client = new OAuth2Client(req.body.clientId)

  const ticket = await client.verifyIdToken({
    idToken: req.body.credential,
    audience: req.body.clientId,
  })
  const loginEmail = ticket.getPayload().email
  const user = await User.findOne({ where: { email: loginEmail } })
  if (!user) {
    res.json({ success: false, message: 'User does not exist' })
  } else {
    res.json({ success: true, message: 'Logged in' })
  }
})

module.exports = router
