# Asciende 2.0 — prototipo

La experiencia vive en `/preview-v2`, con `/preview-v2/for-coaches`, `/preview-v2/coaching`, `/preview-v2/memberships`, `/preview-v2/professionals`, `/preview-v2/stories[/categoría[/artículo]]` y páginas legales de demostración en `/preview-v2/legal/…`. Las rutas originales permanecen intactas. Ejecutar `npm install` y `npm run dev`, y abrir la ruta indicada por Vite seguida de `/preview-v2`. No se ha publicado.

## Dirección

La propuesta conserva la composición editorial y los tokens de marca `#FDDA36` y `#514163`. El recorrido Signature conecta Lab, interpretación, preparación, Hub y proyectos mediante una secuencia fija en escritorio, controlada por scroll en ambos sentidos; en móvil y con movimiento reducido se convierte en escenas verticales. Los gráficos son esquemáticos y carecen de cifras de atletas. Lab y Hub comparten visuales con el explorador. Las siete páginas legales reutilizan los componentes originales.

## Recursos y confirmaciones pendientes

- Capturas auténticas y actuales de Hub, Lab, Endurance y las demás herramientas; la imagen de Nutrition incluida en el repositorio muestra datos de prueba.
- Grabación real de Motion con análisis de movimiento, puntos articulares y ángulos.
- Grabación o captura real de Lab, con autorización para mostrar evaluaciones y datos.
- Una página pública real de proyecto de atleta PRO y permiso para usarla; la tarjeta actual es una demostración ilustrativa de una función existente.
- Confirmar enlaces públicos y descripción definitiva de Motion y Performance, actualmente sin enlace en el sitio existente.
- Confirmar la URL pública de exploración de proyectos: la copia revisada de Hub incorpora Discovery como navegación interna, no una ruta pública independiente confirmada. El CTA abre Hub.
- `.env.local`, ignorado por Git, contiene la URL y clave anónima públicas que el propio landing publicado expone al navegador. El proyecto del landing no estaba en las conexiones visibles del plugin de Supabase. Newsletter, cookies y Stories usan el backend real: enviar un formulario o guardar consentimiento desde el prototipo puede crear registros reales. No se enviaron pruebas.
- El hero usa la imagen existente como respaldo. Para incorporar video auténtico, colocar `asciende-hero.webm` y/o `asciende-hero.mp4` en `public/media/` y definir `VITE_HERO_VIDEO_WEBM=/media/asciende-hero.webm` y/o `VITE_HERO_VIDEO_MP4=/media/asciende-hero.mp4` en `.env.local`; reiniciar Vite. Se mantiene `VITE_HERO_VIDEO_SRC` por compatibilidad. El video se reproduce en silencio y loop, con poster, y se omite con movimiento reducido. No se incluye ningún video ficticio.
- Las vistas de la secuencia y las vistas de Lab/Hub del explorador están encapsuladas en `src/preview-v2/SignatureJourney.tsx`, para reemplazarlas por capturas o videos autorizados. Las capturas locales de Lab inspeccionadas incluyen resultados de evaluación sin autorización de difusión confirmada y no se copiaron.
- La sección Meet the Athletes enlaza al Hub; falta un listado público autorizado y verificable de perfiles para mostrar atletas reales sin exponer datos privados.
- Confirmar precios, promociones, términos comerciales y niveles profesionales vigentes antes de publicarlos. El nuevo material presenta prestaciones y enlaces sin precios. El CTA de coaching utiliza el enlace de consulta Zoom existente en las páginas originales.
- Confirmar autorización y atribución para las fotografías existentes antes de publicar.

Las escenas son ilustraciones, no datos científicos ni interfaces funcionales. La captura de Nutrition es existente y contiene datos de prueba. No se representa transferencia automática de datos. Motion y Lab tienen espacios reservados, no videos reproducibles. Las funciones de entrenadores están condicionadas por los permisos y conexiones existentes.

Stories consulta las publicaciones y bloques existentes, con `published=true` para seleccionar artículos, sin duplicar base de datos. Usa rutas de demostración independientes, un diálogo nativo con cierre por Escape e historial, y conserva las rutas públicas previas del sitio. Podcast permanece fuera de los filtros. Los videos enlazados en artículos se abren mediante su enlace, sin embeber servicios externos de forma automática.
