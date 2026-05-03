/*
  # Add language support to blog_categories

  1. Changes to tables
    - Add `language` column to `blog_categories` (type: text, default: 'en')
    - This allows categories to be language-specific (en/es)
  
  2. Data migration
    - Set all existing categories to 'en' (English) by default
    - Admin can then duplicate/translate categories for Spanish
  
  3. Security
    - No RLS changes needed - existing policies remain valid
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_categories' AND column_name = 'language'
  ) THEN
    ALTER TABLE blog_categories ADD COLUMN language text DEFAULT 'en';
  END IF;
END $$;
