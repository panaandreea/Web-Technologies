const express = require('express')
const statusRouter = require('./routes/status')

const app = express()
const PORT = 3000

app.use('/status', statusRouter)

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})

