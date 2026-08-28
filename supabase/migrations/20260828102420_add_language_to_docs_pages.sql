/*
  # Add Language Support to Docs Pages

  ## Overview
  Adds a `language` column to the `docs_pages` table, mirroring the existing
  `language` field on `blog_posts`. This allows admins to create documentation
  pages in either English ('en') or Spanish ('es') and lets the public docs
  viewer filter pages by the selected language.

  ## Changes
  ### docs_pages (modified)
  - `language` (text, NOT NULL, default 'en') — the language of the page content.
    Constrained to 'en' or 'es' via a CHECK constraint.

  ## Security
  No changes to existing RLS policies — the column is readable by anyone who
  can already SELECT from docs_pages, and writable by the admin who can already
  INSERT/UPDATE. Existing policies remain in effect.

  ## Notes
  1. The column defaults to 'en' so all existing rows are treated as English.
  2. An index is added on (language, published) to support the frontend's
     filtered query pattern efficiently.
*/

-- Add language column if it does not exist
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'docs_pages' AND column_name = 'language'
  ) THEN
    ALTER TABLE docs_pages ADD COLUMN language text NOT NULL DEFAULT 'en';
  END IF;
END $$;

-- Add CHECK constraint (idempotent)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_constraint WHERE conname = 'docs_pages_language_check'
  ) THEN
    ALTER TABLE docs_pages
      ADD CONSTRAINT docs_pages_language_check CHECK (language IN ('en', 'es'));
  END IF;
END $$;

-- Index for filtered queries by language + published status
CREATE INDEX IF NOT EXISTS idx_docs_pages_language_published
  ON docs_pages (language, published);
