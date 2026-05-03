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

export function CookiePolicy() {
  const [lang, setLang] = useState<Lang>('de');

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <LanguageSelector lang={lang} setLang={setLang} />

        {lang === 'de' && (
          <>
            <h1 className="text-5xl font-krona font-bold text-asciende-purple mb-2 text-center">
              Cookie-Richtlinie
            </h1>
            <p className="text-center text-gray-600 font-jost mb-12">
              Diese Cookie-Richtlinie wurde zuletzt am 19. Juni 2025 aktualisiert und gilt für Bürger und dauerhaft ansässige Personen im Europäischen Wirtschaftsraum und der Schweiz.
            </p>

            <div className="prose prose-lg max-w-none font-jost text-gray-700 space-y-8">
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">1. Einführung</h2>
                <p>
                  Unsere Website, https://base.asciende.pro (nachfolgend: „die Website"), verwendet Cookies und andere verwandte Technologien (der Einfachheit halber werden alle Technologien als „Cookies" bezeichnet). Cookies werden auch von Dritten platziert, die wir beauftragt haben. Im nachfolgenden Dokument informieren wir Sie über die Verwendung von Cookies auf unserer Website.
                </p>
                <p className="mt-4">
                  Die Rechtsgrundlage für die Verarbeitung personenbezogener Daten durch technisch notwendige Cookies ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse). Für alle weiteren Cookies, die eine Einwilligung erfordern, ist die Rechtsgrundlage Art. 6 Abs. 1 lit. a DSGVO.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">2. Was sind Cookies?</h2>
                <p>
                  Ein Cookie ist eine kleine, einfache Datei, die zusammen mit den Seiten dieser Website gesendet und von Ihrem Browser auf der Festplatte Ihres Computers oder eines anderen Geräts gespeichert wird. Die darin gespeicherten Informationen können bei einem späteren Besuch an unsere Server oder die Server der betreffenden Dritten zurückgesendet werden.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">3. Was sind Skripte?</h2>
                <p>
                  Ein Skript ist ein Stück Programmcode, das verwendet wird, damit unsere Website ordnungsgemäß und interaktiv funktioniert. Dieser Code wird auf unserem Server oder auf Ihrem Gerät ausgeführt.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">4. Was ist ein Web Beacon?</h2>
                <p>
                  Ein Web Beacon (oder ein Pixel-Tag) ist ein kleines, unsichtbares Stück Text oder Bild auf einer Website, das zur Überwachung des Datenverkehrs auf einer Website verwendet wird. Um dies zu tun, werden mit Web Beacons verschiedene Daten über Sie gespeichert.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">5. Cookies</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-krona font-bold text-gray-900 mb-2">5.1 Technische oder funktionale Cookies</h3>
                    <p>Einige Cookies stellen sicher, dass bestimmte Teile der Website ordnungsgemäß funktionieren und Ihre Benutzerpräferenzen bekannt bleiben. Durch das Platzieren funktionaler Cookies machen wir es Ihnen leichter, unsere Website zu besuchen. Auf diese Weise müssen Sie bei einem Besuch unserer Website nicht wiederholt dieselben Informationen eingeben. Diese Cookies können wir ohne Ihre Einwilligung platzieren (§ 25 Abs. 2 TTDSG).</p>
                  </div>
                  <div>
                    <h3 className="font-krona font-bold text-gray-900 mb-2">5.2 Statistik-Cookies</h3>
                    <p>Wir verwenden Statistik-Cookies, um das Website-Erlebnis für unsere Nutzer zu optimieren. Mit diesen Statistik-Cookies erhalten wir Einblicke in die Nutzung unserer Website. Wir bitten um Ihre Einwilligung, Statistik-Cookies zu platzieren. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TTDSG.</p>
                  </div>
                  <div>
                    <h3 className="font-krona font-bold text-gray-900 mb-2">5.3 Marketing-/Tracking-Cookies</h3>
                    <p>Marketing-/Tracking-Cookies sind Cookies oder andere Formen der lokalen Speicherung, die verwendet werden, um Nutzerprofile zu erstellen, Werbung anzuzeigen oder den Nutzer auf dieser Website oder über mehrere Websites hinweg für ähnliche Marketingzwecke zu verfolgen. Rechtsgrundlage: Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TTDSG.</p>
                  </div>
                  <div>
                    <h3 className="font-krona font-bold text-gray-900 mb-2">5.4 Social Media</h3>
                    <p>Auf unserer Website haben wir Inhalte von Facebook, Instagram und LinkedIn eingebunden, um Webseiten zu bewerben (z. B. „Gefällt mir", „Anheften") oder in sozialen Netzwerken wie Facebook, Instagram und LinkedIn zu teilen (z. B. „Tweeten"). Diese Inhalte sind mit Code eingebettet, der von Facebook, Instagram und LinkedIn stammt und Cookies setzt. Diese Inhalte können bestimmte Informationen für personalisierte Werbung speichern und verarbeiten.</p>
                    <p className="mt-2">Bitte lesen Sie die Datenschutzerklärungen dieser sozialen Netzwerke (die sich regelmäßig ändern können), um zu erfahren, was sie mit Ihren (persönlichen) Daten machen, die sie mithilfe dieser Cookies verarbeiten. Facebook, Instagram und LinkedIn haben ihren Sitz in den USA. Datenübertragungen in die USA erfolgen auf Basis der EU-Standardvertragsklauseln (Art. 46 Abs. 2 lit. c DSGVO).</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">6. Platzierte Cookies</h2>
                <div className="space-y-2 text-sm">
                  {[
                    ['Supabase', 'Funktional (Authentifizierung, Datenbankabfragen)'],
                    ['Stripe', 'Funktional (Zahlungsabwicklung)'],
                    ['Google Fonts', 'Marketing'],
                    ['YouTube', 'Marketing'],
                    ['Facebook', 'Marketing, Funktional'],
                    ['LinkedIn', 'Funktional, Marketing, Statistik, Präferenzen'],
                    ['Google Analytics', 'Statistik'],
                    ['Google reCAPTCHA', 'Zweck wird noch untersucht'],
                    ['Vimeo', 'Zweck wird noch untersucht'],
                    ['Verschiedenes', 'Statistik'],
                  ].map(([name, purpose]) => (
                    <div key={name} className="flex justify-between items-center py-1 border-b border-gray-200">
                      <span className="font-semibold">{name}</span>
                      <span className="text-gray-600">{purpose}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">7. Einwilligung</h2>
                <p>
                  Wenn Sie unsere Website zum ersten Mal besuchen, zeigen wir Ihnen ein Pop-up mit einer Erklärung zu Cookies. Sobald Sie auf „Einstellungen speichern" klicken, erteilen Sie uns Ihre Einwilligung, die von Ihnen ausgewählten Kategorien von Cookies und Plug-ins zu verwenden, wie in dieser Cookie-Richtlinie beschrieben. Sie können die Verwendung von Cookies über Ihren Browser deaktivieren, beachten Sie jedoch bitte, dass unsere Website dann möglicherweise nicht mehr ordnungsgemäß funktioniert. Ihre Einwilligung können Sie jederzeit widerrufen (Art. 7 Abs. 3 DSGVO).
                </p>
                <div className="mt-4 space-y-2">
                  <h3 className="font-krona font-bold text-gray-900">7.1 Ihre Einwilligungseinstellungen verwalten</h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Funktional</strong> – Immer aktiv (§ 25 Abs. 2 TTDSG)</p>
                    <p><strong>Statistik</strong> – Einwilligung erforderlich</p>
                    <p><strong>Marketing</strong> – Einwilligung erforderlich</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">8. Aktivieren/Deaktivieren und Löschen von Cookies</h2>
                <p>
                  Sie können Ihren Internetbrowser verwenden, um Cookies automatisch oder manuell zu löschen. Sie können auch angeben, dass bestimmte Cookies nicht platziert werden dürfen. Eine weitere Möglichkeit besteht darin, die Einstellungen Ihres Internetbrowsers so zu ändern, dass Sie jedes Mal eine Nachricht erhalten, wenn ein Cookie gesetzt wird. Weitere Informationen zu diesen Optionen finden Sie in den Anweisungen im Hilfebereich Ihres Browsers.
                </p>
                <p className="mt-4">
                  Bitte beachten Sie, dass unsere Website möglicherweise nicht ordnungsgemäß funktioniert, wenn alle Cookies deaktiviert sind. Wenn Sie die Cookies in Ihrem Browser löschen, werden sie nach Ihrer Einwilligung erneut platziert, wenn Sie unsere Website erneut besuchen.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">9. Ihre Rechte in Bezug auf personenbezogene Daten</h2>
                <p>Sie haben folgende Rechte in Bezug auf Ihre personenbezogenen Daten:</p>
                <ul className="list-disc list-inside space-y-2 mt-4">
                  <li>Sie haben das Recht zu erfahren, warum Ihre personenbezogenen Daten benötigt werden, was damit geschieht und wie lange sie aufbewahrt werden (Art. 13, 14 DSGVO).</li>
                  <li><strong>Auskunftsrecht (Art. 15 DSGVO):</strong> Sie haben das Recht, auf Ihre uns bekannten personenbezogenen Daten zuzugreifen.</li>
                  <li><strong>Recht auf Berichtigung (Art. 16 DSGVO):</strong> Sie haben das Recht, Ihre personenbezogenen Daten jederzeit zu ergänzen, zu korrigieren, löschen oder sperren zu lassen.</li>
                  <li>Wenn Sie uns Ihre Einwilligung zur Verarbeitung Ihrer Daten erteilen, haben Sie das Recht, diese Einwilligung zu widerrufen und Ihre personenbezogenen Daten löschen zu lassen (Art. 7 Abs. 3, Art. 17 DSGVO).</li>
                  <li><strong>Recht auf Datenübertragbarkeit (Art. 20 DSGVO):</strong> Sie haben das Recht, alle Ihre personenbezogenen Daten beim Verantwortlichen anzufordern und vollständig an einen anderen Verantwortlichen zu übertragen.</li>
                  <li><strong>Widerspruchsrecht (Art. 21 DSGVO):</strong> Sie können der Verarbeitung Ihrer Daten widersprechen. Wir kommen dem nach, sofern keine berechtigten Gründe für die Verarbeitung vorliegen.</li>
                  <li><strong>Beschwerderecht (Art. 77 DSGVO):</strong> Sie haben das Recht, eine Beschwerde bei der Berliner Beauftragten für Datenschutz und Informationsfreiheit einzureichen.</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">10. Kontaktdaten</h2>
                <p>
                  Für Fragen und/oder Kommentare zu unserer Cookie-Richtlinie und dieser Erklärung wenden Sie sich bitte unter Verwendung der folgenden Kontaktdaten an uns:
                </p>
                <div className="mt-4 space-y-1 text-sm">
                  <p><strong>Agustín Hernández</strong></p>
                  <p>Cornelius Fredericks Str. 15, 13351, Berlin</p>
                  <p>Deutschland</p>
                  <p>Website: <a href="https://base.asciende.pro" className="text-asciende-purple hover:underline">https://base.asciende.pro</a></p>
                  <p>E-Mail: <a href="mailto:agu@asciende.pro" className="text-asciende-purple hover:underline">agu@asciende.pro</a></p>
                  <p>Telefon: <a href="tel:+4917622973233" className="text-asciende-purple hover:underline">+49 176 2297 3233</a></p>
                </div>
                <p className="mt-6 text-sm text-gray-600">
                  Diese Cookie-Richtlinie wurde am 20. März 2025 mit cookiedatabase.org synchronisiert.
                </p>
              </section>
            </div>
          </>
        )}

        {lang === 'en' && (
          <>
            <h1 className="text-5xl font-krona font-bold text-asciende-purple mb-2 text-center">
              Cookie Policy
            </h1>
            <p className="text-center text-gray-600 font-jost mb-12">
              This Cookie Policy was last updated on June 19, 2025 and applies to citizens and legal permanent residents of the European Economic Area and Switzerland.
            </p>

            <div className="prose prose-lg max-w-none font-jost text-gray-700 space-y-8">
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">1. Introduction</h2>
                <p>
                  Our website, https://base.asciende.pro (hereinafter: "the website") uses cookies and other related technologies (for convenience all technologies are referred to as "cookies"). Cookies are also placed by third parties we have engaged. In the document below we inform you about the use of cookies on our website.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">2. What are Cookies?</h2>
                <p>
                  A cookie is a small simple file that is sent along with pages of this website and stored by your browser on the hard drive of your computer or another device. The information stored therein may be returned to our servers or to the servers of the relevant third parties during a subsequent visit.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">3. What are Scripts?</h2>
                <p>
                  A script is a piece of program code that is used to make our website function properly and interactively. This code is executed on our server or on your device.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">4. What is a Web Beacon?</h2>
                <p>
                  A web beacon (or a pixel tag) is a small, invisible piece of text or image on a website that is used to monitor traffic on a website. In order to do this, various data about you is stored using web beacons.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">5. Cookies</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-krona font-bold text-gray-900 mb-2">5.1 Technical or Functional Cookies</h3>
                    <p>Some cookies ensure that certain parts of the website work properly and that your user preferences remain known. By placing functional cookies, we make it easier for you to visit our website. We may place these cookies without your consent.</p>
                  </div>
                  <div>
                    <h3 className="font-krona font-bold text-gray-900 mb-2">5.2 Statistics Cookies</h3>
                    <p>We use statistics cookies to optimize the website experience for our users. With these statistics cookies we get insights in the usage of our website. We ask your permission to place statistics cookies.</p>
                  </div>
                  <div>
                    <h3 className="font-krona font-bold text-gray-900 mb-2">5.3 Marketing/Tracking Cookies</h3>
                    <p>Marketing/Tracking cookies are cookies or any other form of local storage, used to create user profiles to display advertising or to track the user on this website or across several websites for similar marketing purposes.</p>
                  </div>
                  <div>
                    <h3 className="font-krona font-bold text-gray-900 mb-2">5.4 Social Media</h3>
                    <p>On our website, we have included content from Facebook, Instagram and LinkedIn to promote web pages (e.g. "like", "pin") or share (e.g. "tweet") on social networks like Facebook, Instagram and LinkedIn. This content is embedded with code derived from Facebook, Instagram and LinkedIn and places cookies. This content might store and process certain information for personalized advertising.</p>
                    <p className="mt-2">Please read the privacy statement of these social networks (which can change regularly) to read what they do with your (personal) data which they process using these cookies. The data that is retrieved is anonymized as much as possible. Facebook, Instagram and LinkedIn are located in the United States. Data transfers to the US are carried out on the basis of EU Standard Contractual Clauses (Art. 46(2)(c) GDPR).</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">6. Placed Cookies</h2>
                <div className="space-y-2 text-sm">
                  {[
                    ['Supabase', 'Functional (authentication, database queries)'],
                    ['Stripe', 'Functional (payment processing)'],
                    ['Google Fonts', 'Marketing'],
                    ['YouTube', 'Marketing'],
                    ['Facebook', 'Marketing, Functional'],
                    ['LinkedIn', 'Functional, Marketing, Statistics, Preferences'],
                    ['Google Analytics', 'Statistics'],
                    ['Google reCAPTCHA', 'Purpose pending investigation'],
                    ['Vimeo', 'Purpose pending investigation'],
                    ['Miscellaneous', 'Statistics'],
                  ].map(([name, purpose]) => (
                    <div key={name} className="flex justify-between items-center py-1 border-b border-gray-200">
                      <span className="font-semibold">{name}</span>
                      <span className="text-gray-600">{purpose}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">7. Consent</h2>
                <p>
                  When you visit our website for the first time, we will show you a pop-up with an explanation about cookies. As soon as you click on "Save preferences", you consent to us using the categories of cookies and plug-ins you selected in the pop-up, as described in this Cookie Policy. You can disable the use of cookies via your browser, but please note that our website may no longer work properly.
                </p>
                <div className="mt-4 space-y-2">
                  <h3 className="font-krona font-bold text-gray-900">7.1 Manage Your Consent Settings</h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Functional</strong> - Always active</p>
                    <p><strong>Statistics</strong></p>
                    <p><strong>Marketing</strong></p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">8. Enabling/Disabling and Deleting Cookies</h2>
                <p>
                  You can use your internet browser to automatically or manually delete cookies. You can also specify that certain cookies may not be placed. Another option is to change the settings of your internet browser so that you receive a message each time a cookie is placed. For more information about these options, please refer to the instructions in the Help section of your browser.
                </p>
                <p className="mt-4">
                  Please note that our website may not work properly if all cookies are disabled. If you do delete the cookies in your browser, they will be placed again after your consent when you visit our website again.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">9. Your Rights with Respect to Personal Data</h2>
                <p>You have the following rights with respect to your personal data:</p>
                <ul className="list-disc list-inside space-y-2 mt-4">
                  <li>You have the right to know why your personal data is needed, what will happen to it, and how long it will be retained for.</li>
                  <li><strong>Right of access:</strong> You have the right to access your personal data that is known to us.</li>
                  <li><strong>Right to rectification:</strong> You have the right to supplement, correct, have deleted or blocked your personal data whenever you wish.</li>
                  <li>If you give us your consent to process your data, you have the right to revoke that consent and to have your personal data deleted.</li>
                  <li><strong>Right to transfer your data:</strong> You have the right to request all your personal data from the controller and transfer it in its entirety to another controller.</li>
                  <li><strong>Right to object:</strong> You may object to the processing of your data. We comply with this, unless there are justified grounds for processing.</li>
                  <li><strong>Right to lodge a complaint:</strong> You have the right to submit a complaint to the supervisory authority (the Data Protection Authority).</li>
                </ul>
                <p className="mt-4">
                  To exercise these rights, please contact us. Please refer to the contact details at the bottom of this Cookie Policy. If you have a complaint about how we handle your data, we would like to hear from you, but you also have the right to submit a complaint to the supervisory authority (the Data Protection Authority).
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">10. Contact Details</h2>
                <p>
                  For questions and/or comments about our Cookie Policy and this statement, please contact us by using the following contact details:
                </p>
                <div className="mt-4 space-y-1 text-sm">
                  <p><strong>Agustín Hernández</strong></p>
                  <p>Cornelius Fredericks Str. 15, 13351, Berlin</p>
                  <p>Germany</p>
                  <p>Website: <a href="https://base.asciende.pro" className="text-asciende-purple hover:underline">https://base.asciende.pro</a></p>
                  <p>Email: <a href="mailto:agu@asciende.pro" className="text-asciende-purple hover:underline">agu@asciende.pro</a></p>
                  <p>Phone number: <a href="tel:+4917622973233" className="text-asciende-purple hover:underline">+49 176 2297 3233</a></p>
                </div>
                <p className="mt-6 text-sm text-gray-600">
                  This Cookie Policy was synchronized with cookiedatabase.org on March 20, 2025.
                </p>
              </section>
            </div>
          </>
        )}

        {lang === 'es' && (
          <>
            <h1 className="text-5xl font-krona font-bold text-asciende-purple mb-2 text-center">
              Política de Cookies
            </h1>
            <p className="text-center text-gray-600 font-jost mb-12">
              Esta Política de Cookies fue actualizada por última vez el 19 de junio de 2025 y se aplica a ciudadanos y residentes permanentes del Espacio Económico Europeo y Suiza.
            </p>

            <div className="prose prose-lg max-w-none font-jost text-gray-700 space-y-8">
              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">1. Introducción</h2>
                <p>
                  Nuestro sitio web, https://base.asciende.pro (en adelante: "el sitio web") utiliza cookies y otras tecnologías relacionadas (por conveniencia, todas las tecnologías se denominan "cookies"). Las cookies también son colocadas por terceros que hemos contratado. En el documento a continuación le informamos sobre el uso de cookies en nuestro sitio web.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">2. ¿Qué son las Cookies?</h2>
                <p>
                  Una cookie es un pequeño archivo simple que se envía junto con las páginas de este sitio web y que su navegador almacena en el disco duro de su computadora u otro dispositivo. La información almacenada en ella puede devolverse a nuestros servidores o a los servidores de terceros relevantes durante una visita posterior.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">3. ¿Qué son los Scripts?</h2>
                <p>
                  Un script es un fragmento de código de programa que se utiliza para que nuestro sitio web funcione correctamente e interactivamente. Este código se ejecuta en nuestro servidor o en su dispositivo.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">4. ¿Qué es un Web Beacon?</h2>
                <p>
                  Un web beacon (o etiqueta de píxel) es un pequeño e invisible fragmento de texto o imagen en un sitio web que se utiliza para monitorear el tráfico en un sitio web. Para hacer esto, se almacenan varios datos sobre usted mediante web beacons.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">5. Cookies</h2>
                <div className="space-y-4">
                  <div>
                    <h3 className="font-krona font-bold text-gray-900 mb-2">5.1 Cookies Técnicas o Funcionales</h3>
                    <p>Algunas cookies garantizan que ciertas partes del sitio web funcionen correctamente y que sus preferencias de usuario se mantengan conocidas. Al colocar cookies funcionales, le facilitamos la visita a nuestro sitio web. Podemos colocar estas cookies sin su consentimiento.</p>
                  </div>
                  <div>
                    <h3 className="font-krona font-bold text-gray-900 mb-2">5.2 Cookies de Estadísticas</h3>
                    <p>Utilizamos cookies de estadísticas para optimizar la experiencia del sitio web para nuestros usuarios. Con estas cookies de estadísticas obtenemos información sobre el uso de nuestro sitio web. Le pedimos su permiso para colocar cookies de estadísticas.</p>
                  </div>
                  <div>
                    <h3 className="font-krona font-bold text-gray-900 mb-2">5.3 Cookies de Marketing/Seguimiento</h3>
                    <p>Las cookies de marketing/seguimiento son cookies u otras formas de almacenamiento local, utilizadas para crear perfiles de usuario para mostrar publicidad o rastrear al usuario en este sitio web o en varios sitios web con fines de marketing similares.</p>
                  </div>
                  <div>
                    <h3 className="font-krona font-bold text-gray-900 mb-2">5.4 Redes Sociales</h3>
                    <p>En nuestro sitio web, hemos incluido contenido de Facebook, Instagram y LinkedIn para promocionar páginas web (por ejemplo, "me gusta", "fijar") o compartir (por ejemplo, "tuitear") en redes sociales como Facebook, Instagram y LinkedIn. Este contenido está integrado con código derivado de Facebook, Instagram y LinkedIn y coloca cookies. Este contenido podría almacenar y procesar cierta información para publicidad personalizada.</p>
                    <p className="mt-2">Por favor, lea la declaración de privacidad de estas redes sociales (que pueden cambiar regularmente) para saber qué hacen con sus datos (personales) que procesan utilizando estas cookies. Facebook, Instagram y LinkedIn están ubicados en los Estados Unidos. Las transferencias de datos a EE. UU. se realizan sobre la base de las Cláusulas Contractuales Estándar de la UE.</p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">6. Cookies Colocadas</h2>
                <div className="space-y-2 text-sm">
                  {[
                    ['Supabase', 'Funcional (autenticación, consultas de base de datos)'],
                    ['Stripe', 'Funcional (procesamiento de pagos)'],
                    ['Google Fonts', 'Marketing'],
                    ['YouTube', 'Marketing'],
                    ['Facebook', 'Marketing, Funcional'],
                    ['LinkedIn', 'Funcional, Marketing, Estadísticas, Preferencias'],
                    ['Google Analytics', 'Estadísticas'],
                    ['Google reCAPTCHA', 'Propósito pendiente de investigación'],
                    ['Vimeo', 'Propósito pendiente de investigación'],
                    ['Varios', 'Estadísticas'],
                  ].map(([name, purpose]) => (
                    <div key={name} className="flex justify-between items-center py-1 border-b border-gray-200">
                      <span className="font-semibold">{name}</span>
                      <span className="text-gray-600">{purpose}</span>
                    </div>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">7. Consentimiento</h2>
                <p>
                  Cuando visita nuestro sitio web por primera vez, le mostraremos una ventana emergente con una explicación sobre las cookies. Tan pronto como haga clic en "Guardar preferencias", nos da su consentimiento para usar las categorías de cookies y complementos que seleccionó en la ventana emergente, como se describe en esta Política de Cookies. Puede deshabilitar el uso de cookies a través de su navegador, pero tenga en cuenta que es posible que nuestro sitio web ya no funcione correctamente.
                </p>
                <div className="mt-4 space-y-2">
                  <h3 className="font-krona font-bold text-gray-900">7.1 Administre su Configuración de Consentimiento</h3>
                  <div className="space-y-1 text-sm">
                    <p><strong>Funcional</strong> - Siempre activo</p>
                    <p><strong>Estadísticas</strong></p>
                    <p><strong>Marketing</strong></p>
                  </div>
                </div>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">8. Activar/Desactivar y Eliminar Cookies</h2>
                <p>
                  Puede usar su navegador de Internet para eliminar cookies automáticamente o manualmente. También puede especificar que ciertas cookies no deben colocarse. Otra opción es cambiar la configuración de su navegador de Internet para que reciba un mensaje cada vez que se coloca una cookie. Para obtener más información sobre estas opciones, consulte las instrucciones en la sección de Ayuda de su navegador.
                </p>
                <p className="mt-4">
                  Tenga en cuenta que es posible que nuestro sitio web no funcione correctamente si todas las cookies están deshabilitadas. Si elimina las cookies en su navegador, se colocarán nuevamente después de su consentimiento cuando vuelva a visitar nuestro sitio web.
                </p>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">9. Sus Derechos con Respecto a los Datos Personales</h2>
                <p>Tiene los siguientes derechos con respecto a sus datos personales:</p>
                <ul className="list-disc list-inside space-y-2 mt-4">
                  <li>Tiene derecho a saber por qué se necesitan sus datos personales, qué pasará con ellos y durante cuánto tiempo se conservarán.</li>
                  <li><strong>Derecho de acceso:</strong> Tiene derecho a acceder a sus datos personales que nos son conocidos.</li>
                  <li><strong>Derecho de rectificación:</strong> Tiene derecho a complementar, corregir, eliminar o bloquear sus datos personales cuando lo desee.</li>
                  <li>Si nos da su consentimiento para procesar sus datos, tiene derecho a revocar ese consentimiento y a que sus datos personales sean eliminados.</li>
                  <li><strong>Derecho a la portabilidad de sus datos:</strong> Tiene derecho a solicitar todos sus datos personales al responsable del tratamiento y transferirlos en su totalidad a otro responsable del tratamiento.</li>
                  <li><strong>Derecho de oposición:</strong> Puede oponerse al procesamiento de sus datos. Cumplimos con esto, a menos que haya motivos justificados para el procesamiento.</li>
                  <li><strong>Derecho a presentar una queja:</strong> Tiene derecho a presentar una queja ante la autoridad supervisora (la Autoridad de Protección de Datos).</li>
                </ul>
              </section>

              <section>
                <h2 className="text-2xl font-krona font-bold text-asciende-purple mb-4">10. Datos de Contacto</h2>
                <p>
                  Para preguntas y/o comentarios sobre nuestra Política de Cookies y esta declaración, contáctenos utilizando los siguientes datos de contacto:
                </p>
                <div className="mt-4 space-y-1 text-sm">
                  <p><strong>Agustín Hernández</strong></p>
                  <p>Cornelius Fredericks Str. 15, 13351, Berlín</p>
                  <p>Alemania</p>
                  <p>Sitio web: <a href="https://base.asciende.pro" className="text-asciende-purple hover:underline">https://base.asciende.pro</a></p>
                  <p>Correo electrónico: <a href="mailto:agu@asciende.pro" className="text-asciende-purple hover:underline">agu@asciende.pro</a></p>
                  <p>Teléfono: <a href="tel:+4917622973233" className="text-asciende-purple hover:underline">+49 176 2297 3233</a></p>
                </div>
                <p className="mt-6 text-sm text-gray-600">
                  Esta Política de Cookies fue sincronizada con cookiedatabase.org el 20 de marzo de 2025.
                </p>
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
