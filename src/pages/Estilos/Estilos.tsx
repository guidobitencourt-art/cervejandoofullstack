import { useState } from 'react'
import { useCervezasRQ } from '../../hooks/useCervezasRQ'
import { authFetch } from '../../utils/authFetch'

// Página: Estilos
// Esta página implementa las operaciones CRUD visibles para el usuario:
// - Leer: la lista de estilos se obtiene con `useCervezasRQ()` (React Query) desde `/api/cervezas`.
// - Crear: cuando el usuario está autenticado se muestra un formulario para crear una cerveza (POST).
// - Actualizar: al pulsar 'Editar' aparece un formulario inline que realiza PUT a `/api/cervezas/:id`.
// - Eliminar: el botón 'Eliminar' llama a DELETE `/api/cervezas/:id`.
// Notas: las operaciones de escritura usan `authFetch` que incluye el token JWT almacenado en localStorage.

const EstilosPage = () => {
  const { data: cervezas, isLoading, error, refetch } = useCervezasRQ()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm] = useState({ tipo: '', descripcion: '', temperatura_ideal: '', copa: '', abv: '', ibu: '' })
  const [editId, setEditId] = useState<string | null>(null)
  const [editForm, setEditForm] = useState<any>(null)
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null

  const handleChange = (k: string, v: string) => setForm(prev => ({ ...prev, [k]: v }))

  async function handleCreate() {
    try {
      await authFetch('/api/cervezas', { method: 'POST', body: JSON.stringify(form) })
      setShowForm(false)
      setForm({ tipo: '', descripcion: '', temperatura_ideal: '', copa: '', abv: '', ibu: '' })
      refetch()
    } catch (err: any) {
      alert(err.message || 'Error creating')
    }
  }

  async function handleDelete(id?: string) {
    if (!id) return
    if (!confirm('Seguro que quieres eliminar esta cerveza?')) return
    try {
      await authFetch(`/api/cervezas/${id}`, { method: 'DELETE' })
      refetch()
    } catch (err: any) {
      alert(err.message || 'Error deleting')
    }
  }

  function startEdit(c: any) {
    setEditId(c._id)
    setEditForm({ tipo: c.tipo || '', descripcion: c.descripcion || '', temperatura_ideal: c.temperatura_ideal || '', copa: c.copa || '', abv: c.abv || '', ibu: c.ibu || '' })
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  function cancelEdit() {
    setEditId(null)
    setEditForm(null)
  }

  async function handleUpdate(id?: string) {
    if (!id) return
    try {
      await authFetch(`/api/cervezas/${id}`, { method: 'PUT', body: JSON.stringify(editForm) })
      cancelEdit()
      refetch()
    } catch (err: any) {
      alert(err.message || 'Error updating')
    }
  }

  return (
    <section className="w-full py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold mb-4">Estilos</h1>
          {token && (
            <button onClick={() => setShowForm(s => !s)} className="bg-[#caa120] hover:bg-[#b28f18] text-white py-2 px-4 rounded">
              {showForm ? 'Cancelar' : 'Nueva cerveza'}
            </button>
          )}
        </div>

        <p className="text-gray-700 mb-6">Aquí listamos estilos obtenidos desde la API.</p>

        {showForm && token && (
          <div className="bg-white p-4 rounded shadow mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <input placeholder="Tipo" value={form.tipo} onChange={e => handleChange('tipo', e.target.value)} className="border rounded px-3 py-2" />
              <input placeholder="Temperatura ideal" value={form.temperatura_ideal} onChange={e => handleChange('temperatura_ideal', e.target.value)} className="border rounded px-3 py-2" />
              <input placeholder="Copa" value={form.copa} onChange={e => handleChange('copa', e.target.value)} className="border rounded px-3 py-2" />
              <input placeholder="ABV" value={form.abv} onChange={e => handleChange('abv', e.target.value)} className="border rounded px-3 py-2" />
              <input placeholder="IBU" value={form.ibu} onChange={e => handleChange('ibu', e.target.value)} className="border rounded px-3 py-2" />
              <textarea placeholder="Descripción" value={form.descripcion} onChange={e => handleChange('descripcion', e.target.value)} className="border rounded px-3 py-2 md:col-span-2" />
            </div>
            <div className="mt-3">
              <button onClick={handleCreate} className="bg-[#4caf50] text-white px-4 py-2 rounded">Crear</button>
            </div>
          </div>
        )}

        {isLoading && <div className="text-gray-500">Cargando estilos...</div>}
        {error && <div className="text-red-600">Error: {error.message}</div>}

        {!isLoading && !error && (!cervezas || cervezas.length === 0) && (
          <div className="text-gray-600">No hay estilos disponibles.</div>
        )}

        {!isLoading && cervezas && cervezas.length > 0 && (
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mt-6">
            {cervezas.map((c: any) => (
              <article key={c._id ?? c.tipo} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-transform duration-200">
                <div className="p-4">
                  <h2 className="text-lg font-semibold">{c.tipo}</h2>
                  <p className="text-gray-600 mt-2 line-clamp-4">{c.descripcion}</p>
                  <ul className="mt-3 text-sm text-gray-500 space-y-1">
                    {c.temperatura_ideal && <li><strong>Temperatura:</strong> {c.temperatura_ideal}</li>}
                    {c.copa && <li><strong>Copa:</strong> {c.copa}</li>}
                    {c.abv && <li><strong>ABV:</strong> {c.abv}</li>}
                    {c.ibu && <li><strong>IBU:</strong> {c.ibu}</li>}
                  </ul>

                  {token && editId !== c._id && (
                    <div className="mt-4 flex gap-2">
                      <button onClick={() => startEdit(c)} className="text-white bg-blue-500 hover:bg-blue-600 px-3 py-1 rounded">Editar</button>
                      <button onClick={() => handleDelete(c._id)} className="text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded">Eliminar</button>
                    </div>
                  )}

                  {token && editId === c._id && editForm && (
                    <div className="mt-4 bg-gray-50 p-3 rounded">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <input value={editForm.tipo} onChange={e => setEditForm((p: any) => ({ ...p, tipo: e.target.value }))} className="border rounded px-2 py-1" />
                        <input value={editForm.temperatura_ideal} onChange={e => setEditForm((p: any) => ({ ...p, temperatura_ideal: e.target.value }))} className="border rounded px-2 py-1" />
                        <input value={editForm.copa} onChange={e => setEditForm((p: any) => ({ ...p, copa: e.target.value }))} className="border rounded px-2 py-1" />
                        <input value={editForm.abv} onChange={e => setEditForm((p: any) => ({ ...p, abv: e.target.value }))} className="border rounded px-2 py-1" />
                        <input value={editForm.ibu} onChange={e => setEditForm((p: any) => ({ ...p, ibu: e.target.value }))} className="border rounded px-2 py-1" />
                        <textarea value={editForm.descripcion} onChange={e => setEditForm((p: any) => ({ ...p, descripcion: e.target.value }))} className="border rounded px-2 py-1 md:col-span-2" />
                      </div>
                      <div className="mt-2 flex gap-2">
                        <button onClick={() => handleUpdate(c._id)} className="bg-green-600 text-white px-3 py-1 rounded">Guardar</button>
                        <button onClick={cancelEdit} className="bg-gray-300 px-3 py-1 rounded">Cancelar</button>
                      </div>
                    </div>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default EstilosPage

