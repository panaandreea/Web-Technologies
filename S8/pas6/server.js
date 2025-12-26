const express = require('express')
const app = express()
const port = 3000


app.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`)
  next()
})

app.get('/', (req, res) => {
  res.send('Hello from server')
})

app.get('/api/test', (req, res) => {
  res.json({ message: 'Test endpoint' })
})

app.listen(port, () => {
  console.log('Server running on port ' + port)
})
