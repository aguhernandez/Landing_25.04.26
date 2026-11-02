import { useEffect, useId, useRef, useState } from 'react';
import './signature.css';

type Lang = 'en' | 'es';
type Scene = 'lab' | 'decisions' | 'training' | 'hub' | 'project';

// Replace individual concepts with approved media without changing the timeline.
type ProductMedia =
  | { kind: 'image'; src: string; alt: string }
  | { kind: 'video'; webm?: string; mp4?: string; poster: string; alt: string }
  | { kind: 'sequence'; frames: string[]; alt: string };
const productMedia: Partial<Record<'lab' | 'training' | 'hub' | 'project', ProductMedia>> = {};

function ProductMediaSlot({asset,children}:{asset?:ProductMedia;children:React.ReactNode}) {
  const frameRef=useRef<HTMLImageElement>(null);
  const [reduced,setReduced]=useState(()=>window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  useEffect(()=>{const query=window.matchMedia('(prefers-reduced-motion: reduce)');const change=()=>setReduced(query.matches);query.addEventListener('change',change);return()=>query.removeEventListener('change',change);},[]);
  useEffect(()=>{if(asset?.kind!=='sequence'||!asset.frames.length)return;if(reduced){if(frameRef.current)frameRef.current.src=asset.frames[0];return;}let frame=0;const update=()=>{frame=0;const img=frameRef.current;const scene=img?.closest<HTMLElement>('[data-signature-scene]');if(!img||!scene)return;const progress=Number(scene.style.getPropertyValue('--scene-progress')||'0');img.src=asset.frames[Math.min(asset.frames.length-1,Math.max(0,Math.round(progress*(asset.frames.length-1))))];};const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update)};window.addEventListener('scroll',onScroll,{passive:true});update();return()=>{window.removeEventListener('scroll',onScroll);if(frame)cancelAnimationFrame(frame)};},[asset,reduced]);
  if(!asset)return <>{children}</>;
  if(asset.kind==='image')return <img className="signature-product-media" src={asset.src} alt={asset.alt} loading="lazy"/>;
  if(asset.kind==='sequence')return asset.frames.length?<img ref={frameRef} className="signature-product-media" src={asset.frames[0]} alt={asset.alt} loading="lazy"/>:<>{children}</>;
  if(reduced)return <img className="signature-product-media" src={asset.poster} alt={asset.alt} loading="lazy"/>;
  return <video className="signature-product-media" autoPlay muted loop playsInline preload="none" poster={asset.poster} aria-label={asset.alt}>{asset.webm&&<source src={asset.webm} type="video/webm"/>}{asset.mp4&&<source src={asset.mp4} type="video/mp4"/>}</video>;
}

const labels = {
  en: {
    heading: 'FROM DATA TO DECISIONS.\nFROM PERFORMANCE TO OPPORTUNITY.',
    intro: 'A closer look at how science, training and support come together around the athlete.',
    demo: 'ILLUSTRATIVE PRODUCT CONCEPT · NO ATHLETE DATA',
    caption: 'Conceptual journey · no automatic data transfer implied',
    scenes: [
      ['01 / LAB','Understand the athlete.','Physiological assessments bring context to performance: lactate, VO₂max, thresholds and zones.'],
      ['02 / INTERPRET','From insight to action.','An evaluation can inform a more considered training strategy. The connection shown here is conceptual.'],
      ['03 / PREPARE','Build the work around the goal.','Endurance planning and nutrition each contribute to a thoughtful preparation.'],
      ['04 / HUB','The athlete at the center.','Hub brings the athlete’s environment into focus, with information and professional access governed by permissions.'],
      ['05 / PROJECT','Make the journey visible.','Athletes can present a public project, share their goals and needs, and invite collaboration.'],
    ],
    labTitle:'Physiology assessment', labSub:'Evaluation / conceptual view', graph:'LACTATE RESPONSE', graphNote:'Illustrative curve · not a test result', zones:'PHYSIOLOGICAL ZONES', insight:'A clearer picture of the effort', insightBody:'Thresholds and zones help frame the demands of training.',
    plan:'Training structure', planSub:'Planning / illustrative view', planDays:['MON','TUE','WED','THU','FRI','SAT','SUN'], planLabels:['ENDURANCE','STRENGTH','RECOVERY'], nutrition:'NUTRITION / PREPARATION',
    hubTitle:'The athlete environment', hubSub:'Hub / conceptual view', athlete:'ATHLETE PROFILE', professional:'ATHLETE + PROFESSIONAL', permission:'AUTHORIZED INFORMATION', project:'PUBLIC PROJECT',
    projectTitle:'A goal worth sharing.', projectSub:'Public project / conceptual view', goals:'GOALS', needs:'NEEDS', collaborate:'COLLABORATION', updates:'PROJECT UPDATES',
    explorerLab:'Explore the science', explorerHub:'The athlete, connected', explorerNote:'Illustrative interface · replace with approved product media',
  },
  es: {
    heading:'DE DATOS A DECISIONES.\nDE RENDIMIENTO A OPORTUNIDADES.',
    intro:'Una mirada a cómo la ciencia, el entrenamiento y el apoyo se reúnen alrededor del atleta.',
    demo:'CONCEPTO DE PRODUCTO ILUSTRATIVO · SIN DATOS DE ATLETAS',
    caption:'Recorrido conceptual · no implica transferencia automática de datos',
    scenes:[
      ['01 / LAB','Comprender al atleta.','Las evaluaciones fisiológicas aportan contexto al rendimiento: lactato, VO₂max, umbrales y zonas.'],
      ['02 / INTERPRETAR','De la información a la acción.','Una evaluación puede orientar una estrategia de entrenamiento más informada. La conexión mostrada es conceptual.'],
      ['03 / PREPARAR','Construir el trabajo alrededor del objetivo.','La planificación de resistencia y la nutrición aportan a una preparación pensada.'],
      ['04 / HUB','El atleta en el centro.','Hub organiza el entorno del atleta, con información y acceso profesional sujetos a permisos.'],
      ['05 / PROYECTO','Hacer visible el recorrido.','Los atletas pueden presentar un proyecto público, compartir objetivos y necesidades, e invitar a colaborar.'],
    ],
    labTitle:'Evaluación fisiológica',labSub:'Evaluación / vista conceptual',graph:'RESPUESTA DE LACTATO',graphNote:'Curva ilustrativa · no es un resultado de test',zones:'ZONAS FISIOLÓGICAS',insight:'Una mirada más clara al esfuerzo',insightBody:'Los umbrales y las zonas ayudan a contextualizar las exigencias del entrenamiento.',
    plan:'Estructura de entrenamiento',planSub:'Planificación / vista ilustrativa',planDays:['LUN','MAR','MIÉ','JUE','VIE','SÁB','DOM'],planLabels:['RESISTENCIA','FUERZA','RECUPERACIÓN'],nutrition:'NUTRICIÓN / PREPARACIÓN',
    hubTitle:'El entorno del atleta',hubSub:'Hub / vista conceptual',athlete:'PERFIL DEL ATLETA',professional:'ATLETA + PROFESIONAL',permission:'INFORMACIÓN AUTORIZADA',project:'PROYECTO PÚBLICO',
    projectTitle:'Un objetivo para compartir.',projectSub:'Proyecto público / vista conceptual',goals:'OBJETIVOS',needs:'NECESIDADES',collaborate:'COLABORACIÓN',updates:'ACTUALIZACIONES DEL PROYECTO',
    explorerLab:'Explorá la ciencia',explorerHub:'El atleta, conectado',explorerNote:'Interfaz ilustrativa · reemplazar por material aprobado',
  },
};

function WindowFrame({ children, name, lang, className='' }:{children:React.ReactNode;name:string;lang:Lang;className?:string}) {
  return <div className={'signature-window '+className}>
    <div className="signature-window-bar"><span><i/><i/><i/></span><span>ASCIENDE / {name}</span><span>{lang==='en'?'CONCEPT':'CONCEPTO'}</span></div>{children}
  </div>;
}

export function LabVisual({lang,compact=false}:{lang:Lang;compact?:boolean}) {
  const t=labels[lang];
  const gradientId=useId().replace(/:/g,'');
  return <div className={'signature-lab '+(compact?'is-compact':'')}>
    <WindowFrame name="LAB" lang={lang}><div className="signature-lab-body"><div className="signature-sidebar" aria-hidden="true"><b>A↗</b><i/><i/><i/><i/></div><div className="signature-lab-main"><div className="signature-ui-meta"><span>ASCIENDE LAB / PHYSIOLOGY</span><span>VO₂MAX · LT1 · LT2</span></div><h4>{t.labTitle}</h4><p>{t.labSub}</p><div className="signature-chart"><div className="signature-chart-head"><span>{t.graph}</span><span>↗</span></div><svg viewBox="0 0 600 230" role="img" aria-label={t.graphNote}><defs><linearGradient id={gradientId} x1="0" x2="0" y1="0" y2="1"><stop offset="0%" stopColor="#FDDA36" stopOpacity=".28"/><stop offset="100%" stopColor="#FDDA36" stopOpacity="0"/></linearGradient></defs><g className="signature-chart-grid"><path d="M0 40H600 M0 90H600 M0 140H600 M0 190H600"/><path d="M90 0V230 M210 0V230 M330 0V230 M450 0V230 M570 0V230"/></g><path className="signature-chart-area" fill={`url(#${gradientId})`} d="M0 198 C90 195 140 187 210 177 C290 166 325 151 380 130 C440 108 470 70 520 46 C550 32 580 19 600 12 L600 230 L0 230Z"/><path className="signature-chart-curve" d="M0 198 C90 195 140 187 210 177 C290 166 325 151 380 130 C440 108 470 70 520 46 C550 32 580 19 600 12"/><path className="signature-chart-marker" d="M300 164V225 M450 101V225"/><circle cx="300" cy="164" r="5"/><circle cx="450" cy="101" r="5"/></svg><div className="signature-chart-foot"><span>LT1</span><span>LT2</span><span>{t.graphNote}</span></div></div><div className="signature-lab-footer"><span>{t.zones}</span><div><i/><i/><i/><i/><i/></div><span>SIMULATION / VO₂</span></div></div></div></WindowFrame>
    {!compact && <div className="signature-insight"><span>LAB / INSIGHT</span><strong>{t.insight}</strong><p>{t.insightBody}</p><div>LT1 <i/> LT2 <i/> VO₂</div></div>}
  </div>;
}

function PlanningVisual({lang,decision=false}:{lang:Lang;decision?:boolean}) {
  const t=labels[lang];return <div className={'signature-planning '+(decision?'is-decision':'')}>
    <WindowFrame name="ENDURANCE" lang={lang}><div className="signature-plan-main"><div className="signature-ui-meta"><span>ASCIENDE / ENDURANCE</span><span>{lang==='en'?'CONCEPT':'CONCEPTO'}</span></div><h4>{t.plan}</h4><p>{t.planSub}</p><div className="signature-plan-days">{t.planDays.map(day=><span key={day}>{day}</span>)}</div><div className="signature-plan-grid">{Array.from({length:21},(_,i)=><div key={i} className={'plan-cell plan-cell-'+(i%7)}>{[1,3,5,8,10,12,14,16,18,20].includes(i)&&<i/>}</div>)}</div><div className="signature-plan-legend">{t.planLabels.map(x=><span key={x}><i/>{x}</span>)}</div></div></WindowFrame><div className="signature-nutrition-layer"><span>{t.nutrition}</span><div><i/><i/><i/></div><small>{lang==='en'?'Illustrative layer':'Capa ilustrativa'}</small></div>
  </div>;
}

export function HubVisual({lang,compact=false}:{lang:Lang;compact?:boolean}) {
  const t=labels[lang];return <div className={'signature-hub '+(compact?'is-compact':'')}><WindowFrame name="HUB" lang={lang}><div className="signature-hub-main"><div className="signature-ui-meta"><span>ASCIENDE / HUB</span><span>{t.permission}</span></div><h4>{t.hubTitle}</h4><p>{t.hubSub}</p><div className="signature-hub-content"><div className="signature-profile"><div className="signature-avatar">A<span>↗</span></div><span>{t.athlete}</span><div className="signature-lines"><i/><i/></div></div><div className="signature-hub-modules"><div><span>01</span><strong>{t.professional}</strong><div className="signature-lines"><i/><i/></div></div><div><span>02</span><strong>{t.permission}</strong><div className="signature-lines"><i/><i/></div></div><div><span>03</span><strong>{t.project}</strong><div className="signature-lines"><i/><i/></div></div></div></div></div></WindowFrame></div>;
}

function ProjectVisual({lang}:{lang:Lang}) {const t=labels[lang];return <div className="signature-project"><WindowFrame name="ATHLETE PROJECT" lang={lang}><div className="signature-project-hero"><div><span>{t.projectSub}</span><h4>{t.projectTitle}</h4><p>{lang==='en'?'A place for the story behind the goal.':'Un espacio para la historia detrás del objetivo.'}</p></div><div className="signature-project-photo" aria-hidden="true"/></div><div className="signature-project-content"><div>{[t.goals,t.needs,t.updates].map((x,i)=><div key={x}><span>0{i+1}</span><strong>{x}</strong><div className="signature-lines"><i/><i/></div></div>)}</div><span className="signature-project-action">{t.collaborate} ↗</span></div></WindowFrame></div>}

const sceneKeys: Scene[]=['lab','decisions','training','hub','project'];
function SceneVisual({scene,lang}:{scene:Scene;lang:Lang}) {
  if(scene==='lab'||scene==='decisions')return <ProductMediaSlot asset={productMedia.lab}><LabVisual lang={lang} compact/></ProductMediaSlot>;
  if(scene==='training')return <ProductMediaSlot asset={productMedia.training}><PlanningVisual lang={lang}/></ProductMediaSlot>;
  if(scene==='hub')return <ProductMediaSlot asset={productMedia.hub}><HubVisual lang={lang}/></ProductMediaSlot>;
  return <ProductMediaSlot asset={productMedia.project}><ProjectVisual lang={lang}/></ProductMediaSlot>;
}

export function SignatureJourney({lang}:{lang:Lang}) {
  const root=useRef<HTMLElement>(null); const [active,setActive]=useState(0); const t=labels[lang];
  useEffect(()=>{const section=root.current;if(!section)return;const media=window.matchMedia('(min-width: 900px) and (prefers-reduced-motion: no-preference)');let raf=0;let last=-1;
    const update=()=>{raf=0;if(!media.matches)return;const track=section.querySelector<HTMLElement>('.signature-track');const pin=section.querySelector<HTMLElement>('.signature-pin');if(!track||!pin)return;const travel=Math.max(1,track.offsetHeight-pin.offsetHeight);const progress=Math.min(1,Math.max(0,-track.getBoundingClientRect().top/travel))*5;const index=Math.min(4,Math.floor(progress));if(index!==last){last=index;setActive(index)}section.style.setProperty('--signature-progress',`${progress/5*100}%`);section.querySelectorAll<HTMLElement>('[data-signature-scene]').forEach((el,i)=>{const local=Math.max(0,Math.min(1,progress-i));const visible=index===i;const entrance=i===0?1:Math.min(1,local/.06);const exit=i===4?1:Math.min(1,(1-local)/.06);const opacity=visible?Math.max(0,Math.min(entrance,exit)):0;el.style.setProperty('--visibility',String(opacity));el.style.setProperty('--scene-state',visible?'visible':'hidden');el.style.setProperty('--scene-progress',String(local));el.style.setProperty('--scene-z',visible?'2':'1');el.style.setProperty('--scene-x',`${(local<.06?(1-entrance):local>.94?-(1-exit):0)*(i===0?0:7)}%`);el.style.setProperty('--scene-y',`${(local<.06?(1-entrance):local>.94?-(1-exit):0)*(i===0?18:8)}px`);el.style.setProperty('--scene-scale',String((i===0?.96:1)+(i===0?Math.min(1,local/.65)*.04:0)-(1-Math.min(entrance,exit))*.035));el.style.setProperty('--focus-scale',String(1+(i===0?Math.max(0,Math.min(1,(local-.22)/.5))*.05:0)));el.style.setProperty('--copy-visibility',String(visible?Math.min(1,i===0?1:Math.max(0,(local-.02)/.05),i===4?1:Math.max(0,(.98-local)/.05)):0));});};
    const onScroll=()=>{if(!raf)raf=requestAnimationFrame(update)};const change=()=>{if(!media.matches){section.querySelectorAll<HTMLElement>('[data-signature-scene]').forEach(el=>{['--visibility','--scene-state','--scene-z','--scene-progress','--scene-x','--scene-y','--scene-scale','--focus-scale','--copy-visibility'].forEach(key=>el.style.removeProperty(key));});}else update()};window.addEventListener('scroll',onScroll,{passive:true});window.addEventListener('resize',onScroll);media.addEventListener('change',change);update();return()=>{window.removeEventListener('scroll',onScroll);window.removeEventListener('resize',onScroll);media.removeEventListener('change',change);if(raf)cancelAnimationFrame(raf)};},[]);
  return <section className="signature" id="journey" ref={root} aria-labelledby="signature-heading"><div className="signature-intro"><p className="v2-kicker">01 / THE PRODUCT JOURNEY</p><h2 id="signature-heading">{t.heading}</h2><p>{t.intro}</p></div><ol className="signature-a11y">{t.scenes.map(s=><li key={s[0]}><h3>{s[1]}</h3><p>{s[2]}</p></li>)}</ol><div className="signature-track"><div className="signature-pin"><div className="signature-meta"><span>ASCIENDE / LAB → HUB</span><span>{t.demo}</span><span className="signature-counter">0{active+1} / 05</span></div><div className="signature-progress" aria-hidden="true"><i/></div><div className="signature-scenes" aria-hidden="true">{sceneKeys.map((scene,i)=><article className={'signature-scene signature-scene-'+scene} key={scene} data-signature-scene><div className="signature-copy"><span>{t.scenes[i][0]}</span><h3>{t.scenes[i][1]}</h3><p>{t.scenes[i][2]}</p></div><div className="signature-stage"><SceneVisual scene={scene} lang={lang}/></div></article>)}</div><p className="signature-disclaimer">{t.caption}</p></div></div></section>;
}

export function ExplorerFeature({lang,scene}:{lang:Lang;scene:'Lab'|'Hub'}) {const t=labels[lang];const key=scene==='Lab'?'lab':'hub';return <div className="signature-explorer"><div className="signature-explorer-heading"><span>ASCIENDE / {scene.toUpperCase()}</span><strong>{scene==='Lab'?t.explorerLab:t.explorerHub}</strong><small>{t.explorerNote}</small></div><ProductMediaSlot asset={productMedia[key]}>{scene==='Lab'?<LabVisual lang={lang} compact/>:<HubVisual lang={lang} compact/>}</ProductMediaSlot></div>}
