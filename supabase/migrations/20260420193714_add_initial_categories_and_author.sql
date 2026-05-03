/*
  # Add Initial Blog Categories and Author

  1. Data
    - Insert default blog categories
    - Insert admin author profile
*/

-- Insert default categories
INSERT INTO blog_categories (name, slug, description)
VALUES 
  ('Historias de Atletas', 'athlete-stories', 'Historias inspiradoras de atletas'),
  ('Guías de Entrenamiento', 'training-guides', 'Guías completas de entrenamiento y rendimiento'),
  ('Análisis de Datos', 'data-analysis', 'Análisis de rendimiento y ciencia del deporte'),
  ('Podcast', 'podcast', 'Episodios de nuestro podcast'),
  ('Inspiración', 'inspiration', 'Contenido inspirador y motivacional')
ON CONFLICT (slug) DO NOTHING;

-- Insert admin author profile
INSERT INTO blog_authors (name, bio)
VALUES 
  ('Admin Asciende', 'Fundador y autor principal de Asciende')
ON CONFLICT (email) DO NOTHING;
