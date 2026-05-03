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

export function Impressum() {
  const [lang, setLang] = useState<Lang>('de');

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <LanguageSelector lang={lang} setLang={setLang} />

        {lang === 'de' && (
          <>
            <h1 className="text-5xl font-krona font-bold text-asciende-purple mb-12 text-center">Impressum</h1>
            <div className="prose prose-lg max-w-none font-jost text-gray-700 space-y-8">
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">Angaben gemäß § 5 TMG</h2>
                <div className="pl-4 border-l-4 border-asciende-purple/30 space-y-2">
                  <p><strong>Name:</strong> Agustín Hernández</p>
                  <p><strong>Anschrift:</strong> Cornelius Fredericks Str. 15, 13351, Berlin</p>
                  <p><strong>E-Mail:</strong> agu@asciende.pro</p>
                  <p><strong>Telefon:</strong> +49 176 2297 3233</p>
                  <p><strong>Berufsbezeichnung:</strong> Sportwissenschaftler</p>
                  <p><strong>Rechtsform:</strong> Freiberufler (Kleinunternehmer gemäß § 19 UStG)</p>
                  <p><strong>Steuernummer:</strong> 35/342/02661</p>
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV</h2>
                <div className="pl-4 border-l-4 border-asciende-purple/30">
                  <p>Agustín Hernández, Cornelius Fredericks Str. 15, 13351, Berlin</p>
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">Haftung für Inhalte</h2>
                <p>Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">Haftung für Links</h2>
                <p>Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">Urheberrecht</h2>
                <p>Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">Streitschlichtung (ODR-Plattform)</h2>
                <p>Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit: <a href="https://ec.europa.eu/consumers/odr" className="text-asciende-purple hover:underline" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">Berufsrechtliche Angaben</h2>
                <p>Berufsbezeichnung: Sportwissenschaftler. Die Berufsbezeichnung wurde in Argentinien verliehen. Es gelten die allgemeinen berufsrechtlichen Regelungen.</p>
              </section>
            </div>
          </>
        )}

        {lang === 'en' && (
          <>
            <h1 className="text-5xl font-krona font-bold text-asciende-purple mb-12 text-center">Imprint</h1>
            <div className="prose prose-lg max-w-none font-jost text-gray-700 space-y-8">
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">Website Owner Information (According to § 5 TMG)</h2>
                <div className="pl-4 border-l-4 border-asciende-purple/30 space-y-2">
                  <p><strong>Name:</strong> Agustín Hernández</p>
                  <p><strong>Address:</strong> Cornelius Fredericks Str. 15, 13351, Berlin</p>
                  <p><strong>Email:</strong> agu@asciende.pro</p>
                  <p><strong>Phone:</strong> +49 176 2297 3233</p>
                  <p><strong>Professional Title:</strong> Sports Scientist</p>
                  <p><strong>Legal Form:</strong> Freelancer (Small Business according to § 19 UStG)</p>
                  <p><strong>Tax Number:</strong> 35/342/02661</p>
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">Responsible for Content according to § 55 Abs. 2 RStV</h2>
                <div className="pl-4 border-l-4 border-asciende-purple/30">
                  <p>Agustín Hernández, Cornelius Fredericks Str. 15, 13351, Berlin</p>
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">Liability for Content</h2>
                <p>As a service provider, we are responsible for our own content on these pages according to § 7 Abs.1 TMG under general laws. According to §§ 8 to 10 TMG, however, we are not obliged to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity. Obligations to remove or block the use of information under general laws remain unaffected. However, liability for content is only possible from the moment we become aware of a specific legal violation. Once we become aware of such violations, we will remove the content immediately.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">Liability for Links</h2>
                <p>Our website contains links to external third-party websites, over whose content we have no influence. Therefore, we cannot assume any responsibility for these external contents. The respective provider or operator of the linked pages is always responsible for the content of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal content was not recognizable at the time of linking. Upon becoming aware of legal violations, we will remove such links immediately.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">Copyright</h2>
                <p>The content and works created by the site operators on these pages are subject to German copyright law. The reproduction, editing, distribution, and any kind of exploitation beyond the limits of copyright require the written consent of the respective author or creator. Downloads and copies of this page are only permitted for private, non-commercial use.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">Dispute Resolution (ODR Platform)</h2>
                <p>The European Commission provides a platform for online dispute resolution (OS): <a href="https://ec.europa.eu/consumers/odr" className="text-asciende-purple hover:underline" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>. We are not willing or obligated to participate in dispute resolution proceedings before a consumer arbitration board.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">Professional Information</h2>
                <p>Professional title: Sports Scientist. The professional title was awarded in Argentina. General professional regulations apply.</p>
              </section>
            </div>
          </>
        )}

        {lang === 'es' && (
          <>
            <h1 className="text-5xl font-krona font-bold text-asciende-purple mb-12 text-center">Aviso Legal</h1>
            <div className="prose prose-lg max-w-none font-jost text-gray-700 space-y-8">
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">Datos del Responsable (conforme § 5 TMG)</h2>
                <div className="pl-4 border-l-4 border-asciende-purple/30 space-y-2">
                  <p><strong>Nombre:</strong> Agustín Hernández</p>
                  <p><strong>Dirección:</strong> Cornelius Fredericks Str. 15, 13351, Berlín</p>
                  <p><strong>Correo electrónico:</strong> agu@asciende.pro</p>
                  <p><strong>Teléfono:</strong> +49 176 2297 3233</p>
                  <p><strong>Título profesional:</strong> Científico del Deporte</p>
                  <p><strong>Forma jurídica:</strong> Autónomo (pequeño empresario según § 19 UStG)</p>
                  <p><strong>Número fiscal:</strong> 35/342/02661</p>
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">Responsable del contenido según § 55 párr. 2 RStV</h2>
                <div className="pl-4 border-l-4 border-asciende-purple/30">
                  <p>Agustín Hernández, Cornelius Fredericks Str. 15, 13351, Berlín</p>
                </div>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">Responsabilidad por el contenido</h2>
                <p>Como proveedor de servicios, somos responsables de nuestro propio contenido en estas páginas conforme al § 7 párr. 1 TMG según las leyes generales. Sin embargo, según los §§ 8 a 10 TMG, no estamos obligados a supervisar la información transmitida o almacenada de terceros ni a investigar circunstancias que indiquen actividad ilegal. Las obligaciones de eliminar o bloquear el uso de información conforme a las leyes generales permanecen sin cambios. La responsabilidad por el contenido solo es posible a partir del momento en que tengamos conocimiento de una violación legal específica. Una vez informados, eliminaremos el contenido de inmediato.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">Responsabilidad por enlaces</h2>
                <p>Nuestro sitio web contiene enlaces a sitios web externos de terceros sobre cuyo contenido no tenemos influencia. Por lo tanto, no podemos asumir ninguna responsabilidad por estos contenidos externos. El proveedor u operador respectivo de las páginas enlazadas es siempre responsable del contenido de las páginas enlazadas. Las páginas enlazadas fueron verificadas en busca de posibles infracciones legales en el momento del enlace. Al tomar conocimiento de infracciones legales, eliminaremos dichos enlaces de inmediato.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">Derechos de autor</h2>
                <p>El contenido y las obras creadas por los operadores del sitio en estas páginas están sujetos a la ley alemana de derechos de autor. La reproducción, edición, distribución y cualquier tipo de explotación más allá de los límites de los derechos de autor requieren el consentimiento escrito del autor o creador respectivo. Las descargas y copias de esta página solo están permitidas para uso privado y no comercial.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">Resolución de litigios (Plataforma ODR)</h2>
                <p>La Comisión Europea proporciona una plataforma para la resolución de litigios en línea (OS): <a href="https://ec.europa.eu/consumers/odr" className="text-asciende-purple hover:underline" target="_blank" rel="noopener noreferrer">https://ec.europa.eu/consumers/odr</a>. No estamos dispuestos ni obligados a participar en procedimientos de resolución de disputas ante una junta de arbitraje de consumidores.</p>
              </section>
              <section>
                <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">Información profesional</h2>
                <p>Título profesional: Científico del Deporte. El título profesional fue otorgado en Argentina. Se aplican las regulaciones profesionales generales.</p>
              </section>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
