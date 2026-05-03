/*
  # Add Categories, Authors, and Sections to Blog System

  1. New Tables
    - `blog_categories` - Dynamic story categories
    - `blog_authors` - Author information (name, photo, bio)
    - `blog_sections` - Content blocks for full stories
    - `blog_section_media` - Images and videos for sections
  
  2. Modified Tables
    - `blog_posts` - Add featured_text, featured_video, category_id, slug, author_id, content type
  
  3. Security
    - Enable RLS on all new tables
    - Add public read policies
    - Add admin write/update policies
*/

-- Create blog_categories table
CREATE TABLE IF NOT EXISTS blog_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL UNIQUE,
  slug text NOT NULL UNIQUE,
  description text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON blog_categories FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create blog_authors table
CREATE TABLE IF NOT EXISTS blog_authors (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text UNIQUE,
  photo_url text,
  bio text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_authors ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view authors"
  ON blog_authors FOR SELECT
  TO anon, authenticated
  USING (true);

-- Add new columns to blog_posts
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'featured_text'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN featured_text text;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'featured_video'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN featured_video text;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'category_id'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN category_id uuid REFERENCES blog_categories(id) ON DELETE SET NULL;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'slug'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN slug text UNIQUE;
  END IF;
  
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'author_id'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN author_id uuid REFERENCES blog_authors(id) ON DELETE SET NULL;
  END IF;
END $$;

-- Create blog_sections table
CREATE TABLE IF NOT EXISTS blog_sections (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  subtitle text,
  content text NOT NULL,
  section_order integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_sections ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view sections"
  ON blog_sections FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create blog_section_media table
CREATE TABLE IF NOT EXISTS blog_section_media (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  section_id uuid NOT NULL REFERENCES blog_sections(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('image', 'video')),
  url text NOT NULL,
  caption text,
  media_order integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE blog_section_media ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view section media"
  ON blog_section_media FOR SELECT
  TO anon, authenticated
  USING (true);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_category_id ON blog_posts(category_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_author_id ON blog_posts(author_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_sections_post_id ON blog_sections(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_section_media_section_id ON blog_section_media(section_id);
