import React from "react";
import {
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";

type SectionHeaderProps = {
  title: string;
  actionText?: string;
  onPressAction?: () => void;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function SectionHeader({
  title,
  actionText,
  onPressAction,
  containerStyle,
}: SectionHeaderProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.title}>
        {title}
      </Text>

      {actionText && (
        <Pressable onPress={onPressAction}>
          <Text style={styles.action}>
            {actionText}
          </Text>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.lg,
  },

  title: {
    ...typography.heading,
    color: colors.textPrimary,
  },

  action: {
    ...typography.label,
    color: colors.primary,
  },
});