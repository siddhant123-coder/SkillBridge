import React from "react";
import {
  View,
  Text,
  Image,
  ImageStyle,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import { colors } from "../../theme/colors";
import { radius } from "../../theme/spacing";
import { Ionicons } from "@expo/vector-icons";

type LogoProps = {
  size?: number;
  style?: StyleProp<ViewStyle>;
  variant?: "brand" | "trainer" | "learner";
};

export default function Logo({
  size = 72,
  style,
  variant = "brand",
}: LogoProps) {
  const gradientColor =
    variant === "trainer"
      ? colors.trainer
      : variant === "learner"
      ? colors.learner
      : colors.primary;

  return (
    <View
      style={[
        styles.logoWrapper,
        {
          width: size,
          height: size,
          borderRadius: size * 0.32,
          backgroundColor: colors.glassCard,
          borderColor: gradientColor,
          shadowColor: gradientColor,
        },
        style,
      ]}
    >
      <View
        style={[
          styles.innerGlow,
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
        <Ionicons
          name="flash"
          size={size * 0.52}
          color={gradientColor}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  logoWrapper: {
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1.5,
    elevation: 8,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.45,
    shadowRadius: 16,
    overflow: "hidden",
  },
  innerGlow: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
});