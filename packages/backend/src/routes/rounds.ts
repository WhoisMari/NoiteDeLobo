import { Router } from 'express'
import prisma from '../db'

const router = Router()

router.get('/', async (_req, res) => {
  const rounds = await prisma.round.findMany({
    orderBy: { createdAt: 'desc' },
    include: {
      scores: {
        include: { player: { select: { id: true, name: true } } },
      },
    },
  })
  res.json(rounds)
})

router.post('/', async (req, res) => {
  const { scores } = req.body as { scores: { playerId: number; points: number }[] }

  if (!Array.isArray(scores) || scores.length === 0) {
    res.status(400).json({ error: 'scores array is required' })
    return
  }

  const round = await prisma.$transaction(async (tx) => {
    const newRound = await tx.round.create({
      data: {
        scores: {
          create: scores.map((s) => ({ playerId: s.playerId, points: s.points })),
        },
      },
      include: {
        scores: {
          include: { player: { select: { id: true, name: true } } },
        },
      },
    })

    // Update totalPoints for each player
    for (const s of scores) {
      if (s.points !== 0) {
        await tx.player.update({
          where: { id: s.playerId },
          data: { totalPoints: { increment: s.points } },
        })
      }
    }

    return newRound
  })

  res.status(201).json(round)
})

router.delete('/', async (_req, res) => {
  await prisma.round.deleteMany({})
  res.status(204).send()
})

router.delete('/:id', async (req, res) => {
  const id = parseInt(req.params.id)

  // Fetch scores before deleting so we can reverse totalPoints
  const round = await prisma.round.findUnique({
    where: { id },
    include: { scores: true },
  })

  if (!round) {
    res.status(404).json({ error: 'Round not found' })
    return
  }

  await prisma.$transaction(async (tx) => {
    // Reverse point increments
    for (const s of round.scores) {
      if (s.points !== 0) {
        await tx.player.update({
          where: { id: s.playerId },
          data: { totalPoints: { decrement: s.points } },
        })
      }
    }
    // Cascade delete via schema handles RoundScore rows
    await tx.round.delete({ where: { id } })
  })

  res.status(204).send()
})

export default router
