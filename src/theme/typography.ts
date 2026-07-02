import { TextStyle } from 'react-native';

/**
 * Centralized typography scale for SkillBridge.
 * Uses the system font for now — custom font loading (Space Grotesk / Inter)
 * is a planned follow-up task, not part of this sprint.
 */
export const fontWeight: Record<string, TextStyle['fontWeight']> = {
  regular: '400',
  medium: '500',
  semiBold: '600',
  bold: '700',
};

export const typography = {
  heading: {
    fontSize: 26,
    fontWeight: fontWeight.bold,
    letterSpacing: -0.5,
  } as TextStyle,
  title: {
    fontSize: 19,
    fontWeight: fontWeight.semiBold,
  } as TextStyle,
  body: {
    fontSize: 15,
    fontWeight: fontWeight.regular,
  } as TextStyle,
  label: {
    fontSize: 11,
    fontWeight: fontWeight.medium,
    letterSpacing: 1,
    textTransform: 'uppercase',
  } as TextStyle,
  button: {
    fontSize: 15,
    fontWeight: fontWeight.semiBold,
  } as TextStyle,
  eyebrow: {
    fontSize: 12,
    fontWeight: fontWeight.medium,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
  } as TextStyle,
} as const;
