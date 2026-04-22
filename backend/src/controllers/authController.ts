import type { Request, Response } from 'express'
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import User from '../models/User'

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'

export async function registerController(req: Request, res: Response) {
  try {
    const { username, email, password } = req.body
    if (!username || !email || !password) return res.status(400).json({ error: 'Faltan campos' })
    if (!process.env.MONGODB_URI) {
      return res.status(501).json({ error: 'Registro deshabilitado en modo desarrollo sin DB' })
    }

    const exists = await User.findOne({ $or: [{ username }, { email }] }).exec()
    if (exists) return res.status(409).json({ error: 'Usuario o email ya existe' })

    const salt = await bcrypt.genSalt(10)
    const hashed = await bcrypt.hash(password, salt)

    const created = new User({ username, email, password: hashed })
    await created.save()
    const token = jwt.sign({ userId: created._id }, JWT_SECRET, { expiresIn: '1d' })
    res.status(201).json({ token, user: { id: created._id, username: created.username, email: created.email } })
  } catch (error: any) {
    console.error('Error register controller:', error)
    res.status(500).json({ error: 'Error al registrar', detail: error.message || 'Error desconocido' })
  }
}

export async function loginController(req: Request, res: Response) {
  try {
    const { identifier, password } = req.body
    console.log(`[Auth] login attempt - identifier=${identifier} ip=${req.ip} devNoDB=${!process.env.MONGODB_URI}`)

    if (!identifier || !password) {
      console.warn('[Auth] missing fields on login attempt', { identifier })
      return res.status(400).json({ error: 'Faltan campos' })
    }

    if (!process.env.MONGODB_URI) {
      if (identifier === 'dev' && password === 'devpass') {
        const token = jwt.sign({ userId: 'dev-user' }, JWT_SECRET, { expiresIn: '1d' })
        console.log('[Auth] dev login success')
        return res.json({ token, user: { id: 'dev-user', username: 'dev', email: 'dev@example.local' } })
      }
      console.warn('[Auth] dev login failed - invalid credentials', { identifier })
      return res.status(401).json({ error: 'Credenciales inválidas (modo dev sin DB)' })
    }

    const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] }).exec()
    if (!user) {
      console.warn('[Auth] login failed - user not found', { identifier })
      return res.status(401).json({ error: 'Credenciales inválidas' })
    }

    const match = await bcrypt.compare(password, user.password)
    if (!match) {
      console.warn('[Auth] login failed - wrong password', { identifier, userId: user._id })
      return res.status(401).json({ error: 'Credenciales inválidas' })
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' })
    console.log('[Auth] login success', { userId: user._id, username: user.username })
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } })
  } catch (error: any) {
    console.error('Error login controller:', error?.stack || error)
    res.status(500).json({ error: 'Error al loguear', detail: error.message || 'Error desconocido' })
  }
}

export async function meController(req: Request, res: Response) {
  try {
    const anyReq: any = req
    const userId = anyReq.userId
    if (!userId) return res.status(401).json({ error: 'No autenticado' })

    if (userId === 'dev-user') {
      return res.json({ id: 'dev-user', username: 'dev', email: 'dev@example.local' })
    }

    const user = await User.findById(userId).select('-password').exec()
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' })
    res.json(user)
  } catch (error: any) {
    console.error('Error me controller:', error)
    res.status(500).json({ error: 'Error', detail: error.message || 'Error desconocido' })
  }
}
