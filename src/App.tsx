import { ArrowRight, CheckCircle, Menu, X, Star, Globe, Instagram, Music, Youtube, Facebook, ChevronDown } from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import { Blog, AdminLogin, AdminDashboard } from './components/blog';
import { BlogStoryPage, StoriesPage } from './components/blog/index';
import { WhatIGet } from './components/WhatIGet';
import { HowItWorks } from './components/HowItWorks';
import { Newsletter } from './components/Newsletter';
import { PrivacyPolicy } from './components/PrivacyPolicy';
import { Support } from './components/Support';
import { Impressum } from './components/Impressum';
import { TermsAndConditions } from './components/TermsAndConditions';
import { CookiePolicy } from './components/CookiePolicy';
import { RefundPolicy } from './components/RefundPolicy';
import { DeleteAccount } from './components/DeleteAccount';
import StrengthPlanning from './components/StrengthPlanning';
import NutritionPlanning from './components/NutritionPlanning';
import EndurancePlanning from './components/EndurancePlanning';
import PerformanceTesting from './components/PerformanceTesting';
import { AsciendeProAthletes } from './components/AsciendeProAthletes';
import { ComingSoon } from './components/ComingSoon';
import { CookieBanner } from './components/CookieBanner';
import { DocsLayout } from './components/docs';
import { DocsManager } from './components/admin/DocsManager';
import { supabase } from './lib/supabase';

type Language = 'en' | 'es';

const translations = {
  en: {
    nav: {
      forAthletes: 'For Athletes',
      services: '1:1 Coaching Services',
      trainingPrograms: 'Training Programs',
      coaching1v1: 'Coaching 1:1',
      academy: 'Asciende Academy',
      resources: 'Resources',
      asciendeProAthletes: 'Asciende Pro Athletes',
      platform: 'Platform',
      hub: 'Hub',
      physiologyLab: 'Physiology Lab',
      endurancePlanner: 'Endurance Planner',
      nutritionRacePlanner: 'Nutrition & Race Planner',
      asciendeAcademy: 'Academy',
      motionBiomechanic: 'Motion & Biomechanic',
      performanceVector: 'Performance Vector',
      partnerships: 'Partnerships',
      performanceTesting: 'Performance Testing',
      about: 'About',
      login: 'Log in',
      createAccount: 'Create account',
    },
    services: {
      title: '1:1 Coaching to Elevate Your Performance, Anywhere',
      subtitle: 'Because great training isn\'t generic — it\'s scientific, individualized, and built for real life.',
      tagline: 'Strength • Nutrition • Endurance',
      serviceTitle: 'Performance Services',
      strength: 'Strength Training Programs',
      strengthDesc: 'Boost your strength with personalized, science-based training plans.',
      nutrition: 'Nutrition & Performance Plans',
      nutritionDesc: 'Fuel your performance with nutrition plans tailored to your goals.',
      endurance: 'Endurance Performance',
      enduranceDesc: 'Run, bike, or swim farther and stronger with our endurance training plans.',
      howTitle: 'How 1:1 Coaching works...',
      howSubtitle: 'Making each athlete unique.',
      step1Title: '1. Book your free 20-min consultation',
      step1Desc: 'A short call to understand your goals and see if we\'re a good fit. You\'ll get clarity on which coaching option suits you — with zero pressure, zero commitment.',
      step2Title: '2. Choose your plan and get your onboarding session',
      step2Desc: 'If you decide to join, you select your monthly plan. Then we schedule your 60-minute onboarding session, where we do the full deep-dive: training history, lifestyle, nutrition, injuries, goals, constraints, and what you need right now to start improving.',
      step2Desc2: 'You receive your training and nutrition plan, weekly guidance, and full access to the Asciende HUB app. We track progress, adjust as needed, and build consistent performance, week after week.',
      step3Title: '3. Start your personalized program',
      ctaTitle: 'Ready to start? Let\'s Talk',
      faqTitle: 'Frequently asked questions',
      faq1Title: 'What do I need to get started?',
      faq1: 'Nothing. Just the desire to improve your performance, training, habits, and nutrition. I provide all the tools you need — including the Asciende HUB app, which I designed based on real feedback from athletes like you.',
      faq2Title: 'Are the plans monthly?',
      faq2: 'Yes. All plans are monthly. Pricing varies depending on how much contact you want with me, the amount of work involved, and how often your plan may need adjustments due to changes or unexpected events.',
      faq3Title: 'How much feedback do I get?',
      faq3: 'It depends on the service you choose — but I never hold back knowledge. My goal is always the same: to help you improve as effectively and sustainably as possible.',
      faq4Title: 'Do I need the Asciende app?',
      faq4: 'You don\'t need it, but I highly recommend it. The app was built from the real experiences and needs of other athletes, and as an Asciende athlete, you get full access for free. Not using it would simply mean missing out — though you\'re free to use any other app you prefer.',
      testimonials: 'Our Athletes are saying',
    },
    forBrands: {
      title: 'Partner with Asciende: Performance, Access and Real Impact',
      subtitle: 'We collaborate with brands that believe in the power of sport, science, and opportunity. We bring the science and the athletes. Together, we support them, elevate communities, and build performance-driven stories that matter.',
      supportTitle: 'Support athletes in two ways',
      sponsor: '1. Sponsor an athlete directly',
      sponsorDesc: 'We are in charge of the science driven education, training, nutrition and coaching. The brand help resources for train, compete and grow. Your brand becomes part of their story - and their audience becomes yours.',
      discounts: '2. Offer discounts to the entire community of Asciende',
      discountsDesc: 'Every athlete benefits, including those with limited resources. You expand reach. Increase sales and build loyalty through meaningful value.',
      cycle1: 'Athletes gain access to equipment, nutrition and services.',
      cycle2: 'Brands gain visibility through sponsored athletes and a community-driven offering.',
      cycle3: 'The community grows stronger and more connected around your brand.',
      cycleTitle: 'This creates a powerful cycle:',
      platformTitle: 'Asciende is the first platform built to elevate athletes with science, education and performance tools — and to give brands a meaningful way to support the lift',
      spottersTitle: 'Already Spotters',
      joinTitle: 'Join Asciende as a Spotter',
      joinSubtitle1: 'We provide the knowledge,',
      joinSubtitle2: 'The community provides the strength',
      joinSubtitle3: 'Brands provide the lift.',
      joinFinal: 'Together, we build the future of the sport',
      spreadingTitle: 'Spreading the word is a significant form of support.',
    },
    hero: {
      title: 'The Athletes\' Support Platform',
      subtitle: 'One integrated performance platform — with science-based tools and a system to support and be supported.',
      createAccount: 'Create account',
      login: 'Log in',
      activeAthletes: 'Active athletes',
      countries: 'Countries',
      sportSatellites: 'Sport satellites',
    },
    foundingOffer: 'Founding member special: 50% OFF for life — Code: Asciende50',
    howItWorks: {
      title: 'How it works',
      subtitle: 'Three simple steps to elevate your performance',
      step1: 'Start Free',
      step1Desc: 'All our science-based tools are free. Download the Hub, log in, and explore training planners, nutrition planners, habit trackers, and Performance Digest capsules. This is our way to give everyone access to applied sport science.',
      step2: 'Choose Your Membership',
      step2Desc: 'Whether guided and planned by a professional or an AI science-based system, your membership lets you have everything planned. Create your own sports projects and receive support from the community and partners. Unlock advanced planning, track your progress, and connect to a network designed to enhance performance.',
      step3: 'Improve & Support Others',
      step3Desc: 'Track your data, execute your plans, and enhance your performance. Help others reach their potential while getting the support you need to progress.',
    },
    hubShowcase: {
      title: 'Inside the Asciende Hub',
      train: 'Train',
      trainDesc: 'Sport-specific training plans',
      track: 'Track',
      trackDesc: 'See your progress in real time',
      learn: 'Learn',
      learnDesc: 'Science-backed education',
      connect: 'Connect',
      connectDesc: 'Coaching and brand support',
      neverJump: 'Never jump between apps',
      neverJumpDesc: 'Everything you need lives in one place. Training, nutrition, analytics, coaching — all accessible from your Hub.',
    },
    whyAsciende: {
      title: 'Why Asciende exists',
      subtitle1: 'Sports science, performance data, and structured training exist. But they\'re expensive, fragmented, and hard to access.',
      subtitle2: 'Asciende closes this gap. We connect athletes, knowledge, and opportunities in one platform.',
      athletes: 'Athletes',
      professionals: 'Professionals',
      brands: 'Brands',
      asciendeCore: 'The Performance Ecosystem Core',
      profToAthlete: 'Knowledge, training & performance guidance',
      brandsToAthlete: 'Support, opportunities & sponsorship',
      ascToAthlete: 'Tools, data & ecosystem',
      scienceLabel: 'Science & Analytics',
      partnershipsLabel: 'Brand Partnerships',
      toolsLabel: 'Planning & Training Tools',
    },
    platformFeatures: {
      title: 'Tools & Satellites',
      subtitle: 'Sport-specific environments, all connected',
    },
    appShowcase: {
      title: 'See your performance, simplified',
      trainingTitle: 'Training',
      trainingSubtitle: 'Plans & Schedules',
      nutrition: 'Nutrition',
      nutritionSubtitle: 'Fuel & Recovery',
      support: 'Support',
      supportSubtitle: 'Coaching & Community',
    },
    whyMembership: {
      title: 'Why membership is required',
      subtitle: 'A membership is not paying for sponsorship—it\'s for credibility, education, and the tools that make real support possible.',
      commitment: 'Commitment',
      commitmentDesc: 'Ensures you\'re serious about your goals',
      science: 'Science',
      scienceDesc: 'Funds education and platform development',
      credibility: 'Credibility',
      credibilityDesc: 'Builds trust with supporters',
      opportunities: 'Opportunities',
      opportunitiesDesc: 'Unlocks brand partnerships & discounts',
    },
    programs: {
      title: 'Programs',
      subtitle: 'Science-based training programs, built to be executed inside the Hub.',
      program1: '4-Week Strength Program for Cyclists',
      program1Desc: 'Gym-based training to improve force production and resilience.',
      program1Tags: 'Strength • Cycling • 4 weeks',
      program2: 'Gym Fundamentals for Runners',
      program2Desc: 'Build a solid strength foundation to support running performance.',
      program2Tags: 'Strength • Running • 4 weeks',
      program3: 'Yoga for Cyclists',
      program3Desc: 'Mobility, balance, and recovery adapted to cycling demands.',
      program3Tags: 'Mobility • Cycling • 4 weeks',
      program4: 'Injury-Resilient Strength for Endurance Athletes',
      program4Desc: 'Strength training focused on long-term performance and durability.',
      program4Tags: 'Strength • Endurance • 4 weeks',
      badge: 'Executed inside the Hub',
      cta: 'Explore programs inside the Hub',
    },
    memberships: {
      title: 'Choose your membership',
      basic: 'Asciende Basic',
      basicPrice: 'Free',
      basicDesc: 'Sign up and access every science-based tool we develop — completely free. Explore training and nutrition planners, habit trackers, and Performance Information.',
      basicNote: 'No training and nutrition planned, no community or brand support.',
      basicCTA: 'Sign up in Asciende Hub',
      intermediate: 'Asciende Intermediate',
      intermediatePrice: '€9.99',
      intermediatePeriod: '/month',
      intermediateYear: '€99.99/year',
      intermediateDesc: 'Science-based training, nutrition, and lifestyle guidance — driven by AI. Receive support from the community and enjoy brand perks.',
      intermediateCTA: 'Join Now',
      pro: 'Asciende PRO',
      proPrice: '€49.99',
      proPeriod: '/month',
      proYear: '€499.99/year',
      proDesc: 'Sport-specific plans designed and evaluated by a coach, with direct contact. Includes all Intermediate benefits plus coaching support. Limited to 50 athletes.',
      proCTA: 'Become PRO',
      coachingTitle: 'Performance Coaching 1:1',
      coachingSubtitle: 'Nutrition, Training, Analysis',
      coachingCTA: 'Coaching 1:1',
      viewDifferences: 'View all differences',
    },
    testimonials: {
      title: 'Asciende PRO Athletes',
      subtitle: 'We provide the tools, insights, and support that help athletes reach their full potential — no matter their sport or starting point. Our mission is to connect driven athletes with science-based planning, performance analytics, and a community that both supports and is supported. #BecomingAsciende',
    },
    ecosystem: {
      title: 'Become a Spotter',
      subtitle: 'Support athletes. Build your brand. Create impact.',
      forAthletes: 'For Athletes',
      forAthletesDesc: 'Access brand discounts, exclusive opportunities, and community support.',
      forBrands: 'For Brands',
      forBrandsDesc: 'Support rising athletes, gain visibility, reach engaged communities.',
      becomeSpotter: 'Become a Spotter',
      forCoaches: 'For Coaches',
      forCoachesDesc: 'Deliver coaching through Asciende. Scale your impact and reach.',
    },
    finalCTA: {
      title: 'Ready to elevate?',
      subtitle: 'Create your Asciende account and start your performance journey today.',
      learnMore: 'Learn more',
      alreadyMember: 'Already a member?',
      logIn: 'Log in to your Hub',
    },
    newsletter: {
      title: 'Subscribe and ride on a wheel.',
      subtitle: 'Receive weekly insights to enhance your performance and master Asciende\'s science-based performance tools.',
      placeholder: 'Enter your email',
      buttonText: 'Subscribe',
      successMessage: 'Welcome to the Asciende community! Check your email for confirmation.',
      errorMessage: 'Something went wrong. Please try again.',
    },
    footer: {
      about: 'Connecting athletes, knowledge, and opportunities globally.',
      platform: 'Platform',
      services: 'Services',
      legal: 'Legal',
      hub: 'Hub',
      tools: 'Tools',
      sports: 'Sports',
      strength: 'Strength Planning',
      nutrition: 'Nutrition Planning',
      endurance: 'Endurance Training',
      support: 'Support',
      privacy: 'Privacy',
      impressum: 'Impressum',
      terms: 'Terms & Conditions',
      cookies: 'Cookies',
      contact: 'Contact',
      copyright: 'All rights reserved. Elevating performance worldwide.',
    },
    about: {
      title: 'Empowering Athletes Through Science and Collaboration',
      subtitle: 'Asciende is a platform uniting sports professionals to enhance athlete performance and opportunities through scientific knowledge and collaborative support, fostering growth in sports science and human performance.',
      transformative: 'Transformative experience for aspiring athletes.',
      behindTitle: 'Behind Asciende',
      whoAmI: 'Who am I?',
      bioStart: 'I am Agustín Hernández, I\'m an athlete dedicated to sports science and human performance.',
      bioDesc: 'With a degree in Nutrition, plus a Master in Sports Physiology and another in High Performance in Sports, my task is to provide services for the improvement of sports performance and bring scientific information to the athletes of this platform',
      whyTitle: 'Why?',
      whyDesc: 'The main reason is to reduce the gap in sporting possibilities that exists between hemispheres or countries where for various reasons access to sport, information or professionalization of athletes',
      howTitle: 'How?',
      howDesc: 'Focusing on three main pillars — access to information, access to quality sports equipment, and the financial resources needed to compete at a high level — I commit to providing scientific knowledge, guides, tools, and ideas. You can join this mission by supporting as a company, or as part of a community that believes in creating more equitable opportunities in sports.',
      companySupport: 'You work for a company and want to support the other pillars?',
      supportText: 'Reach out for inquiries, collaborations, or support in enhancing your sports performance and accessing scientific resources tailored for athletes.',
      engage: 'Engage',
      contact: 'info@asciende.pro',
    },
    blog: {
      title: 'Asciende Stories',
      subtitle: 'Real stories from real athletes pushing their limits',
      readMore: 'Read Story',
      noArticles: 'No articles yet',
      next: 'Next',
      previous: 'Previous',
    },
    base: {
      headline: 'Asciende Academy',
      subheadline: 'Your starting point for science-based performance education',
      description: 'This is where complex concepts become usable tools — and where long-term performance begins.',
      pillars: [
        {
          title: 'Sport-specific guides',
          desc: 'Applied knowledge tailored to real sporting contexts.',
        },
        {
          title: 'Training & methodology courses',
          desc: 'From principles to programming.',
        },
        {
          title: 'Strength & conditioning workshops',
          desc: 'Performance-focused, not trend-driven.',
        },
        {
          title: 'Nutrition education',
          desc: 'Practical decision-making, not dogma.',
        },
      ],
      cta: 'Explore Academy',
      ctaUrl: 'https://academy.asciende.pro',
    },
    comingSoon: {
      title: 'The True All-in-One Platform for Athletes',
      subtitle: 'We\'re building the platform that brings together science-based training, nutrition planning, performance tracking, and community support in one place. Coming soon.',
      cta: 'Stay Tuned',
    },
  },
  es: {
    nav: {
      forAthletes: 'Para Atletas',
      services: 'Servicios de Coaching 1:1',
      trainingPrograms: 'Programas de Entrenamiento',
      coaching1v1: 'Coaching 1:1',
      academy: 'Academia Asciende',
      resources: 'Recursos',
      asciendeProAthletes: 'Atletas Pro Asciende',
      platform: 'Plataforma',
      hub: 'Hub',
      physiologyLab: 'Lab de Fisiología',
      endurancePlanner: 'Planificador de Resistencia',
      nutritionRacePlanner: 'Nutrición & Planificador de Carreras',
      asciendeAcademy: 'Academia',
      motionBiomechanic: 'Motion & Biomecánica',
      performanceVector: 'Performance Vector',
      partnerships: 'Asociaciones',
      performanceTesting: 'Evaluaciones de Rendimiento',
      forBrands: 'Para Marcas',
      about: 'Acerca de',
      login: 'Iniciar sesión',
      createAccount: 'Crear cuenta',
    },
    services: {
      title: 'Coaching 1:1 para Elevar tu Rendimiento, Dondequiera',
      subtitle: 'Porque el entrenamiento excelente no es genérico — es científico, individualizado y construido para la vida real.',
      tagline: 'Fuerza • Nutrición • Resistencia',
      serviceTitle: 'Servicios de Rendimiento',
      strength: 'Programas de Entrenamiento de Fuerza',
      strengthDesc: 'Aumenta tu fuerza con planes de entrenamiento personalizados y basados en ciencia.',
      nutrition: 'Planes de Nutrición y Rendimiento',
      nutritionDesc: 'Alimenta tu rendimiento con planes de nutrición adaptados a tus objetivos.',
      endurance: 'Rendimiento de Resistencia',
      enduranceDesc: 'Corre, pedalea o nada más lejos y fuerte con nuestros planes de entrenamiento de resistencia.',
      howTitle: 'Cómo funciona el Coaching 1:1...',
      howSubtitle: 'Haciendo único a cada atleta.',
      step1Title: '1. Reserva tu consulta gratuita de 20 minutos',
      step1Desc: 'Una breve llamada para entender tus objetivos y ver si somos una buena pareja. Obtendrás claridad sobre qué opción de coaching te conviene — sin presión, sin compromiso.',
      step2Title: '2. Elige tu plan y obtén tu sesión de incorporación',
      step2Desc: 'Si decides unirte, seleccionas tu plan mensual. Luego programamos tu sesión de incorporación de 60 minutos, donde hacemos el análisis completo: historial de entrenamiento, estilo de vida, nutrición, lesiones, objetivos, restricciones y lo que necesitas ahora para comenzar a mejorar.',
      step2Desc2: 'Recibirás tu plan de entrenamiento y nutrición, orientación semanal y acceso completo a la aplicación Asciende HUB. Rastreamos el progreso, ajustamos según sea necesario y construimos rendimiento consistente, semana tras semana.',
      step3Title: '3. Inicia tu programa personalizado',
      ctaTitle: '¿Listo para empezar? Hablemos',
      faqTitle: 'Preguntas frecuentes',
      faq1Title: '¿Qué necesito para empezar?',
      faq1: 'Nada. Solo el deseo de mejorar tu rendimiento, entrenamiento, hábitos y nutrición. Te proporciono todas las herramientas que necesitas — incluyendo la aplicación Asciende HUB, que diseñé basándome en comentarios reales de atletas como tú.',
      faq2Title: '¿Los planes son mensuales?',
      faq2: 'Sí. Todos los planes son mensuales. Los precios varían según cuánto contacto quieras conmigo, la cantidad de trabajo involucrado y con qué frecuencia tu plan pueda necesitar ajustes debido a cambios o eventos inesperados.',
      faq3Title: '¿Cuánta retroalimentación recibo?',
      faq3: 'Depende del servicio que elijas — pero nunca oculto conocimiento. Mi objetivo es siempre el mismo: ayudarte a mejorar de la manera más efectiva y sostenible posible.',
      faq4Title: '¿Necesito la aplicación Asciende?',
      faq4: 'No la necesitas, pero la recomiendo altamente. La aplicación fue construida a partir de las experiencias y necesidades reales de otros atletas, y como atleta de Asciende, obtienes acceso completo de forma gratuita. No usarla simplemente significaría perder — aunque eres libre de usar cualquier otra aplicación que prefieras.',
      testimonials: 'Lo que dicen nuestros atletas',
    },
    forBrands: {
      title: 'Asociarse con Asciende: Rendimiento, Acceso e Impacto Real',
      subtitle: 'Colaboramos con marcas que creen en el poder del deporte, la ciencia y la oportunidad. Traemos la ciencia y los atletas. Juntos, los apoyamos, elevamos comunidades y construimos historias impulsadas por el rendimiento que importan.',
      supportTitle: 'Apoya atletas de dos formas',
      sponsor: '1. Patrocina un atleta directamente',
      sponsorDesc: 'Nos encargamos de la educación científica, entrenamiento, nutrición y coaching. La marca ayuda con recursos para entrenar, competir y crecer. Tu marca se convierte en parte de su historia — y su audiencia se convierte en la tuya.',
      discounts: '2. Ofrece descuentos a toda la comunidad de Asciende',
      discountsDesc: 'Cada atleta se beneficia, incluidos aquellos con recursos limitados. Expandes alcance. Aumentas ventas y construyes lealtad a través de valor significativo.',
      cycle1: 'Los atletas ganan acceso a equipo, nutrición y servicios.',
      cycle2: 'Las marcas ganan visibilidad a través de atletas patrocinados y una oferta impulsada por la comunidad.',
      cycle3: 'La comunidad crece más fuerte y conectada alrededor de tu marca.',
      cycleTitle: 'Esto crea un ciclo poderoso:',
      platformTitle: 'Asciende es la primera plataforma construida para elevar atletas con ciencia, educación y herramientas de rendimiento — y dar a las marcas una forma significativa de apoyar el levantamiento',
      spottersTitle: 'Ya Spotters',
      joinTitle: 'Únete a Asciende como Spotter',
      joinSubtitle1: 'Nosotros proporcionamos el conocimiento,',
      joinSubtitle2: 'La comunidad proporciona la fuerza',
      joinSubtitle3: 'Las marcas proporcionan el levantamiento.',
      joinFinal: 'Juntos, construimos el futuro del deporte',
      spreadingTitle: 'Difundir la palabra es una forma significativa de apoyo.',
    },
    hero: {
      title: 'La Plataforma de Apoyo para Atletas',
      subtitle: 'Una plataforma de rendimiento integrada — con herramientas basadas en ciencia y un sistema para apoyar y ser apoyado.',
      createAccount: 'Crear cuenta',
      login: 'Iniciar sesión',
      activeAthletes: 'Atletas activos',
      countries: 'Países',
      sportSatellites: 'Satélites deportivos',
    },
    foundingOffer: 'Especial para miembros fundadores: 50% DESCUENTO de por vida — Código: Asciende50',
    howItWorks: {
      title: 'Cómo funciona',
      subtitle: 'Tres pasos simples para elevar tu rendimiento',
      step1: 'Comienza Gratis',
      step1Desc: 'Todas nuestras herramientas basadas en ciencia son gratuitas. Descarga el Hub, inicia sesión y explora planificadores de entrenamiento, planificadores de nutrición, rastreadores de hábitos y cápsulas del Resumen de Rendimiento. Esta es nuestra forma de dar a todos acceso a la ciencia del deporte aplicada.',
      step2: 'Elige Tu Membresía',
      step2Desc: 'Ya sea guiado y planificado por un profesional o un sistema basado en ciencia de IA, tu membresía te permite tener todo planificado. Crea tus propios proyectos deportivos y recibe apoyo de la comunidad y socios. Desbloquea planificación avanzada, rastrear tu progreso y conecta con una red diseñada para mejorar el rendimiento.',
      step3: 'Mejora y Apoya a Otros',
      step3Desc: 'Rastrear tus datos, ejecuta tus planes y mejora tu rendimiento. Ayuda a otros a alcanzar su potencial mientras recibes el apoyo que necesitas para progresar.',
    },
    hubShowcase: {
      title: 'Dentro del Hub de Asciende',
      train: 'Entrenar',
      trainDesc: 'Planes de entrenamiento específicos por deporte',
      track: 'Rastrear',
      trackDesc: 'Ve tu progreso en tiempo real',
      learn: 'Aprender',
      learnDesc: 'Educación respaldada por la ciencia',
      connect: 'Conectar',
      connectDesc: 'Coaching y apoyo de marcas',
      neverJump: 'Nunca saltes entre aplicaciones',
      neverJumpDesc: 'Todo lo que necesitas está en un solo lugar. Entrenamiento, nutrición, análisis, coaching — todo accesible desde tu Hub.',
    },
    whyAsciende: {
      title: 'Por qué existe Asciende',
      subtitle1: 'La ciencia del deporte, los datos de rendimiento y el entrenamiento estructurado existen. Pero son caros, fragmentados y difíciles de acceder.',
      subtitle2: 'Asciende cierra esta brecha. Conectamos atletas, conocimiento y oportunidades en una plataforma.',
      athletes: 'Atletas',
      professionals: 'Profesionales',
      brands: 'Marcas',
      asciendeCore: 'El Núcleo del Ecosistema de Rendimiento',
      profToAthlete: 'Conocimiento, entrenamiento y orientación de rendimiento',
      brandsToAthlete: 'Apoyo, oportunidades y patrocinio',
      ascToAthlete: 'Herramientas, datos y ecosistema',
      scienceLabel: 'Ciencia y Análisis',
      partnershipsLabel: 'Asociaciones con Marcas',
      toolsLabel: 'Herramientas de Planificación y Entrenamiento',
    },
    platformFeatures: {
      title: 'Herramientas y Satélites',
      subtitle: 'Entornos específicos por deporte, todos conectados',
    },
    appShowcase: {
      title: 'Ve tu rendimiento, simplificado',
      trainingTitle: 'Entrenamiento',
      trainingSubtitle: 'Planes y Horarios',
      nutrition: 'Nutrición',
      nutritionSubtitle: 'Combustible y Recuperación',
      support: 'Apoyo',
      supportSubtitle: 'Coaching y Comunidad',
    },
    whyMembership: {
      title: 'Por qué se requiere membresía',
      subtitle: 'Una membresía no es pagar por patrocinio—es por credibilidad, educación y las herramientas que hacen posible el apoyo real.',
      commitment: 'Compromiso',
      commitmentDesc: 'Garantiza que te tomas en serio tus objetivos',
      science: 'Ciencia',
      scienceDesc: 'Financia educación y desarrollo de plataforma',
      credibility: 'Credibilidad',
      credibilityDesc: 'Construye confianza con patrocinadores',
      opportunities: 'Oportunidades',
      opportunitiesDesc: 'Desbloquea asociaciones de marcas y descuentos',
    },
    programs: {
      title: 'Programas',
      subtitle: 'Programas de entrenamiento basados en ciencia, diseñados para ser ejecutados dentro del Hub.',
      program1: 'Programa de Fuerza de 4 Semanas para Ciclistas',
      program1Desc: 'Entrenamiento en gimnasio para mejorar la producción de fuerza y la resiliencia.',
      program1Tags: 'Fuerza • Ciclismo • 4 semanas',
      program2: 'Fundamentos de Gimnasio para Corredores',
      program2Desc: 'Construye una sólida base de fuerza para respaldar el rendimiento en carrera.',
      program2Tags: 'Fuerza • Carrera • 4 semanas',
      program3: 'Yoga para Ciclistas',
      program3Desc: 'Movilidad, equilibrio y recuperación adaptados a las demandas del ciclismo.',
      program3Tags: 'Movilidad • Ciclismo • 4 semanas',
      program4: 'Fuerza Resiliente a Lesiones para Atletas de Resistencia',
      program4Desc: 'Entrenamiento de fuerza enfocado en rendimiento a largo plazo y durabilidad.',
      program4Tags: 'Fuerza • Resistencia • 4 semanas',
      badge: 'Ejecutado dentro del Hub',
      cta: 'Explora programas dentro del Hub',
    },
    memberships: {
      title: 'Elige tu membresía',
      basic: 'Asciende Basic',
      basicPrice: 'Gratis',
      basicDesc: 'Regístrate y accede a todas las herramientas científicas que desarrollamos - completamente gratis. Explora planificadores de entrenamiento y nutrición, rastreadores de hábitos e Información de Rendimiento.',
      basicNote: 'Sin entrenamiento y nutrición planificados, sin apoyo comunitario o de marca.',
      basicCTA: 'Regístrate en el Hub de Asciende',
      intermediate: 'Asciende Intermedio',
      intermediatePrice: '€9.99',
      intermediatePeriod: '/mes',
      intermediateYear: '€99.99/año',
      intermediateDesc: 'Orientación científica en entrenamiento, nutrición y estilo de vida - impulsada por IA. Recibe apoyo de la comunidad y disfruta de beneficios de marca.',
      intermediateCTA: 'Únete Ahora',
      pro: 'Asciende PRO',
      proPrice: '€49.99',
      proPeriod: '/mes',
      proYear: '€499.99/año',
      proDesc: 'Planes específicos del deporte diseñados y evaluados por un entrenador, con contacto directo. Incluye todos los beneficios de Intermedio más apoyo de coaching. Limitado a 50 atletas.',
      proCTA: 'Hazte PRO',
      coachingTitle: 'Performance Coaching 1:1',
      coachingSubtitle: 'Nutrición, Entrenamiento, Análisis',
      coachingCTA: 'Coaching 1:1',
      viewDifferences: 'Ver todas las diferencias',
    },
    testimonials: {
      title: 'Atletas PRO de Asciende',
      subtitle: 'Proporcionamos las herramientas, conocimientos y apoyo que ayudan a los atletas a alcanzar su máximo potencial — sin importar su deporte o punto de partida. Nuestra misión es conectar atletas impulsados con planificación basada en ciencia, análisis de rendimiento y una comunidad que se apoya y es apoyada. #BecomingAsciende',
    },
    ecosystem: {
      title: 'Conviértete en un Spotter',
      subtitle: 'Apoya atletas. Construye tu marca. Crea impacto.',
      forAthletes: 'Para Atletas',
      forAthletesDesc: 'Accede a descuentos de marcas, oportunidades exclusivas y apoyo comunitario.',
      forBrands: 'Para Marcas',
      forBrandsDesc: 'Apoya atletas en ascenso, gana visibilidad, llega a comunidades comprometidas.',
      becomeSpotter: 'Convertirse en Spotter',
      forCoaches: 'Para Entrenadores',
      forCoachesDesc: 'Entrega coaching a través de Asciende. Escala tu impacto y alcance.',
    },
    finalCTA: {
      title: '¿Listo para elevarte?',
      subtitle: 'Crea tu cuenta de Asciende e inicia tu viaje de rendimiento hoy.',
      learnMore: 'Saber más',
      alreadyMember: '¿Ya eres miembro?',
      logIn: 'Inicia sesión en tu Hub',
    },
    newsletter: {
      title: 'Suscríbete y rueda sobre una rueda.',
      subtitle: 'Recibe información semanal para mejorar tu rendimiento y domina las herramientas de rendimiento basadas en ciencia de Asciende.',
      placeholder: 'Ingresa tu email',
      buttonText: 'Suscribirse',
      successMessage: '¡Bienvenido a la comunidad de Asciende! Revisa tu email para confirmar.',
      errorMessage: 'Algo salió mal. Por favor intenta de nuevo.',
    },
    footer: {
      about: 'Conectando atletas, conocimiento y oportunidades globalmente.',
      platform: 'Plataforma',
      services: 'Servicios',
      legal: 'Legal',
      hub: 'Hub',
      tools: 'Herramientas',
      sports: 'Deportes',
      strength: 'Planes de Fuerza',
      nutrition: 'Planes de Nutrición',
      endurance: 'Entrenamiento de Resistencia',
      support: 'Apoyo',
      privacy: 'Privacidad',
      impressum: 'Impressum',
      terms: 'Términos y Condiciones',
      cookies: 'Cookies',
      contact: 'Contacto',
      copyright: 'Todos los derechos reservados. Elevando rendimiento a nivel mundial.',
    },
    about: {
      title: 'Empoderando atletas a través de la ciencia y la colaboración',
      subtitle: 'Asciende es una plataforma que une profesionales del deporte para mejorar el rendimiento y las oportunidades de los atletas a través del conocimiento científico y el apoyo colaborativo, fomentando el crecimiento en ciencia del deporte y desempeño humano.',
      transformative: 'Experiencia transformadora para atletas aspirantes.',
      behindTitle: 'Detrás de Asciende',
      whoAmI: '¿Quién soy?',
      bioStart: 'Soy Agustín Hernández, soy un atleta dedicado a la ciencia del deporte y el rendimiento humano.',
      bioDesc: 'Con una licenciatura en Nutrición, más una Maestría en Fisiología del Deporte y otra en Alto Rendimiento en Deportes, mi tarea es proporcionar servicios para la mejora del rendimiento deportivo y llevar información científica a los atletas de esta plataforma',
      whyTitle: '¿Por qué?',
      whyDesc: 'La razón principal es reducir la brecha en las posibilidades deportivas que existe entre hemisferios o países donde por diversas razones el acceso al deporte, la información o la profesionalización de atletas',
      howTitle: '¿Cómo?',
      howDesc: 'Enfocándome en tres pilares principales — acceso a la información, acceso a equipo deportivo de calidad y los recursos financieros necesarios para competir a alto nivel — me comprometo a proporcionar conocimiento científico, guías, herramientas e ideas. Puedes unirte a esta misión apoyando como empresa, o como parte de una comunidad que cree en crear oportunidades más equitativas en el deporte.',
      companySupport: '¿Trabajas para una empresa y quieres apoyar los otros pilares?',
      supportText: 'Comunícate para consultas, colaboraciones o apoyo en la mejora de tu rendimiento deportivo y el acceso a recursos científicos adaptados para atletas.',
      engage: 'Comunícate',
      contact: 'info@asciende.pro',
    },
    blog: {
      title: 'Historias Asciende',
      subtitle: 'Historias reales de atletas reales empujando sus límites',
      readMore: 'Leer Historia',
      noArticles: 'Sin artículos aún',
      next: 'Siguiente',
      previous: 'Anterior',
    },
    base: {
      headline: 'BASE — El cimiento del conocimiento de rendimiento',
      subheadline: 'BASE es el núcleo educativo de Asciende. Una base de conocimientos en crecimiento diseñada para traducir la ciencia del deporte en comprensión práctica para atletas, entrenadores y profesionales.',
      description: 'Aquí es donde los conceptos complejos se convierten en herramientas utilizables — y donde comienza el rendimiento a largo plazo.',
      pillars: [
        {
          title: 'Guías específicas por deporte',
          desc: 'Conocimiento aplicado adaptado a contextos deportivos reales.',
        },
        {
          title: 'Cursos de entrenamiento y metodología',
          desc: 'Desde principios hasta programación.',
        },
        {
          title: 'Talleres de fuerza y acondicionamiento',
          desc: 'Enfocado en rendimiento, no en tendencias.',
        },
        {
          title: 'Educación en nutrición',
          desc: 'Toma de decisiones práctica, no dogma.',
        },
        {
          title: 'Análisis de rendimiento',
          desc: 'Comprender datos sin necesidad de laboratorio.',
        },
        {
          title: 'Actualizaciones continuas',
          desc: 'Nuevo contenido agregado cada mes a medida que evoluciona la plataforma.',
        },
      ],
      statement: 'BASE no se trata de coleccionar certificados. Se trata de construir un marco para pensar, entrenar y decidir mejor.',
      cta: 'Explorar BASE',
    },
    comingSoon: {
      title: 'La verdadera plataforma all-in-one para los deportistas',
      subtitle: 'Estamos construyendo la plataforma que une entrenamiento basado en ciencia, planificación de nutrición, seguimiento de rendimiento y apoyo comunitario en un solo lugar. Próximamente.',
      cta: 'Manténte atento',
    },
  },
};

type Page = 'home' | 'services' | 'training-programs' | 'coaching-1v1' | 'academy' | 'resources' | 'platform' | 'hub' | 'physiology-lab' | 'cycling-planner' | 'running-planner' | 'race-planner' | 'beach-volley' | 'for-brands' | 'about' | 'strength-planning' | 'nutrition-planning' | 'endurance-planning' | 'performance-testing' | 'privacy-policy' | 'support' | 'impressum' | 'terms' | 'cookies' | 'refund-policy' | 'delete-account' | 'coming-soon' | 'docs';

const pageToPath: Record<Page, string> = {
  home: '/',
  services: '/services',
  'training-programs': '/training-programs',
  'coaching-1v1': '/coaching-1v1',
  academy: '/academy',
  resources: '/resources',
  platform: '/platform',
  hub: '/hub',
  'physiology-lab': '/physiology-lab',
  'cycling-planner': '/cycling-planner',
  'running-planner': '/running-planner',
  'race-planner': '/race-planner',
  'beach-volley': '/beach-volley',
  'for-brands': '/for-brands',
  about: '/about',
  'strength-planning': '/strength-planning',
  'nutrition-planning': '/nutrition-planning',
  'endurance-planning': '/endurance-planning',
  'performance-testing': '/performance-testing',
  'privacy-policy': '/privacy-policy',
  support: '/support',
  impressum: '/impressum',
  terms: '/terms',
  cookies: '/cookies',
  'refund-policy': '/refund-policy',
  'delete-account': '/delete-account',
  'coming-soon': '/coming-soon',
  docs: '/docs',
};

const pathToPage: Record<string, Page> = Object.entries(pageToPath).reduce(
  (acc, [page, path]) => {
    acc[path] = page as Page;
    return acc;
  },
  {} as Record<string, Page>
);

export default function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [language, setLanguage] = useState<Language>('en');
  const [currentPage, setCurrentPageState] = useState<Page>(() => {
    const pathname = window.location.pathname;
    if (pathname === '/docs' || pathname.startsWith('/docs/')) return 'docs';
    return pathToPage[pathname] || 'home';
  });
  const [docsSlug, setDocsSlug] = useState<string>(() => {
    const pathname = window.location.pathname;
    if (pathname.startsWith('/docs/')) return pathname.replace('/docs/', '');
    return '';
  });
  const [storyPostId, setStoryPostId] = useState<string | null>(null);
  const [showStoriesPage, setShowStoriesPage] = useState(() => window.location.pathname === '/stories/');
  const [adminUser, setAdminUser] = useState<any>(null);
  const [adminLoading, setAdminLoading] = useState(true);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const t = translations[language];

  const setCurrentPage = (page: Page) => {
    setCurrentPageState(page);
    setStoryPostId(null);
    setShowStoriesPage(false);
    const path = pageToPath[page];
    window.history.pushState(null, '', path);
  };

  const openStory = (postId: string, categorySlug: string, postSlug: string) => {
    setStoryPostId(postId);
    setShowStoriesPage(false);
    window.history.pushState(null, '', `/stories/${categorySlug}/${postSlug}`);
  };

  const closeStory = () => {
    setStoryPostId(null);
    if (showStoriesPage) {
      window.history.pushState(null, '', '/stories/');
    } else {
      window.history.pushState(null, '', '/');
    }
  };

  const openStoriesPage = () => {
    setShowStoriesPage(true);
    setStoryPostId(null);
    window.history.pushState(null, '', '/stories/');
    window.scrollTo(0, 0);
  };

  const closeStoriesPage = () => {
    setShowStoriesPage(false);
    setStoryPostId(null);
    window.history.pushState(null, '', '/');
    window.scrollTo(0, 0);
  };

  useEffect(() => {
    checkAdminAuth();

    const handlePopState = () => {
      const pathname = window.location.pathname;
      if (pathname === '/stories/') {
        setShowStoriesPage(true);
        setStoryPostId(null);
        return;
      }
      setShowStoriesPage(false);
      setStoryPostId(null);
      const page = pathToPage[pathname] || 'home';
      setCurrentPageState(page);
    };

    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setShowAdminLogin(true);
      }
    };

    window.addEventListener('popstate', handlePopState);
    window.addEventListener('hashchange', handleHashChange);

    if (window.location.hash === '#admin') {
      setShowAdminLogin(true);
    }

    return () => {
      window.removeEventListener('popstate', handlePopState);
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session?.user?.email === 'admin@asciende.pro') {
        setAdminUser(session.user);
      } else {
        setAdminUser(null);
      }
      setAdminLoading(false);
    });
    return () => subscription?.unsubscribe();
  }, []);

  const checkAdminAuth = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user?.email === 'admin@asciende.pro') {
        setAdminUser(session.user);
      } else {
        setAdminUser(null);
      }
    } catch (error) {
      console.error('Error checking auth:', error);
      setAdminUser(null);
    } finally {
      setAdminLoading(false);
    }
  };

  const handleAdminLogout = async () => {
    await supabase.auth.signOut();
    setAdminUser(null);
    window.location.hash = '';
  };

  const handleAdminLoginSuccess = (user: any) => {
    setAdminUser(user);
    setShowAdminLogin(false);
  };

  if (adminUser && !adminLoading) {
    return <AdminDashboard user={adminUser} onLogout={handleAdminLogout} t={t} />;
  }

  if (showAdminLogin && !adminLoading) {
    return <AdminLogin onLoginSuccess={handleAdminLoginSuccess} t={t} />;
  }

  if (adminLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <img src="/logo_transp.png" alt="Asciende" className="h-12 w-auto mx-auto mb-4" />
          <p className="text-gray-600 font-jost">Loading...</p>
        </div>
      </div>
    );
  }

  // Stories archive page
  if (showStoriesPage && !storyPostId) {
    return (
      <div className="min-h-screen bg-white font-jost">
        <StoriesPage language={language} onOpenStory={openStory} onBack={closeStoriesPage} />
      </div>
    );
  }

  // Story page as a full-screen overlay
  if (storyPostId) {
    return (
      <div className="min-h-screen bg-white font-jost">
        <BlogStoryPage postId={storyPostId} language={language} onClose={closeStory} />
      </div>
    );
  }

  // Docs is a full-screen experience with its own navigation
  if (currentPage === 'docs') {
    return (
      <div className="font-jost">
        <DocsLayout initialSlug={docsSlug || undefined} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white font-jost">
      <Navigation isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} language={language} setLanguage={setLanguage} t={t} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      {currentPage === 'home' && (
        <>
          <Hero language={language} t={t} />
          <WhatIGet />
          <HowItWorks t={t} />
          <Memberships t={t} />
          <WhyMembership t={t} />
          <Programs t={t} />
          <Testimonials t={t} />
          <BASE t={t} />
          <Blog t={t} language={language} onOpenStory={openStory} onViewAll={openStoriesPage} />
          <FinalCTA t={t} />
          <Newsletter
            title={t.newsletter.title}
            subtitle={t.newsletter.subtitle}
            placeholder={t.newsletter.placeholder}
            buttonText={t.newsletter.buttonText}
            successMessage={t.newsletter.successMessage}
            errorMessage={t.newsletter.errorMessage}
          />
        </>
      )}
      {currentPage === 'services' && <Services t={t} setCurrentPage={setCurrentPage} />}
      {currentPage === 'training-programs' && <TrainingPrograms t={t} />}
      {currentPage === 'coaching-1v1' && <Coaching1v1 t={t} />}
      {currentPage === 'academy' && <Academy t={t} />}
      {currentPage === 'resources' && <Resources t={t} />}
      {currentPage === 'asciende-pro-athletes' && <AsciendeProAthletes t={t} />}
      {currentPage === 'strength-planning' && <StrengthPlanning />}
      {currentPage === 'nutrition-planning' && <NutritionPlanning />}
      {currentPage === 'endurance-planning' && <EndurancePlanning />}
      {currentPage === 'performance-testing' && <PerformanceTesting />}
      {currentPage === 'platform' && <PlatformHome t={t} />}
      {currentPage === 'hub' && <Hub t={t} />}
      {currentPage === 'physiology-lab' && <PhysiologyLab t={t} />}
      {currentPage === 'cycling-planner' && <CyclingPlanner t={t} />}
      {currentPage === 'running-planner' && <RunningPlanner t={t} />}
      {currentPage === 'race-planner' && <RacePlanner t={t} />}
      {currentPage === 'beach-volley' && <BeachVolley t={t} />}
      {currentPage === 'for-brands' && <ForBrands t={t} />}
      {currentPage === 'about' && <About t={t} />}
      {currentPage === 'privacy-policy' && <PrivacyPolicy />}
      {currentPage === 'support' && <Support />}
      {currentPage === 'impressum' && <Impressum />}
      {currentPage === 'terms' && <TermsAndConditions />}
      {currentPage === 'cookies' && <CookiePolicy />}
      {currentPage === 'refund-policy' && <RefundPolicy />}
      {currentPage === 'delete-account' && <DeleteAccount />}
      {currentPage === 'coming-soon' && <ComingSoon t={t} />}
      <Footer t={t} currentPage={currentPage} setCurrentPage={setCurrentPage} />
      <CookieBanner />
    </div>
  );
}

function Navigation({ isMenuOpen, setIsMenuOpen, language, setLanguage, t, currentPage, setCurrentPage }) {
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [isAthletesOpen, setIsAthletesOpen] = useState(false);
  const [isPlatformOpen, setIsPlatformOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setIsAthletesOpen(false);
        setIsPlatformOpen(false);
        setIsLangOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  function toggleAthletes() {
    setIsAthletesOpen(v => !v);
    setIsPlatformOpen(false);
    setIsLangOpen(false);
  }
  function togglePlatform() {
    setIsPlatformOpen(v => !v);
    setIsAthletesOpen(false);
    setIsLangOpen(false);
  }
  function toggleLang() {
    setIsLangOpen(v => !v);
    setIsAthletesOpen(false);
    setIsPlatformOpen(false);
  }

  return (
    <nav ref={navRef} className="fixed w-full bg-white shadow-sm z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="hidden md:flex items-center gap-8 flex-1">
            <div className="relative">
              <button
                onClick={toggleAthletes}
                className="text-sm font-jost font-medium hover:text-asciende-purple transition flex items-center gap-1"
              >
                {t.nav.forAthletes}
                <ChevronDown size={14} className={`transition-transform duration-200 ${isAthletesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isAthletesOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <button
                    onClick={() => { setCurrentPage('services'); setIsAthletesOpen(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 font-jost text-sm hover:text-asciende-purple transition"
                  >
                    {t.nav.services}
                  </button>
                  <a
                    href="https://academy.asciende.pro"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setIsAthletesOpen(false)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 font-jost text-sm hover:text-asciende-purple transition border-t border-gray-100"
                  >
                    {t.nav.academy}
                  </a>
                  <button
                    onClick={() => { setCurrentPage('resources'); setIsAthletesOpen(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 font-jost text-sm hover:text-asciende-purple transition border-t border-gray-100"
                  >
                    {t.nav.resources}
                  </button>
                  <button
                    onClick={() => { setCurrentPage('asciende-pro-athletes'); setIsAthletesOpen(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 font-jost text-sm hover:text-asciende-purple transition border-t border-gray-100"
                  >
                    {t.nav.asciendeProAthletes}
                  </button>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={togglePlatform}
                className="text-sm font-jost font-medium hover:text-asciende-purple transition flex items-center gap-1"
              >
                {t.nav.platform}
                <ChevronDown size={14} className={`transition-transform duration-200 ${isPlatformOpen ? 'rotate-180' : ''}`} />
              </button>
              {isPlatformOpen && (
                <div className="absolute left-0 mt-2 w-60 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <a
                    href="https://hub.asciende.pro"
                    onClick={() => setIsPlatformOpen(false)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 font-jost text-sm hover:text-asciende-purple transition"
                  >
                    {t.nav.hub}
                  </a>
                  <a
                    href="https://lab.asciende.pro"
                    onClick={() => setIsPlatformOpen(false)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 font-jost text-sm hover:text-asciende-purple transition border-t border-gray-100"
                  >
                    {t.nav.physiologyLab}
                  </a>
                  <a
                    href="https://endurance.asciende.pro"
                    onClick={() => setIsPlatformOpen(false)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 font-jost text-sm hover:text-asciende-purple transition border-t border-gray-100"
                  >
                    {t.nav.endurancePlanner}
                  </a>
                  <a
                    href="https://nutrition.asciende.pro"
                    onClick={() => setIsPlatformOpen(false)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 font-jost text-sm hover:text-asciende-purple transition border-t border-gray-100"
                  >
                    {t.nav.nutritionRacePlanner}
                  </a>
                  <a
                    href="https://academy.asciende.pro"
                    onClick={() => setIsPlatformOpen(false)}
                    className="block w-full text-left px-4 py-2 hover:bg-gray-50 font-jost text-sm hover:text-asciende-purple transition border-t border-gray-100"
                  >
                    {t.nav.asciendeAcademy}
                  </a>
                  <span className="block w-full text-left px-4 py-2 font-jost text-sm text-gray-400 border-t border-gray-100 cursor-not-allowed">
                    {t.nav.motionBiomechanic} (Dev)
                  </span>
                  <span className="block w-full text-left px-4 py-2 font-jost text-sm text-gray-400 border-t border-gray-100 cursor-not-allowed">
                    {t.nav.performanceVector} (Dev)
                  </span>
                </div>
              )}
            </div>
            <button onClick={() => setCurrentPage('performance-testing')} className="text-sm font-jost font-medium hover:text-asciende-purple transition">
              {t.nav.performanceTesting}
            </button>
            <button onClick={() => setCurrentPage('about')} className="text-sm font-jost font-medium hover:text-asciende-purple transition">
              {t.nav.about}
            </button>
          </div>

          <div className="flex items-center justify-center">
            <a href="#" className="flex items-center gap-2">
              <img src="/logo_transp.png" alt="Asciende" className="h-10 w-auto" />
            </a>
          </div>

          <div className="hidden md:flex items-center gap-8 flex-1 justify-end">
            <div className="relative">
              <button
                onClick={toggleLang}
                className="flex items-center gap-2 text-sm font-jost font-medium text-gray-600 hover:text-gray-900 transition"
              >
                <Globe size={18} />
                {language.toUpperCase()}
              </button>
              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-32 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                  <button
                    onClick={() => { setLanguage('en'); setIsLangOpen(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 font-jost text-sm hover:text-asciende-purple transition"
                  >
                    English
                  </button>
                  <button
                    onClick={() => { setLanguage('es'); setIsLangOpen(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 font-jost text-sm hover:text-asciende-purple transition border-t border-gray-100"
                  >
                    Español
                  </button>
                </div>
              )}
            </div>
            <a href="#admin" onClick={(e) => { e.preventDefault(); window.location.hash = '#admin'; }} className="text-xs font-jost text-gray-400 hover:text-gray-600 transition">
              ▸
            </a>
            <a href="https://hub.asciende.pro" className="text-sm font-jost font-medium text-gray-600 hover:text-gray-900">
              {t.nav.login}
            </a>
            <a href="https://hub.asciende.pro" className="bg-asciende-purple text-white px-6 py-2 rounded-full font-jost font-semibold hover:opacity-90 transition inline-block">
              {t.nav.createAccount}
            </a>
          </div>

          <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <div className="relative">
              <button
                onClick={toggleAthletes}
                className="block w-full text-left text-sm font-jost font-medium py-2 hover:text-asciende-purple flex items-center justify-between"
              >
                {t.nav.forAthletes}
                <ChevronDown size={14} className={`transition-transform duration-200 ${isAthletesOpen ? 'rotate-180' : ''}`} />
              </button>
              {isAthletesOpen && (
                <div className="ml-4 space-y-1 bg-gray-50 rounded p-2">
                  <button
                    onClick={() => { setCurrentPage('services'); setIsMenuOpen(false); setIsAthletesOpen(false); }}
                    className="block w-full text-left text-sm font-jost text-gray-600 py-1 hover:text-asciende-purple transition"
                  >
                    {t.nav.services}
                  </button>
                  <a
                    href="https://academy.asciende.pro"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => { setIsMenuOpen(false); setIsAthletesOpen(false); }}
                    className="block w-full text-left text-sm font-jost text-gray-600 py-1 hover:text-asciende-purple transition"
                  >
                    {t.nav.academy}
                  </a>
                  <button
                    onClick={() => { setCurrentPage('resources'); setIsMenuOpen(false); setIsAthletesOpen(false); }}
                    className="block w-full text-left text-sm font-jost text-gray-600 py-1 hover:text-asciende-purple transition"
                  >
                    {t.nav.resources}
                  </button>
                  <button
                    onClick={() => { setCurrentPage('asciende-pro-athletes'); setIsMenuOpen(false); setIsAthletesOpen(false); }}
                    className="block w-full text-left text-sm font-jost text-gray-600 py-1 hover:text-asciende-purple transition"
                  >
                    {t.nav.asciendeProAthletes}
                  </button>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={togglePlatform}
                className="block w-full text-left text-sm font-jost font-medium py-2 hover:text-asciende-purple flex items-center justify-between"
              >
                {t.nav.platform}
                <ChevronDown size={14} className={`transition-transform duration-200 ${isPlatformOpen ? 'rotate-180' : ''}`} />
              </button>
              {isPlatformOpen && (
                <div className="ml-4 space-y-1 bg-gray-50 rounded p-2">
                  <a
                    href="https://hub.asciende.pro"
                    onClick={() => { setIsMenuOpen(false); setIsPlatformOpen(false); }}
                    className="block w-full text-left text-sm font-jost text-gray-600 py-1 hover:text-asciende-purple transition"
                  >
                    {t.nav.hub}
                  </a>
                  <a
                    href="https://lab.asciende.pro"
                    onClick={() => { setIsMenuOpen(false); setIsPlatformOpen(false); }}
                    className="block w-full text-left text-sm font-jost text-gray-600 py-1 hover:text-asciende-purple transition"
                  >
                    {t.nav.physiologyLab}
                  </a>
                  <a
                    href="https://endurance.asciende.pro"
                    onClick={() => { setIsMenuOpen(false); setIsPlatformOpen(false); }}
                    className="block w-full text-left text-sm font-jost text-gray-600 py-1 hover:text-asciende-purple transition"
                  >
                    {t.nav.endurancePlanner}
                  </a>
                  <a
                    href="https://nutrition.asciende.pro"
                    onClick={() => { setIsMenuOpen(false); setIsPlatformOpen(false); }}
                    className="block w-full text-left text-sm font-jost text-gray-600 py-1 hover:text-asciende-purple transition"
                  >
                    {t.nav.nutritionRacePlanner}
                  </a>
                  <a
                    href="https://academy.asciende.pro"
                    onClick={() => { setIsMenuOpen(false); setIsPlatformOpen(false); }}
                    className="block w-full text-left text-sm font-jost text-gray-600 py-1 hover:text-asciende-purple transition"
                  >
                    {t.nav.asciendeAcademy}
                  </a>
                  <span className="block w-full text-left text-sm font-jost text-gray-400 py-1 cursor-not-allowed">
                    {t.nav.motionBiomechanic} (Dev)
                  </span>
                  <span className="block w-full text-left text-sm font-jost text-gray-400 py-1 cursor-not-allowed">
                    {t.nav.performanceVector} (Dev)
                  </span>
                </div>
              )}
            </div>
            <button onClick={() => { setCurrentPage('performance-testing'); setIsMenuOpen(false); }} className="block w-full text-left text-sm font-jost font-medium py-2 hover:text-asciende-purple">
              {t.nav.performanceTesting}
            </button>
            <button onClick={() => { setCurrentPage('for-brands'); setIsMenuOpen(false); }} className="block w-full text-left text-sm font-jost font-medium py-2 hover:text-asciende-purple">
              {t.nav.forBrands}
            </button>
            <button onClick={() => { setCurrentPage('about'); setIsMenuOpen(false); }} className="block w-full text-left text-sm font-jost font-medium py-2 hover:text-asciende-purple">
              {t.nav.about}
            </button>
            <div className="relative my-2">
              <button
                onClick={toggleLang}
                className="flex items-center gap-2 text-sm font-jost font-medium text-gray-600 hover:text-gray-900 transition w-full py-2"
              >
                <Globe size={18} />
                {language.toUpperCase()}
              </button>
              {isLangOpen && (
                <div className="absolute left-0 mt-1 w-full bg-white rounded-lg shadow-lg border border-gray-200">
                  <button
                    onClick={() => { setLanguage('en'); setIsLangOpen(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 font-jost text-sm hover:text-asciende-purple transition"
                  >
                    English
                  </button>
                  <button
                    onClick={() => { setLanguage('es'); setIsLangOpen(false); }}
                    className="w-full text-left px-4 py-2 hover:bg-gray-50 font-jost text-sm hover:text-asciende-purple transition border-t border-gray-100"
                  >
                    Español
                  </button>
                </div>
              )}
            </div>
            <a href="https://hub.asciende.pro" className="w-full bg-asciende-purple text-white px-4 py-2 rounded-full font-jost font-semibold hover:opacity-90 transition block text-center">
              {t.nav.createAccount}
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}

function Hero({ language, t }) {
  return (
    <div>
      <div className="relative h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="relative w-full h-full">
            <iframe
              className="w-full h-full"
              src="https://www.youtube.com/embed/Xyw-1WmgmHM?autoplay=1&mute=1&controls=0&loop=1&playlist=Xyw-1WmgmHM"
              title="Asciende - The Athletes Support Platform"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
            <div className="absolute inset-0 bg-black/30"></div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent via-80% to-white"></div>
          </div>
        </div>

        <div className="relative z-10 h-full flex flex-col items-center px-4 sm:px-6 lg:px-8 pt-[45vh]">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-7xl text-white font-krona font-bold mb-6 leading-tight drop-shadow-lg">
              {t.hero.title}
            </h1>
            <p className="text-xl md:text-2xl text-white font-jost mb-8 leading-relaxed font-medium drop-shadow-lg max-w-2xl mx-auto">
              {t.hero.subtitle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="https://hub.asciende.pro" className="bg-asciende-yellow text-asciende-purple px-10 py-4 rounded-full font-krona font-bold text-lg hover:shadow-xl transition inline-flex items-center justify-center">
                {t.hero.createAccount}
              </a>
              <a href="https://hub.asciende.pro" className="border-2 border-white text-white px-10 py-4 rounded-full font-krona font-bold text-lg hover:bg-white/10 transition inline-flex items-center justify-center">
                {t.hero.login}
              </a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}

function FoundingBanner({ t }) {
  return (
    <div className="bg-asciende-yellow py-6 px-4 sm:px-6 lg:px-8 text-center">
      <p className="font-jost font-bold text-asciende-purple text-lg">
        {t.foundingOffer}
      </p>
    </div>
  );
}


function HubShowcase({ t }) {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        <div>
          <h2 className="text-5xl md:text-6xl font-krona font-bold mb-8 text-asciende-purple leading-tight">
            {t.hubShowcase.title}
          </h2>
          <p className="text-xl text-gray-700 font-jost mb-8 leading-relaxed">
            See your progress, access science-backed plans, and never miss a step. Your Asciende membership brings it all together.
          </p>
          <div className="space-y-4">
            <HubItem icon="🏋️" title={t.hubShowcase.train} desc={t.hubShowcase.trainDesc} />
            <HubItem icon="📊" title={t.hubShowcase.track} desc={t.hubShowcase.trackDesc} />
            <HubItem icon="🥗" title={t.hubShowcase.learn} desc={t.hubShowcase.learnDesc} />
            <HubItem icon="🤝" title={t.hubShowcase.connect} desc={t.hubShowcase.connectDesc} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-asciende-purple to-asciende-purple/50 rounded-3xl p-12 h-96 flex items-center justify-center">
          <div className="text-center text-white">
            <p className="text-6xl font-krona font-bold mb-4">One Hub.</p>
            <p className="text-xl font-jost">Everything you need.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function HubItem({ icon, title, desc }) {
  return (
    <div className="flex gap-4">
      <div className="text-3xl">{icon}</div>
      <div>
        <p className="font-krona font-bold text-asciende-purple">{title}</p>
        <p className="text-gray-600 font-jost">{desc}</p>
      </div>
    </div>
  );
}

function WhyAsciendeDiagram({ t }) {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const nodes = [
    {
      id: 'athletes',
      label: t.whyAsciende.athletes || 'Athletes',
      angle: -90,
      radius: 200,
      color: '#fdda36',
      darkColor: '#e6c420',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-8 h-8 text-white">
          <path d="M13 4a1 1 0 1 0 2 0 1 1 0 0 0-2 0M7 20l4-6 3 3 2-3 3 4M3 16l4-4 2 2 2-2"/>
        </svg>
      ),
    },
    {
      id: 'professionals',
      label: t.whyAsciende.professionals || 'Professionals',
      angle: 30,
      radius: 200,
      color: '#60a5fa',
      darkColor: '#3b82f6',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-8 h-8 text-white">
          <path d="M9 3H5a2 2 0 0 0-2 2v4m6-6h10a2 2 0 0 1 2 2v4M9 3v18m0 0h10a2 2 0 0 0 2-2V9M9 21H5a2 2 0 0 1-2-2V9m0 0h18"/>
        </svg>
      ),
    },
    {
      id: 'brands',
      label: t.whyAsciende.brands || 'Brands',
      angle: 150,
      radius: 200,
      color: '#34d399',
      darkColor: '#10b981',
      icon: (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-8 h-8 text-white">
          <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/>
          <line x1="7" y1="7" x2="7.01" y2="7"/>
        </svg>
      ),
    },
  ];

  const connections = [
    {
      from: 'professionals',
      to: 'athletes',
      label: t.whyAsciende.profToAthlete || 'Knowledge, training & performance guidance',
      toolLabel: t.whyAsciende.scienceLabel || 'Science & Analytics'
    },
    {
      from: 'brands',
      to: 'athletes',
      label: t.whyAsciende.brandsToAthlete || 'Support, opportunities & sponsorship',
      toolLabel: t.whyAsciende.partnershipsLabel || 'Brand Partnerships'
    },
    {
      from: 'asciende',
      to: 'athletes',
      label: t.whyAsciende.ascToAthlete || 'Tools, data & ecosystem',
      toolLabel: t.whyAsciende.toolsLabel || 'Planning & Training Tools'
    },
  ];

  const getPos = (angle: number, radius: number) => {
    const rad = (angle * Math.PI) / 180;
    return { x: Math.cos(rad) * radius, y: Math.sin(rad) * radius };
  };

  const cx = 300, cy = 300;

  return (
    <>
      <div className="relative w-full flex items-center justify-center" style={{ height: '600px' }}>

        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 600 600"
          preserveAspectRatio="xMidYMid meet"
        >
          <defs>
            <radialGradient id="centerGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="#514163" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#514163" stopOpacity="0" />
            </radialGradient>
            {nodes.map(node => {
              const pos = getPos(node.angle, node.radius);
              const x1 = cx, y1 = cy;
              const x2 = cx + pos.x, y2 = cy + pos.y;
              return (
                <linearGradient key={`grad-${node.id}`} id={`lineGrad-${node.id}`} x1={x1} y1={y1} x2={x2} y2={y2} gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#514163" stopOpacity="0.8" />
                  <stop offset="100%" stopColor={node.color} stopOpacity="0.9" />
                </linearGradient>
              );
            })}
            <filter id="glow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
            </filter>
          </defs>

          <circle cx={cx} cy={cy} r="220" fill="url(#centerGlow)" />
          <circle cx={cx} cy={cy} r="200" fill="none" stroke="#514163" strokeWidth="1" strokeOpacity="0.12" strokeDasharray="4 8" />
          <circle cx={cx} cy={cy} r="120" fill="none" stroke="#fdda36" strokeWidth="0.8" strokeOpacity="0.2" strokeDasharray="3 6" />

          {nodes.map(node => {
            const pos = getPos(node.angle, node.radius);
            const x2 = cx + pos.x, y2 = cy + pos.y;
            const isHovered = hoveredNode === node.id;
            return (
              <g key={`conn-${node.id}`}>
                <line
                  x1={cx} y1={cy} x2={x2} y2={y2}
                  stroke={`url(#lineGrad-${node.id})`}
                  strokeWidth={isHovered ? "3" : "1.5"}
                  opacity={isHovered ? "1" : "0.5"}
                  strokeDasharray={isHovered ? "none" : "6 4"}
                  style={{ transition: 'all 0.3s ease' }}
                  filter={isHovered ? "url(#glow)" : "none"}
                />
                {isHovered && (
                  <circle cx={(cx + x2) / 2} cy={(cy + y2) / 2} r="4" fill={node.color} opacity="0.9" filter="url(#glow)" />
                )}
              </g>
            );
          })}
        </svg>

        <div className="absolute inset-0 flex items-center justify-center pointer-events-none" style={{ top: 0, left: '50%', transform: 'translateX(-50%)', width: '600px', height: '600px', position: 'absolute' }}>
          <div className="animate-spin-slow opacity-[0.07]" style={{ width: '340px', height: '340px' }}>
            <img src="/asciendefavicon.png" alt="" className="w-full h-full object-contain" />
          </div>
        </div>

        <div
          className="absolute z-20"
          style={{ left: '50%', top: '50%', transform: 'translate(-50%, -50%)' }}
          onMouseEnter={() => setHoveredNode('asciende')}
          onMouseLeave={() => setHoveredNode(null)}
        >
          <div className="relative">
            <div className={`relative w-28 h-28 md:w-32 md:h-32 rounded-full flex items-center justify-center transition-all duration-500 cursor-pointer ${
              hoveredNode === 'asciende'
                ? 'shadow-[0_0_60px_rgba(81,65,99,0.6)] scale-110'
                : 'shadow-[0_0_30px_rgba(81,65,99,0.25)]'
            }`}
              style={{ background: 'radial-gradient(circle at 35% 35%, #6b5580, #514163 60%, #3a2f48)' }}
            >
              <div className="absolute inset-0 rounded-full border border-asciende-yellow/30" />
              <div className="absolute inset-2 rounded-full border border-white/10" />
              <img src="/logo_transp.png" alt="Asciende" className="w-16 h-16 md:w-20 md:h-20 object-contain relative z-10" style={{ filter: 'brightness(0) invert(1)' }} />
            </div>
            {hoveredNode === 'asciende' && (
              <div className="absolute -bottom-14 left-1/2 -translate-x-1/2 w-52 bg-asciende-purple text-white px-4 py-2 rounded-xl text-xs font-jost text-center shadow-2xl animate-fadeInUp border border-white/10">
                {t.whyAsciende.asciendeCore || 'The Performance Ecosystem Core'}
              </div>
            )}
          </div>
        </div>

        {nodes.map((node, idx) => {
          const pos = getPos(node.angle, node.radius);
          const isHovered = hoveredNode === node.id;
          const isAnyHovered = hoveredNode !== null;
          return (
            <div
              key={node.id}
              className="absolute z-10"
              style={{
                left: '50%',
                top: '50%',
                transform: `translate(-50%, -50%) translate(${pos.x}px, ${pos.y}px)`,
              }}
              onMouseEnter={() => setHoveredNode(node.id)}
              onMouseLeave={() => setHoveredNode(null)}
            >
              <div
                className="relative"
                style={{
                  animation: `float ${3 + idx * 0.7}s ease-in-out infinite`,
                  animationDelay: `${idx * 0.6}s`,
                  opacity: isAnyHovered && !isHovered ? 0.4 : 1,
                  transition: 'opacity 0.3s ease',
                }}
              >
                <div
                  className={`w-20 h-20 md:w-24 md:h-24 rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 ${
                    isHovered ? 'scale-115 shadow-2xl' : 'shadow-lg'
                  }`}
                  style={{
                    background: isHovered
                      ? `radial-gradient(circle at 35% 35%, ${node.color}, ${node.darkColor})`
                      : `radial-gradient(circle at 35% 35%, ${node.color}dd, ${node.darkColor})`,
                    boxShadow: isHovered ? `0 0 40px ${node.color}80, 0 8px 32px ${node.color}40` : `0 4px 20px ${node.color}40`,
                  }}
                >
                  <div className="relative z-10">{node.icon}</div>
                  <div className="absolute inset-0 rounded-full border border-white/20" />
                </div>

                <div className={`absolute -bottom-10 left-1/2 -translate-x-1/2 whitespace-nowrap transition-all duration-300 ${isHovered ? 'opacity-100' : 'opacity-70'}`}>
                  <p className={`font-krona font-bold text-center transition-all duration-300 ${
                    isHovered ? 'text-gray-900 text-sm md:text-base' : 'text-gray-600 text-xs md:text-sm'
                  }`}>
                    {node.label}
                  </p>
                </div>

                {isHovered && (
                  <div
                    className="absolute w-64 bg-white rounded-2xl p-4 shadow-2xl border border-gray-100 animate-fadeInUp z-30"
                    style={{
                      top: node.angle === -90 ? 'calc(100% + 52px)' : node.angle === 30 ? '50%' : '50%',
                      left: node.angle === -90 ? '50%' : node.angle === 30 ? 'calc(100% + 16px)' : 'auto',
                      right: node.angle === 150 ? 'calc(100% + 16px)' : 'auto',
                      transform: node.angle === -90 ? 'translateX(-50%)' : 'translateY(-50%)',
                    }}
                  >
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: node.color }} />
                      <p className="font-krona text-xs text-gray-400 uppercase tracking-wider">{node.label}</p>
                    </div>
                    <div className="space-y-3">
                      {connections
                        .filter(conn => conn.to === node.id || conn.from === node.id)
                        .map((conn, i) => (
                          <div key={i}>
                            <p className="font-krona text-xs text-asciende-purple mb-1">{conn.toolLabel}</p>
                            <p className="font-jost text-gray-600 text-xs leading-relaxed">{conn.label}</p>
                          </div>
                        ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-12px); }
        }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.25s ease-out forwards;
        }
        .animate-spin-slow {
          animation: rotate-orbit 30s linear infinite;
        }
        .scale-115 {
          transform: scale(1.15);
        }
      `}</style>
    </>
  );
}

function WhyAsciende({ t }) {
  return (
    <div className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-krona font-bold text-asciende-purple mb-4">
            {t.whyAsciende.title}
          </h2>
          <p className="text-lg text-gray-600 font-jost max-w-2xl mx-auto">
            {t.whyAsciende.subtitle1}
          </p>
        </div>

        <WhyAsciendeDiagram t={t} />

        <div className="text-center mt-12 max-w-3xl mx-auto">
          <p className="text-gray-600 font-jost leading-relaxed">
            {t.whyAsciende.subtitle2}
          </p>
        </div>
      </div>
    </div>
  );
}

function CheckItem({ title, desc }) {
  return (
    <div className="flex gap-3 items-start">
      <span className="text-asciende-yellow text-2xl mt-1">✓</span>
      <div>
        <p className="font-krona font-bold text-asciende-purple">{title}</p>
        <p className="text-gray-600 font-jost">{desc}</p>
      </div>
    </div>
  );
}

function PlatformFeatures({ t }) {
  const features = [
    { name: 'Cycling', emoji: '🚴', desc: 'Power analysis, race prep', sports: ['Road', 'Mountain', 'Gravel'] },
    { name: 'Running', emoji: '🏃', desc: 'Pace guidance, injury prevention', sports: ['Road', 'Trail', 'Ultra'] },
    { name: 'Beach Volleyball', emoji: '🏐', desc: 'Strength & agility', sports: ['Competitive'] },
    { name: 'Strength', emoji: '💪', desc: 'S&C programming', sports: ['All levels'] },
    { name: 'Nutrition', emoji: '🥗', desc: 'Fueling strategies', sports: ['Performance'] },
    { name: 'Analytics', emoji: '📈', desc: 'Track everything', sports: ['All sports'] },
  ];

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-200 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-krona font-bold mb-4 text-asciende-purple text-center">
          {t.platformFeatures.title}
        </h2>
        <p className="text-xl text-center text-gray-600 font-jost mb-16">
          {t.platformFeatures.subtitle}
        </p>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((tool, idx) => (
            <div key={idx} className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-asciende-purple hover:shadow-xl transition">
              <div className="text-5xl mb-4">{tool.emoji}</div>
              <h3 className="text-3xl font-krona font-bold text-asciende-purple mb-2">{tool.name}</h3>
              <p className="text-gray-600 font-jost mb-4">{tool.desc}</p>
              <div className="flex flex-wrap gap-2">
                {tool.sports.map((sport, sidx) => (
                  <span key={sidx} className="bg-asciende-yellow/20 text-asciende-purple text-xs font-jost font-bold px-3 py-1 rounded-full">
                    {sport}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function AppShowcase({ t }) {
  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 border-b border-gray-200">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-5xl md:text-6xl font-krona font-bold mb-16 text-asciende-purple text-center">
          {t.appShowcase.title}
        </h2>

        <div className="grid md:grid-cols-3 gap-8">
          <AppCard title={t.appShowcase.trainingTitle} subtitle={t.appShowcase.trainingSubtitle} bgGradient="from-asciende-purple to-asciende-purple/50" />
          <AppCard title={t.appShowcase.nutrition} subtitle={t.appShowcase.nutritionSubtitle} bgGradient="from-asciende-yellow to-asciende-yellow/50" />
          <AppCard title={t.appShowcase.support} subtitle={t.appShowcase.supportSubtitle} bgGradient="from-asciende-purple to-asciende-yellow" />
        </div>
      </div>
    </section>
  );
}

function AppCard({ title, subtitle, bgGradient }) {
  return (
    <div className={`bg-gradient-to-br ${bgGradient} rounded-3xl p-8 text-white h-80 flex flex-col justify-between`}>
      <div>
        <h3 className="text-3xl font-krona font-bold mb-2">{title}</h3>
        <p className="font-jost text-white/80">{subtitle}</p>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex gap-2">
          <div className="w-2 h-2 bg-white rounded-full mt-1"></div>
          <p className="font-jost">Advanced metrics</p>
        </div>
      </div>
    </div>
  );
}

function WhyMembership({ t }) {
  const items = [
    {
      icon: '🎯',
      label: t.whyMembership.commitment,
      desc: t.whyMembership.commitmentDesc,
      color: 'from-orange-50 to-orange-50/30',
      border: 'border-orange-200',
      accent: 'text-orange-500',
    },
    {
      icon: '🔬',
      label: t.whyMembership.science,
      desc: t.whyMembership.scienceDesc,
      color: 'from-blue-50 to-blue-50/30',
      border: 'border-blue-200',
      accent: 'text-blue-500',
    },
    {
      icon: '✓',
      label: t.whyMembership.credibility,
      desc: t.whyMembership.credibilityDesc,
      color: 'from-emerald-50 to-emerald-50/30',
      border: 'border-emerald-200',
      accent: 'text-emerald-500',
    },
    {
      icon: '🎁',
      label: t.whyMembership.opportunities,
      desc: t.whyMembership.opportunitiesDesc,
      color: 'from-asciende-yellow/10 to-asciende-yellow/5',
      border: 'border-asciende-yellow/40',
      accent: 'text-amber-500',
    },
  ];

  return (
    <section className="relative bg-white py-28 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(212,175,55,0.06)_0%,_transparent_60%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <div>
            <span className="inline-block text-xs font-krona font-bold tracking-widest text-asciende-yellow uppercase mb-4 border border-asciende-yellow/30 px-4 py-1.5 rounded-full bg-asciende-yellow/5">
              Membership Value
            </span>
            <h2 className="text-4xl md:text-5xl font-krona font-bold mb-6 text-asciende-purple leading-tight">
              {t.whyMembership.title}
            </h2>
            <p className="text-lg text-gray-500 font-jost leading-relaxed max-w-lg">
              {t.whyMembership.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {items.map((item, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-6 border bg-gradient-to-br ${item.color} ${item.border} hover:shadow-md transition-all duration-300 group`}
              >
                <div className="text-3xl mb-3">{item.icon}</div>
                <h3 className={`text-base font-krona font-bold mb-2 ${item.accent}`}>{item.label}</h3>
                <p className="text-gray-600 font-jost text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StatCard({ icon, label, desc }) {
  return (
    <div className="bg-white rounded-2xl p-4 text-center border-2 border-gray-200 hover:border-asciende-purple transition">
      <div className="text-4xl mb-2">{icon}</div>
      <h3 className="text-base font-krona font-bold text-asciende-purple mb-1">{label}</h3>
      <p className="text-gray-600 font-jost text-xs">{desc}</p>
    </div>
  );
}

function ComparisonModal({ t, onClose }) {
  const comparisonData = [
    {
      category: 'Training Planning',
      features: [
        { name: 'Training Planning', basic: '?', intermediate: 'Static Plans', pro: 'Personalized AI', proPro: 'Coach + AI' },
        { name: 'Weekly Load Adjustment', basic: '✕', intermediate: 'Automatic', pro: 'Automatic', proPro: 'Supervised' },
        { name: 'Athlete Statistics', basic: '✓', intermediate: '✓', pro: '✓', proPro: '✓' },
        { name: 'Exercise Library', basic: '✓', intermediate: '✓', pro: '✓', proPro: '✓' },
        { name: 'Planning Tools', basic: '✓', intermediate: '✓', pro: '✓', proPro: '✓' },
      ]
    },
    {
      category: 'Nutrition System',
      features: [
        { name: 'Body Composition & Habits', basic: '✓', intermediate: '✓', pro: '✓', proPro: '✓' },
        { name: 'Meal Planner', basic: '✓', intermediate: '✓', pro: '✓', proPro: 'Coach Review' },
        { name: 'Nutrition Guides & Courses', basic: '✕', intermediate: '✓', pro: '✓', proPro: '✓' },
      ]
    },
    {
      category: 'Community & Support',
      features: [
        { name: 'Sports Project Support', basic: 'Can only support', intermediate: 'Full Access', pro: 'Full Access', proPro: 'Full Access' },
        { name: 'Brand Community', basic: '✕', intermediate: '✓', pro: '✓', proPro: '✓' },
        { name: 'Individual Feedback (Coach)', basic: '✕', intermediate: '✕', pro: '✕', proPro: 'Weekly' },
      ]
    }
  ];

  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 z-50 overflow-y-auto animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-3xl w-[95vw] shadow-2xl animate-slideUp flex flex-col max-h-[90vh]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between p-8 border-b border-gray-100 bg-gradient-to-r from-asciende-purple/5 to-asciende-yellow/5 rounded-t-3xl flex-shrink-0">
          <h2 className="text-4xl font-krona font-bold text-asciende-purple">Feature Comparison</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-asciende-purple text-3xl transition duration-300 font-light hover:scale-110"
          >
            ✕
          </button>
        </div>

        <div className="overflow-y-auto p-8 flex-grow">
          <table className="w-full">
            <thead className="sticky top-0 bg-white">
              <tr className="border-b-3 border-asciende-purple">
                <th className="text-left py-6 px-2 font-krona font-bold text-asciende-purple text-lg">Feature</th>
                <th className="text-center py-6 px-2 font-krona font-bold text-asciende-purple text-lg">Basic</th>
                <th className="text-center py-6 px-2 font-krona font-bold text-asciende-purple text-lg">Intermediate</th>
                <th className="text-center py-6 px-2 font-krona font-bold text-asciende-purple text-lg">PRO</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((section, secIdx) => (
                <tbody key={secIdx}>
                  <tr className="bg-gradient-to-r from-asciende-purple/8 to-transparent">
                    <td colSpan="4" className="py-4 px-2 font-krona font-bold text-asciende-purple text-sm uppercase tracking-widest">
                      {section.category}
                    </td>
                  </tr>
                  {section.features.map((feature, feaIdx) => (
                    <tr key={feaIdx} className="border-b border-gray-100 hover:bg-asciende-purple/3 transition duration-200">
                      <td className="py-5 px-2 font-jost text-gray-700 font-medium">{feature.name}</td>
                      <td className="py-5 px-2 text-center">
                        <span className={`font-jost font-semibold text-lg ${feature.basic === '✓' ? 'text-green-500' : feature.basic === '✕' ? 'text-gray-300' : 'text-gray-600'}`}>
                          {feature.basic}
                        </span>
                      </td>
                      <td className="py-5 px-2 text-center">
                        <span className={`font-jost font-semibold text-lg ${feature.intermediate === '✓' ? 'text-green-500' : feature.intermediate === '✕' ? 'text-gray-300' : 'text-gray-700'}`}>
                          {feature.intermediate}
                        </span>
                      </td>
                      <td className="py-5 px-2 text-center">
                        <span className={`font-jost font-semibold text-lg ${feature.pro === '✓' ? 'text-green-500' : feature.pro === '✕' ? 'text-gray-300' : feature.pro === 'Coach Review' ? 'text-asciende-yellow' : 'text-gray-700'}`}>
                          {feature.pro}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              ))}
            </tbody>
          </table>
        </div>

        <div className="border-t border-gray-100 p-8 bg-gradient-to-b from-gray-50/50 to-white rounded-b-3xl flex-shrink-0">
          <div className="grid grid-cols-3 gap-6 w-full">
            <div className="p-6 rounded-2xl bg-gradient-to-br from-gray-50 to-gray-100/50 text-center border border-gray-200/50 hover:shadow-lg transition duration-300">
              <p className="font-krona font-bold text-3xl text-asciende-purple mb-2">€0</p>
              <p className="text-sm text-gray-600 font-jost font-medium">/ forever</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-asciende-yellow/10 to-asciende-yellow/5 text-center border border-asciende-yellow/30 hover:shadow-lg transition duration-300">
              <p className="font-krona font-bold text-3xl text-asciende-purple mb-2">€9.99</p>
              <p className="text-sm text-gray-600 font-jost font-medium">/ month</p>
            </div>
            <div className="p-6 rounded-2xl bg-gradient-to-br from-asciende-purple/10 to-asciende-purple/5 text-center border border-asciende-purple/30 hover:shadow-lg transition duration-300">
              <p className="font-krona font-bold text-3xl text-asciende-purple mb-2">€49.99</p>
              <p className="text-sm text-gray-600 font-jost font-medium mb-1">/ month</p>
              <p className="text-xs text-asciende-yellow font-krona font-bold">Lim. 50 athletes</p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @keyframes slideUp {
          from {
            transform: translateY(30px);
            opacity: 0;
          }
          to {
            transform: translateY(0);
            opacity: 1;
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        .animate-slideUp {
          animation: slideUp 0.4s ease-out;
        }
      `}</style>
    </div>
  );
}

function Memberships({ t }) {
  const [showComparison, setShowComparison] = useState(false);

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gray-50 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(88,28,135,0.04)_0%,_transparent_60%)] pointer-events-none" />
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block text-xs font-krona font-bold tracking-widest text-asciende-yellow uppercase mb-4 border border-asciende-yellow/30 px-4 py-1.5 rounded-full bg-asciende-yellow/5">
            Plans
          </span>
          <h2 className="text-5xl md:text-6xl font-krona font-bold mb-4 text-asciende-purple">
            {t.memberships.title}
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8 items-stretch">
          <MembershipCard
            title={t.memberships.basic}
            price={t.memberships.basicPrice}
            period=""
            description={t.memberships.basicDesc}
            note={t.memberships.basicNote}
            cta={t.memberships.basicCTA}
            highlighted={false}
            badge={null}
          />
          <MembershipCard
            title={t.memberships.intermediate}
            price={t.memberships.intermediatePrice}
            period={t.memberships.intermediatePeriod}
            alternativePrice={t.memberships.intermediateYear}
            description={t.memberships.intermediateDesc}
            cta={t.memberships.intermediateCTA}
            highlighted={false}
            badge="Most Popular"
          />
          <MembershipCard
            title={t.memberships.pro}
            price={t.memberships.proPrice}
            period={t.memberships.proPeriod}
            alternativePrice={t.memberships.proYear}
            description={t.memberships.proDesc}
            cta={t.memberships.proCTA}
            highlighted={true}
            badge="Limited — 50 athletes"
          />
        </div>

        <div className="text-center mb-14">
          <button
            onClick={() => setShowComparison(true)}
            className="inline-flex items-center gap-2 text-asciende-purple hover:text-asciende-purple/70 font-jost font-semibold text-base underline underline-offset-4 transition"
          >
            {t.memberships.viewDifferences}
          </button>
        </div>

        <div className="relative rounded-3xl overflow-hidden min-h-[420px] lg:min-h-[480px]">
          <div
            className="absolute inset-0 bg-cover bg-center scale-105"
            style={{ backgroundImage: "url('/cyclist_in_mountiain.jpg')", backgroundPosition: 'center 40%' }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-gray-950/95 via-gray-950/80 to-gray-950/30" />
          <div className="absolute inset-0 bg-gradient-to-t from-gray-950/70 via-transparent to-transparent" />

          <div className="relative z-10 flex flex-col lg:flex-row items-center lg:items-end gap-10 px-8 lg:px-14 py-12 lg:py-16 h-full">
            <div className="flex-1 text-white">
              <div className="inline-flex items-center gap-2 mb-5">
                <span className="w-8 h-px bg-asciende-yellow" />
                <p className="text-xs font-krona font-bold tracking-widest text-asciende-yellow uppercase">1:1 Coaching</p>
              </div>
              <h3 className="text-3xl md:text-5xl font-krona font-bold mb-3 leading-tight">
                {t.memberships.coachingTitle}
              </h3>
              <p className="text-xl font-krona font-bold text-asciende-yellow mb-5">
                {t.memberships.coachingSubtitle}
              </p>
              <p className="text-white/75 font-jost text-base leading-relaxed max-w-lg mb-8">
                Work with a dedicated coach to create personalized plans tailored to your goals, lifestyle, and constraints. Get real-time feedback, progress tracking, and the support you need to perform at your best.
              </p>
              <div className="flex flex-wrap gap-3 mb-2">
                {['Personalized Plan', 'Weekly Check-ins', 'Real-time Feedback', 'Progress Tracking'].map(tag => (
                  <span key={tag} className="text-xs font-jost font-semibold text-white/70 border border-white/20 rounded-full px-3 py-1 backdrop-blur-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0 flex flex-col items-center lg:items-end gap-3 pb-1">
              <a href="/services" className="inline-flex items-center gap-2 bg-asciende-yellow text-asciende-purple font-krona font-bold text-base py-4 px-10 rounded-full hover:shadow-2xl hover:shadow-asciende-yellow/50 hover:scale-105 transition-all duration-300">
                {t.memberships.coachingCTA}
                <ArrowRight size={18} />
              </a>
              <p className="text-white/40 font-jost text-xs">Limited spots available</p>
            </div>
          </div>

          <div className="absolute top-6 right-6 w-16 h-16 border border-asciende-yellow/20 rounded-full" />
          <div className="absolute top-10 right-10 w-8 h-8 border border-asciende-yellow/30 rounded-full" />
        </div>
      </div>

      {showComparison && <ComparisonModal t={t} onClose={() => setShowComparison(false)} />}
    </section>
  );
}

function MembershipCard({ title, price, period, alternativePrice, description, note, cta, highlighted, badge }) {
  return (
    <div className={`relative rounded-3xl flex flex-col h-full transition-all duration-300 ${
      highlighted
        ? 'bg-asciende-purple text-white shadow-2xl shadow-asciende-purple/25 lg:scale-105 ring-2 ring-asciende-yellow/50'
        : 'bg-white border border-gray-200 hover:border-asciende-purple/30 hover:shadow-lg'
    }`}>
      {badge && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
          <span className={`text-xs font-krona font-bold px-4 py-1.5 rounded-full whitespace-nowrap ${
            highlighted ? 'bg-asciende-yellow text-asciende-purple' : 'bg-asciende-purple text-white'
          }`}>
            {badge}
          </span>
        </div>
      )}

      <div className="p-8 pt-10 flex flex-col flex-1">
        <h3 className={`text-xl font-krona font-bold mb-1 ${highlighted ? 'text-white' : 'text-asciende-purple'}`}>
          {title}
        </h3>

        <div className="my-6 pb-6 border-b ${highlighted ? 'border-white/10' : 'border-gray-100'}">
          <div className="flex items-end gap-1">
            <span className={`text-5xl font-krona font-bold leading-none ${highlighted ? 'text-white' : 'text-asciende-purple'}`}>
              {price}
            </span>
            {period && (
              <span className={`text-base font-jost mb-1 ${highlighted ? 'text-white/60' : 'text-gray-500'}`}>
                {period}
              </span>
            )}
          </div>
          {alternativePrice && (
            <p className={`text-xs mt-2 font-jost ${highlighted ? 'text-white/50' : 'text-gray-400'}`}>
              or {alternativePrice}
            </p>
          )}
        </div>

        <p className={`font-jost text-sm leading-relaxed flex-1 mb-6 ${highlighted ? 'text-white/85' : 'text-gray-600'}`}>
          {description}
        </p>

        {note && (
          <p className={`text-xs mb-6 italic border rounded-xl px-3 py-2 ${
            highlighted ? 'text-white/60 border-white/10 bg-white/5' : 'text-gray-500 border-gray-200 bg-gray-50'
          }`}>
            {note}
          </p>
        )}

        <a
          href="https://hub.asciende.pro"
          className={`w-full py-3.5 rounded-full font-krona font-bold text-base transition-all duration-300 text-center block ${
            highlighted
              ? 'bg-asciende-yellow text-asciende-purple hover:shadow-lg hover:shadow-asciende-yellow/50 hover:scale-[1.02]'
              : 'bg-gray-900 text-white hover:bg-asciende-purple hover:scale-[1.02]'
          }`}
        >
          {cta}
        </a>
      </div>
    </div>
  );
}

function Programs({ t }) {
  const [isHovered, setIsHovered] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const programs = [
    {
      title: t.programs.program1,
      tags: t.programs.program1Tags,
      image: '/agu_bici_santacruz.JPG',
    },
    {
      title: t.programs.program2,
      tags: t.programs.program2Tags,
      image: '/aguengym.jpg',
    },
    {
      title: t.programs.program3,
      tags: t.programs.program3Tags,
      image: '/charliebike.jpg',
    },
    {
      title: t.programs.program4,
      tags: t.programs.program4Tags,
      image: '/Kenyahill.jpg',
    },
  ];

  useEffect(() => {
    if (!carouselRef.current || isHovered) return;

    const carousel = carouselRef.current;
    let animationId: number;
    let position = 0;

    const animate = () => {
      position -= 0.5;
      carousel.style.transform = `translateX(${position}px)`;
      if (Math.abs(position) >= carousel.scrollWidth / 2) {
        position = 0;
      }
      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animationId);
  }, [isHovered]);

  return (
    <section className="relative bg-white py-28 overflow-hidden">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-16">
            <div>
              <span className="inline-block text-xs font-krona font-bold tracking-widest text-asciende-yellow uppercase mb-4 border border-asciende-yellow/30 px-4 py-1.5 rounded-full bg-asciende-yellow/5">
                Training Library
              </span>
              <h2 className="text-5xl md:text-6xl font-krona font-bold text-asciende-purple leading-tight">
                {t.programs.title}
              </h2>
            </div>
            <p className="text-gray-500 font-jost text-base leading-relaxed max-w-sm md:text-right">
              {t.programs.subtitle}
            </p>
          </div>
        </div>
      </div>

      <div
        className="mb-12 overflow-hidden"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div
          ref={carouselRef}
          className="flex gap-5"
          style={{ willChange: 'transform', paddingLeft: '2rem' }}
        >
          {[...programs, ...programs].map((program, idx) => (
            <div
              key={idx}
              className="flex-shrink-0 w-72 md:w-88 rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-500 cursor-pointer group"
            >
              <div className="relative h-72 overflow-hidden">
                <img
                  src={program.image}
                  alt={program.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute top-4 left-4 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-y-1 group-hover:translate-y-0">
                  <span className="inline-block bg-asciende-yellow text-asciende-purple text-xs font-krona font-bold px-3 py-1.5 rounded-full">
                    {t.programs.badge}
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-5">
                  <p className="text-asciende-yellow/90 font-jost text-xs font-bold uppercase tracking-wider mb-2">
                    {program.tags}
                  </p>
                  <h3 className="text-white font-krona font-bold text-sm leading-tight">
                    {program.title}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex justify-center">
          <a
            href="https://hub.asciende.pro"
            className="bg-asciende-purple text-white px-10 py-4 rounded-full font-krona font-bold text-base hover:shadow-xl hover:shadow-asciende-purple/20 hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
          >
            {t.programs.cta}
            <ArrowRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}

function Testimonials({ t }) {
  const testimonials = [
    { quote: "Accessible training and real support in one platform. Exactly what I needed.", author: "Fernando Lescano", role: "Cyclist, Argentina", image: "/fer_ush_montanas_atras.jpeg" },
    { quote: "Science-backed, community-driven. This is how performance should work.", author: "Mathias Chazarreta", role: "Trail Runner, Argentina", image: "/Mathi_chiaza.jpg" },
    { quote: "No fragmentation. No complicated setup. Just solid elevation.", author: "Santiago Etchegaray", role: "Beach Volley, Germany", image: "/Santietchegaray.jpg" },
  ];

  return (
    <section className="relative py-28 px-4 sm:px-6 lg:px-8 bg-gray-950 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_rgba(212,175,55,0.08)_0%,_transparent_50%)] pointer-events-none" />
      <div className="max-w-6xl mx-auto relative z-10">
        <div className="mb-16">
          <span className="inline-block text-xs font-krona font-bold tracking-widest text-asciende-yellow uppercase mb-4 border border-asciende-yellow/30 px-4 py-1.5 rounded-full bg-asciende-yellow/5">
            Community
          </span>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <h2 className="text-5xl md:text-6xl font-krona font-bold text-white leading-tight">
              {t.testimonials.title}
            </h2>
          </div>
          <p className="text-gray-400 font-jost text-base leading-relaxed max-w-2xl mt-4">
            {t.testimonials.subtitle}
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-5">
          {testimonials.map((testimonial, idx) => (
            <div
              key={idx}
              className="group relative rounded-2xl overflow-hidden cursor-pointer"
            >
              <div className="relative h-[420px] overflow-hidden">
                <img
                  src={testimonial.image}
                  alt={testimonial.author}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <div className="flex mb-3 gap-0.5">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#D4AF37" className="text-asciende-yellow" />
                    ))}
                  </div>
                  <p className="text-white/90 font-jost italic text-sm leading-relaxed mb-4 max-h-0 overflow-hidden group-hover:max-h-24 transition-all duration-500">
                    "{testimonial.quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-px bg-asciende-yellow flex-shrink-0" />
                    <div>
                      <p className="font-krona font-bold text-white text-sm">{testimonial.author}</p>
                      <p className="text-gray-400 text-xs font-jost mt-0.5">{testimonial.role}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 text-center">
          <p className="text-gray-500 font-jost text-sm italic">#BecomingAsciende</p>
        </div>
      </div>
    </section>
  );
}

function BASE({ t }) {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = parseInt(entry.target.getAttribute('data-index') || '0');
          setVisibleCards((prev) => {
            const updated = [...prev];
            updated[index] = true;
            return updated;
          });
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('[data-base-card]').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/2e695377-5868-4268-a1b2-204448a85c32_(1).webp')", backgroundPosition: 'center 30%' }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-asciende-purple/95 via-asciende-purple/70 to-asciende-purple/20" />
      <div className="absolute inset-0 bg-gradient-to-t from-gray-950/50 via-transparent to-transparent" />

      <div className="relative z-10 py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-start">
            <div>
              <span className="inline-block text-xs font-krona font-bold tracking-widest text-asciende-yellow uppercase mb-4 border border-asciende-yellow/30 px-4 py-1.5 rounded-full bg-asciende-yellow/5">
                Education
              </span>
              <h2 className="text-4xl md:text-5xl font-krona font-bold text-white leading-tight mb-4">
                {t.base.headline}
              </h2>
              <p className="text-base md:text-lg text-white/70 font-jost leading-relaxed mb-6 max-w-md">
                {t.base.subheadline}
              </p>
              <p className="text-white/50 font-jost text-sm leading-relaxed mb-8 max-w-md">
                {t.base.description}
              </p>
              <a
                href="https://academy.asciende.pro"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-asciende-yellow text-asciende-purple px-8 py-3.5 rounded-full font-krona font-bold text-sm hover:shadow-xl hover:shadow-asciende-yellow/30 hover:scale-105 transition-all duration-300"
              >
                {t.base.cta}
                <ArrowRight size={16} />
              </a>
            </div>

            <div className="grid grid-cols-2 gap-3">
              {t.base.pillars.map((pillar, index) => (
                <div
                  key={index}
                  data-base-card
                  data-index={index}
                  className={`group bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10 hover:border-asciende-yellow/50 hover:bg-white/10 transition-all duration-500 ${
                    visibleCards[index] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                  }`}
                  style={{ transitionDelay: `${index * 80}ms` }}
                >
                  <div className="w-6 h-6 rounded-full bg-asciende-yellow/20 border border-asciende-yellow/30 flex items-center justify-center mb-3 group-hover:bg-asciende-yellow/30 transition-all">
                    <div className="w-2 h-2 rounded-full bg-asciende-yellow" />
                  </div>
                  <h3 className="text-sm font-krona font-bold text-white mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-white/60 font-jost text-xs leading-relaxed">
                    {pillar.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FinalCTA({ t }) {
  return (
    <section className="relative overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/59c1335a-59e4-47f7-9f62-27f071fc4add.jpeg')" }}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-gray-950" />

      <div className="relative z-10 py-36 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <span className="inline-block text-xs font-krona font-bold tracking-widest text-asciende-yellow uppercase mb-6 border border-asciende-yellow/30 px-4 py-1.5 rounded-full bg-asciende-yellow/5">
            Start Today
          </span>
          <h2 className="text-5xl md:text-6xl lg:text-8xl font-krona font-bold mb-6 text-white leading-tight">
            {t.finalCTA.title}
          </h2>
          <p className="text-lg md:text-xl text-white/70 font-jost mb-12 max-w-2xl mx-auto leading-relaxed">
            {t.finalCTA.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://hub.asciende.pro"
              className="bg-asciende-yellow text-asciende-purple px-12 py-4 rounded-full font-krona font-bold text-base hover:shadow-2xl hover:shadow-asciende-yellow/30 hover:scale-105 transition-all duration-300 inline-flex items-center gap-2"
            >
              {t.finalCTA.title}
              <ArrowRight size={20} />
            </a>
          </div>

          <p className="text-white/40 mt-8 font-jost text-sm">
            {t.finalCTA.alreadyMember}{' '}
            <a href="https://hub.asciende.pro" className="text-white/70 hover:text-asciende-yellow transition font-medium underline underline-offset-4">
              {t.finalCTA.logIn}
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}

function Services({ t, setCurrentPage }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-krona font-bold mb-6 text-asciende-purple leading-tight">
            {t.services.title}
          </h1>
          <p className="text-2xl md:text-3xl text-gray-700 font-jost mb-4 leading-relaxed">
            {t.services.subtitle}
          </p>
          <p className="text-xl text-asciende-purple font-krona font-bold">
            {t.services.tagline}
          </p>
        </div>

        <h2 className="text-4xl md:text-5xl font-krona font-bold mb-12 text-asciende-purple text-center">
          {t.services.serviceTitle}
        </h2>

        <div className="grid md:grid-cols-3 gap-8 mb-20">
          <ServiceCard image="/gym_barbel_woman.jpg" title={t.services.strength} desc={t.services.strengthDesc} onClick={() => setCurrentPage('strength-planning')} />
          <ServiceCard image="/nutrition_sport.jpg" title={t.services.nutrition} desc={t.services.nutritionDesc} onClick={() => setCurrentPage('nutrition-planning')} />
          <ServiceCard image="/cyclist_in_hill.jpg" title={t.services.endurance} desc={t.services.enduranceDesc} onClick={() => setCurrentPage('endurance-planning')} />
        </div>

        <div className="bg-gray-50 rounded-3xl p-12 border-2 border-gray-200 mb-20">
          <h2 className="text-4xl md:text-5xl font-krona font-bold mb-6 text-asciende-purple text-center">
            {t.services.howTitle}
          </h2>
          <p className="text-2xl text-asciende-purple font-krona font-bold text-center mb-12">
            {t.services.howSubtitle}
          </p>

          <div className="space-y-8">
            <ServiceStep number="1" title={t.services.step1Title} desc={t.services.step1Desc} />
            <ServiceStep number="2" title={t.services.step2Title} desc={t.services.step2Desc + ' ' + t.services.step2Desc2} />
            <ServiceStep number="3" title={t.services.step3Title} desc={t.services.step3Title} />
          </div>
        </div>

        <div className="text-center mb-20">
          <h2 className="text-5xl md:text-6xl font-krona font-bold mb-8 text-asciende-purple">
            {t.services.ctaTitle}
          </h2>
          <button onClick={() => setIsModalOpen(true)} className="bg-asciende-yellow text-asciende-purple px-12 py-4 rounded-full font-krona font-bold text-lg hover:shadow-lg transition inline-flex items-center justify-center gap-2">
            Contact Us <ArrowRight size={24} />
          </button>
        </div>

        <div className="bg-gray-50 rounded-3xl p-12 border-2 border-gray-200">
          <h2 className="text-4xl md:text-5xl font-krona font-bold mb-12 text-asciende-purple text-center">
            {t.services.faqTitle}
          </h2>

          <div className="space-y-6">
            <FAQ title={t.services.faq1Title} desc={t.services.faq1} />
            <FAQ title={t.services.faq2Title} desc={t.services.faq2} />
            <FAQ title={t.services.faq3Title} desc={t.services.faq3} />
            <FAQ title={t.services.faq4Title} desc={t.services.faq4} />
          </div>
        </div>

        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto relative">
              <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full z-10">
                <X className="w-6 h-6" />
              </button>
              <iframe
                src="https://scheduler.zoom.us/agu-hernandez/athlete-assessment-call"
                className="w-full h-[80vh]"
                frameBorder="0"
                title="Book a free 20-minute consultation"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function ServiceCard({ image, title, desc, onClick }) {
  return (
    <div
      onClick={onClick}
      className={`relative rounded-2xl overflow-hidden border-2 border-gray-200 hover:border-asciende-purple hover:shadow-lg transition h-96 group ${onClick ? 'cursor-pointer' : ''}`}
    >
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${image})` }}
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 group-hover:bg-opacity-60 transition" />
      <div className="relative h-full flex flex-col justify-end p-8 text-center">
        <h3 className="text-3xl font-krona font-bold text-asciende-yellow mb-3 transform transition-transform duration-300 group-hover:-translate-y-4">{title}</h3>
        <p className="text-white font-jost text-lg max-h-0 opacity-0 overflow-hidden group-hover:max-h-40 group-hover:opacity-100 transition-all duration-300">{desc}</p>
      </div>
    </div>
  );
}

function ServiceStep({ number, title, desc }) {
  return (
    <div className="flex gap-6 items-start">
      <div className="bg-asciende-purple text-white rounded-full w-12 h-12 flex items-center justify-center flex-shrink-0">
        <span className="font-krona font-bold text-xl">{number}</span>
      </div>
      <div>
        <h3 className="text-2xl font-krona font-bold text-asciende-purple mb-2">{title}</h3>
        <p className="text-gray-700 font-jost leading-relaxed">{desc}</p>
      </div>
    </div>
  );
}

function FAQ({ title, desc }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-gray-200 pb-6">
      <button onClick={() => setOpen(!open)} className="flex justify-between items-center w-full text-left">
        <h3 className="text-lg font-krona font-bold text-asciende-purple">{title}</h3>
        <span className={`text-asciende-purple text-2xl transition ${open ? 'rotate-180' : ''}`}>+</span>
      </button>
      {open && <p className="text-gray-700 font-jost mt-4">{desc}</p>}
    </div>
  );
}

function ForBrands({ t }) {
  return (
    <div className="pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-krona font-bold mb-6 text-asciende-purple leading-tight">
            {t.forBrands.title}
          </h1>
          <p className="text-xl text-gray-700 font-jost mb-8 leading-relaxed">
            {t.forBrands.subtitle}
          </p>
        </div>

        <h2 className="text-4xl md:text-5xl font-krona font-bold mb-12 text-asciende-purple text-center">
          {t.forBrands.supportTitle}
        </h2>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <BrandCard title={t.forBrands.sponsor} desc={t.forBrands.sponsorDesc} icon="🎯" />
          <BrandCard title={t.forBrands.discounts} desc={t.forBrands.discountsDesc} icon="🎁" />
        </div>

        <div className="bg-asciende-yellow rounded-3xl p-12 mb-16">
          <h2 className="text-3xl md:text-4xl font-krona font-bold text-asciende-purple text-center mb-8">
            {t.forBrands.cycleTitle}
          </h2>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            <CycleItem icon="🏃" text={t.forBrands.cycle1} />
            <CycleItem icon="📈" text={t.forBrands.cycle2} />
            <CycleItem icon="🌍" text={t.forBrands.cycle3} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-asciende-purple to-asciende-purple/80 text-white rounded-3xl p-12 text-center mb-16">
          <p className="text-2xl md:text-3xl font-jost mb-6 leading-relaxed">
            {t.forBrands.platformTitle}
          </p>
        </div>

        <div className="bg-gradient-to-br from-asciende-purple to-asciende-purple/80 text-white rounded-3xl p-12 text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-krona font-bold mb-4">
            {t.forBrands.joinTitle}
          </h2>
          <div className="space-y-2 mb-8">
            <p className="text-2xl font-jost">{t.forBrands.joinSubtitle1}</p>
            <p className="text-2xl font-jost">{t.forBrands.joinSubtitle2}</p>
            <p className="text-2xl font-jost">{t.forBrands.joinSubtitle3}</p>
          </div>
          <p className="text-3xl font-krona font-bold mb-8">{t.forBrands.joinFinal}</p>
          <button className="bg-asciende-yellow text-asciende-purple px-12 py-4 rounded-full font-krona font-bold text-lg hover:shadow-lg transition inline-flex items-center justify-center gap-2">
            Get Started <ArrowRight size={24} />
          </button>
        </div>

        <div className="text-center bg-gray-50 rounded-3xl p-12 border-2 border-gray-200">
          <h3 className="text-3xl md:text-4xl font-krona font-bold text-asciende-purple mb-4">
            {t.forBrands.spreadingTitle}
          </h3>
          <p className="text-gray-700 font-jost text-lg">
            Contact us to learn how your brand can make a difference
          </p>
        </div>
      </div>
    </div>
  );
}

function BrandCard({ title, desc, icon }) {
  return (
    <div className="bg-white rounded-2xl p-8 border-2 border-gray-200 hover:border-asciende-purple hover:shadow-lg transition">
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-2xl font-krona font-bold text-asciende-purple mb-3">{title}</h3>
      <p className="text-gray-700 font-jost">{desc}</p>
    </div>
  );
}

function CycleItem({ icon, text }) {
  return (
    <div className="bg-white rounded-2xl p-6">
      <div className="text-4xl mb-3">{icon}</div>
      <p className="font-jost text-asciende-purple font-semibold">{text}</p>
    </div>
  );
}

function About({ t }) {
  return (
    <div className="relative overflow-hidden">

      <section className="relative pt-28 pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-asciende-purple via-[#3a2f48] to-gray-950" />
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full opacity-30 pointer-events-none" style={{ background: 'radial-gradient(circle, #fdda3630 0%, transparent 70%)', transform: 'translate(-50%, -40%)' }} />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full opacity-20 pointer-events-none" style={{ background: 'radial-gradient(circle, #60a5fa25 0%, transparent 70%)', transform: 'translate(30%, 30%)' }} />
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 mb-8">
            <span className="w-10 h-px bg-asciende-yellow/60" />
            <span className="text-asciende-yellow font-krona text-xs tracking-widest uppercase opacity-80">About</span>
            <span className="w-10 h-px bg-asciende-yellow/60" />
          </div>
          <h1 className="text-4xl md:text-6xl font-krona font-bold text-white mb-8 leading-tight">
            {t.about.title}
          </h1>
          <p className="text-lg md:text-xl text-white/70 font-jost leading-relaxed max-w-3xl mx-auto mb-6">
            {t.about.subtitle}
          </p>
          <p className="text-base text-asciende-yellow font-jost font-semibold opacity-90">
            {t.about.transformative}
          </p>
        </div>
      </section>

      <section className="relative bg-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, #fdda3615 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">

            <div className="relative">
              <div className="absolute -inset-4 rounded-3xl opacity-20 blur-xl" style={{ background: 'linear-gradient(135deg, #fdda36, #514163)' }} />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl">
                <img
                  src="/fotos-charla-deportes-unl_(1).jpg"
                  alt="Agustín Hernández speaking"
                  className="w-full h-[480px] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-950/60 via-transparent to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-asciende-yellow flex items-center justify-center flex-shrink-0">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-5 h-5 text-asciende-purple">
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>
                      </svg>
                    </div>
                    <div>
                      <p className="font-krona text-white text-sm font-bold">Agustín Hernández</p>
                      <p className="font-jost text-white/60 text-xs">Founder · Sport Scientist</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 mb-6">
                <span className="w-6 h-px bg-asciende-purple/40" />
                <p className="text-xs font-krona font-bold tracking-widest text-asciende-purple/60 uppercase">{t.about.behindTitle}</p>
              </div>
              <h2 className="text-3xl md:text-4xl font-krona font-bold text-gray-900 mb-4 leading-tight">
                {t.about.whoAmI}
              </h2>
              <p className="text-gray-900 font-jost font-semibold mb-4 text-base leading-relaxed">
                {t.about.bioStart}
              </p>
              <p className="text-gray-600 font-jost leading-relaxed text-base">
                {t.about.bioDesc}
              </p>

              <div className="mt-10 grid grid-cols-3 gap-4">
                {[
                  { num: '10+', label: 'Years Research' },
                  { num: '200+', label: 'Athletes Coached' },
                  { num: '3', label: 'Disciplines' },
                ].map(stat => (
                  <div key={stat.label} className="text-center p-4 rounded-2xl bg-gray-50 border border-gray-100">
                    <p className="font-krona font-bold text-2xl text-asciende-purple mb-1">{stat.num}</p>
                    <p className="font-jost text-xs text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-24 px-4 sm:px-6 lg:px-8 overflow-hidden" style={{ background: 'linear-gradient(160deg, #f8f7fa 0%, #ffffff 50%, #f3f1f6 100%)' }}>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, #514163 0%, transparent 65%)', opacity: 0.04 }} />

        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-3 mb-5">
              <span className="w-10 h-px bg-asciende-purple/30" />
              <span className="text-asciende-purple font-krona text-xs tracking-widest uppercase opacity-60">The Ecosystem</span>
              <span className="w-10 h-px bg-asciende-purple/30" />
            </div>
            <h2 className="text-3xl md:text-5xl font-krona font-bold text-asciende-purple mb-5 leading-tight">
              {t.whyAsciende.title}
            </h2>
            <p className="text-lg text-gray-500 font-jost max-w-2xl mx-auto">
              {t.whyAsciende.subtitle1}
            </p>
          </div>

          <WhyAsciendeDiagram t={t} />

          <div className="text-center mt-8 max-w-2xl mx-auto">
            <p className="text-gray-500 font-jost leading-relaxed">
              {t.whyAsciende.subtitle2}
            </p>
          </div>
        </div>
      </section>

      <section className="relative py-24 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
        <div className="absolute bottom-0 left-0 w-96 h-96 pointer-events-none" style={{ background: 'radial-gradient(circle, #fdda3612 0%, transparent 70%)', transform: 'translate(-40%, 40%)' }} />
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">

            <div className="relative rounded-3xl p-8 overflow-hidden group hover:shadow-xl transition-all duration-500" style={{ background: 'linear-gradient(135deg, #fffbe6 0%, #fff8d0 100%)', border: '1px solid #fdda3640' }}>
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, #fdda3630 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
              <div className="w-12 h-12 rounded-2xl bg-asciende-yellow/20 flex items-center justify-center mb-6 border border-asciende-yellow/30">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6 text-asciende-purple">
                  <circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>
                </svg>
              </div>
              <h3 className="text-xl font-krona font-bold text-asciende-purple mb-4">{t.about.whyTitle}</h3>
              <p className="text-gray-600 font-jost leading-relaxed text-sm">{t.about.whyDesc}</p>
            </div>

            <div className="relative rounded-3xl p-8 overflow-hidden group hover:shadow-xl transition-all duration-500" style={{ background: 'linear-gradient(135deg, #f3f0f7 0%, #ece8f3 100%)', border: '1px solid #51416320' }}>
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, #51416315 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
              <div className="w-12 h-12 rounded-2xl bg-asciende-purple/10 flex items-center justify-center mb-6 border border-asciende-purple/20">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6 text-asciende-purple">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
              </div>
              <h3 className="text-xl font-krona font-bold text-asciende-purple mb-4">{t.about.howTitle}</h3>
              <p className="text-gray-600 font-jost leading-relaxed text-sm">{t.about.howDesc}</p>
            </div>

            <div className="relative rounded-3xl p-8 overflow-hidden group hover:shadow-xl transition-all duration-500" style={{ background: 'linear-gradient(135deg, #f0fdf4 0%, #e6f9ee 100%)', border: '1px solid #34d39930' }}>
              <div className="absolute top-0 right-0 w-32 h-32 rounded-full pointer-events-none" style={{ background: 'radial-gradient(circle, #34d39920 0%, transparent 70%)', transform: 'translate(30%, -30%)' }} />
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 flex items-center justify-center mb-6 border border-emerald-200">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-6 h-6 text-emerald-600">
                  <circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
                </svg>
              </div>
              <h3 className="text-xl font-krona font-bold text-asciende-purple mb-4">{t.about.companySupport}</h3>
              <p className="text-gray-600 font-jost mb-6 text-sm leading-relaxed">{t.about.supportText}</p>
              <a
                href="mailto:info@asciende.pro"
                className="inline-flex items-center gap-2 bg-asciende-yellow text-asciende-purple px-5 py-2.5 rounded-full font-krona font-bold text-sm hover:shadow-lg hover:scale-105 transition-all duration-300"
              >
                {t.about.engage}
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0" style={{ background: 'linear-gradient(135deg, #514163 0%, #3a2f48 50%, #2a2035 100%)' }} />
        <div className="absolute top-0 left-1/3 w-96 h-96 rounded-full pointer-events-none opacity-20" style={{ background: 'radial-gradient(circle, #fdda36 0%, transparent 70%)', transform: 'translate(-50%, -50%)' }} />
        <div className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full pointer-events-none opacity-15" style={{ background: 'radial-gradient(circle, #60a5fa 0%, transparent 70%)', transform: 'translate(30%, 40%)' }} />

        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <div className="w-16 h-16 rounded-full bg-asciende-yellow/10 border border-asciende-yellow/30 flex items-center justify-center mx-auto mb-6">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" className="w-7 h-7 text-asciende-yellow">
              <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
            </svg>
          </div>
          <h3 className="text-2xl md:text-3xl font-krona font-bold text-white mb-4">
            {t.about.engage}
          </h3>
          <a
            href="mailto:info@asciende.pro"
            className="text-xl font-jost font-semibold text-asciende-yellow hover:text-white transition-colors duration-300"
          >
            {t.about.contact}
          </a>
        </div>
      </section>

    </div>
  );
}

function Footer({ t, currentPage, setCurrentPage }) {
  return (
    <footer className="bg-asciende-purple text-white py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-12">
          <div>
            <img src="/logo_transp.png" alt="Asciende" className="h-8 w-auto mb-4 brightness-0 invert" />
            <p className="text-sm text-white/70 font-jost">
              {t.footer.about}
            </p>
          </div>

          <div>
            <h4 className="font-krona font-bold mb-4">{t.footer.platform}</h4>
            <ul className="space-y-2 text-sm font-jost text-white/70">
              <li><a href="https://hub.asciende.pro" className="hover:text-white transition">{t.nav.hub}</a></li>
              <li><a href="https://lab.asciende.pro" className="hover:text-white transition">{t.nav.physiologyLab}</a></li>
              <li><a href="https://endurance.asciende.pro" className="hover:text-white transition">{t.nav.endurancePlanner}</a></li>
              <li><a href="https://nutrition.asciende.pro" className="hover:text-white transition">{t.nav.nutritionRacePlanner}</a></li>
              <li><a href="https://academy.asciende.pro" className="hover:text-white transition">{t.nav.asciendeAcademy}</a></li>
              <li><span className="text-gray-500 cursor-not-allowed">{t.nav.motionBiomechanic} (Dev)</span></li>
              <li><span className="text-gray-500 cursor-not-allowed">{t.nav.performanceVector} (Dev)</span></li>
            </ul>
          </div>

          <div>
            <h4 className="font-krona font-bold mb-4">{t.footer.services}</h4>
            <ul className="space-y-2 text-sm font-jost text-white/70">
              <li><button onClick={() => setCurrentPage('strength-planning')} className="hover:text-white transition cursor-pointer">{t.footer.strength}</button></li>
              <li><button onClick={() => setCurrentPage('nutrition-planning')} className="hover:text-white transition cursor-pointer">{t.footer.nutrition}</button></li>
              <li><button onClick={() => setCurrentPage('endurance-planning')} className="hover:text-white transition cursor-pointer">{t.footer.endurance}</button></li>
            </ul>
            <div className="mt-6 pt-6 border-t border-white/10">
              <button onClick={() => setCurrentPage('asciende-pro-athletes')} className="text-sm font-jost text-white/70 hover:text-white transition cursor-pointer">
                {t.nav.asciendeProAthletes}
              </button>
            </div>
          </div>

          <div>
            <h4 className="font-krona font-bold mb-4">{t.footer.legal}</h4>
            <ul className="space-y-2 text-sm font-jost text-white/70">
              <li><button onClick={() => setCurrentPage('privacy-policy')} className="hover:text-white transition cursor-pointer">{t.footer.privacy}</button></li>
              <li><button onClick={() => setCurrentPage('impressum')} className="hover:text-white transition cursor-pointer">{t.footer.impressum}</button></li>
              <li><button onClick={() => setCurrentPage('terms')} className="hover:text-white transition cursor-pointer">{t.footer.terms}</button></li>
              <li><button onClick={() => setCurrentPage('cookies')} className="hover:text-white transition cursor-pointer">{t.footer.cookies}</button></li>
              <li><button onClick={() => setCurrentPage('refund-policy')} className="hover:text-white transition cursor-pointer">Refund Policy</button></li>
              <li><button onClick={() => setCurrentPage('support')} className="hover:text-white transition cursor-pointer">Support</button></li>
              <li><button onClick={() => setCurrentPage('delete-account')} className="hover:text-white transition cursor-pointer">Delete Account</button></li>
              <li><a href="#" className="hover:text-white transition">{t.footer.contact}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8">
          <div className="flex justify-center gap-6 mb-6">
            <a href="https://www.instagram.com/asciende.pro/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition">
              <Instagram size={20} />
            </a>
            <a href="https://open.spotify.com/show/0UMyQ8CzoTLJ5wGcU9z1RR?si=dd0985a488454927" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition">
              <Music size={20} />
            </a>
            <a href="https://www.youtube.com/@asciendepro" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition">
              <Youtube size={20} />
            </a>
            <a href="https://www.facebook.com/asciende.pro" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition">
              <Facebook size={20} />
            </a>
          </div>
          <div className="text-center text-sm text-white/60 font-jost">
            <p>&copy; 2026 Asciende. {t.footer.copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}

function Academy({ t }) {
  return (
    <div className="pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-krona font-bold text-asciende-purple mb-6">
            Asciende Academy
          </h1>
          <p className="text-lg text-gray-700 font-jost leading-relaxed max-w-3xl mx-auto">
            Educación y formación para atletas en constante desarrollo.
          </p>
        </div>
      </div>
    </div>
  );
}

function Resources({ t }) {
  return (
    <div className="pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-krona font-bold text-asciende-purple mb-6">
            Resources
          </h1>
          <p className="text-lg text-gray-700 font-jost leading-relaxed max-w-3xl mx-auto">
            Recursos y herramientas para mejorar tu rendimiento.
          </p>
        </div>
      </div>
    </div>
  );
}

function PlatformHome({ t }) {
  return (
    <div className="pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-krona font-bold text-asciende-purple mb-6">
            Platform
          </h1>
          <p className="text-lg text-gray-700 font-jost leading-relaxed max-w-3xl mx-auto">
            La plataforma integrada para atletas, equipos y marcas.
          </p>
        </div>
      </div>
    </div>
  );
}

function Hub({ t }) {
  return (
    <div className="pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-krona font-bold text-asciende-purple mb-6">
            Hub
          </h1>
          <p className="text-lg text-gray-700 font-jost leading-relaxed max-w-3xl mx-auto">
            Centro centralizado para tu entrenamiento y seguimiento.
          </p>
        </div>
      </div>
    </div>
  );
}

function PhysiologyLab({ t }) {
  return (
    <div className="pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-krona font-bold text-asciende-purple mb-6">
            Physiology Lab
          </h1>
          <p className="text-lg text-gray-700 font-jost leading-relaxed max-w-3xl mx-auto">
            Análisis fisiológico avanzado para optimizar tu rendimiento.
          </p>
        </div>
      </div>
    </div>
  );
}

function CyclingPlanner({ t }) {
  return (
    <div className="pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-krona font-bold text-asciende-purple mb-6">
            Cycling Planner
          </h1>
          <p className="text-lg text-gray-700 font-jost leading-relaxed max-w-3xl mx-auto">
            Planificación personalizada de entrenamientos en ciclismo.
          </p>
        </div>
      </div>
    </div>
  );
}

function RunningPlanner({ t }) {
  return (
    <div className="pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-krona font-bold text-asciende-purple mb-6">
            Running Planner
          </h1>
          <p className="text-lg text-gray-700 font-jost leading-relaxed max-w-3xl mx-auto">
            Entrenamientos de carrera optimizados para tu nivel.
          </p>
        </div>
      </div>
    </div>
  );
}

function RacePlanner({ t }) {
  return (
    <div className="pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-krona font-bold text-asciende-purple mb-6">
            Race Planner
          </h1>
          <p className="text-lg text-gray-700 font-jost leading-relaxed max-w-3xl mx-auto">
            Prepara tus competencias con estrategia y precisión.
          </p>
        </div>
      </div>
    </div>
  );
}

function BeachVolley({ t }) {
  return (
    <div className="pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-krona font-bold text-asciende-purple mb-6">
            Beach Volley Scouting
          </h1>
          <p className="text-lg text-gray-700 font-jost leading-relaxed max-w-3xl mx-auto">
            Sistema de evaluación y seguimiento de talento en voleibol de playa.
          </p>
        </div>
      </div>
    </div>
  );
}

function TrainingPrograms({ t }) {
  return (
    <div className="pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-krona font-bold text-asciende-purple mb-6">
            Training Programs
          </h1>
          <p className="text-lg text-gray-700 font-jost leading-relaxed max-w-3xl mx-auto">
            Programas de entrenamiento diseñados para alcanzar tus objetivos.
          </p>
        </div>
      </div>
    </div>
  );
}

function Coaching1v1({ t }) {
  return (
    <div className="pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-krona font-bold text-asciende-purple mb-6">
            Coaching 1:1
          </h1>
          <p className="text-lg text-gray-700 font-jost leading-relaxed max-w-3xl mx-auto">
            Entrenamiento personalizado uno a uno para optimizar tu rendimiento.
          </p>
        </div>
      </div>
    </div>
  );
}

function Partnerships({ t }) {
  return (
    <div className="pt-20 pb-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-krona font-bold text-asciende-purple mb-6">
            Partnerships
          </h1>
          <p className="text-lg text-gray-700 font-jost leading-relaxed max-w-3xl mx-auto">
            Colaboraciones estratégicas para amplificar el impacto del deporte.
          </p>
        </div>
      </div>
    </div>
  );
}
