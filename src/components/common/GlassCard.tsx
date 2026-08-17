import React from "react";
import {
  View,
  StyleSheet,
  ViewStyle,
  StyleProp,
  Pressable,
} from "react-native";
import { colors } from "../../theme/colors";
import { radius, spacing } from "../../theme/spacing";

type GlassCardProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  variant?: "default" | "elevated" | "trainer" | "learner" | "primary" | "interactive";
  onPress?: () => void;
};

export default function GlassCard({
  children,
  style,
  variant = "default",
  onPress,
}: GlassCardProps) {
  const variantStyles = {
    default: styles.default,
    elevated: styles.elevated,
    trainer: styles.trainer,
    learner: styles.learner,
    primary: styles.primary,
    interactive: styles.interactive,
  }[variant];

  if (onPress) {
    return (
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [
          styles.base,
          variantStyles,
          pressed && styles.pressed,
          style,
        ]}
      >
        {children}
      </Pressable>
    );
  }

  return (
    <View style={[styles.base, variantStyles, style]}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  base: {
    backgroundColor: colors.glassCard,
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderRadius: radius.xl,
    padding: spacing.lg,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  default: {},
  elevated: {
    backgroundColor: "rgba(30, 34, 44, 0.85)",
    borderColor: colors.glassBorderHighlight,
    elevation: 6,
    shadowOpacity: 0.35,
    shadowRadius: 14,
  },
  trainer: {
    borderColor: "rgba(232, 121, 75, 0.4)",
    backgroundColor: "rgba(232, 121, 75, 0.08)",
    shadowColor: colors.trainer,
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  learner: {
    borderColor: "rgba(52, 216, 168, 0.4)",
    backgroundColor: "rgba(52, 216, 168, 0.08)",
    shadowColor: colors.learner,
    shadowOpacity: 0.25,
    shadowRadius: 12,
  },
  primary: {
    borderColor: "rgba(108, 107, 255, 0.45)",
    backgroundColor: "rgba(108, 107, 255, 0.09)",
    shadowColor: colors.primary,
    shadowOpacity: 0.3,
    shadowRadius: 14,
  },
  interactive: {
    borderColor: colors.glassBorderHighlight,
  },
  pressed: {
    opacity: 0.88,
    transform: [{ scale: 0.985 }],
  },
});
