/*
  # Create Cookie Consent Table

  ## Purpose
  Stores GDPR-compliant cookie consent records for asciende.pro visitors.
  This replaces third-party cookie consent tools (Cookiebot/CookieYes) with 
  a self-hosted solution that gives full data ownership.

  ## New Tables

  ### `cookie_consents`
  Records every consent action taken by a visitor.

  Columns:
  - `id` (uuid, primary key) - Unique consent record ID, used as the visitor's Consent ID
  - `session_id` (text) - Anonymous browser session identifier (stored in localStorage)
  - `ip_address` (text, nullable) - Visitor IP for audit trail (GDPR-compliant logging)
  - `user_agent` (text, nullable) - Browser user agent string
  - `language` (text) - Language the banner was displayed in (en/es/de)
  - `action` (text) - The consent action taken: 'accept_all', 'deny_all', 'customize', 'withdraw'
  - `necessary` (boolean) - Consent for necessary cookies (always true)
  - `statistics` (boolean) - Consent for statistics/analytics cookies
  - `preferences` (boolean) - Consent for preference cookies
  - `marketing` (boolean) - Consent for marketing cookies
  - `unclassified` (boolean) - Consent for unclassified cookies
  - `consent_version` (text) - Version of the cookie policy at time of consent
  - `page_url` (text, nullable) - URL where consent was given
  - `created_at` (timestamptz) - Timestamp of consent action
  - `updated_at` (timestamptz) - Timestamp of last update

  ## Security
  - RLS enabled
  - Public INSERT allowed (visitors must be able to record consent)
  - Only authenticated users (admins) can SELECT all records
  - No DELETE or UPDATE from public (immutable audit trail)
*/

CREATE TABLE IF NOT EXISTS cookie_consents (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id text NOT NULL,
  ip_address text,
  user_agent text,
  language text NOT NULL DEFAULT 'en',
  action text NOT NULL CHECK (action IN ('accept_all', 'deny_all', 'customize', 'withdraw')),
  necessary boolean NOT NULL DEFAULT true,
  statistics boolean NOT NULL DEFAULT false,
  preferences boolean NOT NULL DEFAULT false,
  marketing boolean NOT NULL DEFAULT false,
  unclassified boolean NOT NULL DEFAULT false,
  consent_version text NOT NULL DEFAULT '1.0',
  page_url text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

ALTER TABLE cookie_consents ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert consent records"
  ON cookie_consents
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all consent records"
  ON cookie_consents
  FOR SELECT
  TO authenticated
  USING (true);

CREATE INDEX IF NOT EXISTS cookie_consents_session_id_idx ON cookie_consents(session_id);
CREATE INDEX IF NOT EXISTS cookie_consents_created_at_idx ON cookie_consents(created_at DESC);
