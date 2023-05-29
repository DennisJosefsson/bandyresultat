const express = require('express')
const app = express()
const { PORT } = require('./utils/config')
const { connectToDb } = require('./utils/db')

const mainRouter = require('./controllers/main')

app.use(express.json())
app.use('/', mainRouter)

const start = async () => {
  await connectToDb()
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })
}

start()
