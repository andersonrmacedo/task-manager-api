import express from 'express'
import dotenv from 'dotenv'
import { runMigrations } from './config/migrations'
import authRoutes from './routes/authRoutes'

dotenv.config()

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API is running!' })
})
app.use('/auth', authRoutes)

const PORT = process.env.PORT || 3333
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`)
  await runMigrations()
})