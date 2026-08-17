import { StyleSheet, ViewStyle } from "react-native";
import { colors } from "./colors";
import { radius, spacing } from "./spacing";

export const glassStyles = StyleSheet.create({
  card: {
    backgroundColor: colors.glassCard,
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderRadius: radius.xl,
    padding: spacing.lg,
    // Android elevation & shadow
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  } as ViewStyle,

  cardElevated: {
    backgroundColor: "rgba(30, 34, 44, 0.82)",
    borderColor: colors.glassBorderHighlight,
    borderWidth: 1,
    borderRadius: radius.xxl,
    padding: spacing.xl,
    elevation: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.35,
    shadowRadius: 16,
  } as ViewStyle,

  input: {
    backgroundColor: colors.glassInput,
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md + 2,
    color: colors.textPrimary,
    fontSize: 14,
  } as ViewStyle,

  chip: {
    backgroundColor: colors.glassInput,
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md + 2,
    paddingVertical: spacing.sm,
    flexDirection: "row",
    alignItems: "center",
  } as ViewStyle,

  trainerGlow: {
    borderColor: colors.trainer,
    shadowColor: colors.trainer,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 4,
  } as ViewStyle,

  learnerGlow: {
    borderColor: colors.learner,
    shadowColor: colors.learner,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.45,
    shadowRadius: 12,
    elevation: 4,
  } as ViewStyle,

  primaryGlow: {
    borderColor: colors.primary,
    shadowColor: colors.primary,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.5,
    shadowRadius: 14,
    elevation: 5,
  } as ViewStyle,
});
