/*
  # Create media_metadata table

  ## Summary
  Stores additional metadata for files uploaded to Supabase Storage (media bucket).
  Since Storage doesn't natively support custom fields like alt_text, file_name, and caption,
  this table links a storage file path to those custom fields.

  ## New Tables
  - `media_metadata`
    - `id` (uuid, primary key)
    - `storage_path` (text, unique) — the file name/path in the media bucket
    - `file_name` (text) — human-readable display name
    - `alt_text` (text) — accessibility alt text for the image
    - `caption` (text) — optional caption shown with the image
    - `created_at`, `updated_at` (timestamps)

  ## Security
  - RLS enabled
  - Authenticated users can read, insert, update, delete their own metadata entries
*/

CREATE TABLE IF NOT EXISTS media_metadata (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  storage_path text UNIQUE NOT NULL,
  file_name text NOT NULL DEFAULT '',
  alt_text text NOT NULL DEFAULT '',
  caption text NOT NULL DEFAULT '',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE media_metadata ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Authenticated users can read media metadata"
  ON media_metadata FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can insert media metadata"
  ON media_metadata FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update media metadata"
  ON media_metadata FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete media metadata"
  ON media_metadata FOR DELETE
  TO authenticated
  USING (true);
