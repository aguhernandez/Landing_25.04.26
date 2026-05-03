# Sistema de Blog Rediseñado - Asciende

## Resumen de Cambios

Se ha rediseñado completamente el sistema de blog de Asciende con los siguientes componentes:

### 1. ESTRUCTURA DE BASE DE DATOS

#### Tablas Nuevas:
- **blog_categories**: Categorías dinámicas para las historias
  - `id`, `name`, `slug`, `description`, `created_at`, `updated_at`
  
- **blog_authors**: Información del autor
  - `id`, `name`, `email`, `photo_url`, `bio`, `created_at`, `updated_at`
  
- **blog_sections**: Secciones de contenido para historias completas
  - `id`, `post_id`, `subtitle`, `content`, `section_order`, `created_at`, `updated_at`
  
- **blog_section_media**: Media asociada a secciones (imágenes/videos)
  - `id`, `section_id`, `type`, `url`, `caption`, `media_order`, `created_at`

#### Tabla Modificada:
- **blog_posts**: Nuevas columnas añadidas
  - `featured_text`: Texto para teaser modal
  - `featured_video`: Video destacado (opcional)
  - `category_id`: Referencia a categoría
  - `slug`: URL-friendly identifier
  - `author_id`: Referencia a autor

### 2. COMPONENTES FRONTEND

#### Blog.tsx (Principal)
- **Blog Component**: Pantalla principal con:
  - Carousel de historias
  - Filtros dinámicos por categoría
  - Visualización de 3 posts (actual, anterior, siguiente)
  - Integración de teaser modal
  
- **BlogPostForm**: Formulario para crear/editar posts con:
  - Campos básicos: título, extracto, texto destacado
  - Selector de categoría (obligatorio)
  - URLs de imagen y video destacados
  - Campo para contenido principal
  - Toggle de publicación

#### BlogTeaserModal.tsx
- Modal de preview cuando user clickea en una historia
- Muestra:
  - Imagen destacada
  - Título
  - Texto destacado (featured_text)
  - Video preview (si existe)
  - Botón "Leer historia completa"
- **NO contiene el contenido completo** (solo preview)

#### BlogStoryPage.tsx
- Página dedicada para historia completa
- Layout editorial (Patagonia-style):
  - Hero image
  - Columna izquierda (35%): Subtítulos (Krona One)
  - Columna derecha (65%): Contenido (Jost)
- Sección de autor con foto y biografía
- URL: `/stories/{category_slug}/{story_slug}`

### 3. FLUJO DE USUARIO

```
Home (Blog Section)
  ├─ Click en story card
  │  └─ Abre BlogTeaserModal (preview)
  │     └─ Click en "Leer historia completa"
  │        └─ Navega a /stories/{category}/{slug}
  │           └─ Muestra BlogStoryPage (contenido completo)
  └─ Filtros por categoría
     └─ Filtra posts en tiempo real
```

### 4. CATEGORÍAS INCLUIDAS

- Historias de Atletas
- Guías de Entrenamiento
- Análisis de Datos
- Podcast
- Inspiración

(Pueden agrarse más dinámicamente desde admin)

### 5. ADMIN PANEL - BLOG POSTS

Formulario mejorado para crear historias:

**Información Básica:**
- Título (requerido)
- Categoría (requerido - selector dinámico)
- Imagen destacada
- Video destacado (opcional)

**Contenido:**
- Extracto (short description)
- Texto destacado (para teaser modal)
- Contenido principal

**Control:**
- Toggle de publicación
- Auto-generación de slug
- Timestamps automáticos

### 6. CARACTERÍSTICAS IMPLEMENTADAS

✅ Sistema de categorías dinámicas
✅ Teaser modal (preview layer)
✅ Página de historia completa con layout editorial
✅ Filtros por categoría en homepage
✅ Información de autor
✅ Rich text support en contenido
✅ URLs shareable y SEO-friendly
✅ Responsive design
✅ Row Level Security (RLS) en BD

### 7. PRÓXIMAS MEJORAS

Para completar el sistema editorial Patagonia-style:

1. **Sistema de bloques avanzado**: Permitir múltiples secciones con:
   - Subtítulos individuales por sección
   - Imágenes dentro de secciones
   - Videos embebidos dentro de secciones
   - Reordenar secciones

2. **Rich text editor**: Cambiar textarea por editor WYSIWYG
   - Bold, italic, underline
   - Tamaños de fuente
   - Links

3. **Galería de media**: Sistema para subir y gestionar imágenes/videos

4. **Rutas dinámicas**: Implementar routing en React Router para:
   - `/stories/{category_slug}/{story_slug}`
   - Compartibilidad de URLs

## NOTES TÉCNICAS

- Todas las tablas tienen RLS habilitado
- Lectura pública, escritura solo admin
- Índices creados para rendimiento
- Foreign keys para relaciones
- Slugs únicos para URLs
