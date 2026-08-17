import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";

type InfoRowProps = {
  icon: keyof typeof Ionicons.glyphMap;
  label: string;
  value: string;
  style?: StyleProp<ViewStyle>;
};

export default function InfoRow({
  icon,
  label,
  value,
  style,
}: InfoRowProps) {
  return (
    <View style={[styles.container, style]}>
      <Ionicons
        name={icon}
        size={20}
        color={colors.primary}
      />

      <View style={styles.content}>
        <Text style={styles.label}>
          {label}
        </Text>

        <Text style={styles.value}>
          {value}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.md,
  },

  content: {
    marginLeft: spacing.md,
    flex: 1,
  },

  label: {
    ...typography.caption,
    color: colors.textMuted,
  },

  value: {
    ...typography.body,
    color: colors.textPrimary,
    marginTop: spacing.xs,
  },
});