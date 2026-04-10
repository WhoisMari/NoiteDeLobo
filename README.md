# Noite de Lobo

An unofficial companion app for playing One Night Werewolf with your friends. Narrates the night phase in English or Portuguese, and tracks scores across sessions.

> **Note:** This is a personal fan project. It implements the game mechanics freely, uses original assets, and does not use any official artwork or audio from Bezier Games.

## Features

- **Night narrator** — plays audio cues for each role in order (wake up / perform action / go to sleep)
- **EN / US - PT / BR audio** — toggle language before starting a game
- **Role management** — enable or disable roles for your session
- **Scoreboard** — add players, record round points, undo mistakes

## Getting started

### Prerequisites

- Node.js 18+
- npm 9+

### Install

```bash
$ git clone https://github.com/WhoisMari/NoiteDeLobo.git
$ cd NoiteDeLobo
$ npm install
$ cd packages/backend && npm install
$ cd ../frontend && npm install
```

### Database setup

```bash
$ cd packages/backend
$ npx prisma migrate dev
$ npx ts-node prisma/seed.ts
```

### Run

Open two terminals:

```bash
# Terminal 1 — backend (http://localhost:3001)
$ cd packages/backend
$ npm run dev

# Terminal 2 — frontend (http://localhost:5173)
$ cd packages/frontend
$ npm run dev
```
