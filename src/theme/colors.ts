/**
 * Centralized color tokens for SkillBridge with Android Material 3 Dark & Glassmorphism styling.
 */

export const colors = {
  // Backgrounds
  background: "#0C0D10",
  backgroundSecondary: "#12141A",
  surface: "#15171C",
  surfaceElevated: "#1C1F26",
  surfaceSubtle: "#101217",

  // Glassmorphism surfaces (Translucent + soft borders)
  glassCard: "rgba(25, 28, 36, 0.78)",
  glassCardHover: "rgba(32, 36, 46, 0.88)",
  glassBorder: "rgba(255, 255, 255, 0.09)",
  glassBorderHighlight: "rgba(255, 255, 255, 0.18)",
  glassInput: "rgba(20, 22, 29, 0.72)",
  glassOverlay: "rgba(12, 13, 16, 0.85)",

  // Borders & Dividers
  border: "#272A32",
  borderLight: "#353944",

  // Brand Accent (Violet / Indigo)
  primary: "#6C6BFF",
  primaryPressed: "#5756E6",
  primarySoft: "rgba(108, 107, 255, 0.15)",
  primaryGlow: "rgba(108, 107, 255, 0.35)",

  // Legacy aliases
  accent: "#6C6BFF",
  accentPressed: "#5756E6",

  // Role Theme Colors (Warm Orange for Trainer, Mint for Learner)
  trainer: "#E8794B",
  trainerPressed: "#D46637",
  trainerSoft: "rgba(232, 121, 75, 0.14)",
  trainerGlow: "rgba(232, 121, 75, 0.35)",
  trainerDark: "#1A0C05",

  learner: "#34D8A8",
  learnerPressed: "#27C294",
  learnerSoft: "rgba(52, 216, 168, 0.14)",
  learnerGlow: "rgba(52, 216, 168, 0.35)",
  learnerDark: "#04241A",

  // Typography
  textPrimary: "#EEF0F3",
  textSecondary: "#C9CDD3",
  textMuted: "#8B9099",
  textDisabled: "#5A5E68",

  // Feedback & Status
  success: "#34D8A8",
  warning: "#FFB648",
  warningSoft: "rgba(255, 182, 72, 0.15)",
  error: "#F2555A",
  errorSoft: "rgba(242, 85, 90, 0.15)",
  info: "#58A6FF",

  // Static
  white: "#FFFFFF",
  black: "#000000",
  transparent: "transparent",
} as const;

export type ColorToken = keyof typeof colors;