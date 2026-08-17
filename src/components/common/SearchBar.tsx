import React from "react";
import {
  View,
  TextInput,
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../theme/colors";
import { spacing, radius } from "../../theme/spacing";

type SearchBarProps = {
  value: string;
  onChangeText: (text: string) => void;
  placeholder?: string;
  onClear?: () => void;
  onFilterPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function SearchBar({
  value,
  onChangeText,
  placeholder = "Search skills, trainers, location...",
  onClear,
  onFilterPress,
  style,
}: SearchBarProps) {
  return (
    <View style={[styles.container, style]}>
      <Ionicons
        name="search"
        size={18}
        color={colors.textMuted}
        style={styles.searchIcon}
      />

      <TextInput
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={colors.textMuted}
        selectionColor={colors.primary}
        returnKeyType="search"
      />

      {value.length > 0 && (
        <Pressable
          onPress={() => {
            onChangeText("");
            if (onClear) onClear();
          }}
          style={styles.clearButton}
          hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
        >
          <Ionicons
            name="close-circle"
            size={18}
            color={colors.textMuted}
          />
        </Pressable>
      )}

      {onFilterPress && (
        <Pressable
          onPress={onFilterPress}
          style={styles.filterButton}
        >
          <Ionicons
            name="options-outline"
            size={18}
            color={colors.primary}
          />
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.glassCard,
    borderColor: colors.glassBorderHighlight,
    borderWidth: 1,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    height: 50,
  },
  searchIcon: {
    marginRight: spacing.sm,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 14,
    height: "100%",
  },
  clearButton: {
    padding: spacing.xs,
  },
  filterButton: {
    padding: spacing.xs,
    marginLeft: spacing.xs,
    borderLeftWidth: 1,
    borderLeftColor: colors.border,
    paddingLeft: spacing.sm,
  },
});