import { useState } from 'react';

type Language = 'en' | 'es' | 'de';

const translations = {
  en: {
    title: 'Delete Your Account – Asciende Hub',
    intro: 'At Asciende Hub, we respect your privacy and your right to control your personal data.',
    subtitle: 'If you wish to delete your account and associated personal data, you may do so at any time using one of the following methods:',

    method1Title: '1. Deleting your account within the app',
    method1Step1: 'Open the Asciende Hub app',
    method1Step2: 'Navigate to Settings',
    method1Step3: 'Select Delete Account',
    method1Step4: 'Confirm your request',

    method2Title: '2. Requesting account deletion externally',
    method2Text: 'You may also request deletion by contacting us at:',
    method2Note: 'Please include your account email address and the subject line "Account Deletion Request".',

    dataDeletedTitle: 'What data will be deleted',
    dataDeletedIntro: 'Upon deletion, the following personal data will be permanently removed:',
    dataDeletedItem1: 'Account information (name, email address, login credentials)',
    dataDeletedItem2: 'Training data and performance metrics',
    dataDeletedItem3: 'Nutrition plans and related personal inputs',
    dataDeletedItem4: 'Communication history within the platform',

    retentionTitle: 'Data retention and exceptions',
    retentionItem1: 'Backup copies of your data may be retained for up to 30 days for security and recovery purposes before permanent deletion',
    retentionItem2: 'Certain data may be retained in an anonymized form for statistical and analytical purposes',
    retentionItem3: 'We may retain limited data where required to comply with legal obligations (e.g., tax, fraud prevention, or regulatory compliance)',

    processingTitle: 'Processing time',
    processingText: 'Account deletion requests are processed within 30 days, in accordance with applicable data protection laws.',

    gdprTitle: 'Your rights under GDPR',
    gdprText: 'If you are located in the European Economic Area (EEA), you have the right to:',
    gdprItem1: 'Request access to your personal data',
    gdprItem2: 'Request rectification or erasure of your data',
    gdprItem3: 'Restrict or object to processing',
    gdprItem4: 'Request data portability',
    gdprNote: 'For more information, please refer to our Privacy Policy.',

    contactTitle: 'Contact',
    contactText: 'If you have any questions regarding your data or this process, contact us at:',

    footer: 'Asciende Hub',
    footerUrl: 'Asciende.pro',
  },
  es: {
    title: 'Eliminar tu cuenta – Asciende Hub',
    intro: 'En Asciende Hub, respetamos tu privacidad y tu derecho a controlar tus datos personales.',
    subtitle: 'Si deseas eliminar tu cuenta y los datos personales asociados, puedes hacerlo en cualquier momento utilizando uno de los siguientes métodos:',

    method1Title: '1. Eliminar tu cuenta dentro de la app',
    method1Step1: 'Abre la app Asciende Hub',
    method1Step2: 'Ve a Configuración',
    method1Step3: 'Selecciona Eliminar cuenta',
    method1Step4: 'Confirma tu solicitud',

    method2Title: '2. Solicitar eliminación de cuenta externamente',
    method2Text: 'También puedes solicitar la eliminación contactándonos en:',
    method2Note: 'Por favor, incluye tu correo de cuenta y la línea de asunto "Account Deletion Request".',

    dataDeletedTitle: 'Qué datos serán eliminados',
    dataDeletedIntro: 'Tras la eliminación, los siguientes datos personales se eliminarán permanentemente:',
    dataDeletedItem1: 'Información de cuenta (nombre, correo electrónico, credenciales de acceso)',
    dataDeletedItem2: 'Datos de entrenamiento y métricas de rendimiento',
    dataDeletedItem3: 'Planes de nutrición e inputs personales relacionados',
    dataDeletedItem4: 'Historial de comunicación dentro de la plataforma',

    retentionTitle: 'Retención de datos y excepciones',
    retentionItem1: 'Las copias de seguridad de tus datos pueden retenerse hasta 30 días para fines de seguridad y recuperación antes de su eliminación permanente',
    retentionItem2: 'Ciertos datos pueden retenerse en forma anonimizada para fines estadísticos y analíticos',
    retentionItem3: 'Podemos retener datos limitados cuando sea requerido por ley (p. ej., impuestos, prevención de fraude o cumplimiento normativo)',

    processingTitle: 'Tiempo de procesamiento',
    processingText: 'Las solicitudes de eliminación de cuenta se procesan dentro de 30 días, de conformidad con las leyes de protección de datos aplicables.',

    gdprTitle: 'Tus derechos bajo GDPR',
    gdprText: 'Si te encuentras en el Área Económica Europea (EEE), tienes el derecho a:',
    gdprItem1: 'Solicitar acceso a tus datos personales',
    gdprItem2: 'Solicitar la rectificación o eliminación de tus datos',
    gdprItem3: 'Restringir u objetar el procesamiento',
    gdprItem4: 'Solicitar la portabilidad de datos',
    gdprNote: 'Para más información, consulta nuestra Política de Privacidad.',

    contactTitle: 'Contacto',
    contactText: 'Si tienes preguntas sobre tus datos o este proceso, contáctanos en:',

    footer: 'Asciende Hub',
    footerUrl: 'Asciende.pro',
  },
  de: {
    title: 'Konto löschen – Asciende Hub',
    intro: 'Bei Asciende Hub respektieren wir deine Privatsphäre und dein Recht, deine persönlichen Daten zu kontrollieren.',
    subtitle: 'Wenn du dein Konto und die zugehörigen persönlichen Daten löschen möchtest, kannst du dies jederzeit mit einer der folgenden Methoden tun:',

    method1Title: '1. Konto innerhalb der App löschen',
    method1Step1: 'Öffne die Asciende Hub App',
    method1Step2: 'Navigiere zu Einstellungen',
    method1Step3: 'Wähle Konto löschen',
    method1Step4: 'Bestätige deine Anfrage',

    method2Title: '2. Kontoelöschung extern anfordern',
    method2Text: 'Du kannst die Löschung auch anfordern, indem du uns kontaktierst unter:',
    method2Note: 'Bitte gib deine Konto-E-Mail an und verwende die Betreffzeile "Account Deletion Request".',

    dataDeletedTitle: 'Welche Daten werden gelöscht',
    dataDeletedIntro: 'Nach der Löschung werden die folgenden persönlichen Daten permanent entfernt:',
    dataDeletedItem1: 'Kontoinformationen (Name, E-Mail-Adresse, Anmeldedaten)',
    dataDeletedItem2: 'Trainingsdaten und Leistungskennzahlen',
    dataDeletedItem3: 'Ernährungspläne und zugehörige persönliche Eingaben',
    dataDeletedItem4: 'Kommunikationsverlauf innerhalb der Plattform',

    retentionTitle: 'Datenspeicherung und Ausnahmen',
    retentionItem1: 'Sicherungskopien deiner Daten können für bis zu 30 Tage zu Sicherungs- und Wiederherstellungszwecken aufbewahrt werden, bevor sie permanent gelöscht werden',
    retentionItem2: 'Bestimmte Daten können in anonymisierter Form für statistische und analytische Zwecke aufbewahrt werden',
    retentionItem3: 'Wir können begrenzte Daten aufbewahren, soweit dies gesetzlich erforderlich ist (z. B. für Steuern, Betrugsprävention oder behördliche Compliance)',

    processingTitle: 'Verarbeitungszeit',
    processingText: 'Kontoelöschanfragen werden innerhalb von 30 Tagen gemäß geltender Datenschutzgesetze bearbeitet.',

    gdprTitle: 'Deine Rechte unter der DSGVO',
    gdprText: 'Wenn du dich im Europäischen Wirtschaftsraum (EWR) befindest, hast du das Recht auf:',
    gdprItem1: 'Zugang zu deinen persönlichen Daten',
    gdprItem2: 'Berichtigung oder Löschung deiner Daten',
    gdprItem3: 'Einschränkung oder Einspruch gegen die Verarbeitung',
    gdprItem4: 'Datenübertragbarkeit',
    gdprNote: 'Weitere Informationen findest du in unserer Datenschutzerklärung.',

    contactTitle: 'Kontakt',
    contactText: 'Wenn du Fragen zu deinen Daten oder diesem Prozess hast, kontaktiere uns unter:',

    footer: 'Asciende Hub',
    footerUrl: 'Asciende.pro',
  },
};

export function DeleteAccount() {
  const [language, setLanguage] = useState<Language>('en');
  const t = translations[language];

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="flex justify-center gap-3 mb-16 mt-8">
          {(['en', 'es', 'de'] as const).map((lang) => (
            <button
              key={lang}
              onClick={() => setLanguage(lang)}
              className={`px-4 py-2 rounded-lg font-semibold transition ${
                language === lang
                  ? 'bg-asciende-purple text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {lang.toUpperCase()}
            </button>
          ))}
        </div>

        <h1 className="text-5xl font-krona font-bold text-gray-900 mb-8 text-center">
          {t.title}
        </h1>

        <div className="prose prose-lg max-w-none font-jost text-gray-700 space-y-8">
          <p className="text-lg text-gray-700">{t.intro}</p>
          <p className="text-lg text-gray-700">{t.subtitle}</p>

          <hr className="my-8" />

          <section>
            <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">{t.method1Title}</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-base">{t.method1Step1}</li>
              <li className="text-base">{t.method1Step2}</li>
              <li className="text-base">{t.method1Step3}</li>
              <li className="text-base">{t.method1Step4}</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">{t.method2Title}</h2>
            <p className="text-base mb-2">{t.method2Text}</p>
            <p className="text-lg font-semibold text-gray-900">
              <a href="mailto:support@asciende.pro" className="text-blue-600 hover:text-blue-700 underline">
                support@asciende.pro
              </a>
            </p>
            <p className="text-sm text-gray-600 mt-3">{t.method2Note}</p>
          </section>

          <hr className="my-8" />

          <section>
            <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">{t.dataDeletedTitle}</h2>
            <p className="text-base mb-4">{t.dataDeletedIntro}</p>
            <ul className="list-disc pl-6 space-y-2">
              <li className="text-base">{t.dataDeletedItem1}</li>
              <li className="text-base">{t.dataDeletedItem2}</li>
              <li className="text-base">{t.dataDeletedItem3}</li>
              <li className="text-base">{t.dataDeletedItem4}</li>
            </ul>
          </section>

          <hr className="my-8" />

          <section>
            <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">{t.retentionTitle}</h2>
            <ul className="list-disc pl-6 space-y-3">
              <li className="text-base">{t.retentionItem1}</li>
              <li className="text-base">{t.retentionItem2}</li>
              <li className="text-base">{t.retentionItem3}</li>
            </ul>
          </section>

          <hr className="my-8" />

          <section>
            <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">{t.processingTitle}</h2>
            <p className="text-base">{t.processingText}</p>
          </section>

          <hr className="my-8" />

          <section>
            <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">{t.gdprTitle}</h2>
            <p className="text-base mb-3">{t.gdprText}</p>
            <ul className="list-disc pl-6 space-y-2 mb-4">
              <li className="text-base">{t.gdprItem1}</li>
              <li className="text-base">{t.gdprItem2}</li>
              <li className="text-base">{t.gdprItem3}</li>
              <li className="text-base">{t.gdprItem4}</li>
            </ul>
            <p className="text-sm text-gray-600">{t.gdprNote}</p>
          </section>

          <hr className="my-8" />

          <section>
            <h2 className="text-2xl font-krona font-bold text-gray-900 mb-4">{t.contactTitle}</h2>
            <p className="text-base mb-2">{t.contactText}</p>
            <p className="text-lg font-semibold text-gray-900">
              <a href="mailto:support@asciende.pro" className="text-blue-600 hover:text-blue-700 underline">
                support@asciende.pro
              </a>
            </p>
          </section>

          <hr className="my-8" />

          <div className="text-center pt-8">
            <p className="text-lg font-semibold text-gray-900">{t.footer}</p>
            <p className="text-base text-gray-600">{t.footerUrl}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
