import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import Banner from "./components/Banner/Banner"
import Hero from "./components/Hero/Hero"
import Hero2 from "./components/Hero2/Hero2"
import Contact from "./components/Contact/Contact"
import EstilosPage from "./pages/Estilos/Estilos"

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
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/estilos" element={<EstilosPage />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

export default App
