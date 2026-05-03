import { useState } from 'react';

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

export function TermsAndConditions() {
  const [lang, setLang] = useState<Lang>('de');

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <LanguageSelector lang={lang} setLang={setLang} />

        {lang === 'de' && (
          <>
            <h1 className="text-5xl font-krona font-bold text-asciende-purple mb-4 text-center">Allgemeine Geschäftsbedingungen</h1>
            <p className="text-center text-gray-500 font-jost mb-12">Stand: März 2025</p>
            <div className="prose prose-lg max-w-none font-jost text-gray-700 space-y-8">
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">1. Geltungsbereich</h2>
                <p>Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge, die zwischen Agustín Hernández (nachfolgend „Anbieter") und den Nutzern (nachfolgend „Kunde") über die Website asciende.pro geschlossen werden. Durch die Nutzung unserer Dienste erklären Sie sich mit diesen AGB einverstanden.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">2. Angebotene Leistungen</h2>
                <p className="mb-3">Der Anbieter bietet folgende Dienstleistungen an:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Online-Trainingspläne und -programme</li>
                  <li>Ernährungsberatung und -pläne</li>
                  <li>Sportliches Coaching (1:1)</li>
                  <li>Wissenschaftliche Informationen über Kurse und Mitgliedschaften</li>
                  <li>Zugang zur Asciende HUB App</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">3. Vertragsschluss und Widerrufsrecht</h2>
                <p className="mb-3">Mit dem Kauf einer Leistung kommt ein Vertrag zustande. Gemäß § 312g BGB i. V. m. Art. 246a EGBGB haben Verbraucher grundsätzlich ein 14-tägiges Widerrufsrecht. Dieses Widerrufsrecht erlischt jedoch gemäß § 356 Abs. 5 BGB vorzeitig, wenn:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Sie ausdrücklich zugestimmt haben, dass mit der Ausführung des Vertrages vor Ablauf der Widerrufsfrist begonnen werden soll, und</li>
                  <li>Sie Ihre Kenntnis davon bestätigt haben, dass Sie durch Ihre Zustimmung Ihr Widerrufsrecht verlieren, sobald die Dienstleistung vollständig erbracht ist.</li>
                </ul>
                <div className="mt-4 bg-gray-50 border-l-4 border-asciende-purple p-4 rounded-r-lg">
                  <p className="text-sm">Für personalisierte Trainings- und Ernährungspläne gilt: Das Widerrufsrecht erlischt, sobald der Plan erstellt und übermittelt wurde. Für digitale Inhalte (Kurse, Mitgliedschaften) erlischt das Widerrufsrecht mit dem Beginn des Zugriffs.</p>
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">4. Widerrufsbelehrung</h2>
                <p>Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses. Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Agustín Hernández, Cornelius Fredericks Str. 15, 13351 Berlin, E-Mail: agu@asciende.pro) mittels einer eindeutigen Erklärung über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">5. Kaufprozess und Preise</h2>
                <p className="mb-3">Kunden können folgende Leistungen erwerben:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Einzelne Beratungssitzungen</li>
                  <li>Mehrere Beratungssitzungen</li>
                  <li>Monatliche, vierteljährliche oder jährliche Trainingspläne</li>
                  <li>Kostenlose Mitgliedschaft, Frühbucher-Mitgliedschaft, monatliche oder jährliche Mitgliedschaft</li>
                </ul>
                <div className="mt-4 bg-gray-50 border-l-4 border-asciende-purple p-4 rounded-r-lg">
                  <p className="text-sm">Alle Preise sind in Euro angegeben und verstehen sich als Endpreise. Als Kleinunternehmer gemäß § 19 UStG wird keine Umsatzsteuer ausgewiesen. Zahlungen sind bei Kauf vollständig fällig. Eine Kündigung ist jederzeit möglich.</p>
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">6. Minderjährige</h2>
                <p>Zur Nutzung unserer Dienste müssen Sie mindestens 18 Jahre alt sein. Personen unter 18 Jahren benötigen die ausdrückliche Einwilligung eines Erziehungsberechtigten.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">7. Gesundheits- und Haftungshinweis</h2>
                <p>Unsere Trainings- und Ernährungspläne dienen der Leistungsverbesserung, ersetzen jedoch keine medizinische Beratung. Vor Beginn eines Trainingsprogramms empfehlen wir die Rücksprache mit einem Arzt, insbesondere bei Vorerkrankungen. Der Anbieter haftet nicht für gesundheitliche Schäden oder Verletzungen im Zusammenhang mit der Nutzung unserer Dienste. Die Haftung für Vorsatz und grobe Fahrlässigkeit bleibt unberührt.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">8. Nutzerkonto und Datenschutz</h2>
                <p>Zur Nutzung unserer Dienste kann die Erstellung eines Nutzerkontos erforderlich sein. Wir erheben personenbezogene Daten gemäß unserer Datenschutzerklärung. Der Nutzer ist für die Vertraulichkeit seiner Zugangsdaten verantwortlich.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">9. Cookies und Tracking</h2>
                <p>Unsere Website verwendet Cookies zur Verbesserung der Nutzererfahrung und Analyse. Wir verwenden Google Analytics und Meta Pixel (nach Einwilligung). Weitere Informationen finden Sie in unserer Cookie-Richtlinie.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">10. Drittanbieter</h2>
                <p>Wir nutzen Drittanbieter für Zahlungsabwicklung (Stripe, PayPal, Mercado Pago) und Hosting (Supabase). Wir übernehmen keine Garantie für die Sicherheit der Drittanbieter-Dienste.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">11. Kündigung</h2>
                <p>Der Anbieter behält sich das Recht vor, den Zugang zu Diensten bei Verstößen gegen diese AGB zu sperren oder zu kündigen. Der Kunde kann seine Mitgliedschaft oder sein Abonnement jederzeit ohne Angabe von Gründen kündigen.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">12. Haftungsbeschränkung</h2>
                <p>Die Haftung des Anbieters ist auf die Höhe des für die jeweilige Leistung gezahlten Betrags begrenzt. Eine Haftung für mittelbare Schäden, entgangenen Gewinn oder sonstige Folgeschäden ist ausgeschlossen, soweit gesetzlich zulässig.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">13. Anwendbares Recht und Gerichtsstand</h2>
                <p>Es gilt das Recht der Bundesrepublik Deutschland. Gerichtsstand für Kaufleute ist Berlin.</p>
                <div className="mt-4 bg-gray-50 border-l-4 border-asciende-purple p-4 rounded-r-lg">
                  <p className="text-sm">Die EU-Kommission stellt eine Plattform zur Online-Streitbeilegung bereit: <a href="https://ec.europa.eu/consumers/odr" className="text-asciende-purple hover:underline" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>. Wir sind nicht verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">14. Änderungen der AGB</h2>
                <p>Der Anbieter behält sich vor, diese AGB jederzeit zu aktualisieren. Änderungen werden auf dieser Seite veröffentlicht.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">15. Kontakt</h2>
                <div className="pl-4 border-l-4 border-asciende-purple/30 space-y-2">
                  <p><strong>E-Mail:</strong> agu@asciende.pro</p>
                  <p><strong>Telefon:</strong> +49 176 2297 3233</p>
                  <p><strong>Anschrift:</strong> Cornelius Fredericks Str. 15, 13351, Berlin</p>
                  <p><strong>Steuernummer:</strong> 35/342/02661</p>
                  <p><strong>Berufsbezeichnung:</strong> Sportwissenschaftler</p>
                </div>
              </section>
            </div>
          </>
        )}

        {lang === 'en' && (
          <>
            <h1 className="text-5xl font-krona font-bold text-asciende-purple mb-4 text-center">Terms and Conditions</h1>
            <p className="text-center text-gray-500 font-jost mb-12">Last updated: March 2025</p>
            <div className="prose prose-lg max-w-none font-jost text-gray-700 space-y-8">
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">1. Introduction</h2>
                <p>Welcome to Asciende.pro. By accessing and using our website, you agree to comply with and be bound by these Terms and Conditions. Please read them carefully before using our services.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">2. Services Provided</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Online training plans and programs</li>
                  <li>Nutrition plans and coaching</li>
                  <li>Sports coaching (1:1)</li>
                  <li>Scientific information through courses and memberships</li>
                  <li>Access to the Asciende HUB App</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">3. Right of Withdrawal for Digital Services</h2>
                <p className="mb-3">Consumers in the European Union generally have the right to withdraw from a contract within 14 days. However, this right does not apply if you have explicitly agreed to the immediate execution of the service. By purchasing digital services on Asciende.pro, you acknowledge that:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Memberships and courses begin immediately after purchase; you waive your right of withdrawal upon accessing the content.</li>
                  <li>For personalized training or nutrition plans, you may withdraw within 14 days provided the service has not yet been delivered. Once the plan is created and sent, the withdrawal right no longer applies.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">4. Purchase Process and Pricing</h2>
                <p className="mb-3">Users can purchase the following:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>A one-time consultation</li>
                  <li>Several consultations</li>
                  <li>A monthly, quarterly, or annual training plan</li>
                  <li>Free subscription, early bird, monthly subscription, or annual subscription</li>
                </ul>
                <div className="mt-4 bg-gray-50 border-l-4 border-asciende-purple p-4 rounded-r-lg">
                  <p className="text-sm">All prices are in Euros and final. As a small business (Kleinunternehmer under § 19 UStG), no VAT is charged. Payments are due in full at purchase. Memberships can be cancelled at any time.</p>
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">5. How to Exercise Your Right of Withdrawal</h2>
                <p>If you wish to withdraw from your purchase within the eligible period, notify us in writing via email to agu@asciende.pro before the service has started. Refunds will be processed within 14 days of receiving your request.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">6. Minimum Age</h2>
                <p>You must be at least 18 years old to use our services. If you are under 18, you must have the consent of a parent or legal guardian.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">7. Health and Fitness Disclaimer</h2>
                <p>Our training and nutrition plans are designed to help you improve your performance. However, we cannot be held responsible for any health issues or injuries. Before beginning any exercise program, we recommend consulting with a healthcare professional, especially if you have pre-existing conditions.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">8. User Account and Data Collection</h2>
                <p>To access our services, users may need to create an account. We collect personal data as described in our Privacy Policy. You are responsible for maintaining the confidentiality of your account credentials.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">9. Cookies and Tracking</h2>
                <p>Our website uses cookies to improve user experience. We use Google Analytics and Meta Pixel (with your consent). See our Cookie Policy for details.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">10. Third-Party Services</h2>
                <p>We use third-party services to process payments (Stripe, PayPal, Mercado Pago) and host our website (Supabase). We take reasonable precautions to protect your data but cannot guarantee the security of third-party services.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">11. Termination of Services</h2>
                <p>We reserve the right to suspend or terminate your access to our services if we suspect any violations of these Terms. You may cancel your subscription or membership at any time without obligation.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">12. Limitation of Liability</h2>
                <p>Our liability is limited to the amount paid for the specific service. We are not liable for any indirect, special, incidental, or consequential damages.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">13. Governing Law and Dispute Resolution</h2>
                <p>These Terms are governed by the laws of Germany. Disputes will be submitted to the competent courts in Berlin, Germany.</p>
                <div className="mt-4 bg-gray-50 border-l-4 border-asciende-purple p-4 rounded-r-lg">
                  <p className="text-sm">The European Commission provides a platform for online dispute resolution: <a href="https://ec.europa.eu/consumers/odr" className="text-asciende-purple hover:underline" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>.</p>
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">14. Changes to Terms</h2>
                <p>We reserve the right to update these Terms at any time. Changes will be posted on this page and apply to all users from the date of publication.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">15. Contact Information</h2>
                <div className="pl-4 border-l-4 border-asciende-purple/30 space-y-2">
                  <p><strong>Email:</strong> agu@asciende.pro</p>
                  <p><strong>Phone:</strong> +49 176 2297 3233</p>
                  <p><strong>Address:</strong> Cornelius Fredericks Str. 15, 13351, Berlin</p>
                  <p><strong>Tax Number:</strong> 35/342/02661</p>
                  <p><strong>Profession:</strong> Sports Scientist</p>
                </div>
              </section>
              <section className="border-t border-gray-300 pt-12">
                <h2 className="text-3xl font-krona font-bold text-asciende-purple mb-4">Disclaimer</h2>
                <p>The services and content provided on Asciende.pro are intended for informational and educational purposes. While we offer sports coaching, training plans, and nutritional guidance, these services do not replace professional medical or dietary advice. Asciende.pro does not diagnose, treat, or cure medical conditions and does not guarantee specific results. By using our services, users assume all associated risks.</p>
              </section>
            </div>
          </>
        )}

        {lang === 'es' && (
          <>
            <h1 className="text-5xl font-krona font-bold text-asciende-purple mb-4 text-center">Términos y Condiciones</h1>
            <p className="text-center text-gray-500 font-jost mb-12">Última actualización: marzo de 2025</p>
            <div className="prose prose-lg max-w-none font-jost text-gray-700 space-y-8">
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">1. Ámbito de Aplicación</h2>
                <p>Estos Términos y Condiciones regulan todos los contratos celebrados entre Agustín Hernández (en adelante "el Proveedor") y los usuarios a través del sitio web asciende.pro. Al utilizar nuestros servicios, usted acepta estos Términos y Condiciones.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">2. Servicios Ofrecidos</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Planes y programas de entrenamiento en línea</li>
                  <li>Asesoramiento y planes de nutrición</li>
                  <li>Coaching deportivo (1:1)</li>
                  <li>Información científica a través de cursos y membresías</li>
                  <li>Acceso a la App Asciende HUB</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">3. Derecho de Desistimiento</h2>
                <p className="mb-3">Los consumidores en la UE tienen derecho a desistir del contrato en un plazo de 14 días sin indicar el motivo. Al adquirir servicios digitales en Asciende.pro, usted reconoce que:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Las membresías y cursos comienzan inmediatamente después de la compra; renuncia al derecho de desistimiento al acceder al contenido.</li>
                  <li>Para planes personalizados, puede desistir dentro de los 14 días posteriores a la compra, siempre que el servicio no haya sido entregado.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">4. Proceso de Compra y Precios</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Una consulta individual</li>
                  <li>Varias consultas</li>
                  <li>Un plan de entrenamiento mensual, trimestral o anual</li>
                  <li>Suscripción gratuita, precio anticipado, suscripción mensual o anual</li>
                </ul>
                <div className="mt-4 bg-gray-50 border-l-4 border-asciende-purple p-4 rounded-r-lg">
                  <p className="text-sm">Todos los precios están en euros. Como pequeño empresario (Kleinunternehmer según § 19 UStG), no se aplica IVA. Los pagos son exigibles en su totalidad en el momento de la compra. Las membresías pueden cancelarse en cualquier momento.</p>
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">5. Cómo Ejercer el Derecho de Desistimiento</h2>
                <p>Si desea desistir de su compra dentro del plazo aplicable, notifíquenos por escrito a agu@asciende.pro antes de que se haya iniciado el servicio. Los reembolsos se procesarán en un plazo de 14 días.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">6. Edad Mínima</h2>
                <p>Debe tener al menos 18 años para utilizar nuestros servicios. Si es menor de 18 años, necesita el consentimiento de un progenitor o tutor legal.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">7. Aviso sobre Salud y Actividad Física</h2>
                <p>Nuestros planes de entrenamiento y nutrición no sustituyen el asesoramiento médico profesional. Recomendamos consultar con un profesional de la salud antes de iniciar cualquier programa de ejercicio, especialmente si padece alguna afección preexistente.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">8. Cuenta de Usuario y Datos Personales</h2>
                <p>Para acceder a nuestros servicios puede ser necesario crear una cuenta de usuario. Recopilamos datos personales según se describe en nuestra Política de Privacidad.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">9. Cookies y Rastreo</h2>
                <p>Nuestro sitio web utiliza cookies para mejorar la experiencia del usuario. Utilizamos Google Analytics y Meta Pixel (con su consentimiento). Consulte nuestra Política de Cookies para más información.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">10. Servicios de Terceros</h2>
                <p>Utilizamos servicios de terceros para el procesamiento de pagos (Stripe, PayPal, Mercado Pago) y alojamiento (Supabase). No podemos garantizar la seguridad de los servicios de terceros.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">11. Cancelación de Servicios</h2>
                <p>Nos reservamos el derecho de suspender su acceso a nuestros servicios si sospechamos infracciones de estos Términos. Puede cancelar su suscripción en cualquier momento sin obligación.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">12. Limitación de Responsabilidad</h2>
                <p>Nuestra responsabilidad está limitada al importe pagado por el servicio específico. No somos responsables de daños indirectos, especiales, incidentales o consecuentes.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">13. Ley Aplicable y Resolución de Disputas</h2>
                <p>Estos Términos se rigen por la legislación alemana. Las disputas se someterán a la jurisdicción de los tribunales competentes de Berlín, Alemania.</p>
                <div className="mt-4 bg-gray-50 border-l-4 border-asciende-purple p-4 rounded-r-lg">
                  <p className="text-sm">La Comisión Europea ofrece una plataforma de resolución de litigios en línea: <a href="https://ec.europa.eu/consumers/odr" className="text-asciende-purple hover:underline" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>.</p>
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">14. Modificaciones de los Términos</h2>
                <p>Nos reservamos el derecho de actualizar estos Términos en cualquier momento. Los cambios se publicarán en esta página.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">15. Información de Contacto</h2>
                <div className="pl-4 border-l-4 border-asciende-purple/30 space-y-2">
                  <p><strong>Correo electrónico:</strong> agu@asciende.pro</p>
                  <p><strong>Teléfono:</strong> +49 176 2297 3233</p>
                  <p><strong>Dirección:</strong> Cornelius Fredericks Str. 15, 13351, Berlín</p>
                  <p><strong>Número fiscal:</strong> 35/342/02661</p>
                  <p><strong>Profesión:</strong> Científico del Deporte</p>
                </div>
              </section>
              <section className="border-t border-gray-300 pt-12">
                <h2 className="text-3xl font-krona font-bold text-asciende-purple mb-4">Exención de Responsabilidad</h2>
                <p>Los servicios y contenidos de Asciende.pro tienen fines informativos y educativos. No sustituyen el asesoramiento médico o dietético profesional. Asciende.pro no diagnostica, trata ni cura afecciones médicas, y no garantiza resultados específicos. Al utilizar nuestros servicios, los usuarios asumen todos los riesgos asociados.</p>
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
