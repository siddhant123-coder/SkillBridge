import React from 'react';
import {
  ActivityIndicator,
  GestureResponderEvent,
  Pressable,
  StyleSheet,
  Text,
} from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';

export interface PrimaryButtonProps {
  /** Text displayed on the button. */
  label: string;
  /** Called when the button is pressed. */
  onPress: (event: GestureResponderEvent) => void;
  /** Disables interaction and dims the button. */
  disabled?: boolean;
  /** Shows a loading spinner instead of the label. */
  loading?: boolean;
}

/**
 * Reusable full-width primary action button.
 * Used across the app wherever a single primary CTA is required.
 */
export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  label,
  onPress,
  disabled = false,
  loading = false,
}) => {
  const isInactive = disabled || loading;

  return (
    <Pressable
      onPress={onPress}
      disabled={isInactive}
      accessibilityRole="button"
      accessibilityState={{ disabled: isInactive }}
      style={({ pressed }) => [
        styles.button,
        isInactive && styles.buttonDisabled,
        pressed && !isInactive && styles.buttonPressed,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.white} />
      ) : (
        <Text style={styles.label}>{label}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: colors.accent,
    borderRadius: radius.md,
    paddingVertical: spacing.lg,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  buttonPressed: {
    backgroundColor: colors.accentPressed,
  },
  buttonDisabled: {
    backgroundColor: colors.accent,
    opacity: 0.5,
  },
  label: {
    ...typography.button,
    color: colors.white,
  },
});
