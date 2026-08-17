import React from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../theme/colors";
import { spacing, radius } from "../../theme/spacing";
import { typography } from "../../theme/typography";

type RoleCardProps = {
  title: string;
  subtitle: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  selected: boolean;
  color: string;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function RoleCard({
  title,
  subtitle,
  description,
  icon,
  selected,
  color,
  onPress,
  style,
}: RoleCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        {
          borderColor: selected ? color : colors.glassBorder,
          backgroundColor: selected
            ? `${color}18`
            : colors.glassCard,
        },
        selected && {
          shadowColor: color,
          shadowOpacity: 0.4,
          shadowRadius: 16,
          elevation: 6,
        },
        pressed && styles.pressed,
        style,
      ]}
    >
      <View style={styles.contentRow}>
        <View
          style={[
            styles.iconBox,
            {
              backgroundColor: selected ? `${color}25` : colors.surfaceSubtle,
              borderColor: selected ? color : colors.border,
            },
          ]}
        >
          <Ionicons name={icon} size={28} color={selected ? color : colors.textMuted} />
        </View>

        <View style={styles.textContainer}>
          <Text style={[styles.subtitle, { color }]}>{subtitle}</Text>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.description}>{description}</Text>
        </View>

        <View
          style={[
            styles.radioCircle,
            {
              borderColor: selected ? color : colors.border,
              backgroundColor: selected ? color : "transparent",
            },
          ]}
        >
          {selected && (
            <Ionicons
              name="checkmark"
              size={14}
              color="#000"
            />
          )}
        </View>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "100%",
    borderRadius: radius.xxl,
    borderWidth: 1.5,
    padding: spacing.lg,
    marginBottom: spacing.lg,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  pressed: {
    transform: [{ scale: 0.985 }],
    opacity: 0.92,
  },
  contentRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconBox: {
    width: 54,
    height: 54,
    borderRadius: 27,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginRight: spacing.md,
  },
  textContainer: {
    flex: 1,
  },
  subtitle: {
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1,
    marginBottom: 2,
  },
  title: {
    ...typography.subtitle,
    color: colors.textPrimary,
    fontWeight: "700",
    fontSize: 17,
  },
  description: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
    fontSize: 12,
  },
  radioCircle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: spacing.sm,
  },
});