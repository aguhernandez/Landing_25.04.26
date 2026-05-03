/*
  # Create Blog System

  1. New Tables
    - `blog_posts` - For storing blog post content
      - `id` (uuid, primary key)
      - `title` (text)
      - `excerpt` (text)
      - `content` (text)
      - `featured_image` (text, URL)
      - `slug` (text, unique)
      - `published` (boolean)
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on `blog_posts` table
    - Admin-only write access (admin@asciende.pro)
    - Public read-only access for published posts
*/

CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  excerpt text NOT NULL,
  content text NOT NULL,
  featured_image text,
  slug text UNIQUE NOT NULL,
  published boolean DEFAULT false,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Admin can view all posts"
  ON blog_posts FOR SELECT
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@asciende.pro');

CREATE POLICY "Public can view published posts"
  ON blog_posts FOR SELECT
  TO anon
  USING (published = true);

CREATE POLICY "Admin can insert posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (auth.jwt() ->> 'email' = 'admin@asciende.pro');

CREATE POLICY "Admin can update posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@asciende.pro')
  WITH CHECK (auth.jwt() ->> 'email' = 'admin@asciende.pro');

CREATE POLICY "Admin can delete posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (auth.jwt() ->> 'email' = 'admin@asciende.pro');

CREATE INDEX idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX idx_blog_posts_published ON blog_posts(published);
CREATE INDEX idx_blog_posts_created_at ON blog_posts(created_at DESC);
