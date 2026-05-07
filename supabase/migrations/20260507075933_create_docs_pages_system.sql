/*
  # Create Docs Pages System

  ## Overview
  A complete documentation content system for the Asciende.pro ecosystem, separate from blog posts.

  ## New Tables

  ### docs_pages
  - `id` (uuid, pk) — unique identifier
  - `title` (text) — page title
  - `slug` (text, unique) — full URL slug, e.g. "hub/dashboard"
  - `parent_slug` (text, nullable) — parent page slug for nesting, e.g. "hub"
  - `satellite` (text) — which module/product this belongs to: hub, lab, endurance-planner, nutrition-planner, academy, performance-vector, motion, general
  - `category` (text, nullable) — sub-category within the satellite, e.g. "testing", "formulas"
  - `content_markdown` (text, nullable) — raw markdown source for future AI/RAG
  - `content_html` (text, nullable) — pre-rendered HTML for fast display
  - `content_json` (jsonb, nullable) — structured block data for rich editor compatibility
  - `excerpt` (text, nullable) — short description for sidebar/SEO
  - `seo_title` (text, nullable)
  - `seo_description` (text, nullable)
  - `cover_image` (text, nullable) — URL
  - `order_index` (integer, default 0) — ordering within parent/satellite
  - `tags` (text[], default '{}') — searchable tags
  - `related_slugs` (text[], default '{}') — slugs of related docs pages
  - `published` (boolean, default false)
  - `version_label` (text, nullable) — e.g. "v1.0", "v2 beta"
  - `status` (text, default 'alpha') — alpha | beta | experimental | stable
  - `estimated_reading_minutes` (integer, nullable)
  - `created_at` (timestamptz)
  - `updated_at` (timestamptz)

  ## Security
  - RLS enabled on docs_pages
  - Public can SELECT published pages
  - Admin (admin@asciende.pro) has full CRUD access
*/

-- docs_pages table
CREATE TABLE IF NOT EXISTS docs_pages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL DEFAULT '',
  slug text UNIQUE NOT NULL DEFAULT '',
  parent_slug text,
  satellite text NOT NULL DEFAULT 'general',
  category text,
  content_markdown text,
  content_html text,
  content_json jsonb,
  excerpt text,
  seo_title text,
  seo_description text,
  cover_image text,
  order_index integer NOT NULL DEFAULT 0,
  tags text[] NOT NULL DEFAULT '{}',
  related_slugs text[] NOT NULL DEFAULT '{}',
  published boolean NOT NULL DEFAULT false,
  version_label text,
  status text NOT NULL DEFAULT 'alpha' CHECK (status IN ('alpha', 'beta', 'experimental', 'stable')),
  estimated_reading_minutes integer,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

-- Indexes for common query patterns
CREATE INDEX IF NOT EXISTS idx_docs_pages_slug ON docs_pages (slug);
CREATE INDEX IF NOT EXISTS idx_docs_pages_parent_slug ON docs_pages (parent_slug);
CREATE INDEX IF NOT EXISTS idx_docs_pages_satellite ON docs_pages (satellite);
CREATE INDEX IF NOT EXISTS idx_docs_pages_published ON docs_pages (published);
CREATE INDEX IF NOT EXISTS idx_docs_pages_order ON docs_pages (satellite, order_index);
CREATE INDEX IF NOT EXISTS idx_docs_pages_tags ON docs_pages USING gin (tags);

-- RLS
ALTER TABLE docs_pages ENABLE ROW LEVEL SECURITY;

-- Public can read published pages
CREATE POLICY "Public can read published docs"
  ON docs_pages
  FOR SELECT
  TO anon
  USING (published = true);

-- Authenticated users can read published pages
CREATE POLICY "Authenticated can read published docs"
  ON docs_pages
  FOR SELECT
  TO authenticated
  USING (published = true);

-- Admin can read ALL docs (including unpublished)
CREATE POLICY "Admin can read all docs"
  ON docs_pages
  FOR SELECT
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'admin@asciende.pro');

-- Admin can insert docs
CREATE POLICY "Admin can insert docs"
  ON docs_pages
  FOR INSERT
  TO authenticated
  WITH CHECK ((auth.jwt() ->> 'email') = 'admin@asciende.pro');

-- Admin can update docs
CREATE POLICY "Admin can update docs"
  ON docs_pages
  FOR UPDATE
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'admin@asciende.pro')
  WITH CHECK ((auth.jwt() ->> 'email') = 'admin@asciende.pro');

-- Admin can delete docs
CREATE POLICY "Admin can delete docs"
  ON docs_pages
  FOR DELETE
  TO authenticated
  USING ((auth.jwt() ->> 'email') = 'admin@asciende.pro');

-- Seed: welcome / getting started page
INSERT INTO docs_pages (
  title, slug, parent_slug, satellite, category,
  content_markdown, content_html,
  excerpt, order_index, tags, status, published, estimated_reading_minutes
) VALUES (
  'Welcome to Asciende Docs',
  'getting-started',
  NULL,
  'general',
  'overview',
  '# Welcome to Asciende Docs

This is the central knowledge base for the entire Asciende.pro ecosystem. Here you will find documentation, tutorials, scientific explanations, and guides for every module and satellite.

## What is Asciende?

Asciende is a scientific sports-performance platform designed for endurance athletes, coaches, and sports scientists. It integrates training planning, nutrition, physiology testing, and performance modelling into a single cohesive ecosystem.

## Modules

- **HUB** — Athlete central app, dashboards, readiness and recovery tracking
- **Lab** — Physiology testing: VO2, lactate, HRV analysis
- **Endurance Planner** — Periodization, training load, workouts
- **Nutrition Planner** — Meal planning, macros, athlete nutrition
- **Academy** — Courses and learning paths
- **Performance Vector** — Mathematical performance modelling and equations
- **Motion Biomechanics** — Movement analysis and video analysis

## Getting Started

Browse the sidebar to explore documentation by module, or use the search bar to find specific topics.',
  '<h1>Welcome to Asciende Docs</h1><p>This is the central knowledge base for the entire Asciende.pro ecosystem. Here you will find documentation, tutorials, scientific explanations, and guides for every module and satellite.</p><h2>What is Asciende?</h2><p>Asciende is a scientific sports-performance platform designed for endurance athletes, coaches, and sports scientists. It integrates training planning, nutrition, physiology testing, and performance modelling into a single cohesive ecosystem.</p><h2>Modules</h2><ul><li><strong>HUB</strong> — Athlete central app, dashboards, readiness and recovery tracking</li><li><strong>Lab</strong> — Physiology testing: VO2, lactate, HRV analysis</li><li><strong>Endurance Planner</strong> — Periodization, training load, workouts</li><li><strong>Nutrition Planner</strong> — Meal planning, macros, athlete nutrition</li><li><strong>Academy</strong> — Courses and learning paths</li><li><strong>Performance Vector</strong> — Mathematical performance modelling and equations</li><li><strong>Motion Biomechanics</strong> — Movement analysis and video analysis</li></ul>',
  'Welcome to the central knowledge base for the Asciende.pro ecosystem.',
  0,
  ARRAY['overview', 'getting-started', 'welcome'],
  'stable',
  true,
  3
),
(
  'Platform Overview',
  'platform-overview',
  NULL,
  'general',
  'overview',
  '# Platform Overview

Asciende.pro is built as a modular ecosystem of interconnected satellites, all sharing a common data layer and authentication system.',
  '<h1>Platform Overview</h1><p>Asciende.pro is built as a modular ecosystem of interconnected satellites, all sharing a common data layer and authentication system.</p>',
  'An overview of the Asciende.pro platform architecture and modular design.',
  1,
  ARRAY['overview', 'architecture', 'platform'],
  'stable',
  true,
  4
);
