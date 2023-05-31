const express = require('express')
const app = express()
const { PORT } = require('./utils/config')
const { connectToDb } = require('./utils/db')

const mainRouter = require('./controllers/main')
const teamRouter = require('./controllers/teams')
const seasonsRouter = require('./controllers/seasons')
const gamesRouter = require('./controllers/games')

app.use(express.json())
app.use('/', mainRouter)
app.use('/api/teams', teamRouter)
app.use('/api/seasons', seasonsRouter)
app.use('/api/games', gamesRouter)

const start = async () => {
  await connectToDb()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
