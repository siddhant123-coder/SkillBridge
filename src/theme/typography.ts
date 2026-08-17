import { TextStyle } from "react-native";

/**
 * SkillBridge Typography System
 * Later we can replace the system font with
 * Space Grotesk + Inter.
 */

export const fontWeight = {
  regular: "400",
  medium: "500",
  semiBold: "600",
  bold: "700",
} as const;

export const typography = {
  heading: {
    fontSize: 26,
    fontWeight: fontWeight.bold,
    letterSpacing: -0.5,
  },

  title: {
    fontSize: 19,
    fontWeight: fontWeight.semiBold,
  },

  // Alias used by reusable components
  subtitle: {
    fontSize: 19,
    fontWeight: fontWeight.semiBold,
  },

  body: {
    fontSize: 15,
    fontWeight: fontWeight.regular,
  },

  // Small descriptive text
  caption: {
    fontSize: 13,
    fontWeight: fontWeight.regular,
  },

  label: {
    fontSize: 11,
    fontWeight: fontWeight.medium,
    letterSpacing: 1,
    textTransform: "uppercase",
  },

  button: {
    fontSize: 15,
    fontWeight: fontWeight.semiBold,
  },

  eyebrow: {
    fontSize: 12,
    fontWeight: fontWeight.medium,
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
} satisfies Record<string, TextStyle>;

export type TypographyToken = keyof typeof typography;