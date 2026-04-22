import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header/Header'
import Footer from '../components/Footer/Footer'

// Layout principal de la aplicación
// - Envuelve las páginas con Header y Footer comunes.
// - `Outlet` es el lugar donde React Router renderiza la ruta actual.
export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}
