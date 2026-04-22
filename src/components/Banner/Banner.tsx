

import { useEffect, useState, useRef } from 'react'
import BannerImg from '../../assets/Banner.jpg'

// Componente: Banner
// Cabecera visual con imagen de gran tamaño y texto central. Incluye un efecto sutil
// de movimiento del texto basado en la posición del ratón para dar profundidad.

const Banner = () =>  {
    const [mouse, setMouse] = useState({ x: 0, y: 0 })
    const [mounted, setMounted] = useState(false)
    const zoneRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        setMounted(true)
        return () => {}
    }, [])

    const onMouseMove = (e: React.MouseEvent) => {
        if (!zoneRef.current) return
        const rect = zoneRef.current.getBoundingClientRect()
        const px = (e.clientX - rect.left) / rect.width // 0..1
        const py = (e.clientY - rect.top) / rect.height // 0..1
        // normalize to -0.5..0.5
        setMouse({ x: px - 0.5, y: py - 0.5 })
    }

    const onMouseLeave = () => setMouse({ x: 0, y: 0 })

    const bgStyle = {
        backgroundImage: `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url(${BannerImg})`,
        backgroundPosition: `center center`,
    }

    // Text translate based on mouse (small movement)
    const tx = (mouse.x * 20).toFixed(2)
    const ty = (mouse.y * 10).toFixed(2)

    return (
        <section className="w-full text-white">
            <div
                ref={zoneRef}
                onMouseMove={onMouseMove}
                onMouseLeave={onMouseLeave}
                className="min-h-[60vh] md:min-h-[80vh] bg-cover bg-center rounded-md shadow-inner flex items-center justify-center overflow-hidden"
                style={bgStyle}
            >
                <div
                    className={`w-full max-w-[900px] px-6 flex flex-col gap-6 text-center transition-transform duration-700 ${mounted ? 'scale-100' : 'scale-95 opacity-0'}`}
                    style={{ transform: `translate3d(${tx}px, ${ty}px, 0)` }}
                >
                    <h1 className="text-3xl md:text-5xl font-extrabold leading-tight drop-shadow-lg">Descubre el mundo de la cerveza artesanal</h1>
                    <h4 className="text-base md:text-lg leading-relaxed text-white/85 drop-shadow">
                        Explora sabores, estilos, historias y curiosidades para mejorar tu experiencia cervecera.
                    </h4>
                </div>
            </div>
        </section>
    )
}

export default Banner