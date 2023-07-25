const GoogleStrategy = require('passport-google-oauth20').Strategy
const passport = require('passport')
const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = require('./config')
const { User } = require('../models')

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: '/api/login/redirect',
    },
    async (accessToken, refreshToken, profile, done) => {
      const userEmail = profile.emails[0].value
      try {
        const user = await User.findOne({ where: { email: userEmail } })
        if (user) {
          return done(null, profile)
        } else {
          throw new Error({ message: 'User does not exist' })
        }
      } catch (error) {
        return done(null, false, error)
      }
    }
  )
)
passport.serializeUser((user, done) => {
  done(null, user)
})
passport.deserializeUser((user, done) => {
  done(null, user)
})
