require('dotenv').config()
const path = require('node:path')
const express = require('express')
require('express-async-errors')
const cors = require('cors')
const cookieParser = require('cookie-parser')

const app = express()
const { PORT } = require('./utils/config')
const { connectToDb } = require('./utils/db')

const { errorHandler, APIRestrictMiddleware } = require('./utils/middleware')

const teamRouter = require('./controllers/teams')
const seasonsRouter = require('./controllers/seasons')
const gamesRouter = require('./controllers/games')
const tablesRouter = require('./controllers/tables')
const metadataRouter = require('./controllers/metadata')
const loginRouter = require('./controllers/login')
const linkRouter = require('./controllers/link')
const seriesRouter = require('./controllers/series')
const mainRouter = require('./controllers/main')
const errorRouter = require('./controllers/error')

app.use(cors({ credentials: true }))
app.use(express.json())
app.use((req, res, next) => {
  res.set('Cross-Origin-Opener-Policy', 'same-origin-allow-popups')
  next()
})
app.use(cookieParser())

const frontend = path.join(__dirname, 'dist')
app.use('/', express.static(frontend))

app.use('/api/healthCheck', mainRouter)
//app.use(APIRestrictMiddleware)

app.use('/api/teams', teamRouter)
app.use('/api/seasons', seasonsRouter)
app.use('/api/games', gamesRouter)
app.use('/api/tables', tablesRouter)
app.use('/api/metadata', metadataRouter)
app.use('/api/login', loginRouter)
app.use('/api/links', linkRouter)
app.use('/api/series', seriesRouter)
app.use('/api/errors', errorRouter)

app.use((req, res, next) => {
  res.sendFile(path.join(frontend, 'index.html'))
})

app.use(errorHandler)

const start = async () => {
  await connectToDb()
  app.listen(PORT, () => {
    console.log('-------------------------------')
    console.log(`Server running on port ${PORT}`)
    console.log(new Date())
    console.log('-------------------------------')
  })
}

start()
