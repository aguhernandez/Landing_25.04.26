import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type BlogPost = {
  id: string;
  title: string;
  excerpt: string;
  featured_text?: string;
  content: string;
  featured_image?: string;
  featured_video?: string;
  video_url?: string;
  slug: string;
  category_id?: string;
  author_id?: string;
  language: 'en' | 'es';
  published: boolean;
  created_at: string;
  updated_at: string;
};

export type BlogBlock = {
  id: string;
  post_id: string;
  type: 'text' | 'image' | 'video';
  subtitle?: string;
  content?: string;
  url?: string;
  caption?: string;
  block_order: number;
  created_at: string;
  updated_at: string;
};

export type BlogCategory = {
  id: string;
  name: string;
  slug: string;
  description?: string;
  language: 'en' | 'es';
  created_at: string;
  updated_at: string;
};

export type BlogAuthor = {
  id: string;
  name: string;
  email?: string;
  photo_url?: string;
  bio?: string;
  bio_en?: string;
  bio_es?: string;
  url?: string;
  instagram_url?: string;
  created_at: string;
  updated_at: string;
};
