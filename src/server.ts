import express from 'express'
import dotenv from 'dotenv'
import { runMigrations } from './config/migrations'
import authRoutes from './routes/authRoutes'
import tasksRoutes from './routes/tasksRoutes'

dotenv.config()

const app = express()
app.use(express.json())

app.get('/', (req, res) => {
  res.json({ message: 'Task Manager API is running!' })
})
app.use('/auth', authRoutes)
app.use('/tasks', tasksRoutes)

const PORT = process.env.PORT || 3333
app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`)
  await runMigrations()
})