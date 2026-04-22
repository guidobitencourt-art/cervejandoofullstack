import express from 'express'
import type { Request, Response, NextFunction } from 'express'
import * as dotenv from 'dotenv'
import * as cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import mongoose from 'mongoose'
import authRouter from './routes/auth'
import Cerveza from './models/cerveza'

dotenv.config()

const app = express()
app.use(helmet())
app.use(cors())
app.use(express.json())
app.use(morgan('combined'))

const mongoUri = process.env.MONGODB_URI
const isDevNoDB = !mongoUri && process.env.NODE_ENV !== 'production'

if (isDevNoDB) {
  console.warn('MONGODB_URI no definido — usando datos de ejemplo en modo desarrollo.')
}

const mongoUriValidated: string | undefined = mongoUri
let isMongoConnected = false
let currentDatabase = ''

async function connectToMongo() {
  if (isMongoConnected) return
  if (!mongoUriValidated) throw new Error('MONGODB_URI no definido')
  const dbNameFromEnv = process.env.DB_NAME
  const connectionOptions = dbNameFromEnv ? { dbName: dbNameFromEnv } : undefined
  await mongoose.connect(mongoUriValidated, connectionOptions)
  currentDatabase = mongoose.connection.name
  isMongoConnected = true
  console.log('¡Conectado a la Base de Datos!')
}

function getMongoDebugInfo() {
  return {
    database: currentDatabase || mongoose.connection.name,
    collection: Cerveza.collection ? Cerveza.collection.name : 'cervezas',
    readyState: mongoose.connection.readyState,
  }
}

app.get('/api/debug-db', async (req: Request, res: Response) => {
  try {
    if (isDevNoDB) {
      return res.json({ message: 'No hay MONGODB_URI configurado — modo dev con datos de ejemplo', database: null, collection: 'cervezas (mock)' })
    }
    await connectToMongo()
    res.json(getMongoDebugInfo())
  } catch (error) {
    console.error('Error al inspeccionar MongoDB:', error)
    res.status(500).json({ error: 'No se pudo inspeccionar la conexion', detail: error instanceof Error ? error.message : 'Error desconocido' })
  }
})

app.get('/api/cervezas', async (req: Request, res: Response) => {
  try {
    console.log('GET /api/cervezas - isDevNoDB=', isDevNoDB, 'MONGODB_URI?', !!mongoUriValidated, 'mongooseReadyState=', mongoose.connection.readyState)
    if (isDevNoDB) {
      const ejemplo = [
        { _id: 'dev-1', tipo: 'IPA', descripcion: 'India Pale Ale: lúpulo marcado y amargor pronunciado.', temperatura_ideal: '8-12°C', copa: 'IPA glass', abv: '6-7.5%', ibu: '40-70' },
        { _id: 'dev-2', tipo: 'Lager', descripcion: 'Lager clara y crujiente, refrescante y fácil de beber.', temperatura_ideal: '4-7°C', copa: 'Pinta', abv: '4-5%', ibu: '8-20' },
      ]
      res.json(ejemplo)
      return
    }
    await connectToMongo()
    const cervezas = await Cerveza.find()
    res.json(cervezas)
  } catch (error) {
    console.error('Error al leer cervezas:', error)
    res.status(500).json({ error: 'No se pudieron obtener las cervezas', detail: error instanceof Error ? error.message : 'Error desconocido' })
  }
})

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret'

app.use('/api/auth', authRouter)

app.post('/api/cervezas', async (req: Request, res: Response) => {
  try {
    const { tipo, descripcion, temperatura_ideal, copa, abv, ibu } = req.body
    if (!tipo || !descripcion || !temperatura_ideal || !copa || !abv || !ibu) {
      res.status(400).json({ error: 'Debes enviar todos los campos requeridos' })
      return
    }
    await connectToMongo()
    const nuevaCerveza = new Cerveza({ tipo, descripcion, temperatura_ideal, copa, abv, ibu })
    await nuevaCerveza.save()
    res.status(201).json(nuevaCerveza)
  } catch (error) {
    console.error('Error al crear cerveza:', error)
    res.status(500).json({ error: 'No se pudo guardar la cerveza', detail: error instanceof Error ? error.message : 'Error desconocido' })
  }
})

app.put('/api/cervezas/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const { tipo, descripcion, temperatura_ideal, copa, abv, ibu } = req.body
    await connectToMongo()
    const cervezaActualizada = await Cerveza.findByIdAndUpdate(id, { tipo, descripcion, temperatura_ideal, copa, abv, ibu }, { new: true })
    if (!cervezaActualizada) {
      res.status(404).json({ error: 'Cerveza no encontrada' })
      return
    }
    res.json(cervezaActualizada)
  } catch (error) {
    console.error('Error al actualizar cerveza:', error)
    res.status(500).json({ error: 'No se pudo actualizar la cerveza', detail: error instanceof Error ? error.message : 'Error desconocido' })
  }
})

app.delete('/api/cervezas/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    await connectToMongo()
    const cervezaEliminada = await Cerveza.findByIdAndDelete(id)
    if (!cervezaEliminada) {
      res.status(404).json({ error: 'Cerveza no encontrada' })
      return
    }
    res.json({ mensaje: 'Cerveza eliminada correctamente' })
  } catch (error) {
    console.error('Error al eliminar cerveza:', error)
    res.status(500).json({ error: 'No se pudo eliminar la cerveza', detail: error instanceof Error ? error.message : 'Error desconocido' })
  }
})

app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' })
})

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled error:', err)
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' })
})

export default app
