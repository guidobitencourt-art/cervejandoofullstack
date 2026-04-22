import app from './api'

const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`API server listening on http://localhost:${PORT}`)
})

// Global error handlers to catch unhandled errors and rejections and log them
process.on('unhandledRejection', (reason) => {
  // eslint-disable-next-line no-console
  console.error('Unhandled Rejection at:', reason)
})

process.on('uncaughtException', (err) => {
  // eslint-disable-next-line no-console
  console.error('Uncaught Exception thrown:', err?.stack || err)
  // Optionally exit process in production
})
