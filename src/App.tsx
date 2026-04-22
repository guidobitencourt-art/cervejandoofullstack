import { BrowserRouter, Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Banner from "./components/Banner/Banner"
import Hero from "./components/Hero/Hero"
import Hero2 from "./components/Hero2/Hero2"
import Contact from "./components/Contact/Contact"
import Contacto from "./pages/Contacto/Contacto"
import EstilosPage from "./pages/Estilos/Estilos"
import Curiosidades from "./pages/Curiosidades/Curiosidades"
import Login from "./pages/Login/Login"

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
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="estilos" element={<EstilosPage />} />
          <Route path="curiosidades" element={<Curiosidades />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="login" element={<Login />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
