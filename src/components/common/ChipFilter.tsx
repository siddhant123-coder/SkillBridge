import React from "react";
import {
  ScrollView,
  Text,
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../../theme/colors";
import { spacing, radius } from "../../theme/spacing";

export interface ChipItem {
  id: string;
  label: string;
  icon?: string;
}

type ChipFilterProps = {
  items: ChipItem[];
  selectedId: string;
  onSelect: (id: string) => void;
  variant?: "learner" | "trainer" | "primary";
  style?: StyleProp<ViewStyle>;
};

export default function ChipFilter({
  items,
  selectedId,
  onSelect,
  variant = "learner",
  style,
}: ChipFilterProps) {
  const activeColor =
    variant === "trainer"
      ? colors.trainer
      : variant === "learner"
      ? colors.learner
      : colors.primary;

  const activeBg =
    variant === "trainer"
      ? colors.trainerSoft
      : variant === "learner"
      ? colors.learnerSoft
      : colors.primarySoft;

  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={[styles.container, style]}
    >
      {items.map((item) => {
        const isSelected = item.id === selectedId;

        return (
          <Pressable
            key={item.id}
            onPress={() => onSelect(item.id)}
            style={[
              styles.chip,
              isSelected && {
                backgroundColor: activeBg,
                borderColor: activeColor,
              },
            ]}
          >
            {item.icon && (
              <Ionicons
                name={item.icon as any}
                size={14}
                color={isSelected ? activeColor : colors.textMuted}
                style={styles.icon}
              />
            )}
            <Text
              style={[
                styles.label,
                isSelected && {
                  color: activeColor,
                  fontWeight: "700",
                },
              ]}
            >
              {item.label}
            </Text>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.xs,
    gap: spacing.sm,
  },
  chip: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.glassCard,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    height: 36,
  },
  icon: {
    marginRight: spacing.xs + 2,
  },
  label: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "600",
  },
});
