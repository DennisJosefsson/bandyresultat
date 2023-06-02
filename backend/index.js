const express = require('express')
const cors = require('cors')
const app = express()
const { PORT } = require('./utils/config')
const { connectToDb } = require('./utils/db')

const mainRouter = require('./controllers/main')
const teamRouter = require('./controllers/teams')
const seasonsRouter = require('./controllers/seasons')
const gamesRouter = require('./controllers/games')
const tablesRouter = require('./controllers/tables')

app.use(cors())
app.use(express.json())
app.use('/', mainRouter)
app.use('/api/teams', teamRouter)
app.use('/api/seasons', seasonsRouter)
app.use('/api/games', gamesRouter)
app.use('/api/tables', tablesRouter)

const start = async () => {
  await connectToDb()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
