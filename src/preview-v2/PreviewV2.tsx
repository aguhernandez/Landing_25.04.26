import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { ArrowDown, ArrowRight, ArrowUpRight, Plus } from 'lucide-react';
import './preview.css';
import { ProductScene, Perspectives, Knowledge, PreviewFooter, CoachPage, PreviewCookies, LegalPage } from './sections';
import { CommercialPage, CommercialPaths, MeetAthletes } from './Commercial';
import { ExplorerFeature, SignatureJourney } from './SignatureJourney';
const StoriesOverlay = lazy(() => import('./StoriesOverlay'));

type Lang = 'en' | 'es';
type Tool = { name: string; tag: string; description: string; features: string[]; url?: string; image?: string };

const content = {
  en: {
    nav: ['The journey', 'Ecosystem', 'Athlete projects'], label: 'THE ATHLETE SUPPORT PLATFORM', hero: 'HUMAN POTENTIAL.\nCONNECTED.', intro: 'One ecosystem connecting sports science, performance technology, education and opportunities to move forward.', explore: 'Explore the ecosystem', athletes: 'Discover athletes', scroll: 'SCROLL TO EXPLORE',
    statementA: 'Performance is', statementB: 'a human story.', statementText: 'Behind every goal is a person. Asciende brings the science, the tools and the people together to help that person move forward.',
    journeyLabel: '01 / THE PRODUCT JOURNEY', journeyTitle: 'A bigger picture of performance.', journeyIntro: 'Different tools, one shared purpose: supporting the athlete at every step.', journeyHint: 'SCROLL TO EXPLORE THE JOURNEY',
    journey: [
      ['01', 'HUB', 'Your starting point.', 'Bring training, learning and support into focus in the Asciende Hub.', 'TRAIN · LEARN · CONNECT'],
      ['02', 'LAB', 'Understand the effort.', 'Explore physiological evaluation and the science behind performance.', 'EVALUATE · UNDERSTAND'],
      ['03', 'ENDURANCE', 'Plan the work.', 'Shape endurance training around the demands of your sport and your goals.', 'PLAN · DEVELOP'],
      ['04', 'NUTRITION', 'Fuel what moves you.', 'Explore nutrition and race planning as part of your performance journey.', 'FUEL · PREPARE'],
      ['05', 'ATHLETE PROJECTS', 'Make your ambition visible.', 'PRO athletes can present their goals and projects and open pathways for collaboration.', 'PRESENT · CONNECT'],
    ],
    explorerLabel: '02 / THE ECOSYSTEM', explorerTitle: 'One athlete.\nMany ways forward.', explorerIntro: 'Explore the tools around the athlete. Select a discipline to see how it contributes to the bigger picture.', selected: 'SELECTED TOOL', features: 'WHAT IT BRINGS', visit: 'Explore product', inDevelopment: 'In development · link coming soon',
    supportLabel: '03 / ATHLETE SUPPORT', supportTitle: 'Your goals deserve\nto be seen.', supportIntro: 'A performance journey is more than a result. In Hub, PRO athletes can give their ambitions a home and invite others to be part of the story.', supportSteps: [['01', 'Build your profile', 'Introduce the person behind the performance.'], ['02', 'Share your goals', 'Give your sporting ambitions context and direction.'], ['03', 'Present a project', 'Create a public space to tell your story and show ways to collaborate.']], supportCta: 'Explore Asciende Hub', supportNote: 'Support opportunities depend on each project and its community.', projectPlaceholder: 'PUBLIC ATHLETE PROJECT', projectPending: 'Real project page coming soon', projectCaption: 'A space for ambition, context and collaboration.',
    momentsLabel: '05 / THE SCIENCE IN MOTION', momentsTitle: 'Look closer.\nMove forward.', motion: 'Understanding movement.', motionText: 'A space for biomechanics: motion analysis, joint landmarks and angles.', lab: 'Understanding the engine.', labText: 'A closer look at physiological assessment and the tools used to explore performance.', pendingVideo: 'DEMO VIDEO PENDING', pendingLab: 'REAL LAB DEMO PENDING', pendingDetail: 'Authentic product material will be added here.',
    endLabel: 'THE ATHLETE SUPPORT PLATFORM', endTitle: 'Your next chapter\nstarts here.', endText: 'Science, performance, education and opportunity — connected around you.', footer: 'Built for the journey.', preview: 'DESIGN PROTOTYPE / NOT PRODUCTION',
    tools: [
      { name: 'Hub', tag: 'THE CENTER', description: 'A place for athletes to train, learn and connect with support.', features: ['Training & progress', 'Education', 'Athlete projects'], url: 'https://hub.asciende.pro' },
      { name: 'Lab', tag: 'UNDERSTAND', description: 'Explore physiological evaluation and the science of performance.', features: ['Physiological assessment', 'Performance science', 'Evaluation tools'], url: 'https://lab.asciende.pro' },
      { name: 'Motion', tag: 'MOVE', description: 'A space for exploring movement and biomechanics.', features: ['Movement analysis', 'Joint landmarks', 'Angles'], },
      { name: 'Performance', tag: 'DEVELOP', description: 'A performance perspective within the Asciende ecosystem.', features: ['Performance', 'Development', 'Athlete-centered'], },
      { name: 'Endurance', tag: 'PLAN', description: 'Plan endurance training around your sport and your goals.', features: ['Endurance planning', 'Training structure', 'Sport-specific work'], url: 'https://endurance.asciende.pro' },
      { name: 'Nutrition', tag: 'FUEL', description: 'Explore nutrition and race planning for performance.', features: ['Nutrition planning', 'Race preparation', 'Performance'], url: 'https://nutrition.asciende.pro', image: '/Screen_phone_nutrition.png' },
      { name: 'Academy', tag: 'LEARN', description: 'Bring sports science and education closer to your journey.', features: ['Sport science', 'Education', 'Learning resources'], url: 'https://academy.asciende.pro' },
    ] as Tool[],
  },
  es: {
    nav: ['El recorrido', 'Ecosistema', 'Proyectos'], label: 'LA PLATAFORMA DE APOYO AL ATLETA', hero: 'POTENCIAL HUMANO.\nCONECTADO.', intro: 'Un ecosistema que conecta ciencia del deporte, tecnología de rendimiento, educación y oportunidades para avanzar.', explore: 'Explorar el ecosistema', athletes: 'Descubrir atletas', scroll: 'DESLIZÁ PARA EXPLORAR',
    statementA: 'El rendimiento es', statementB: 'una historia humana.', statementText: 'Detrás de cada objetivo hay una persona. Asciende reúne la ciencia, las herramientas y las personas para ayudarla a avanzar.',
    journeyLabel: '01 / EL RECORRIDO', journeyTitle: 'Una visión más amplia del rendimiento.', journeyIntro: 'Distintas herramientas, un propósito compartido: acompañar al atleta en cada etapa.', journeyHint: 'DESLIZÁ PARA EXPLORAR EL RECORRIDO',
    journey: [
      ['01', 'HUB', 'Tu punto de partida.', 'Reuní entrenamiento, aprendizaje y apoyo en Asciende Hub.', 'ENTRENAR · APRENDER · CONECTAR'],
      ['02', 'LAB', 'Comprendé el esfuerzo.', 'Explorá la evaluación fisiológica y la ciencia detrás del rendimiento.', 'EVALUAR · COMPRENDER'],
      ['03', 'ENDURANCE', 'Planificá el trabajo.', 'Organizá el entrenamiento de resistencia según tu deporte y tus objetivos.', 'PLANIFICAR · DESARROLLAR'],
      ['04', 'NUTRITION', 'Alimentá tu movimiento.', 'Explorá la planificación nutricional y de carrera como parte de tu recorrido.', 'NUTRIR · PREPARAR'],
      ['05', 'PROYECTOS DE ATLETAS', 'Hacé visible tu ambición.', 'Los atletas PRO pueden presentar sus objetivos y proyectos y abrir caminos de colaboración.', 'PRESENTAR · CONECTAR'],
    ],
    explorerLabel: '02 / EL ECOSISTEMA', explorerTitle: 'Un atleta.\nMuchos caminos.', explorerIntro: 'Explorá las herramientas alrededor del atleta. Seleccioná una disciplina para descubrir su lugar en el conjunto.', selected: 'HERRAMIENTA SELECCIONADA', features: 'QUÉ APORTA', visit: 'Explorar producto', inDevelopment: 'En desarrollo · enlace próximamente',
    supportLabel: '03 / APOYO AL ATLETA', supportTitle: 'Tus objetivos merecen\nser vistos.', supportIntro: 'Un recorrido deportivo es mucho más que un resultado. En Hub, los atletas PRO pueden darles un espacio a sus ambiciones e invitar a otros a ser parte de su historia.', supportSteps: [['01', 'Construí tu perfil', 'Presentá a la persona detrás del rendimiento.'], ['02', 'Compartí tus objetivos', 'Dales contexto y dirección a tus ambiciones deportivas.'], ['03', 'Presentá un proyecto', 'Creá un espacio público para contar tu historia y mostrar formas de colaborar.']], supportCta: 'Explorar Asciende Hub', supportNote: 'Las oportunidades de apoyo dependen de cada proyecto y su comunidad.', projectPlaceholder: 'PROYECTO PÚBLICO DE ATLETA', projectPending: 'Página real de proyecto próximamente', projectCaption: 'Un espacio para la ambición, el contexto y la colaboración.',
    momentsLabel: '05 / CIENCIA EN MOVIMIENTO', momentsTitle: 'Mirá más de cerca.\nSeguí avanzando.', motion: 'Comprender el movimiento.', motionText: 'Un espacio para la biomecánica: análisis de movimiento, puntos articulares y ángulos.', lab: 'Comprender el motor.', labText: 'Una mirada a la evaluación fisiológica y las herramientas para explorar el rendimiento.', pendingVideo: 'VIDEO DE DEMOSTRACIÓN PENDIENTE', pendingLab: 'DEMO REAL DE LAB PENDIENTE', pendingDetail: 'Aquí se incorporará material auténtico del producto.',
    endLabel: 'LA PLATAFORMA DE APOYO AL ATLETA', endTitle: 'Tu próximo capítulo\nempieza acá.', endText: 'Ciencia, rendimiento, educación y oportunidades, conectados alrededor tuyo.', footer: 'Diseñado para el recorrido.', preview: 'PROTOTIPO DE DISEÑO / NO ES PRODUCCIÓN',
    tools: [
      { name: 'Hub', tag: 'EL CENTRO', description: 'Un lugar para entrenar, aprender y conectar con apoyo.', features: ['Entrenamiento y progreso', 'Educación', 'Proyectos de atletas'], url: 'https://hub.asciende.pro' },
      { name: 'Lab', tag: 'COMPRENDER', description: 'Explorá la evaluación fisiológica y la ciencia del rendimiento.', features: ['Evaluación fisiológica', 'Ciencia del rendimiento', 'Herramientas de evaluación'], url: 'https://lab.asciende.pro' },
      { name: 'Motion', tag: 'MOVER', description: 'Un espacio para explorar el movimiento y la biomecánica.', features: ['Análisis de movimiento', 'Puntos articulares', 'Ángulos'] },
      { name: 'Performance', tag: 'DESARROLLAR', description: 'Una perspectiva del rendimiento dentro del ecosistema Asciende.', features: ['Rendimiento', 'Desarrollo', 'Centrado en el atleta'] },
      { name: 'Endurance', tag: 'PLANIFICAR', description: 'Planificá el entrenamiento de resistencia según tu deporte y tus objetivos.', features: ['Planificación de resistencia', 'Estructura de entrenamiento', 'Trabajo específico'], url: 'https://endurance.asciende.pro' },
      { name: 'Nutrition', tag: 'NUTRIR', description: 'Explorá la planificación nutricional y de carrera para el rendimiento.', features: ['Planificación nutricional', 'Preparación de carrera', 'Rendimiento'], url: 'https://nutrition.asciende.pro', image: '/Screen_phone_nutrition.png' },
      { name: 'Academy', tag: 'APRENDER', description: 'Acercá la ciencia del deporte y la educación a tu recorrido.', features: ['Ciencia del deporte', 'Educación', 'Recursos de aprendizaje'], url: 'https://academy.asciende.pro' },
    ] as Tool[],
  },
};

function PreviewV2() {
  const [lang, setLang] = useState<Lang>(() => /^(conocimientos|contexto-de-rendimiento|historias|recursos)(\/|$)/.test(window.location.pathname.match(/^\/preview-v2\/stories\/(.+)/)?.[1] || new URLSearchParams(window.location.search).get('stories') || '') ? 'es' : 'en');
  const [selected, setSelected] = useState(0);
  const [storiesOpen,setStoriesOpen]=useState(() => /^\/preview-v2\/stories(?:\/|$)/.test(location.pathname) || new URLSearchParams(location.search).has('stories'));
  const [reduceMotion,setReduceMotion]=useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const t = content[lang];
  const tool = t.tools[selected];
  const coachPage = window.location.pathname.replace(/\/$/, '').endsWith('/for-coaches');
  const legalPage = window.location.pathname.match(/^\/preview-v2\/legal\/([^/]+)\/?$/)?.[1];
  const commercialPage=window.location.pathname.match(/^\/preview-v2\/(coaching|memberships|professionals)\/?$/)?.[1];
  const closeStories=useCallback(()=>setStoriesOpen(false),[]);
  const openStories=()=>{history.pushState({stories:true},'','/preview-v2/stories');setStoriesOpen(true);};

  useEffect(() => {
    document.documentElement.lang = lang;
    document.title = lang === 'en' ? 'Asciende | The Athlete Support Platform — Preview' : 'Asciende | Plataforma de apoyo al atleta — Vista previa';
    return () => { document.documentElement.lang = 'en'; };
  }, [lang]);

  useEffect(()=>{const onPop=()=>setStoriesOpen(/^\/preview-v2\/stories(?:\/|$)/.test(location.pathname)||new URLSearchParams(location.search).has('stories'));window.addEventListener('popstate',onPop);return()=>window.removeEventListener('popstate',onPop);},[]);
  useEffect(()=>{const media=window.matchMedia('(prefers-reduced-motion: reduce)');const onChange=()=>setReduceMotion(media.matches);media.addEventListener('change',onChange);return()=>media.removeEventListener('change',onChange);},[]);

  useEffect(()=>{let frame=0;const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');const update=()=>{frame=0;const hero=document.querySelector<HTMLElement>('.v2-hero');if(!hero||reduced.matches)return;const progress=Math.min(1,Math.max(0,-hero.getBoundingClientRect().top/hero.offsetHeight));hero.style.setProperty('--hero-scale',String(1+progress*.07));hero.style.setProperty('--hero-image-shift',`${progress*8}%`);hero.style.setProperty('--hero-text-shift',`${progress*-18}%`);hero.style.setProperty('--hero-opacity',String(1-progress*.6));};const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update);};window.addEventListener('scroll',onScroll,{passive:true});update();return()=>{window.removeEventListener('scroll',onScroll);if(frame)cancelAnimationFrame(frame);};},[]);

  if (coachPage) return <CoachPage lang={lang} setLang={setLang} />;
  if (legalPage) return <LegalPage page={legalPage} lang={lang}/>;
  if (commercialPage) return <CommercialPage page={commercialPage} lang={lang} setLang={setLang}/>;

  return <div className="v2">
    <a className="v2-skip" href="#journey">{lang === 'en' ? 'Skip to content' : 'Ir al contenido'}</a>
    <header className="v2-header">
      <a className="v2-brand" href="#top" aria-label="Asciende"><img src="/logo_transp.png" alt="Asciende" /></a>
      <nav aria-label={lang === 'en' ? 'Main navigation' : 'Navegación principal'}><a href="#ecosystem">{t.nav[1]}</a><a href="#athletes">{t.nav[2]}</a><a href="#perspectives">{lang==='es'?'Profesionales':'Professionals'}</a><button onClick={openStories}>Stories</button><a href="/preview-v2/coaching">Coaching 1:1</a></nav>
      <div className="v2-header-right"><a className="v2-header-hub" href="https://hub.asciende.pro">{lang==='es'?'Ir a Hub':'Go to Hub'} ↗</a><button className="v2-language" onClick={() => setLang(lang === 'en' ? 'es' : 'en')} aria-label={lang === 'en' ? 'Cambiar a español' : 'Switch to English'}>{lang.toUpperCase()} <span>↗</span></button><details className="v2-mobile-menu"><summary aria-label={lang==='es'?'Abrir menú':'Open menu'}>☰</summary><div><a href="#ecosystem">{t.nav[1]}</a><a href="#athletes">{t.nav[2]}</a><a href="#perspectives">{lang==='es'?'Profesionales':'Professionals'}</a><button onClick={openStories}>Stories</button><a href="/preview-v2/coaching">Coaching 1:1</a></div></details></div>
    </header>
    <main id="top">
      <section className="v2-hero">
        <div className="v2-hero-image" aria-hidden="true" />
        {!reduceMotion && (import.meta.env.VITE_HERO_VIDEO_WEBM || import.meta.env.VITE_HERO_VIDEO_MP4 || import.meta.env.VITE_HERO_VIDEO_SRC) && <video className="v2-hero-video" autoPlay muted loop playsInline preload="none" poster="/agu_bici_santacruz.JPG" aria-hidden="true">{import.meta.env.VITE_HERO_VIDEO_WEBM && <source src={import.meta.env.VITE_HERO_VIDEO_WEBM} type="video/webm"/>}{import.meta.env.VITE_HERO_VIDEO_MP4 && <source src={import.meta.env.VITE_HERO_VIDEO_MP4} type="video/mp4"/>}{import.meta.env.VITE_HERO_VIDEO_SRC && <source src={import.meta.env.VITE_HERO_VIDEO_SRC}/>}</video>}
        <div className="v2-hero-grid" aria-hidden="true"><span>ASC / 001</span><span>SCIENCE FOR THE JOURNEY</span></div>
        <div className="v2-hero-content"><p className="v2-kicker"><span className="v2-dot" />{t.label}</p><h1>{t.hero.split('\n').map((line, i) => <span key={line} className={i === 1 ? 'v2-outline' : ''}>{line}</span>)}</h1><div className="v2-hero-bottom"><p>{t.intro}</p><div className="v2-hero-actions"><a className="v2-btn v2-btn-yellow" href="#journey">{t.explore}<ArrowRight size={18} /></a><a className="v2-text-link" href="#athletes">{t.athletes}<ArrowUpRight size={17} /></a></div></div></div>
        <div className="v2-scroll"><span>{t.scroll}</span><ArrowDown size={16} /></div><div className="v2-hero-number">01 — 05</div>
      </section>
      <section className="v2-statement"><div className="v2-statement-top"><span>ASCIENDE / THE BIG PICTURE</span><span>SCIENCE × HUMANITY</span></div><div className="v2-statement-body"><h2>{t.statementA}<br /><em>{t.statementB}</em></h2><p>{t.statementText}</p></div><div className="v2-statement-bottom"><span>UNDERSTAND</span><span>DEVELOP</span><span>CONNECT</span><span>SUPPORT</span><span>↗</span></div></section>
      <SignatureJourney lang={lang}/>
      <section id="ecosystem" className="v2-ecosystem"><div className="v2-section-head v2-ecosystem-heading"><p className="v2-kicker">{t.explorerLabel}</p><h2>{t.explorerTitle}</h2><p>{t.explorerIntro}</p></div><div className="v2-explorer"><div className="v2-explorer-list" role="group" aria-label={lang === 'en' ? 'Choose a tool' : 'Elegí una herramienta'}>{t.tools.map((item, i) => <button key={item.name} className={selected === i ? 'selected' : ''} onClick={() => setSelected(i)} aria-pressed={selected === i}><span className="v2-explorer-index">0{i + 1}</span><span>{item.name}</span><span className="v2-explorer-symbol">{selected === i ? '↗' : '+'}</span></button>)}</div><div className="v2-explorer-detail" aria-live="polite"><div className="v2-detail-meta"><span>{t.selected} / 0{selected + 1}</span><span>{tool.tag}</span></div><div className="v2-detail-graphic v2-product-detail">{tool.name==='Lab'||tool.name==='Hub'?<ExplorerFeature scene={tool.name} lang={lang}/>:<ProductScene scene={tool.name} lang={lang}/>}</div><div className="v2-detail-copy"><div><h3>{tool.name}<span>.</span></h3><p>{tool.description}</p></div><div><span className="v2-detail-label">{t.features}</span><ul>{tool.features.map(feature => <li key={feature}><Plus size={13}/>{feature}</li>)}</ul></div></div>{tool.url ? <a className="v2-detail-link" href={tool.url} target="_blank" rel="noreferrer">{t.visit}<ArrowUpRight size={17}/></a> : <p className="v2-detail-pending">{t.inDevelopment}</p>}</div></div></section>
      <section id="athletes" className="v2-athletes"><div className="v2-athlete-copy"><p className="v2-kicker">{t.supportLabel}</p><h2>{t.supportTitle}</h2><p className="v2-athlete-intro">{t.supportIntro}</p><div className="v2-support-steps">{t.supportSteps.map(step => <div key={step[0]}><span>{step[0]}</span><div><h3>{step[1]}</h3><p>{step[2]}</p></div><ArrowUpRight size={18}/></div>)}</div><a href="https://hub.asciende.pro" className="v2-btn v2-btn-dark" target="_blank" rel="noreferrer">{t.supportCta}<ArrowUpRight size={18}/></a><p className="v2-support-note">{t.supportNote}</p></div><div className="v2-athlete-visual"><img src="/fer_ush_montanas_atras.jpeg" alt="" /><div className="v2-athlete-overlay"/><div className="v2-project-card"><div><span>{t.projectPlaceholder} / {lang === 'en' ? 'ILLUSTRATIVE DEMO' : 'DEMO ILUSTRATIVA'}</span><ArrowUpRight size={18}/></div><div className="v2-project-line"/><strong>{lang === 'en' ? 'A project with purpose.' : 'Un proyecto con propósito.'}</strong><p>{lang === 'en' ? 'Athlete profile · Goals & needs · Contact · Updates' : 'Perfil del atleta · Objetivos y necesidades · Contacto · Actualizaciones'}</p><div className="v2-project-bars"><i/><i/><i/></div></div><span className="v2-photo-label">THE PERSON BEHIND THE PERFORMANCE / ASCIENDE</span></div></section>
      <MeetAthletes lang={lang}/><Perspectives lang={lang}/><CommercialPaths lang={lang}/>
      <section className="v2-moments"><div className="v2-section-head"><p className="v2-kicker">{t.momentsLabel}</p><h2>{t.momentsTitle}</h2></div><div className="v2-moments-grid"><article><div className="v2-moment-image motion-image"><img src="/agu_bici_santacruz.JPG" alt="" /><div className="v2-moment-placeholder"><span>01 / MOTION</span><div className="v2-play">↗</div><strong>{t.pendingVideo}</strong><small>{t.pendingDetail}</small></div></div><div className="v2-moment-copy"><span>MOTION / BIOMECHANICS</span><h3>{t.motion}</h3><p>{t.motionText}</p></div></article><article><div className="v2-moment-image lab-image"><img src="/VO2_test.jpg" alt="" /><div className="v2-moment-placeholder"><span>02 / LAB</span><div className="v2-play">↗</div><strong>{t.pendingLab}</strong><small>{t.pendingDetail}</small></div></div><div className="v2-moment-copy"><span>LAB / PHYSIOLOGY</span><h3>{t.lab}</h3><p>{t.labText}</p></div></article></div></section>
      <Knowledge lang={lang} onOpenStories={openStories}/><section className="v2-end"><p className="v2-kicker"><span className="v2-dot"/>{t.endLabel}</p><h2>{t.endTitle}</h2><p>{t.endText}</p><a href="https://hub.asciende.pro" className="v2-btn v2-btn-yellow" target="_blank" rel="noreferrer">{t.supportCta}<ArrowUpRight size={18}/></a><div className="v2-end-mark">A<span>↗</span></div></section>
    </main><PreviewFooter lang={lang}/><PreviewCookies />{storiesOpen&&<Suspense fallback={null}><StoriesOverlay lang={lang} onClose={closeStories}/></Suspense>}
  </div>;
}
export default PreviewV2;
