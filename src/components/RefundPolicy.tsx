import { useState } from 'react';

type Lang = 'de' | 'en' | 'es';

const LanguageSelector = ({ lang, setLang }: { lang: Lang; setLang: (l: Lang) => void }) => (
  <div className="flex justify-center gap-3 mb-16 mt-8">
    {(['de', 'en', 'es'] as Lang[]).map((l) => (
      <button
        key={l}
        onClick={() => setLang(l)}
        className={`px-4 py-2 rounded-lg font-semibold transition ${
          lang === l ? 'bg-asciende-purple text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
        }`}
      >
        {l.toUpperCase()}
      </button>
    ))}
  </div>
);

export function RefundPolicy() {
  const [lang, setLang] = useState<Lang>('de');

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <LanguageSelector lang={lang} setLang={setLang} />

        {lang === 'de' && (
          <>
            <h1 className="text-5xl font-krona font-bold text-asciende-purple mb-2 text-center">
              Rückgabe- und Stornierungsrichtlinie
            </h1>
            <p className="text-center text-gray-600 font-jost mb-12">
              Widerrufsbelehrung und Erstattungsrichtlinie
            </p>

            <div className="prose prose-lg max-w-none font-jost text-gray-700 space-y-8">
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">1. Allgemeine Richtlinie</h2>
                <p>
                  Bei Asciende.pro bieten wir Dienstleistungen an, die Ihre sportliche Leistung verbessern sollen. Bitte lesen Sie unsere Erstattungsrichtlinie vor dem Kauf sorgfältig durch.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">2. Widerrufsrecht (14-Tage-Frist gemäß § 312g BGB)</h2>
                <p>
                  Als Verbraucher haben Sie gemäß § 312g BGB i. V. m. Art. 246a EGBGB das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag des Vertragsabschlusses.
                </p>
                <p className="mt-4">
                  Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (Agustín Hernández, Cornelius Fredericks Str. 15, 13351 Berlin, E-Mail: info@asciende.pro) mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren.
                </p>
                <div className="bg-blue-50 border-l-4 border-asciende-purple p-4 mt-4">
                  <p className="text-sm">
                    <strong>Wichtig (§ 356 Abs. 5 BGB):</strong> Bei Verträgen über die Lieferung digitaler Inhalte (z. B. Trainingspläne, Ernährungsleitfäden) erlischt Ihr Widerrufsrecht, wenn wir mit der Ausführung des Vertrages begonnen haben und Sie vorher ausdrücklich zugestimmt haben, dass wir mit der Ausführung vor Ablauf der Widerrufsfrist beginnen, und Sie Ihre Kenntnis davon bestätigt haben, dass Sie durch Ihre Zustimmung mit Beginn der Ausführung des Vertrages Ihr Widerrufsrecht verlieren.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">3. Abonnementdienste (nach Nutzung nicht erstattungsfähig)</h2>
                <p>
                  Für Abonnementdienste (monatlich oder jährlich) werden nach der Nutzung oder dem Zugriff auf den Dienst keine Rückerstattungen gewährt. Sie können Ihr Abonnement jedoch jederzeit kündigen, um zukünftige Abbuchungen zu verhindern. Die Kündigung wird zum Ende der aktuellen Abrechnungsperiode wirksam.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">4. Erstattungsverfahren</h2>
                <p>
                  Um eine Rückerstattung zu beantragen, kontaktieren Sie uns bitte innerhalb von 14 Tagen nach dem Kauf unter <a href="mailto:info@asciende.pro" className="text-asciende-purple hover:underline">info@asciende.pro</a>. Bitte geben Sie folgende Informationen an:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4">
                  <li>Ihre Bestellnummer.</li>
                  <li>Eine kurze Erläuterung des Grundes Ihrer Anfrage.</li>
                  <li>Ggf. eine Erklärung, dass Sie den Dienst nicht genutzt haben.</li>
                </ul>
                <p className="mt-4">
                  Genehmigte Rückerstattungen werden innerhalb von 14 Tagen über das ursprüngliche Zahlungsmittel zurückerstattet (Art. 13 Abs. 3 VRRL).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">5. Nicht erstattungsfähige Dienstleistungen</h2>
                <p>
                  Digitale Inhalte wie Trainingspläne und Ernährungsleitfäden sind nach dem Zugriff nicht mehr erstattungsfähig (§ 356 Abs. 5 BGB). Dies gilt, sofern Sie vor dem Kauf ausdrücklich Ihrer Zustimmung erklärt haben, dass die Lieferung des digitalen Inhalts vor Ablauf der Widerrufsfrist beginnen soll.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">6. Verjährung</h2>
                <p>
                  Ansprüche aus Mängeln unterliegen der gesetzlichen Verjährungsfrist von zwei Jahren ab Ablieferung der Leistung (§ 438 Abs. 1 Nr. 3 BGB). Schadensersatzansprüche verjähren gemäß § 195 BGB in der Regelverjährungsfrist von drei Jahren.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">7. Änderungen der Richtlinie</h2>
                <p>
                  Wir behalten uns das Recht vor, diese Richtlinie jederzeit zu ändern. Änderungen werden per E-Mail oder durch Updates auf der Website mitgeteilt.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">8. Streitbeilegung</h2>
                <p>
                  Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" className="text-asciende-purple hover:underline" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                </p>
              </section>
            </div>
          </>
        )}

        {lang === 'en' && (
          <>
            <h1 className="text-5xl font-krona font-bold text-asciende-purple mb-2 text-center">
              Refund and Cancellation Policy
            </h1>
            <p className="text-center text-gray-600 font-jost mb-12">
              Refund and Return Policy
            </p>

            <div className="prose prose-lg max-w-none font-jost text-gray-700 space-y-8">
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">1. General Policy</h2>
                <p>
                  At Asciende.pro, we provide services designed to improve your performance. Please review our refund policy before purchasing.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">2. Right of Withdrawal (14-day Period)</h2>
                <p>
                  According to EU regulations, you have the right to withdraw from your contract within 14 days without providing any reason, except for cases where services have already been fully performed. If you purchased a subscription or consultation service, you can cancel within the first 14 days to receive a full refund, provided the service has not been fully accessed or used.
                </p>
                <div className="bg-blue-50 border-l-4 border-asciende-purple p-4 mt-4">
                  <p className="text-sm">
                    <strong>Important:</strong> If you start using the service (e.g., accessing training plans or consulting), your right to withdraw is void if you have explicitly agreed to this in advance and been informed that you will lose your right to withdraw after accessing the service.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">3. Subscription Services (Non-refundable after use)</h2>
                <p>
                  For subscription services (monthly or yearly), no refunds will be provided after the service has been accessed or used. However, you can cancel your subscription at any time to prevent future charges.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">4. Refund Process</h2>
                <p>
                  To request a refund, please contact us at <a href="mailto:info@asciende.pro" className="text-asciende-purple hover:underline">info@asciende.pro</a> within 14 days of the service or purchase date. Include:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4">
                  <li>Your order number.</li>
                  <li>A brief explanation of the reason for your request.</li>
                  <li>If applicable, a statement confirming you haven't used the service.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">5. Non-refundable Services</h2>
                <p>
                  Services such as digital content (training plans, nutritional guides) are non-refundable once accessed.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">6. Changes to the Policy</h2>
                <p>
                  We reserve the right to modify this policy at any time, with changes communicated via email or updates on the website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">7. Dispute Resolution</h2>
                <p>
                  The European Commission provides a platform for online dispute resolution (OS): <a href="https://ec.europa.eu/consumers/odr" className="text-asciende-purple hover:underline" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>. We are not willing or obligated to participate in dispute resolution proceedings before a consumer arbitration board.
                </p>
              </section>
            </div>
          </>
        )}

        {lang === 'es' && (
          <>
            <h1 className="text-5xl font-krona font-bold text-asciende-purple mb-2 text-center">
              Política de Reembolso y Cancelación
            </h1>
            <p className="text-center text-gray-600 font-jost mb-12">
              Política de Devolución y Reembolso
            </p>

            <div className="prose prose-lg max-w-none font-jost text-gray-700 space-y-8">
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">1. Política General</h2>
                <p>
                  En Asciende.pro, proporcionamos servicios diseñados para mejorar su rendimiento. Por favor, revise nuestra política de reembolso antes de realizar una compra.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">2. Derecho de Desistimiento (Período de 14 días)</h2>
                <p>
                  De acuerdo con las regulaciones de la UE, tiene derecho a desistir de su contrato dentro de los 14 días sin proporcionar ningún motivo, excepto en los casos en que los servicios ya hayan sido completamente prestados. Si adquirió un servicio de suscripción o consulta, puede cancelar dentro de los primeros 14 días para recibir un reembolso completo, siempre que el servicio no haya sido completamente accedido o utilizado.
                </p>
                <div className="bg-blue-50 border-l-4 border-asciende-purple p-4 mt-4">
                  <p className="text-sm">
                    <strong>Importante:</strong> Si comienza a utilizar el servicio (por ejemplo, accediendo a planes de entrenamiento o consultoría), su derecho de desistimiento quedará sin efecto si ha acordado expresamente esto de antemano y ha sido informado de que perderá su derecho de desistimiento tras acceder al servicio.
                  </p>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">3. Servicios de Suscripción (No reembolsables después del uso)</h2>
                <p>
                  Para los servicios de suscripción (mensuales o anuales), no se proporcionarán reembolsos después de que el servicio haya sido accedido o utilizado. Sin embargo, puede cancelar su suscripción en cualquier momento para evitar cargos futuros.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">4. Proceso de Reembolso</h2>
                <p>
                  Para solicitar un reembolso, contáctenos en <a href="mailto:info@asciende.pro" className="text-asciende-purple hover:underline">info@asciende.pro</a> dentro de los 14 días posteriores a la fecha del servicio o compra. Incluya:
                </p>
                <ul className="list-disc list-inside space-y-2 mt-4">
                  <li>Su número de pedido.</li>
                  <li>Una breve explicación del motivo de su solicitud.</li>
                  <li>Si corresponde, una declaración que confirme que no ha utilizado el servicio.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">5. Servicios No Reembolsables</h2>
                <p>
                  Los servicios como contenido digital (planes de entrenamiento, guías nutricionales) no son reembolsables una vez que han sido accedidos.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">6. Cambios en la Política</h2>
                <p>
                  Nos reservamos el derecho de modificar esta política en cualquier momento, con los cambios comunicados por correo electrónico o actualizaciones en el sitio web.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">7. Resolución de Disputas</h2>
                <p>
                  La Comisión Europea proporciona una plataforma para la resolución de disputas en línea (OS): <a href="https://ec.europa.eu/consumers/odr" className="text-asciende-purple hover:underline" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>. No estamos dispuestos ni obligados a participar en procedimientos de resolución de disputas ante una junta de arbitraje de consumidores.
                </p>
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
