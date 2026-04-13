import { useState } from 'react'
import Logo from '../../assets/Logo.png'

const Header = () => {
  const [open, setOpen] = useState(false)

  return (
    <header className="bg-[#FFF5D4] flex justify-between items-center p-8 relative">
      <img src={Logo} alt="Cervejando logo" className="max-w-[12.5rem] h-auto" />

      <button
        className="flex md:hidden flex-col gap-[5px] bg-transparent border-0 p-0 cursor-pointer"
        aria-label="Abrir menú"
        aria-expanded={open}
        onClick={() => setOpen(v => !v)}
      >
        <span className="block w-[30px] h-[3px] rounded-[5px] bg-[var(--c-text)] transition-all" />
        <span className="block w-[30px] h-[3px] rounded-[5px] bg-[var(--c-text)] transition-all" />
        <span className="block w-[30px] h-[3px] rounded-[5px] bg-[var(--c-text)] transition-all" />
      </button>

      <nav
        className={`${open ? 'flex' : 'hidden'} md:flex ${open ? 'absolute top-full left-0 w-full bg-[var(--c-primary)] flex-col items-center py-4 shadow-md' : ''} md:static md:top-auto md:left-auto md:w-auto md:bg-transparent md:flex-row md:items-center md:py-0 md:shadow-none`}
      >
        <ul className={`flex ${open ? 'flex-col gap-6' : 'flex-row gap-6'} md:flex-row md:gap-6`}>
          <li><a className="font-bold hover:text-[#d4a017]" href="#">Inicio</a></li>
          <li><a className="font-bold hover:text-[#d4a017]" href="escuelas.html">Escuelas</a></li>
          <li><a className="font-bold hover:text-[#d4a017]" href="estilos.html">Estilos</a></li>
          <li><a className="font-bold hover:text-[#d4a017]" href="curiosidades.html">Curiosidades</a></li>
          <li><a className="font-bold hover:text-[#d4a017]" href="quienessomos.html">Quienes Somos</a></li>
          <li><a className="font-bold hover:text-[#d4a017]" href="contacto.html">Contacto</a></li>
        </ul>
      </nav>
    </header>
  )
}

export default Header