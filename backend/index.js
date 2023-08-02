require('dotenv').config()
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const app = express()
const { PORT } = require('./utils/config')
const { connectToDb } = require('./utils/db')

const { errorHandler } = require('./utils/middleware')

const mainRouter = require('./controllers/main')
const teamRouter = require('./controllers/teams')
const seasonsRouter = require('./controllers/seasons')
const gamesRouter = require('./controllers/games')
const tablesRouter = require('./controllers/tables')
const metadataRouter = require('./controllers/metadata')
const loginRouter = require('./controllers/login')

app.use(cors({ origin: true, credentials: true }))
app.use(express.json())
app.use((req, res, next) => {
  res.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups')
  next()
})
app.use(cookieParser())

app.use(express.static('dist'))

app.use('/', mainRouter)
app.use('/api/teams', teamRouter)
app.use('/api/seasons', seasonsRouter)
app.use('/api/games', gamesRouter)
app.use('/api/tables', tablesRouter)
app.use('/api/metadata', metadataRouter)
app.use('/api/login', loginRouter)

app.use(errorHandler)

const start = async () => {
  await connectToDb()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
