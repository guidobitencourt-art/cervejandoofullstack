import mongoose from 'mongoose'

export interface IUser extends mongoose.Document {
  username: string
  email: string
  password: string
}

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  {
    collection: 'users',
    timestamps: true,
  }
)

const User = mongoose.models.User || mongoose.model<IUser>('User', UserSchema)

export default User
