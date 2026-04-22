// Seed script (CommonJS) — creates an Admin user in MongoDB
// Usage: ensure MONGODB_URI is set in the environment or .env, then run:
//    npm run seed:admin

const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const dotenv = require('dotenv')

dotenv.config()

const mongoUri = process.env.MONGODB_URI
if (!mongoUri) {
  console.error('MONGODB_URI not set — cannot seed admin user')
  process.exit(1)
}

const UserSchema = new mongoose.Schema({ username: String, email: String, password: String }, { collection: 'users' })
const User = mongoose.models.User || mongoose.model('User', UserSchema)

async function run() {
  await mongoose.connect(mongoUri, { dbName: process.env.DB_NAME || undefined })
  console.log('Connected to MongoDB — seeding Admin user')

  const admin = { username: 'Admin', email: 'admin@example.com', password: '123456' }

  const exists = await User.findOne({ $or: [{ username: admin.username }, { email: admin.email }] }).exec()
  if (exists) {
    console.log('Admin user already exists, skipping')
  } else {
    const hashed = await bcrypt.hash(admin.password, 10)
    const created = new User({ username: admin.username, email: admin.email, password: hashed })
    await created.save()
    console.log('Created Admin user: Admin')
  }

  await mongoose.disconnect()
  console.log('Done — Admin user seeded (if it did not exist)')
  process.exit(0)
}

run().catch(err => { console.error('Error seeding admin user', err); process.exit(1) })
