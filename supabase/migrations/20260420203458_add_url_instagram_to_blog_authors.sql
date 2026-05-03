/*
  # Add url and instagram_url to blog_authors

  ## Summary
  Adds two new optional fields to the blog_authors table:
  - `url`: A personal or profile URL (can be an Asciende page or any external URL)
  - `instagram_url`: Instagram profile URL or handle

  These are displayed at the bottom of each full story page in an "About the author" section.

  ## Changes
  - blog_authors: new column `url` (text, nullable)
  - blog_authors: new column `instagram_url` (text, nullable)
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_authors' AND column_name = 'url'
  ) THEN
    ALTER TABLE blog_authors ADD COLUMN url text;
  END IF;
END $$;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_authors' AND column_name = 'instagram_url'
  ) THEN
    ALTER TABLE blog_authors ADD COLUMN instagram_url text;
  END IF;
END $$;
