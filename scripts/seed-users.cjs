// Seed script (CommonJS) — creates three demo users in MongoDB
// Usage: ensure MONGODB_URI is set in the environment or .env, then run:
//    npm run seed:users

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')

dotenv.config()

const mongoUri = process.env.MONGODB_URI
if (!mongoUri) {
  console.error('MONGODB_URI not set — cannot seed users')
  process.exit(1)
}

const UserSchema = new mongoose.Schema({ username: String, email: String, password: String }, { collection: 'users' })
const User = mongoose.models.User || mongoose.model('User', UserSchema)

async function run() {
  await mongoose.connect(mongoUri, { dbName: process.env.DB_NAME || undefined })
  console.log('Connected to MongoDB — seeding users')

  const users = [
    { username: 'alice', email: 'alice@example.com', password: 'password123' },
    { username: 'bob', email: 'bob@example.com', password: 'password123' },
    { username: 'carol', email: 'carol@example.com', password: 'password123' },
  ]

  for (const u of users) {
    const exists = await User.findOne({ $or: [{ username: u.username }, { email: u.email }] }).exec()
    if (exists) {
      console.log('User exists, skipping:', u.username)
      continue
    }
    const hashed = await bcrypt.hash(u.password, 10)
    const created = new User({ username: u.username, email: u.email, password: hashed })
    await created.save()
    console.log('Created user:', u.username)
  }

  await mongoose.disconnect()
  console.log('Done — three users seeded (if they did not exist)')
  process.exit(0)
}

run().catch(err => { console.error('Error seeding users', err); process.exit(1) })
