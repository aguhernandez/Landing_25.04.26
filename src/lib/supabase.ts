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

export type DocsSatellite = 'general' | 'hub' | 'lab' | 'endurance-planner' | 'nutrition-planner' | 'academy' | 'performance-vector' | 'motion';
export type DocsStatus = 'alpha' | 'beta' | 'experimental' | 'stable';

export type DocsPage = {
  id: string;
  title: string;
  slug: string;
  parent_slug?: string;
  satellite: DocsSatellite;
  category?: string;
  content_markdown?: string;
  content_html?: string;
  content_json?: Record<string, unknown>;
  excerpt?: string;
  seo_title?: string;
  seo_description?: string;
  cover_image?: string;
  order_index: number;
  tags: string[];
  related_slugs: string[];
  published: boolean;
  version_label?: string;
  status: DocsStatus;
  estimated_reading_minutes?: number;
  language: 'en' | 'es';
  created_at: string;
  updated_at: string;
};
