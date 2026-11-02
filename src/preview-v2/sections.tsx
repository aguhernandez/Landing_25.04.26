import { lazy, Suspense, useState } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { Newsletter } from '../components/Newsletter';
import { PrivacyPolicy } from '../components/PrivacyPolicy';
import { Impressum } from '../components/Impressum';
import { TermsAndConditions } from '../components/TermsAndConditions';
import { CookiePolicy } from '../components/CookiePolicy';
import { RefundPolicy } from '../components/RefundPolicy';
import { Support } from '../components/Support';
import { DeleteAccount } from '../components/DeleteAccount';

type Lang = 'en' | 'es';
const CookieBanner = lazy(() => import('../components/CookieBanner').then(m => ({ default: m.CookieBanner })));
const hasBackend = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY);

export function PreviewCookies() {
  return hasBackend ? <Suspense fallback={null}><CookieBanner /></Suspense> : null;
}

const sceneText: Record<string, [string[], string[]]> = {
  Hub: [['Your performance space', 'TRAINING', 'LEARNING', 'PROJECTS'], ['Tu espacio de rendimiento', 'ENTRENAMIENTO', 'APRENDIZAJE', 'PROYECTOS']],
  Lab: [['Physiological evaluation', 'ASSESSMENT', 'VARIABLES', 'INTERPRETATION'], ['Evaluación fisiológica', 'EVALUACIÓN', 'VARIABLES', 'INTERPRETACIÓN']],
  Motion: [['Movement analysis', 'VIDEO', 'JOINTS', 'ANGLES'], ['Análisis de movimiento', 'VIDEO', 'ARTICULACIONES', 'ÁNGULOS']],
  Performance: [['A performance perspective', 'OBSERVE', 'ANALYZE', 'DEVELOP'], ['Una mirada al rendimiento', 'OBSERVAR', 'ANALIZAR', 'DESARROLLAR']],
  Endurance: [['Training plan', 'STRUCTURE', 'SESSIONS', 'PROGRESSION'], ['Plan de entrenamiento', 'ESTRUCTURA', 'SESIONES', 'PROGRESIÓN']],
  Nutrition: [['Nutrition & race planning', 'PLAN', 'PREPARE', 'FUEL'], ['Nutrición y planificación de carrera', 'PLANIFICAR', 'PREPARAR', 'NUTRIR']],
  Academy: [['Knowledge in practice', 'SPORT SCIENCE', 'LEARNING', 'RESOURCES'], ['Conocimiento en práctica', 'CIENCIA DEL DEPORTE', 'APRENDIZAJE', 'RECURSOS']],
  Projects: [['A project worth sharing', 'ATHLETE', 'GOALS', 'COLLABORATE'], ['Un proyecto para compartir', 'ATLETA', 'OBJETIVOS', 'COLABORAR']],
  Coaches: [['The coaching perspective', 'ATHLETES', 'PLANS', 'SESSIONS'], ['La mirada del entrenador', 'ATLETAS', 'PLANES', 'SESIONES']],
};

export function ProductScene({ scene, lang }: { scene: string; lang: Lang }) {
  const s = (sceneText[scene] || sceneText.Hub)[lang === 'en' ? 0 : 1];
  return <div className={'v2-scene scene-' + scene.toLowerCase()} key={scene}>
    <div className="v2-scene-caption">{lang === 'en' ? 'ILLUSTRATIVE INTERFACE · NOT LIVE DATA' : 'INTERFAZ ILUSTRATIVA · SIN DATOS REALES'}</div>
    <div className="v2-window"><div className="v2-window-bar"><span>● ● ●</span><span>ASCIENDE / {scene.toUpperCase()}</span><span>↗</span></div>
      <div className="v2-window-body"><div className="v2-window-side"><b>A ↗</b><span>—</span><span>—</span><span>—</span></div><div className="v2-window-main"><div className="v2-window-label">{s[1]} / {s[2]}</div><h4>{s[0]}</h4>
        {scene === 'Nutrition' ? <div className="v2-scene-nutrition"><div className="v2-scene-copy"><span>{s[1]}</span><span>{s[2]}</span><span>{s[3]}</span></div><img src="/Screen_phone_nutrition.png" alt={lang === 'en' ? 'Existing nutrition interface with test data' : 'Interfaz existente de nutrición con datos de prueba'} /></div>
          : scene === 'Lab' || scene === 'Performance' ? <div className="v2-chart"><svg viewBox="0 0 300 110" aria-hidden="true"><path d="M0 100 L300 100 M0 65 L300 65 M0 30 L300 30"/><path className="v2-chart-line" d="M10 90 C50 88 60 80 95 76 S150 63 180 53 S245 24 290 15"/></svg><div>{s.slice(1).map(x => <span key={x}>{x}</span>)}</div></div>
          : scene === 'Motion' ? <div className="v2-motion-demo"><img src="/agu_bici_santacruz.JPG" alt=""/><span>{lang === 'en' ? 'VIDEO DEMO PENDING' : 'VIDEO DE DEMO PENDIENTE'}</span></div>
          : scene === 'Projects' ? <div className="v2-project-demo"><div className="v2-demo-avatar">↗</div><div><strong>{s[1]}</strong><p>{s[2]} / {s[3]}</p><div className="v2-demo-lines"><i/><i/><i/></div></div></div>
          : scene === 'Endurance' || scene === 'Coaches' ? <div className="v2-plan-demo"><div>{s.slice(1).map(x => <span key={x}>{x}</span>)}</div><div className="v2-plan-grid">{Array.from({length: 15},(_,i) => <i key={i} />)}</div></div>
          : <div className="v2-scene-tiles">{s.slice(1).map((x,i) => <div key={x}><span>0{i+1}</span><strong>{x}</strong><div className="v2-demo-lines"><i/><i/></div></div>)}</div>}
      </div></div></div>
  </div>;
}

export function Perspectives({ lang }: { lang: Lang }) {
  const [selected,setSelected]=useState(0);
  const es=lang==='es';
  const profiles=es ? [
    {label:'Atletas', title:'Tu recorrido. Tu visión.', body:'Planificación, evaluación, conocimiento y proyectos para acompañar tus objetivos.', action:'Explorar el ecosistema', href:'#ecosystem', scene:'Hub'},
    {label:'Entrenadores', title:'Tus atletas. Tus decisiones. Un entorno.', body:'Organizá atletas, planificá y revisá sesiones, con acceso a la información autorizada.', action:'Descubrir para entrenadores', href:'/preview-v2/for-coaches', scene:'Coaches'},
    {label:'Profesionales del deporte', title:'Ciencia para comprender mejor.', body:'Explorá evaluación fisiológica, movimiento y modelos de rendimiento desde una perspectiva profesional.', action:'Explorar herramientas', href:'#ecosystem', scene:'Lab'},
  ] : [
    {label:'Athletes', title:'Your journey. Your perspective.', body:'Planning, evaluation, knowledge and projects to support your goals.', action:'Explore the ecosystem', href:'#ecosystem', scene:'Hub'},
    {label:'Coaches', title:'Your athletes. Your decisions. One environment.', body:'Organize athletes, plan and review sessions, with access to authorized information.', action:'Discover for coaches', href:'/preview-v2/for-coaches', scene:'Coaches'},
    {label:'Sports science professionals', title:'Science for a clearer picture.', body:'Explore physiological assessment, movement and performance models from a professional perspective.', action:'Explore the tools', href:'#ecosystem', scene:'Lab'},
  ];
  const p=profiles[selected];
  return <section className="v2-perspectives" id="perspectives"><p className="v2-kicker">04 / {es?'DISTINTAS PERSPECTIVAS':'DIFFERENT PERSPECTIVES'}</p><h2>{es?'UN ECOSISTEMA.\nDISTINTAS MIRADAS.':'ONE ECOSYSTEM.\nDIFFERENT PERSPECTIVES.'}</h2><div className="v2-perspective-tabs" role="group" aria-label={es?'Elegir perspectiva':'Choose a perspective'}>{profiles.map((profile,i)=><button key={profile.label} aria-pressed={i===selected} onClick={()=>setSelected(i)}>{profile.label}<span>↗</span></button>)}</div><div className="v2-perspective-body"><div><p className="v2-kicker">0{selected+1} / {p.label.toUpperCase()}</p><h3>{p.title}</h3><p>{p.body}</p><a className="v2-text-link" href={p.href}>{p.action}<ArrowUpRight size={17}/></a></div><ProductScene scene={p.scene} lang={lang}/></div></section>;
}

const resources = [
  { id:'academy', title:'Academy', en:'Sports science & learning', es:'Ciencia del deporte y aprendizaje', url:'https://academy.asciende.pro', enabled:true },
  { id:'podcast', title:'Podcast', en:'Listen to Asciende', es:'Escuchá Asciende', url:'https://open.spotify.com/show/0UMyQ8CzoTLJ5wGcU9z1RR?si=dd0985a488454927', enabled:true },
  { id:'video', title:'YouTube', en:'Watch & explore', es:'Mirá y explorá', url:'https://www.youtube.com/@asciendepro', enabled:true },
  { id:'articles', title:'Stories', en:'Articles & perspectives', es:'Artículos y perspectivas', url:'https://asciende.pro/stories/', enabled:true },
];
export function Knowledge({lang,onOpenStories}:{lang:Lang;onOpenStories:()=>void}) {
  const es=lang==='es';
  return <section className="v2-knowledge"><p className="v2-kicker">06 / KNOWLEDGE & COMMUNITY</p><div className="v2-knowledge-heading"><h2>{es?'El conocimiento\ntambién mueve.':'Knowledge moves\nus forward.'}</h2><p>{es?'Ideas, educación y conversaciones para acompañar tu recorrido.':'Ideas, education and conversations for the journey ahead.'}</p></div><div className="v2-resources">{resources.filter(x=>x.enabled).map((item,i)=>item.id==='articles'?<button key={item.id} onClick={onOpenStories}><span>0{i+1} / STORIES</span><strong>Stories</strong><p>{es?item.es:item.en}</p><ArrowUpRight size={20}/></button>:<a key={item.id} href={item.url}><span>0{i+1} / {item.title.toUpperCase()}</span><strong>{item.title}</strong><p>{es?item.es:item.en}</p><ArrowUpRight size={20}/></a>)}</div>{hasBackend ? <div className="v2-newsletter"><Newsletter title={es?'Sumate a la comunidad':'Join the community'} subtitle={es?'Recibí información sobre rendimiento y herramientas de Asciende.':'Receive insights about performance and Asciende tools.'} placeholder={es?'Tu email':'Your email'} namePlaceholder={es?'Tu nombre':'Your name'} buttonText={es?'Suscribirse':'Subscribe'} successMessage={es?'Revisá tu correo y confirmá tu suscripción.':'Check your inbox and confirm your subscription.'} errorMessage={es?'No se pudo completar la suscripción.':'Subscription failed. Please try again.'} consentLabel={es?'Quiero suscribirme al newsletter de Asciende.':'I want to subscribe to the Asciende newsletter.'}/></div> : <p className="v2-newsletter-note">{es?'Newsletter: disponible al configurar la integración existente.':'Newsletter: available when the existing integration is configured.'}</p>}</section>;
}

const links=[['Privacy Policy / Datenschutzerklärung','privacy-policy'],['Impressum','impressum'],['Terms & Conditions','terms'],['Cookie Policy','cookies'],['Refund Policy','refund-policy'],['Support','support'],['Delete Account','delete-account']];
export function PreviewFooter({lang}:{lang:Lang}) {
  return <footer className="v2-footer-expanded"><div className="v2-footer-main"><div><img src="/logo_transp.png" alt="Asciende"/><p>{lang==='es'?'Diseñado para el recorrido.':'Built for the journey.'}</p><a href="mailto:info@asciende.pro">info@asciende.pro ↗</a></div><div><h3>LEGAL & SUPPORT</h3>{links.map(([label,url])=><a key={url} href={'/preview-v2/legal/'+url}>{label}</a>)}</div><div><h3>COMMUNITY</h3><a href="https://www.instagram.com/asciende.pro/">Instagram ↗</a><a href="https://open.spotify.com/show/0UMyQ8CzoTLJ5wGcU9z1RR?si=dd0985a488454927">Spotify ↗</a><a href="https://www.youtube.com/@asciendepro">YouTube ↗</a><a href="https://www.facebook.com/asciende.pro">Facebook ↗</a></div></div><div className="v2-footer-end"><span>ASCIENDE / DESIGN PROTOTYPE</span><a href="#top">{lang==='es'?'VOLVER ARRIBA':'BACK TO TOP'} ↑</a></div></footer>;
}

export function LegalPage({page,lang}:{page:string;lang:Lang}) {
  const pages:Record<string, JSX.Element>={'privacy-policy':<PrivacyPolicy/>,impressum:<Impressum/>,terms:<TermsAndConditions/>,cookies:<CookiePolicy/>, 'refund-policy':<RefundPolicy/>,support:<Support/>, 'delete-account':<DeleteAccount/>};
  return <div className="v2" id="top"><div className="v2-legal-back"><a href="/preview-v2">← {lang==='es'?'Volver a la vista previa':'Back to preview'}</a></div><main>{pages[page] || <p>Page not found</p>}</main><PreviewFooter lang={lang}/><PreviewCookies/></div>;
}

export function CoachPage({lang,setLang}:{lang:Lang;setLang:(lang:Lang)=>void}) {
  const es=lang==='es';
  return <div className="v2 v2-coach" id="top"><header className="v2-header"><a className="v2-brand" href="/preview-v2"><img src="/logo_transp.png" alt="Asciende"/></a><nav><a href="/preview-v2">{es?'Volver al ecosistema':'Back to ecosystem'}</a></nav><button className="v2-language" onClick={()=>setLang(es?'en':'es')}>{lang.toUpperCase()} ↗</button></header><main><section className="v2-coach-hero"><p className="v2-kicker"><span className="v2-dot"/>{es?'ASCIENDE PARA ENTRENADORES':'ASCIENDE FOR COACHES'}</p><h1>{es?'TUS ATLETAS.\nTUS DECISIONES.\nUN ENTORNO.':'YOUR ATHLETES.\nYOUR DECISIONS.\nONE ENVIRONMENT.'}</h1><p>{es?'Planificación, revisión y seguimiento alrededor de tus atletas, con acceso acorde a los permisos y conexiones existentes.':'Planning, review and follow-up around your athletes, with access based on existing permissions and connections.'}</p><a className="v2-btn v2-btn-yellow" href="https://hub.asciende.pro">{es?'Explorar Hub':'Explore Hub'}<ArrowUpRight size={18}/></a><ProductScene scene="Coaches" lang={lang}/></section><section className="v2-coach-story"><p className="v2-kicker">01 / {es?'UNA MIRADA MÁS CLARA':'A CLEARER PICTURE'}</p><h2>{es?'Menos fragmentación.\nMás contexto.':'Less fragmentation.\nMore context.'}</h2><div className="v2-coach-columns">{(es?[['Atletas','Organizá tus atletas y equipos desde un mismo entorno.'],['Planificación','Construí y organizá sesiones en función de los objetivos deportivos.'],['Seguimiento','Revisá sesiones e información disponible según los permisos correspondientes.']]:[['Athletes','Organize your athletes and teams in one environment.'],['Planning','Build and organize sessions around sporting goals.'],['Follow-up','Review sessions and available information according to the relevant permissions.']]).map(([title,text],i)=><article key={title}><span>0{i+1}</span><h3>{title}</h3><p>{text}</p></article>)}</div><a className="v2-btn v2-btn-dark" href="/preview-v2">{es?'Volver al ecosistema':'Back to the ecosystem'}<ArrowRight size={18}/></a></section></main><PreviewFooter lang={lang}/><PreviewCookies/></div>;
}
