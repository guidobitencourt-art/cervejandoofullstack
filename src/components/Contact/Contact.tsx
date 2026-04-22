

// Componente: Contact (reutilizado en la home y en la página de contacto)
// - Contiene el mapa embebido (Google Maps) y el formulario de contacto.
// - El formulario está separado visualmente en un bloque blanco y el botón de envío
//   se coloca fuera del bloque principal para permitir diseño flexible.
// - Se ha aplicado diseño responsive mediante utilidades de Tailwind.

const Contact = () => {
  return (
    <section className="w-full pt-12 pb-16">
      <div className="max-w-6xl mx-auto px-6 grid gap-8 md:grid-cols-2 items-start md:items-stretch">

        <div className="w-full order-1">
          <div className="w-full min-h-64 md:h-full bg-gray-100 rounded-xl overflow-hidden shadow-xl">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12319.934425798981!2d-0.33862468485149516!3d39.4696990602842!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd6048661a8fd345%3A0x4b516154a7cb7c69!2sEl%20Cabanyal%2C%20Povoados%20Mar%C3%ADtimos%2C%20Val%C3%AAncia!5e0!3m2!1spt-BR!2ses!4v1768213056736!5m2!1spt-BR!2ses"
              className="block w-full h-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>

        <div className="w-full order-2">
          <div className="bg-white rounded-xl p-4 shadow-xl min-h-64 md:h-full flex items-start">
            <div className="w-full">
              <h2 className="text-2xl font-bold mb-2">Contacta con nosotros</h2>
              <p className="text-gray-600 mb-4">¿Tienes alguna duda, sugerencia o simplemente quieres decir hola?</p>

              <form id="contactForm" className="flex flex-col gap-3" action="#" method="GET">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div>
                    <label className="sr-only" htmlFor="name">Name</label>
                    <input id="name" name="name" type="text" placeholder="Name" className="w-full border rounded-md px-3 py-2" />
                  </div>
                  <div>
                    <label className="sr-only" htmlFor="surname">Surname</label>
                    <input id="surname" name="surname" type="text" placeholder="Surname" className="w-full border rounded-md px-3 py-2" />
                  </div>
                </div>

                <div>
                  <label className="sr-only" htmlFor="email">Email</label>
                  <input id="email" name="email" type="email" placeholder="Email" className="w-full border rounded-md px-3 py-2" />
                </div>

                <div>
                  <label className="sr-only" htmlFor="message">Message</label>
                  <textarea id="message" name="message" placeholder="Message" className="w-full border rounded-md px-3 py-2 h-32" />
                </div>

                <div className="flex items-center gap-2">
                  <input type="checkbox" id="privacy" name="privacy" className="h-4 w-4" />
                  <label htmlFor="privacy" className="text-sm text-gray-600">Acepto las políticas de privacidad</label>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-3 flex">
            <button form="contactForm" type="submit" className="inline-block bg-[#caa120] hover:bg-[#b28f18] text-white font-semibold py-2 px-4 rounded-md shadow-sm">
              Enviar
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact