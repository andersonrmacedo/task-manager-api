import express from 'express'
import dotenv from 'dotenv'

dotenv.config()

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API is running!' })
})

const PORT = process.env.PORT || 3333
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})