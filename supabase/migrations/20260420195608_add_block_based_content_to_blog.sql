/*
  # Block-Based Content System for Blog Posts

  ## Summary
  Replaces single content field with a flexible block system.
  Each post is composed of ordered blocks (text, image, video).
  Text blocks have a left subtitle column (Krona One) and right content column (Jost).

  ## New Tables
  - `blog_blocks`: Flexible content blocks for each post
    - type: 'text' | 'image' | 'video'
    - For text: subtitle (left col, 35%) + content (right col, 65%)
    - For image: url + caption
    - For video: url + caption
    - block_order: integer for drag-and-drop ordering

  ## Changes
  - blog_sections table is superseded by blog_blocks
  - blog_categories: no changes needed, already correct
*/

-- Create the blog_blocks table
CREATE TABLE IF NOT EXISTS blog_blocks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES blog_posts(id) ON DELETE CASCADE,
  type text NOT NULL CHECK (type IN ('text', 'image', 'video')),
  subtitle text,
  content text,
  url text,
  caption text,
  block_order integer NOT NULL DEFAULT 0,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE blog_blocks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view blog blocks"
  ON blog_blocks FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert blog blocks"
  ON blog_blocks FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update blog blocks"
  ON blog_blocks FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete blog blocks"
  ON blog_blocks FOR DELETE
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS idx_blog_blocks_post_id ON blog_blocks(post_id);
CREATE INDEX IF NOT EXISTS idx_blog_blocks_order ON blog_blocks(post_id, block_order);

-- Also allow authenticated users to manage blog_posts, categories, authors
CREATE POLICY "Authenticated users can insert blog posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update blog posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete blog posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert categories"
  ON blog_categories FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update categories"
  ON blog_categories FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete categories"
  ON blog_categories FOR DELETE
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert authors"
  ON blog_authors FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update authors"
  ON blog_authors FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete authors"
  ON blog_authors FOR DELETE
  TO authenticated
  USING (true);
