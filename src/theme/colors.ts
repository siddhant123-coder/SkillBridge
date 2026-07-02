/**
 * Centralized color tokens for SkillBridge.
 * No screen or component should hardcode a hex value directly —
 * always reference a token from this file.
 */
export const colors = {
  // Backgrounds
  background: '#0C0D10',
  surface: '#15171C',
  surfaceElevated: '#1C1F26',

  // Borders / dividers
  border: '#272A32',

  // Text
  textPrimary: '#EEF0F3',
  textMuted: '#8B9099',
  textDisabled: '#5A5E68',

  // Brand accents
  accent: '#6C6BFF',
  accentPressed: '#5958E0',

  // Role accents (used later for trainer/learner theming)
  trainer: '#E8794B',
  learner: '#34D8A8',

  // Feedback
  error: '#F2555A',
  success: '#34D8A8',

  // Static
  white: '#FFFFFF',
  black: '#000000',
} as const;

export type ColorToken = keyof typeof colors;
