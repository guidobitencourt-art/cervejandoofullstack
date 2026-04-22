
// Página: Curiosidades
// Contiene una colección de artículos/ tarjetas con curiosidades sobre cerveza.
// Cada tarjeta incluye una imagen, título y texto explicativo. Las imágenes se obtienen
// mediante `new URL(..., import.meta.url).href` para que Vite las empaquete correctamente.

const ImgMonjes = new URL('../../assets/los monges.png', import.meta.url).href
const ImgHistoria = new URL('../../assets/historia ipa.png', import.meta.url).href
const ImgPureza = new URL('../../assets/pureza alema.png', import.meta.url).href
const ImgBruxas = new URL('../../assets/bruxas cerveja.png', import.meta.url).href

const Curiosidades = () => {
    return (
        <main className="w-full">
            <section className="max-w-6xl mx-auto px-6 pt-12">
                <h1 className="text-3xl md:text-4xl font-bold">Curiosidades</h1>
                <p className="text-gray-700 mt-3">Explora el fascinante mundo de la cerveza a través de datos sorprendentes y su rica historia.</p>
            </section>

            <section className="max-w-6xl mx-auto px-6 py-8">
                <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-2">

                    <article className="flex flex-col items-center bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-transform duration-300">
                        <div className="w-full h-64">
                            <img src={ImgMonjes} alt="Los Monjes Trapenses: Fe, Silencio y Cerveza" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4">
                            <h2 className="mt-2 text-lg font-semibold text-center">Los Monjes Trapenses: Fe, Silencio y Cerveza</h2>
                            <p className="text-gray-600 mt-2">En el corazón de la Bélgica medieval, tras los muros de piedra de monasterios silenciosos, nació una de las tradiciones cerveceras más respetadas del mundo: las cervezas trapenses. Los monjes de la Orden Cisterciense de la Estricta Observancia, conocidos como trapenses, creían que el trabajo manual era una forma de oración. Producían pan, queso y, sobre todo, cerveza, no como negocio, sino como sustento para la comunidad y medio de caridad. Estos monjes perfeccionaron la fermentación, creando estilos legendarios como la Dubbel, Tripel y Quadrupel, que combinan fuerza, complejidad y elegancia. Cada botella era (y sigue siendo) el resultado de paciencia, silencio y fe.</p>
                        </div>
                    </article>

                    <article className="flex flex-col items-center bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-transform duration-300">
                        <div className="w-full h-64">
                            <img src={ImgHistoria} alt="La IPA y los Largos Viajes hasta la India" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4">
                            <h2 className="mt-2 text-lg font-semibold text-center">La IPA y los Largos Viajes hasta la India</h2>
                            <p className="text-gray-600 mt-2">En el siglo XVIII, el Imperio Británico dominaba vastas colonias, entre ellas la India. Los soldados y oficiales ingleses, lejos de casa, extrañaban uno de los placeres más queridos: la cerveza. Para satisfacer la demanda, los cerveceros comenzaron a enviar barriles por barco, pero el calor tropical y los meses de viaje arruinaban la bebida. El maestro cervecero George Hodgson, de Londres, tuvo una idea ingeniosa: aumentar el contenido de alcohol y la cantidad de lúpulo, ambos conservantes naturales. Así nació la India Pale Ale (IPA), una versión más amarga, intensa y aromática de la Pale Ale tradicional.</p>
                        </div>
                    </article>

                    <article className="flex flex-col items-center bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-transform duration-300">
                        <div className="w-full h-64">
                            <img src={ImgPureza} alt="La Ley de la Pureza Alemana: El Origen del Control de Calidad en la Cerveza" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4">
                            <h2 className="mt-2 text-lg font-semibold text-center">La Ley de la Pureza Alemana: El Origen del Control de Calidad en la Cerveza</h2>
                            <p className="text-gray-600 mt-2">En 1516, en Baviera, el duque Guillermo IV promulgó un decreto que cambiaría para siempre la historia de la cerveza: la Reinheitsgebot, o Ley de la Pureza Alemana. El documento establecía que la cerveza solo podía elaborarse con tres ingredientes: agua, malta y lúpulo (la levadura aún no se conocía). La idea era simple pero revolucionaria: garantizar la calidad y la seguridad de la bebida, evitando que los productores usaran hierbas tóxicas o aditivos peligrosos.</p>
                        </div>
                    </article>

                    <article className="flex flex-col items-center bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-transform duration-300">
                        <div className="w-full h-64">
                            <img src={ImgBruxas} alt="Las Mujeres Cerveceras y el Mito de las Brujas en la Edad Media" className="w-full h-full object-cover" />
                        </div>
                        <div className="p-4">
                            <h2 className="mt-2 text-lg font-semibold text-center">Las Mujeres Cerveceras y el Mito de las Brujas en la Edad Media</h2>
                            <p className="text-gray-600 mt-2">Mucho antes de que la cerveza fuera dominada por grandes cervecerías y asociada a lo masculino, fue creada por mujeres. En la Europa medieval, ellas elaboraban la bebida en sus hogares como parte de la vida doméstica y comunitaria. Conocidas como alewives, usaban granos locales y hierbas, vendían el excedente en mercados y transmitían sus recetas de generación en generación, logrando una forma temprana de autonomía económica.</p>
                        </div>
                    </article>

                </div>
            </section>
        </main>
    )
}

export default Curiosidades
