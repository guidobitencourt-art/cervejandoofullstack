import React, { useEffect, useState } from 'react'
import { authFetch } from '@/utils/authFetch'

const Dashboard = () => {
  const [user, setUser] = useState<any | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const data = await authFetch('/api/auth/me')
        if (mounted) setUser(data)
      } catch (e) {
        if (mounted) setUser(null)
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  if (loading) return <div className="p-6">Cargando...</div>
  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {user ? (
        <div>
          <p>Bienvenido, <strong>{user.username}</strong></p>
          <p className="text-sm text-gray-600">Email: {user.email}</p>
        </div>
      ) : (
        <p>No hay usuario autenticado.</p>
      )}
    </section>
  )
}

export default Dashboard
