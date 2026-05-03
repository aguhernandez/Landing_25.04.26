import { supabase } from '../../lib/supabase';
import { Language } from './translations';

export interface ConsentPreferences {
  necessary: boolean;
  statistics: boolean;
  preferences: boolean;
  marketing: boolean;
  unclassified: boolean;
}

export interface ConsentRecord {
  id: string;
  sessionId: string;
  action: 'accept_all' | 'deny_all' | 'customize' | 'withdraw';
  preferences: ConsentPreferences;
  language: Language;
  createdAt: string;
}

const SESSION_KEY = 'asciende_consent_session';
const CONSENT_KEY = 'asciende_consent_record';

export function getOrCreateSessionId(): string {
  let sessionId = localStorage.getItem(SESSION_KEY);
  if (!sessionId) {
    sessionId = crypto.randomUUID();
    localStorage.setItem(SESSION_KEY, sessionId);
  }
  return sessionId;
}

export function getStoredConsent(): ConsentRecord | null {
  const stored = localStorage.getItem(CONSENT_KEY);
  if (!stored) return null;
  try {
    return JSON.parse(stored);
  } catch {
    return null;
  }
}

export function storeConsentLocally(record: ConsentRecord): void {
  localStorage.setItem(CONSENT_KEY, JSON.stringify(record));
}

export async function saveConsent(
  action: ConsentRecord['action'],
  prefs: ConsentPreferences,
  language: Language
): Promise<ConsentRecord> {
  const sessionId = getOrCreateSessionId();
  const recordId = crypto.randomUUID();
  const now = new Date().toISOString();

  const { error } = await supabase
    .from('cookie_consents')
    .insert({
      id: recordId,
      session_id: sessionId,
      user_agent: navigator.userAgent,
      language,
      action,
      necessary: prefs.necessary,
      statistics: prefs.statistics,
      preferences: prefs.preferences,
      marketing: prefs.marketing,
      unclassified: prefs.unclassified,
      consent_version: '1.0',
      page_url: window.location.href,
    });

  const record: ConsentRecord = {
    id: recordId,
    sessionId,
    action,
    preferences: prefs,
    language,
    createdAt: now,
  };

  if (error) {
    console.warn('Could not save consent to database:', error.message);
  }

  storeConsentLocally(record);
  return record;
}

export const defaultPreferences: ConsentPreferences = {
  necessary: true,
  statistics: false,
  preferences: false,
  marketing: false,
  unclassified: false,
};

export const allAccepted: ConsentPreferences = {
  necessary: true,
  statistics: true,
  preferences: true,
  marketing: true,
  unclassified: true,
};
