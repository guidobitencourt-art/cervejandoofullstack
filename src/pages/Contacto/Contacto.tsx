// Página: Contacto
// Esta página muestra un mapa (Google Maps embebido) y un formulario de contacto.
// - El iframe contiene la localización embebida.
// - El formulario recoge nombre, apellidos, email y mensaje.
// - El botón de envío está localizado fuera del contenedor del formulario pero usa el atributo `form`.
// - El diseño es responsivo: en pantallas pequeñas el mapa y el formulario se apilan; en pantallas grandes van lado a lado.

const Contacto = () => {
    return (
        <section className="py-12">
            <div className="max-w-6xl mx-auto px-6">
                <div className="flex flex-col md:flex-row gap-6 items-stretch">
                    <div className="flex-1 h-64 md:h-96 rounded-lg overflow-hidden">
                        <iframe
                            title="Mapa de contacto"
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12319.934425798981!2d-0.33862468485149516!3d39.4696990602842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6048661a8fd345%3A0x4b516154a7cb7c69!2sEl%20Cabanyal%2C%20Povoados%20Mar%C3%ADtimos%2C%20Val%C3%AAncia!5e0!3m2!1spt-BR!2ses!4v1768213056736!5m2!1spt-BR!2ses"
                            className="w-full h-full border-0"
                            allowFullScreen
                            loading="lazy"
                            referrerPolicy="no-referrer-when-downgrade"
                        ></iframe>
                    </div>

                    <div className="flex-1 bg-white p-6 rounded-lg shadow">
                        <h2 className="text-2xl font-semibold mb-2">Contacta con nosotros</h2>
                        <p className="text-gray-600 mb-4">¿Tienes alguna duda, sugerencia o simplemente quieres decir hola?</p>

                        <form id="contactForm" action="#" method="GET" className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="name" className="sr-only">Name</label>
                                    <input id="name" name="name" type="text" placeholder="Name" className="w-full border rounded px-3 py-2" />
                                </div>
                                <div>
                                    <label htmlFor="surname" className="sr-only">Surname</label>
                                    <input id="surname" name="surname" type="text" placeholder="Surname" className="w-full border rounded px-3 py-2" />
                                </div>
                            </div>

                            <div>
                                <label htmlFor="email" className="sr-only">Email</label>
                                <input id="email" name="email" type="email" placeholder="Email" className="w-full border rounded px-3 py-2" />
                            </div>

                            <div>
                                <label htmlFor="message" className="sr-only">Message</label>
                                <textarea id="message" name="message" placeholder="Message" className="w-full border rounded px-3 py-2 h-28"></textarea>
                            </div>

                            <div className="flex items-center gap-2">
                                <input type="checkbox" id="privacy" name="privacy" className="h-4 w-4" />
                                <label htmlFor="privacy" className="text-sm text-gray-600">Acepto las políticas de privacidad</label>
                            </div>
                        </form>

                        <div className="mt-4">
                            <button form="contactForm" type="submit" className="inline-block bg-amber-300 hover:bg-amber-400 text-gray-900 font-medium py-2 px-4 rounded">
                                Enviar
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Contacto