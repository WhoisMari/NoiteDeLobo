import { Router } from 'express'
import prisma from '../db'

const router = Router()

router.get('/', async (_req, res) => {
  const characters = await prisma.character.findMany({
    orderBy: [{ nightOrder: 'asc' }, { name: 'asc' }],
  })
  res.json(characters)
})

router.patch('/:id', async (req, res) => {
  const id = parseInt(req.params.id)
  const { isEnabled, nightOrder } = req.body as { isEnabled?: boolean; nightOrder?: number | null }

  const updated = await prisma.character.update({
    where: { id },
    data: {
      ...(isEnabled !== undefined && { isEnabled }),
      ...(nightOrder !== undefined && { nightOrder }),
    },
  })
  res.json(updated)
})

export default router
