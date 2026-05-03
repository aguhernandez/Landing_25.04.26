/*
  # Add language field to blog_posts

  ## Summary
  Adds a `language` column to blog_posts to support bilingual content.
  Each post belongs to either 'en' (English) or 'es' (Spanish).
  The homepage blog section will only show posts matching the currently selected language.

  ## Changes
  - blog_posts: new column `language` (text, default 'en')
  - Index on language for efficient filtering
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'language'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN language text NOT NULL DEFAULT 'en'
      CHECK (language IN ('en', 'es'));
  END IF;
END $$;

CREATE INDEX IF NOT EXISTS idx_blog_posts_language ON blog_posts(language);
