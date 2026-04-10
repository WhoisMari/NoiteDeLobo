import { Router } from 'express'
import prisma from '../db'

const router = Router()

router.get('/', async (_req, res) => {
  const players = await prisma.player.findMany({
    orderBy: { totalPoints: 'desc' },
  })
  res.json(players)
})

router.post('/', async (req, res) => {
  const { name } = req.body as { name: string }
  if (!name?.trim()) {
    res.status(400).json({ error: 'Name is required' })
    return
  }
  const player = await prisma.player.create({
    data: { name: name.trim() },
  })
  res.status(201).json(player)
})

router.patch('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const { name } = req.body as { name: string }
  const updated = await prisma.player.update({
    where: { id },
    data: { name: name.trim() },
  })
  res.json(updated)
})

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  await prisma.player.delete({ where: { id } })
  res.status(204).send()
})

export default router
