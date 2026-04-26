import app from './api'

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`)
})

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection at:', reason)
})

process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception thrown:', err?.stack || err)
})
