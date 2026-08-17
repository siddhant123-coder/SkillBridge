import React from "react";
import { View, Text, StyleSheet, StyleProp, ViewStyle } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../theme/colors";
import { spacing, radius } from "../../theme/spacing";
import { typography } from "../../theme/typography";

type DashboardCardProps = {
  title: string;
  value: string | number;
  icon: keyof typeof Ionicons.glyphMap;
  variant?: "trainer" | "learner" | "primary";
  style?: StyleProp<ViewStyle>;
};

export default function DashboardCard({
  title,
  value,
  icon,
  variant = "trainer",
  style,
}: DashboardCardProps) {
  const accentColor =
    variant === "trainer"
      ? colors.trainer
      : variant === "learner"
      ? colors.learner
      : colors.primary;

  return (
    <View style={[styles.card, style]}>
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
          },
        ]}
      >
        <Ionicons name={icon} size={20} color={accentColor} />
      </View>

      <Text style={[styles.value, { color: colors.textPrimary }]}>
        {value}
      </Text>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: colors.glassCard,
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderRadius: radius.xl,
    padding: spacing.md,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  value: {
    ...typography.heading,
    fontSize: 20,
    fontWeight: "700",
    marginTop: 2,
  },
  title: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
    fontSize: 11,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});