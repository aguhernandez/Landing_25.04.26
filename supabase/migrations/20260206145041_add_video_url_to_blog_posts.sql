/*
  # Add video URL field to blog posts

  1. Changes
    - Add `video_url` column to `blog_posts` table
      - Optional text field for YouTube, Vimeo, or other video URLs
      - When present, the modal will display the video instead of just text content

  2. Notes
    - Uses IF NOT EXISTS pattern to safely add the column
    - Existing posts will have NULL video_url by default
*/

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM information_schema.columns
    WHERE table_name = 'blog_posts' AND column_name = 'video_url'
  ) THEN
    ALTER TABLE blog_posts ADD COLUMN video_url text;
  END IF;
END $$;
