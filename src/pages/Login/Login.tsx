import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

// Página: Login
// Formulario simple de autenticación.
// - Envía `identifier` (usuario o email) y `password` a `/api/auth/login`.
// - Si la respuesta es exitosa guarda el JWT en `localStorage` y redirige al inicio.
// - En modo desarrollo, el backend acepta credenciales de prueba (`dev` / `devpass`) si no hay DB.

const Login = () => {
  const [identifier, setIdentifier] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const submit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier, password }),
      })
      // parse JSON safely (some error responses or server errors may return empty body)
      let data: any = null
      const contentType = res.headers.get('content-type') || ''
      if (contentType.includes('application/json')) {
        try {
          data = await res.json()
        } catch (err) {
          // malformed or empty JSON
          const text = await res.text().catch(() => '')
          throw new Error(text || `Server returned status ${res.status}`)
        }
      } else {
        // try to read as text for better error message
        const text = await res.text().catch(() => '')
        if (res.ok) {
          // unexpected non-json success response
          throw new Error('Login succeeded but response could not be parsed')
        } else {
          throw new Error(text || `Server returned status ${res.status}`)
        }
      }

      if (!res.ok) throw new Error(data?.error || data?.message || 'Login failed')
      localStorage.setItem('token', data.token)
      navigate('/dashboard')
      window.location.reload()
    } catch (err: any) {
      setError(err.message || 'Error')
    }
  }

  return (
    <div className="max-w-md mx-auto mt-12 p-6 bg-white rounded-lg shadow">
      <h2 className="text-xl font-bold mb-4">Acceder</h2>
      {error && <div className="text-red-600 mb-2">{error}</div>}
      <form onSubmit={submit} className="space-y-3">
        <div>
          <label className="block text-sm">Usuario o email</label>
          <input value={identifier} onChange={e => setIdentifier(e.target.value)} className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <label className="block text-sm">Contraseña</label>
          <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="w-full border rounded px-3 py-2" />
        </div>

        <div>
          <button type="submit" className="bg-[#caa120] hover:bg-[#b28f18] text-white font-semibold py-2 px-4 rounded">Entrar</button>
        </div>
      </form>
    </div>
  )
}

export default Login
