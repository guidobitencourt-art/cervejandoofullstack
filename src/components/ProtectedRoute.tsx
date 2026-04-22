import React from 'react'
import { Navigate } from 'react-router-dom'

type Props = { children: React.ReactElement }

const ProtectedRoute = ({ children }: Props) => {
  if (typeof window === 'undefined') return <>{children}</>
  const token = localStorage.getItem('token')
  if (!token) return <Navigate to="/login" replace />
  return children
}

export default ProtectedRoute
