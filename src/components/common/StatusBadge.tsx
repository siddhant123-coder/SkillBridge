import React from "react";
import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { colors } from "../../theme/colors";
import { spacing, radius } from "../../theme/spacing";

export type BadgeStatus =
  | "pending"
  | "confirmed"
  | "accepted"
  | "completed"
  | "rejected"
  | "cancelled"
  | "verified";

type StatusBadgeProps = {
  status: BadgeStatus | string;
  label?: string;
  style?: StyleProp<ViewStyle>;
};

export default function StatusBadge({
  status,
  label,
  style,
}: StatusBadgeProps) {
  const normalized = (status || "").toLowerCase() as BadgeStatus;

  const getStyle = () => {
    switch (normalized) {
      case "pending":
        return {
          bg: colors.warningSoft,
          border: "rgba(255, 182, 72, 0.4)",
          text: colors.warning,
        };
      case "confirmed":
      case "accepted":
      case "verified":
        return {
          bg: colors.learnerSoft,
          border: "rgba(52, 216, 168, 0.4)",
          text: colors.learner,
        };
      case "completed":
        return {
          bg: "rgba(108, 107, 255, 0.16)",
          border: "rgba(108, 107, 255, 0.4)",
          text: colors.primary,
        };
      case "rejected":
      case "cancelled":
        return {
          bg: colors.errorSoft,
          border: "rgba(242, 85, 90, 0.4)",
          text: colors.error,
        };
      default:
        return {
          bg: colors.glassCard,
          border: colors.glassBorder,
          text: colors.textMuted,
        };
    }
  };

  const badgeStyle = getStyle();
  const displayText = label || (normalized.charAt(0).toUpperCase() + normalized.slice(1));

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: badgeStyle.bg,
          borderColor: badgeStyle.border,
        },
        style,
      ]}
    >
      <Text style={[styles.badgeText, { color: badgeStyle.text }]}>
        {displayText}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    borderWidth: 1,
    alignSelf: "flex-start",
  },
  badgeText: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "capitalize",
    letterSpacing: 0.3,
  },
});