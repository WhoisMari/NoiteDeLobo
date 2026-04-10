import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const characters = [
  { key: 'doppelganger', name: 'Doppelganger', emoji: '🪞', nightOrder: 1 },
  { key: 'werewolf',     name: 'Werewolf',     emoji: '🐺', nightOrder: 2 },
  { key: 'minion',       name: 'Minion',        emoji: '🧟', nightOrder: 3 },
  { key: 'mason',        name: 'Mason',         emoji: '🏗️', nightOrder: 4 },
  { key: 'seer',         name: 'Seer',          emoji: '🔮', nightOrder: 5 },
  { key: 'robber',       name: 'Robber',        emoji: '🦹', nightOrder: 6 },
  { key: 'troublemaker', name: 'Troublemaker',  emoji: '😈', nightOrder: 7 },
  { key: 'drunk',        name: 'Drunk',         emoji: '🍺', nightOrder: 8 },
  { key: 'insomniac',    name: 'Insomniac',     emoji: '😴', nightOrder: 9 },
  { key: 'villager',     name: 'Villager',      emoji: '🧑‍🌾', nightOrder: null },
  { key: 'hunter',       name: 'Hunter',        emoji: '🏹', nightOrder: null },
  { key: 'tanner',       name: 'Tanner',        emoji: '🪣', nightOrder: null },
]

async function main() {
  console.log('Seeding characters...')
  for (const char of characters) {
    await prisma.character.upsert({
      where: { key: char.key },
      update: {},
      create: char,
    })
  }
  console.log(`Seeded ${characters.length} characters.`)
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
