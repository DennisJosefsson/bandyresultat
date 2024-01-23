import { app, config } from './utils/index.js'
const PORT = config['PORT']

app.listen(PORT, () => {
  console.log('-------------------------------')
  console.log(`Server running on port ${PORT}`)
  console.log(new Date())
  console.log('-------------------------------')
})
