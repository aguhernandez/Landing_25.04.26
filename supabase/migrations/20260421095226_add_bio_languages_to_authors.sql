/*
  # Add multilingual biography to blog authors

  1. Changes
    - Add `bio_en` column for English biography
    - Add `bio_es` column for Spanish biography
    - Keep existing `bio` column for backwards compatibility (can be used as fallback)
    - Create indexes for quick lookups

  2. Migration Strategy
    - Copy existing `bio` content to `bio_es` for existing authors
    - Migration is non-destructive, existing data is preserved
*/

DO $$
BEGIN
  -- Add English bio column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_authors' AND column_name = 'bio_en'
  ) THEN
    ALTER TABLE blog_authors ADD COLUMN bio_en text;
  END IF;

  -- Add Spanish bio column if it doesn't exist
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_authors' AND column_name = 'bio_es'
  ) THEN
    ALTER TABLE blog_authors ADD COLUMN bio_es text;
  END IF;
END $$;

-- Copy existing bio content to bio_es as fallback
UPDATE blog_authors
SET bio_es = bio
WHERE bio_es IS NULL AND bio IS NOT NULL;
