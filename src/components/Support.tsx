import { useState } from 'react';
import { Mail, MessageCircle, Clock } from 'lucide-react';

type Lang = 'de' | 'en' | 'es';

const LanguageSelector = ({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) => (
  <div className="flex justify-center gap-3 mb-16 mt-8">
    {(['de', 'en', 'es'] as Lang[]).map((l) => (
      <button key={l} onClick={() => setLang(l)}
        className={`px-4 py-2 rounded-lg font-semibold transition ${lang === l ? 'bg-asciende-purple text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}>
        {l.toUpperCase()}
      </button>
    ))}
  </div>
);

export function Support() {
  const [lang, setLang] = useState<Lang>('de');

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <LanguageSelector lang={lang} setLang={setLang} />

        {lang === 'de' && (
          <>
            <h1 className="text-5xl font-krona font-bold text-asciende-purple mb-12 text-center">Support</h1>
            <div className="prose prose-lg max-w-none font-jost text-gray-700 space-y-8">
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">Wir sind hier für Sie</h2>
                <p className="mb-4">
                  Bei Fragen, technischen Problemen oder jeglichen anderen Anliegen zum Asciende.pro-Service kontaktieren Sie uns bitte direkt. Unser Support-Team hilft Ihnen gerne weiter und antwortet so schnell wie möglich.
                </p>
                <p>
                  Wir schätzen Ihr Feedback und möchten sicherstellen, dass Sie das beste Erlebnis mit unseren Diensten haben.
                </p>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
                <div className="bg-gradient-to-br from-asciende-purple/5 to-transparent p-6 rounded-lg border border-asciende-purple/20">
                  <div className="flex items-start gap-4">
                    <Mail className="w-8 h-8 text-asciende-purple flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-krona font-bold text-gray-900 mb-2">E-Mail-Support</h3>
                      <p className="text-gray-700 mb-3">
                        Kontaktieren Sie uns per E-Mail für allgemeine Anfragen und Support:
                      </p>
                      <a href="mailto:info@asciende.pro" className="text-asciende-purple font-semibold hover:underline">
                        info@asciende.pro
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-asciende-purple/5 to-transparent p-6 rounded-lg border border-asciende-purple/20">
                  <div className="flex items-start gap-4">
                    <Clock className="w-8 h-8 text-asciende-purple flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-krona font-bold text-gray-900 mb-2">Antwortzeit</h3>
                      <p className="text-gray-700">
                        Wir bemühen uns, auf alle Anfragen innerhalb von 24-48 Stunden zu antworten.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">Häufig gestellte Fragen</h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-krona font-bold text-gray-900 mb-2">Wie kann ich mein Passwort zurücksetzen?</h3>
                    <p className="text-gray-700">
                      Auf der Login-Seite klicken Sie auf "Passwort vergessen?" und folgen den Anweisungen in der E-Mail.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-krona font-bold text-gray-900 mb-2">Wie kann ich mein Konto löschen?</h3>
                    <p className="text-gray-700">
                      Sie können Ihr Konto in den Kontoeinstellungen löschen oder kontaktieren Sie uns unter info@asciende.pro.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-krona font-bold text-gray-900 mb-2">Welche Zahlungsmethoden werden akzeptiert?</h3>
                    <p className="text-gray-700">
                      Wir akzeptieren verschiedene Zahlungsmethoden über unsere Zahlungspartner Stripe, PayPal und Mercado Pago.
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-asciende-purple/5 border border-asciende-purple/20 p-6 rounded-lg mt-8">
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">Kontakt</h2>
                <p className="text-gray-700 mb-4">
                  Für alle Anfragen, Feedback oder technische Probleme:
                </p>
                <a href="mailto:info@asciende.pro" className="inline-block bg-asciende-purple text-white px-6 py-3 rounded-lg font-semibold hover:bg-asciende-purple/90 transition">
                  info@asciende.pro
                </a>
              </section>
            </div>
          </>
        )}

        {lang === 'en' && (
          <>
            <h1 className="text-5xl font-krona font-bold text-asciende-purple mb-6 text-center">Support</h1>
            <div className="prose prose-lg max-w-none font-jost text-gray-700 space-y-8">
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">We're Here to Help</h2>
                <p className="mb-4">
                  If you have any questions, technical issues, or concerns about the Asciende.pro service, please don't hesitate to contact us. Our support team is ready to assist you and will respond as quickly as possible.
                </p>
                <p>
                  We value your feedback and want to ensure you have the best experience with our services.
                </p>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
                <div className="bg-gradient-to-br from-asciende-purple/5 to-transparent p-6 rounded-lg border border-asciende-purple/20">
                  <div className="flex items-start gap-4">
                    <Mail className="w-8 h-8 text-asciende-purple flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-krona font-bold text-gray-900 mb-2">Email Support</h3>
                      <p className="text-gray-700 mb-3">
                        Contact us via email for general inquiries and support:
                      </p>
                      <a href="mailto:info@asciende.pro" className="text-asciende-purple font-semibold hover:underline">
                        info@asciende.pro
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-asciende-purple/5 to-transparent p-6 rounded-lg border border-asciende-purple/20">
                  <div className="flex items-start gap-4">
                    <Clock className="w-8 h-8 text-asciende-purple flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-krona font-bold text-gray-900 mb-2">Response Time</h3>
                      <p className="text-gray-700">
                        We aim to respond to all inquiries within 24-48 hours.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-krona font-bold text-gray-900 mb-2">How do I reset my password?</h3>
                    <p className="text-gray-700">
                      On the login page, click "Forgot password?" and follow the instructions sent to your email.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-krona font-bold text-gray-900 mb-2">How can I delete my account?</h3>
                    <p className="text-gray-700">
                      You can delete your account in your account settings or contact us at info@asciende.pro.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-krona font-bold text-gray-900 mb-2">What payment methods are accepted?</h3>
                    <p className="text-gray-700">
                      We accept various payment methods through our payment partners Stripe, PayPal, and Mercado Pago.
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-asciende-purple/5 border border-asciende-purple/20 p-6 rounded-lg mt-8">
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">Contact Us</h2>
                <p className="text-gray-700 mb-4">
                  For any inquiries, feedback, or technical issues:
                </p>
                <a href="mailto:info@asciende.pro" className="inline-block bg-asciende-purple text-white px-6 py-3 rounded-lg font-semibold hover:bg-asciende-purple/90 transition">
                  info@asciende.pro
                </a>
              </section>
            </div>
          </>
        )}

        {lang === 'es' && (
          <>
            <h1 className="text-5xl font-krona font-bold text-asciende-purple mb-6 text-center">Soporte</h1>
            <div className="prose prose-lg max-w-none font-jost text-gray-700 space-y-8">
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">Estamos Aquí para Ayudarte</h2>
                <p className="mb-4">
                  Si tienes preguntas, problemas técnicos o cualquier otra inquietud sobre el servicio Asciende.pro, no dudes en contactarnos. Nuestro equipo de soporte está listo para asistirte y responderá lo antes posible.
                </p>
                <p>
                  Valoramos tu retroalimentación y queremos asegurar que tengas la mejor experiencia con nuestros servicios.
                </p>
              </section>

              <section className="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
                <div className="bg-gradient-to-br from-asciende-purple/5 to-transparent p-6 rounded-lg border border-asciende-purple/20">
                  <div className="flex items-start gap-4">
                    <Mail className="w-8 h-8 text-asciende-purple flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-krona font-bold text-gray-900 mb-2">Soporte por Email</h3>
                      <p className="text-gray-700 mb-3">
                        Contáctanos por correo electrónico para consultas generales y soporte:
                      </p>
                      <a href="mailto:info@asciende.pro" className="text-asciende-purple font-semibold hover:underline">
                        info@asciende.pro
                      </a>
                    </div>
                  </div>
                </div>

                <div className="bg-gradient-to-br from-asciende-purple/5 to-transparent p-6 rounded-lg border border-asciende-purple/20">
                  <div className="flex items-start gap-4">
                    <Clock className="w-8 h-8 text-asciende-purple flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="text-xl font-krona font-bold text-gray-900 mb-2">Tiempo de Respuesta</h3>
                      <p className="text-gray-700">
                        Nos esforzamos por responder todas las consultas dentro de 24-48 horas.
                      </p>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">Preguntas Frecuentes</h2>
                <div className="space-y-4">
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-krona font-bold text-gray-900 mb-2">¿Cómo restablezco mi contraseña?</h3>
                    <p className="text-gray-700">
                      En la página de inicio de sesión, haz clic en "Olvidé mi contraseña" y sigue las instrucciones del correo electrónico.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-krona font-bold text-gray-900 mb-2">¿Cómo puedo eliminar mi cuenta?</h3>
                    <p className="text-gray-700">
                      Puedes eliminar tu cuenta en la configuración de tu perfil o contactarnos en info@asciende.pro.
                    </p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-krona font-bold text-gray-900 mb-2">¿Qué métodos de pago se aceptan?</h3>
                    <p className="text-gray-700">
                      Aceptamos varios métodos de pago a través de nuestros socios de pago Stripe, PayPal y Mercado Pago.
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-asciende-purple/5 border border-asciende-purple/20 p-6 rounded-lg mt-8">
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">Contáctanos</h2>
                <p className="text-gray-700 mb-4">
                  Para cualquier consulta, retroalimentación o problema técnico:
                </p>
                <a href="mailto:info@asciende.pro" className="inline-block bg-asciende-purple text-white px-6 py-3 rounded-lg font-semibold hover:bg-asciende-purple/90 transition">
                  info@asciende.pro
                </a>
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
