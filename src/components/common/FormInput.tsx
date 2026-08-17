import React from "react";
import {
  StyleProp,
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";

import { colors } from "../../theme/colors";
import { spacing, radius } from "../../theme/spacing";
import { typography } from "../../theme/typography";

type FormInputProps = TextInputProps & {
  label?: string;
  error?: string;
  containerStyle?: StyleProp<ViewStyle>;
};

export default function FormInput({
  label,
  error,
  containerStyle,
  ...props
}: FormInputProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text style={styles.label}>
          {label}
        </Text>
      )}

      <TextInput
        {...props}
        placeholderTextColor={colors.textMuted}
        style={[
          styles.input,
          props.multiline && styles.multiline,
          props.style,
        ]}
      />

      {error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: spacing.lg,
  },

  label: {
    ...typography.label,
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },

  input: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    color: colors.textPrimary,
    ...typography.body,
  },

  multiline: {
    height: 120,
    textAlignVertical: "top",
  },

  error: {
    color: colors.error,
    marginTop: spacing.xs,
    ...typography.label,
  },
});
