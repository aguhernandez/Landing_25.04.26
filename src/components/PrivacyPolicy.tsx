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

export function PrivacyPolicy() {
  const [lang, setLang] = useState<Lang>('de');

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <LanguageSelector lang={lang} setLang={setLang} />

        {lang === 'de' && (
          <>
            <h1 className="text-5xl font-krona font-bold text-asciende-purple mb-12 text-center">Datenschutzerklärung</h1>
            <div className="prose prose-lg max-w-none font-jost text-gray-700 space-y-8">
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">1. Verantwortlicher für die Datenverarbeitung</h2>
                <p className="mb-3">Verantwortlich für die Verarbeitung Ihrer personenbezogenen Daten auf dieser Website ist:</p>
                <div className="pl-4 border-l-4 border-asciende-purple/30 space-y-1">
                  <p>Name: Agustín Hernández</p>
                  <p>Anschrift: Cornelius Fredericks Str. 15, 13351, Berlin</p>
                  <p>E-Mail: agu@asciende.pro</p>
                  <p>Telefon: +49 176 2297 3233</p>
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">2. Erhebung und Speicherung personenbezogener Daten</h2>
                <p className="mb-3">Wir erfassen und speichern personenbezogene Daten, wenn Sie:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Ein Kontaktformular auf unserer Website ausfüllen.</li>
                  <li>Sich für unseren Newsletter anmelden.</li>
                  <li>Ein Benutzerkonto auf unserer Website registrieren.</li>
                  <li>Unsere Website nutzen, wobei durch Cookies und Analyse-Tools Daten erfasst werden.</li>
                  <li>Einen Zahlungsvorgang über Stripe, PayPal oder Mercado Pago durchführen.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">3. Rechtsgrundlagen der Verarbeitung (Art. 6 DSGVO)</h2>
                <p className="mb-3">Wir verarbeiten Ihre personenbezogenen Daten auf Basis folgender Rechtsgrundlagen:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Art. 6 Abs. 1 lit. a DSGVO – Einwilligung (z. B. Newsletter, Cookies).</li>
                  <li>Art. 6 Abs. 1 lit. b DSGVO – Vertragserfüllung (z. B. Trainings- und Ernährungspläne).</li>
                  <li>Art. 6 Abs. 1 lit. c DSGVO – Erfüllung rechtlicher Verpflichtungen (z. B. steuerliche Aufbewahrungspflichten gemäß § 257 HGB, § 147 AO).</li>
                  <li>Art. 6 Abs. 1 lit. f DSGVO – Berechtigte Interessen (z. B. Website-Sicherheit).</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">4. Zweck der Datenverarbeitung</h2>
                <p className="mb-3">Wir verwenden Ihre Daten für folgende Zwecke:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Zur Bearbeitung von Anfragen über das Kontaktformular.</li>
                  <li>Zum Versand unseres Newsletters, falls Sie sich dafür angemeldet haben.</li>
                  <li>Zur Verwaltung Ihres Benutzerkontos auf unserer Website.</li>
                  <li>Zur Analyse des Nutzerverhaltens über Google Analytics und Meta Pixel (nur nach Einwilligung).</li>
                  <li>Zur Abwicklung von Zahlungen über unsere Zahlungsanbieter.</li>
                  <li>Zur Erstellung und Bereitstellung personalisierter Trainings- und Ernährungspläne.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">5. Verwendung von Cookies und Analysetools</h2>
                <p className="mb-3">Unsere Website verwendet Cookies, um die Benutzererfahrung zu verbessern. Wir nutzen folgende Analysetools nur nach Ihrer ausdrücklichen Einwilligung:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Google Analytics (Anbieter: Google Ireland Limited). Datenübertragungen in die USA erfolgen auf Basis von EU-Standardvertragsklauseln.</li>
                  <li>Meta Pixel (Anbieter: Meta Platforms Ireland Limited).</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">6. Weitergabe von Daten an Dritte</h2>
                <p className="mb-3">Wir teilen personenbezogene Daten nur mit Dritten, wenn dies zur Vertragserfüllung oder zur Erfüllung gesetzlicher Anforderungen notwendig ist:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Hosting-Anbieter: Supabase Inc. (USA) – Datenverarbeitung auf Basis von EU-Standardvertragsklauseln.</li>
                  <li>Zahlungsanbieter: Stripe, PayPal und Mercado Pago erhalten Ihre Zahlungsdaten bei einem Kauf.</li>
                  <li>Trainingsplattformen: Training Peaks, Nutrium, Train Heroic – nur soweit für die Leistungserbringung erforderlich.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">7. Speicherung und Löschung der Daten</h2>
                <p>Personenbezogene Daten werden nur so lange gespeichert, wie es für die jeweiligen Zwecke erforderlich ist oder gesetzliche Aufbewahrungspflichten bestehen. Gemäß § 257 HGB und § 147 AO sind Geschäftsdokumente und Buchungsbelege 10 Jahre aufzubewahren. Falls Sie ein Benutzerkonto erstellt haben, können Sie dieses jederzeit in den Kontoeinstellungen löschen.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">8. Ihre Rechte gemäß DSGVO</h2>
                <p className="mb-3">Sie haben folgende Rechte:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Auskunftsrecht (Art. 15 DSGVO)</li>
                  <li>Berichtigungsrecht (Art. 16 DSGVO)</li>
                  <li>Löschungsrecht (Art. 17 DSGVO)</li>
                  <li>Einschränkungsrecht (Art. 18 DSGVO)</li>
                  <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                  <li>Widerspruchsrecht (Art. 21 DSGVO)</li>
                  <li>Widerrufsrecht – Erteilte Einwilligungen können jederzeit mit Wirkung für die Zukunft widerrufen werden.</li>
                </ul>
                <div className="mt-4 bg-gray-50 border-l-4 border-asciende-purple p-4 rounded-r-lg">
                  <p className="text-sm">Anfragen richten Sie bitte an: agu@asciende.pro. Sie haben außerdem das Recht, eine Beschwerde bei der Berliner Beauftragten für Datenschutz und Informationsfreiheit einzureichen.</p>
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">9. Datensicherheit</h2>
                <p className="mb-3">Wir setzen folgende technische und organisatorische Maßnahmen (TOM) ein:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>SSL/TLS-Verschlüsselung bei der Datenübertragung.</li>
                  <li>Sichere Passwortauthentifizierung für Benutzerkonten.</li>
                  <li>Zugriffsbeschränkungen auf personenbezogene Daten.</li>
                  <li>Regelmäßige Sicherheitsupdates unserer Systeme.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">10. Internationale Datenübertragungen</h2>
                <p>Einige von uns genutzte Drittanbieter befinden sich außerhalb der EU, insbesondere in den USA. Solche Übertragungen erfolgen auf Basis von EU-Standardvertragsklauseln gemäß Art. 46 DSGVO.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">11. Änderungen dieser Datenschutzerklärung</h2>
                <p>Diese Datenschutzerklärung kann bei Änderungen der gesetzlichen Anforderungen oder unserer Dienste aktualisiert werden. Wir empfehlen, diese Erklärung regelmäßig zu überprüfen.</p>
              </section>
            </div>
          </>
        )}

        {lang === 'en' && (
          <>
            <h1 className="text-5xl font-krona font-bold text-asciende-purple mb-6 text-center">Privacy Policy</h1>
            <p className="font-jost text-gray-600 text-center mb-12">At Asciende.pro, we value the privacy of our users and are committed to protecting your personal data in accordance with the GDPR.</p>
            <div className="prose prose-lg max-w-none font-jost text-gray-700 space-y-8">
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">1. Data Controller</h2>
                <p className="mb-3">The person responsible for processing your personal data on this website is:</p>
                <div className="pl-4 border-l-4 border-asciende-purple/30 space-y-1">
                  <p>Name: Agustín Hernández</p>
                  <p>Address: Cornelius Fredericks Str. 15, 13351, Berlin</p>
                  <p>Email: agu@asciende.pro</p>
                  <p>Phone: +49 176 2297 3233</p>
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">2. Personal Data Collected</h2>
                <p className="mb-3">We collect the following personal data:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Basic Data: Name, surname, email address, date of birth, address.</li>
                  <li>Anthropometric Data: Weight, height, body measurements for personalized plans.</li>
                  <li>Usage Data: Information regarding interaction with our services.</li>
                  <li>Optional Data: User preferences, training history.</li>
                  <li>Payment Data: Processed via Stripe, PayPal, or Mercado Pago.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">3. Legal Bases for Data Processing (Art. 6 GDPR)</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Art. 6(1)(a) GDPR – Consent (e.g., newsletter, cookies).</li>
                  <li>Art. 6(1)(b) GDPR – Contract performance (e.g., training and nutrition plans).</li>
                  <li>Art. 6(1)(c) GDPR – Legal obligation (e.g., tax retention under § 257 HGB, § 147 AO).</li>
                  <li>Art. 6(1)(f) GDPR – Legitimate interests (e.g., website security).</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">4. Use of Personal Data</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Providing personalized training plans, nutrition coaching, and performance improvement.</li>
                  <li>Sending updates, newsletters, and promotional offers related to contracted services.</li>
                  <li>Tracking progress and improving service quality.</li>
                  <li>Completing transactions via our payment providers.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">5. Cookies and Analytics Tools</h2>
                <p className="mb-3">We use the following analytics tools only with your explicit consent:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Google Analytics (provider: Google Ireland Limited). Data transfers to the USA are based on EU Standard Contractual Clauses.</li>
                  <li>Meta Pixel (provider: Meta Platforms Ireland Limited).</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">6. Third Parties with Whom We Share Data</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Hosting Provider: Supabase Inc. (USA) – based on EU Standard Contractual Clauses.</li>
                  <li>Payment Providers: Stripe, PayPal, Mercado Pago.</li>
                  <li>Training Platforms: Training Peaks, Nutrium, Train Heroic – only as required.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">7. Data Retention</h2>
                <p>Your personal data will be retained for as long as necessary. Under German law (§ 257 HGB and § 147 AO), certain business documents must be retained for 10 years. You may delete your account at any time through account settings.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">8. Your Rights under GDPR</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Right of access (Art. 15 GDPR)</li>
                  <li>Right to rectification (Art. 16 GDPR)</li>
                  <li>Right to erasure (Art. 17 GDPR)</li>
                  <li>Right to restriction (Art. 18 GDPR)</li>
                  <li>Right to data portability (Art. 20 GDPR)</li>
                  <li>Right to object (Art. 21 GDPR)</li>
                  <li>Right to withdraw consent at any time with future effect.</li>
                </ul>
                <div className="mt-4 bg-gray-50 border-l-4 border-asciende-purple p-4 rounded-r-lg">
                  <p className="text-sm">Contact us at: agu@asciende.pro. You also have the right to file a complaint with the Berliner Beauftragte für Datenschutz und Informationsfreiheit.</p>
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">9. Data Security</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>SSL/TLS encryption during data transmission.</li>
                  <li>Secure password authentication for user accounts.</li>
                  <li>Restricted access to personal data.</li>
                  <li>Regular security updates to our systems.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">10. International Data Transfers</h2>
                <p>Some third-party services are located outside the EU, particularly in the USA. Such transfers are based on EU Standard Contractual Clauses under Art. 46 GDPR.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">11. Policy Updates</h2>
                <p>This privacy policy may be updated to reflect changes in legal requirements or our services. We recommend reviewing it periodically.</p>
              </section>
            </div>
          </>
        )}

        {lang === 'es' && (
          <>
            <h1 className="text-5xl font-krona font-bold text-asciende-purple mb-6 text-center">Política de Privacidad</h1>
            <p className="font-jost text-gray-600 text-center mb-12">En Asciende.pro, valoramos la privacidad de nuestros usuarios y estamos comprometidos con la protección de sus datos conforme al RGPD.</p>
            <div className="prose prose-lg max-w-none font-jost text-gray-700 space-y-8">
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">1. Responsable del Tratamiento</h2>
                <p className="mb-3">El responsable del tratamiento de sus datos personales en este sitio web es:</p>
                <div className="pl-4 border-l-4 border-asciende-purple/30 space-y-1">
                  <p>Nombre: Agustín Hernández</p>
                  <p>Dirección: Cornelius Fredericks Str. 15, 13351, Berlín</p>
                  <p>Correo electrónico: agu@asciende.pro</p>
                  <p>Teléfono: +49 176 2297 3233</p>
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">2. Datos Personales Recopilados</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Datos básicos: nombre, apellidos, correo electrónico, fecha de nacimiento, dirección.</li>
                  <li>Datos antropométricos: peso, altura, medidas corporales para ofrecer planes personalizados.</li>
                  <li>Datos de uso: información sobre el uso e interacción con nuestros servicios.</li>
                  <li>Datos opcionales: preferencias del usuario, historial de entrenamiento.</li>
                  <li>Datos de pago: procesados mediante Stripe, PayPal o Mercado Pago.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">3. Bases Jurídicas del Tratamiento (Art. 6 RGPD)</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Art. 6(1)(a) RGPD – Consentimiento (p. ej., newsletter, cookies).</li>
                  <li>Art. 6(1)(b) RGPD – Ejecución de un contrato (p. ej., planes de entrenamiento y nutrición).</li>
                  <li>Art. 6(1)(c) RGPD – Cumplimiento de obligaciones legales (p. ej., § 257 HGB, § 147 AO).</li>
                  <li>Art. 6(1)(f) RGPD – Interés legítimo (p. ej., seguridad del sitio web).</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">4. Finalidades del Tratamiento</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Prestación de servicios: planes de entrenamiento personalizados y asesoramiento nutricional.</li>
                  <li>Comunicación: enviar actualizaciones, boletines y ofertas promocionales.</li>
                  <li>Análisis del rendimiento: seguir su progreso y mejorar la calidad del servicio.</li>
                  <li>Procesamiento de pagos: completar transacciones a través de nuestros proveedores de pago.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">5. Cookies y Herramientas de Análisis</h2>
                <p className="mb-3">Utilizamos las siguientes herramientas de análisis solo con su consentimiento expreso:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Google Analytics (proveedor: Google Ireland Limited). Transferencias a EE. UU. basadas en Cláusulas Contractuales Estándar de la UE.</li>
                  <li>Meta Pixel (proveedor: Meta Platforms Ireland Limited).</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">6. Terceros con Quienes Compartimos Datos</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Proveedor de alojamiento: Supabase Inc. (EE. UU.) – con base en Cláusulas Contractuales Estándar de la UE.</li>
                  <li>Proveedores de pago: Stripe, PayPal, Mercado Pago.</li>
                  <li>Plataformas de entrenamiento: Training Peaks, Nutrium, Train Heroic – solo en la medida necesaria.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">7. Conservación y Eliminación de Datos</h2>
                <p>Sus datos personales se conservarán durante el tiempo necesario para prestar los servicios. Conforme a la legislación alemana (§ 257 HGB y § 147 AO), determinados documentos comerciales deben conservarse durante 10 años. Puede eliminar su cuenta en cualquier momento desde la configuración de su cuenta.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">8. Sus Derechos conforme al RGPD</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Derecho de acceso (Art. 15 RGPD)</li>
                  <li>Derecho de rectificación (Art. 16 RGPD)</li>
                  <li>Derecho de supresión (Art. 17 RGPD)</li>
                  <li>Derecho a la limitación (Art. 18 RGPD)</li>
                  <li>Derecho a la portabilidad (Art. 20 RGPD)</li>
                  <li>Derecho de oposición (Art. 21 RGPD)</li>
                  <li>Derecho a retirar el consentimiento en cualquier momento con efecto futuro.</li>
                </ul>
                <div className="mt-4 bg-gray-50 border-l-4 border-asciende-purple p-4 rounded-r-lg">
                  <p className="text-sm">Contáctenos en: agu@asciende.pro. También tiene derecho a presentar una reclamación ante la Berliner Beauftragte für Datenschutz und Informationsfreiheit.</p>
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">9. Seguridad de los Datos</h2>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Cifrado SSL/TLS durante la transmisión de datos.</li>
                  <li>Autenticación segura con contraseña para cuentas de usuario.</li>
                  <li>Acceso restringido a los datos personales.</li>
                  <li>Actualizaciones de seguridad periódicas en nuestros sistemas.</li>
                </ul>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">10. Transferencias Internacionales de Datos</h2>
                <p>Algunos proveedores de servicios están ubicados fuera de la UE. Dichas transferencias se basan en Cláusulas Contractuales Estándar de la UE conforme al Art. 46 RGPD.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">11. Actualizaciones de Esta Política</h2>
                <p>Esta política de privacidad puede actualizarse para reflejar cambios en los requisitos legales o en nuestros servicios. Le recomendamos revisarla periódicamente.</p>
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
