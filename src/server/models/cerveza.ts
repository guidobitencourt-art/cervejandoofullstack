import mongoose from 'mongoose'

const CervezaSchema = new mongoose.Schema(
  {
    tipo: { type: String },
    descripcion: { type: String },
    temperatura_ideal: { type: String },
    copa: { type: String },
    abv: { type: String },
    ibu: { type: String },
  },
  { collection: 'cervezas', timestamps: true }
)

const Cerveza = mongoose.models.Cerveza || mongoose.model('Cerveza', CervezaSchema)

export default Cerveza
