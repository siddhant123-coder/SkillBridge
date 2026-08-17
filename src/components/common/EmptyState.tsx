import React from "react";
import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../theme/colors";
import { spacing, radius } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import PrimaryButton from "./PrimaryButton";

type EmptyStateProps = {
  icon: keyof typeof Ionicons.glyphMap;
  title: string;
  description: string;
  actionTitle?: string;
  onAction?: () => void;
  variant?: "trainer" | "learner" | "primary";
  style?: StyleProp<ViewStyle>;
};

export default function EmptyState({
  icon,
  title,
  description,
  actionTitle,
  onAction,
  variant = "learner",
  style,
}: EmptyStateProps) {
  const accentColor =
    variant === "trainer"
      ? colors.trainer
      : variant === "learner"
      ? colors.learner
      : colors.primary;

  return (
    <View style={[styles.container, style]}>
      <View
        style={[
          styles.iconContainer,
          {
            backgroundColor:
              variant === "trainer"
                ? colors.trainerSoft
                : variant === "learner"
                ? colors.learnerSoft
                : colors.primarySoft,
            borderColor: accentColor,
          },
        ]}
      >
        <Ionicons name={icon} size={36} color={accentColor} />
      </View>

      <Text style={styles.title}>{title}</Text>
      <Text style={styles.description}>{description}</Text>

      {actionTitle && onAction && (
        <PrimaryButton
          title={actionTitle}
          onPress={onAction}
          variant={variant}
          size="sm"
          style={styles.actionButton}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    padding: spacing.xl,
    backgroundColor: colors.glassCard,
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderRadius: radius.xxl,
    marginVertical: spacing.md,
  },
  iconContainer: {
    width: 72,
    height: 72,
    borderRadius: 36,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  title: {
    ...typography.title,
    color: colors.textPrimary,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
  },
  description: {
    ...typography.body,
    color: colors.textMuted,
    textAlign: "center",
    marginTop: spacing.xs,
    maxWidth: 260,
    lineHeight: 20,
    fontSize: 13,
  },
  actionButton: {
    marginTop: spacing.lg,
  },
});