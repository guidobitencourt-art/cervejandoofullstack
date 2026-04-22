import express, { Request, Response, NextFunction } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from './models/User';
import { authMiddleware } from './middleware/auth';
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import helmet from 'helmet'
import morgan from 'morgan'
import Cerveza from './models/cerveza'

/*
  Archivo: src/server/api.ts
  Descripción (español):
  - Este archivo define la API Express para la aplicación.
  - Contiene: conexión opcional a MongoDB, modelos, rutas públicas (GET /api/cervezas)
    y rutas protegidas para creación/actualización/eliminación de cervezas.
  - También expone endpoints de autenticación (/api/auth/login y /api/auth/register).
  - En modo desarrollo, si no hay MONGODB_URI configurado, algunas rutas usan datos de
    ejemplo o permiten un login rápido (`dev` / `devpass`) para facilitar pruebas locales.
*/

// 1. Activamos las variables de entorno (nuestro archivo secreto)
dotenv.config();

// 2. Creamos la aplicación Express
const app = express();
app.use(helmet()) // Security headers
app.use(cors()); // Permite peticiones desde el frontend (considerar restringir origin en producción)
app.use(express.json()); // Permite que nuestra API entienda formato JSON
app.use(morgan('combined')) // Logging HTTP requests

// 3. Conexión a MongoDB (opcional en desarrollo)
const mongoUri = process.env.MONGODB_URI;
const isDevNoDB = !mongoUri && process.env.NODE_ENV !== 'production';

if (isDevNoDB) {
  // En desarrollo, si no hay MONGODB_URI, usamos un fallback de datos en memoria
  // para evitar errores 500 y permitir revisar la UI sin DB.
  console.warn('MONGODB_URI no definido — usando datos de ejemplo en modo desarrollo.');
}

const mongoUriValidated: string | undefined = mongoUri;

let isMongoConnected = false;
let currentDatabase = ''; // Valor por defecto, se actualizará al conectar

async function connectToMongo() {
  if (isMongoConnected) return;
  if (!mongoUriValidated) {
    throw new Error('MONGODB_URI no definido');
  }

  // Si existe DB_NAME, forzamos ese nombre de base en la conexión.
  const dbNameFromEnv = process.env.DB_NAME;
  const connectionOptions = dbNameFromEnv ? { dbName: dbNameFromEnv } : undefined;

  await mongoose.connect(mongoUriValidated, connectionOptions);
  currentDatabase = mongoose.connection.name;

  isMongoConnected = true;
  console.log('¡Conectado a la Base de Datos!');
}

function getMongoDebugInfo() {
  return {
    database: currentDatabase || mongoose.connection.name,
    collection: Cerveza.collection ? Cerveza.collection.name : 'cervezas',
    readyState: mongoose.connection.readyState,
  };
}

// 5. RUTAS DE NUESTRA API

app.get('/api/debug-db', async (req: Request, res: Response) => {
  try {
    if (isDevNoDB) {
      return res.json({
        message: 'No hay MONGODB_URI configurado — modo dev con datos de ejemplo',
        database: null,
        collection: 'cervezas (mock)'
      })
    }

    await connectToMongo();
    res.json(getMongoDebugInfo());
  } catch (error) {
    console.error('Error al inspeccionar MongoDB:', error);
    res.status(500).json({
      error: 'No se pudo inspeccionar la conexion',
      detail: error instanceof Error ? error.message : 'Error desconocido',
    });
  }
});

// 404 handler (must be after routes)
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Not found' })
})

// Error handler
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line no-console
  console.error('Unhandled error:', err)
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' })
})

// Ruta GET: Sirve para LEER todas las cervezas
app.get("/api/cervezas", async (req: Request, res: Response) => {
  try {
    if (isDevNoDB) {
      // Datos de ejemplo para desarrollo local cuando no hay DB
      const ejemplo = [
        {
          _id: 'dev-1',
          tipo: 'IPA',
          descripcion: 'India Pale Ale: lúpulo marcado y amargor pronunciado.',
          temperatura_ideal: '8-12°C',
          copa: 'IPA glass',
          abv: '6-7.5%',
          ibu: '40-70',
        },
        {
          _id: 'dev-2',
          tipo: 'Lager',
          descripcion: 'Lager clara y crujiente, refrescante y fácil de beber.',
          temperatura_ideal: '4-7°C',
          copa: 'Pinta',
          abv: '4-5%',
          ibu: '8-20',
        },
      ];
      res.json(ejemplo);
      return;
    }

    await connectToMongo();
    const cervezas = await Cerveza.find(); // Busca todas las cervezas en MongoDB
    res.json(cervezas);
  } catch (error) {
    console.error("Error al leer cervezas:", error);
    res.status(500).json({
      error: "No se pudieron obtener las cervezas",
      detail: error instanceof Error ? error.message : "Error desconocido",
    });
  }
});

// Rutas de autenticación (registro / login)
const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret';

app.post('/api/auth/register', async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) return res.status(400).json({ error: 'Faltan campos' });
    if (isDevNoDB) {
      // En modo desarrollo sin DB no permitimos registrar usuarios reales.
      return res.status(501).json({ error: 'Registro deshabilitado en modo desarrollo sin DB' });
    }

    await connectToMongo();

    // comprobar usuario existente
    const exists = await User.findOne({ $or: [{ username }, { email }] }).exec();
    if (exists) return res.status(409).json({ error: 'Usuario o email ya existe' });

    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const created = new User({ username, email, password: hashed });
    await created.save();
    const token = jwt.sign({ userId: created._id }, JWT_SECRET, { expiresIn: '1d' });
    res.status(201).json({ token, user: { id: created._id, username: created.username, email: created.email } });
  } catch (error) {
    console.error('Error register:', error);
    res.status(500).json({ error: 'Error al registrar', detail: error instanceof Error ? error.message : 'Error desconocido' });
  }
});

app.post('/api/auth/login', async (req: Request, res: Response) => {
  try {
    const { identifier, password } = req.body; // identifier = username o email
    if (!identifier || !password) return res.status(400).json({ error: 'Faltan campos' });
    if (isDevNoDB) {
      // Permitimos un usuario de desarrollo rápido: identifier='dev' password='devpass'
      if (identifier === 'dev' && password === 'devpass') {
        const token = jwt.sign({ userId: 'dev-user' }, JWT_SECRET, { expiresIn: '1d' });
        return res.json({ token, user: { id: 'dev-user', username: 'dev', email: 'dev@example.local' } });
      }
      return res.status(401).json({ error: 'Credenciales inválidas (modo dev sin DB)' });
    }

    await connectToMongo();

    const user = await User.findOne({ $or: [{ username: identifier }, { email: identifier }] }).exec();
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(401).json({ error: 'Credenciales inválidas' });

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
  } catch (error) {
    console.error('Error login:', error);
    res.status(500).json({ error: 'Error al loguear', detail: error instanceof Error ? error.message : 'Error desconocido' });
  }
});

// Ruta POST: Sirve para CREAR una nueva cerveza (PROTEGIDA)
app.post("/api/cervezas", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { tipo, descripcion, temperatura_ideal, copa, abv, ibu } = req.body;

    if (!tipo || !descripcion || !temperatura_ideal || !copa || !abv || !ibu) {
      res.status(400).json({ error: "Debes enviar todos los campos requeridos" });
      return;
    }

    await connectToMongo();
    const nuevaCerveza = new Cerveza({ tipo, descripcion, temperatura_ideal, copa, abv, ibu }); // Toma los datos que envía el usuario
    await nuevaCerveza.save(); // Los guarda en MongoDB
    res.status(201).json(nuevaCerveza); // Responde con la cerveza recién criada
  } catch (error) {
    console.error("Error al crear cerveza:", error);
    res.status(500).json({
      error: "No se pudo guardar la cerveza",
      detail: error instanceof Error ? error.message : "Error desconocido",
    });
  }
});

// Ruta PUT: Sirve para ACTUALIZAR una cerveza existente
app.put("/api/cervezas/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const {tipo, descripcion, temperatura_ideal, copa, abv, ibu } = req.body;

    await connectToMongo();

    const cervezaActualizada = await Cerveza.findByIdAndUpdate(
      id,
      { tipo, descripcion, temperatura_ideal, copa, abv, ibu },
      { new: true } // Para que devuelva el documento actualizado
    );

    if (!cervezaActualizada) {
      res.status(404).json({ error: "Cerveza no encontrada" });
      return;
    }

    res.json(cervezaActualizada);
  } catch (error) {
    console.error("Error al actualizar cerveza:", error);
    res.status(500).json({
      error: "No se pudo actualizar la cerveza",
      detail: error instanceof Error ? error.message : "Error desconocido",
    });
  }
});

// Ruta DELETE: Sirve para ELIMINAR una cerveza
app.delete("/api/cervezas/:id", authMiddleware, async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    await connectToMongo();

    const cervezaEliminada = await Cerveza.findByIdAndDelete(id);

    if (!cervezaEliminada) {
      res.status(404).json({ error: "Cerveza no encontrada" });
      return;
    }

    res.json({ mensaje: "Cerveza eliminada correctamente" });
  } catch (error) {
    console.error("Error al eliminar cerveza:", error);
    res.status(500).json({
      error: "No se pudo eliminar la cerveza",
      detail: error instanceof Error ? error.message : "Error desconocido",
    });
  }
});

// 6. Exportamos la app para que Vercel pueda encenderla
export default app;
