const express = require('express')
const app = express()
const PORT = 3000

app.use(express.json())


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})


app.get('/', (req, res) => {
  res.send('Server is running')
})


app.get('/error', (req, res) => {
  throw new Error('Test error')
})


app.use((err, req, res, next) => {
  console.error(err.stack)
  next(err)
})


app.use((err, req, res, next) => {
  res.status(500).json({
    error: 'Something broke!'
  })
})

app.listen(PORT, () => {
  console.log('Server running on port ' + PORT)
})
