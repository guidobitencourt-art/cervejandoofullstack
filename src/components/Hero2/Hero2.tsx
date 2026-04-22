

import ImgMonjes from '../../assets/los monges.png'
import ImgHistoria from '../../assets/historia ipa.png'
import { Link } from 'react-router-dom'

// Componente: Hero2
// Segundo bloque destacado con dos tarjetas de contenido que dirigen a la sección
// de Curiosidades. Diseñado para llamar la atención y ofrecer enlaces rápidos.

const Hero2 = () => {
    return (
        <section className="w-full py-12">
            <div className="max-w-6xl mx-auto px-6 grid gap-4 grid-cols-1 md:grid-cols-2 items-stretch">

                <div className="flex flex-col items-center">
                    <article className="w-full bg-white rounded-xl overflow-hidden shadow-xl ring-1 ring-gray-100 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01]">
                        <div className="w-full h-64 md:h-80">
                            <img src={ImgMonjes} alt="Los Monjes Trapenses: Fe, Silencio y Cerveza" className="w-full h-full object-cover block" />
                        </div>
                    </article>
                    <h2 className="mt-3 text-center text-lg font-semibold" style={{textShadow: '0 4px 12px rgba(0,0,0,0.06)'}}>Los Monjes Trapenses: Fe, Silencio y Cerveza</h2>
                </div>

                <div className="flex flex-col items-center">
                    <article className="w-full bg-white rounded-xl overflow-hidden shadow-xl ring-1 ring-gray-100 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01]">
                        <div className="w-full h-64 md:h-80">
                            <img src={ImgHistoria} alt="La IPA y los Largos Viajes hasta la India" className="w-full h-full object-cover block" />
                        </div>
                    </article>
                    <h2 className="mt-3 text-center text-lg font-semibold" style={{textShadow: '0 4px 12px rgba(0,0,0,0.06)'}}>La IPA y los Largos Viajes hasta la India</h2>
                </div>

            </div>

            <div className="mt-6 flex justify-center">
                <Link className="inline-block bg-[#caa120] hover:bg-[#b28f18] text-white font-semibold py-2 px-4 rounded-md shadow-sm transition-colors" to="/curiosidades" title="Descubrir">
                    Descubrir
                </Link>
            </div>
        </section>
    )
}

export default Hero2