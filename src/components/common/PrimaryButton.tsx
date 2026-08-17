import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  ActivityIndicator,
  StyleProp,
  ViewStyle,
  TextStyle,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../theme/colors";
import { spacing, radius } from "../../theme/spacing";
import { typography } from "../../theme/typography";

type ButtonVariant =
  | "primary"
  | "trainer"
  | "learner"
  | "ghost"
  | "danger"
  | "glass";

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  disabled?: boolean;
  loading?: boolean;
  icon?: keyof typeof Ionicons.glyphMap;
  iconPosition?: "left" | "right";
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  size?: "sm" | "md" | "lg";
};

export default function PrimaryButton({
  title,
  onPress,
  variant = "primary",
  disabled = false,
  loading = false,
  icon,
  iconPosition = "left",
  style,
  textStyle,
  size = "md",
}: PrimaryButtonProps) {
  const getVariantStyle = () => {
    switch (variant) {
      case "trainer":
        return styles.trainerButton;
      case "learner":
        return styles.learnerButton;
      case "ghost":
        return styles.ghostButton;
      case "danger":
        return styles.dangerButton;
      case "glass":
        return styles.glassButton;
      case "primary":
      default:
        return styles.primaryButton;
    }
  };

  const getTextStyle = () => {
    switch (variant) {
      case "trainer":
        return styles.trainerText;
      case "learner":
        return styles.learnerText;
      case "ghost":
        return styles.ghostText;
      case "danger":
        return styles.dangerText;
      case "glass":
        return styles.glassText;
      case "primary":
      default:
        return styles.primaryText;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case "sm":
        return { height: 42, paddingHorizontal: spacing.md };
      case "lg":
        return { height: 60, paddingHorizontal: spacing.xxl };
      case "md":
      default:
        return { height: 52, paddingHorizontal: spacing.xl };
    }
  };

  const iconColor =
    variant === "trainer"
      ? "#1A0C05"
      : variant === "learner"
      ? "#04241A"
      : variant === "ghost"
      ? colors.textPrimary
      : colors.white;

  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        getSizeStyle(),
        getVariantStyle(),
        (disabled || loading) && styles.disabledButton,
        pressed && !disabled && !loading && styles.pressedButton,
        style,
      ]}
      onPress={onPress}
      disabled={disabled || loading}
    >
      {loading ? (
        <ActivityIndicator
          color={
            variant === "trainer" || variant === "learner"
              ? "#000"
              : colors.white
          }
          size="small"
        />
      ) : (
        <View style={styles.content}>
          {icon && iconPosition === "left" && (
            <Ionicons
              name={icon}
              size={20}
              color={iconColor}
              style={styles.leftIcon}
            />
          )}

          <Text style={[styles.text, getTextStyle(), textStyle]}>
            {title}
          </Text>

          {icon && iconPosition === "right" && (
            <Ionicons
              name={icon}
              size={20}
              color={iconColor}
              style={styles.rightIcon}
            />
          )}
        </View>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: radius.lg,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: colors.primary,
    shadowColor: colors.primary,
    shadowOpacity: 0.4,
    shadowRadius: 10,
  },
  trainerButton: {
    backgroundColor: colors.trainer,
    shadowColor: colors.trainer,
    shadowOpacity: 0.45,
    shadowRadius: 10,
  },
  learnerButton: {
    backgroundColor: colors.learner,
    shadowColor: colors.learner,
    shadowOpacity: 0.45,
    shadowRadius: 10,
  },
  ghostButton: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.border,
    elevation: 0,
    shadowOpacity: 0,
  },
  dangerButton: {
    backgroundColor: colors.error,
    shadowColor: colors.error,
  },
  glassButton: {
    backgroundColor: colors.glassCard,
    borderColor: colors.glassBorderHighlight,
    borderWidth: 1,
  },
  pressedButton: {
    opacity: 0.9,
    transform: [{ scale: 0.98 }],
  },
  disabledButton: {
    opacity: 0.5,
    elevation: 0,
  },
  text: {
    ...typography.button,
    fontSize: 15,
    fontWeight: "700",
  },
  primaryText: {
    color: colors.white,
  },
  trainerText: {
    color: "#1A0C05",
    fontWeight: "700",
  },
  learnerText: {
    color: "#04241A",
    fontWeight: "700",
  },
  ghostText: {
    color: colors.textPrimary,
  },
  dangerText: {
    color: colors.white,
  },
  glassText: {
    color: colors.textPrimary,
  },
  leftIcon: {
    marginRight: spacing.sm,
  },
  rightIcon: {
    marginLeft: spacing.sm,
  },
});