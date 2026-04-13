

import ImgEstilos from '../../assets/Estilos.webp'

const Hero = () => {
    return (
        <section className="w-full py-12">
                <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center md:items-stretch gap-4">
                <div className="w-full md:w-1/2 flex justify-center">
                      <div className="bg-white rounded-xl p-6 md:p-8 shadow-xl ring-1 ring-gray-100 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 hover:scale-[1.01] w-full max-w-md text-center min-h-[16rem] md:min-h-[20rem] flex flex-col justify-center" style={{textShadow: '0 6px 18px rgba(0,0,0,0.06)'}}>
                        <h2 className="text-2xl md:text-3xl font-bold mb-2">De Lager a IPA: ¡Encuentra tu estilo!</h2>
                        <h4 className="text-base md:text-lg text-gray-700 mb-4">¿Más ligera? ¿Más amarga? ¿Con más cuerpo?</h4>
                        <p className="text-gray-600 mb-6">
                            Aquí descubrirás lo único de cada estilo y aprenderás a elegir tu cerveza perfecta.
                        </p>
                        <a className="inline-flex items-center justify-center gap-2 bg-[#caa120] hover:bg-[#b28f18] text-white font-semibold py-2 px-4 rounded-md shadow-sm transition-colors mx-auto" href="estilos.html" title="Descubrir">
                            Descubrir
                        </a>
                    </div>
                </div>

                <div className="w-full md:w-1/2 flex justify-center">
                    <div className="bg-white rounded-xl p-0 shadow-xl ring-1 ring-gray-100 transform transition-all duration-300 hover:shadow-2xl hover:translate-y-1 hover:scale-[1.01] w-full max-w-md overflow-hidden">
                        <div className="w-full h-64 md:h-80">
                            <img src={ImgEstilos} alt="estilos" className="w-full h-full rounded-none object-cover block" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Hero