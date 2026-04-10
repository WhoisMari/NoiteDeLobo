import express from 'express'
import cors from 'cors'
import path from 'path'
import charactersRouter from './routes/characters'
import playersRouter from './routes/players'
import roundsRouter from './routes/rounds'

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json())

app.use('/api/characters', charactersRouter)
app.use('/api/players', playersRouter)
app.use('/api/rounds', roundsRouter)

// Serve frontend in production
const frontendDist = path.join(__dirname, '..', '..', 'frontend', 'dist')
app.use(express.static(frontendDist))
app.get('*', (_req, res) => {
  res.sendFile(path.join(frontendDist, 'index.html'))
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
