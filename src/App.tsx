import React, { Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from '@/layouts/MainLayout'
import Banner from '@/components/Banner/Banner'
import Hero from '@/components/Hero/Hero'
import Hero2 from '@/components/Hero2/Hero2'
import Contact from '@/components/Contact/Contact'
import Contacto from '@/pages/Contacto/Contacto'
import ProtectedRoute from '@/components/ProtectedRoute'
const EstilosPage = React.lazy(() => import('@/pages/Estilos/Estilos'))
const Curiosidades = React.lazy(() => import('@/pages/Curiosidades/Curiosidades'))
const Login = React.lazy(() => import('@/pages/Login/Login'))
const Dashboard = React.lazy(() => import('@/pages/Dashboard/Dashboard'))

const Home = () => {
  return (
    <>
      <Banner />
      <Hero />
      <Hero2 />
      <Contact />
    </>
  )
}

const App = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<div className="p-8 text-center">Cargando...</div>}>
        <Routes>
          <Route element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="estilos" element={<EstilosPage />} />
            <Route path="curiosidades" element={<Curiosidades />} />
            <Route path="contacto" element={<Contacto />} />
            <Route path="login" element={<Login />} />
            <Route path="dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          </Route>
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}

export default App
