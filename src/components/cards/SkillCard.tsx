import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  ViewStyle,
} from "react-native";

import { colors } from "../../theme/colors";
import { spacing, radius } from "../../theme/spacing";
import { typography } from "../../theme/typography";

type SkillCardProps = {
  skill: string;
  selected?: boolean;
  onPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function SkillCard({
  skill,
  selected = false,
  onPress,
  style,
}: SkillCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.card,
        selected && styles.selected,
        style,
      ]}
    >
      <Text
        style={[
          styles.text,
          selected && styles.selectedText,
        ]}
      >
        {skill}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: radius.full,
    borderWidth: 1,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    marginRight: spacing.sm,
    marginBottom: spacing.sm,
  },

  selected: {
    backgroundColor: colors.primary,
    borderColor: colors.primary,
  },

  text: {
    ...typography.body,
    color: colors.textPrimary,
  },

  selectedText: {
    color: colors.white,
    fontWeight: "600",
  },
});