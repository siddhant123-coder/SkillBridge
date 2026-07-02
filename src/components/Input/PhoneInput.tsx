import React from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { colors, radius, spacing, typography } from '../../theme';
import { DEFAULT_COUNTRY_CODE, PHONE_NUMBER_LENGTH } from '../../constants/app';

export interface PhoneInputProps {
  /** Current phone number value (digits only, no country code). */
  value: string;
  /** Called with the new value on every keystroke. */
  onChangeText: (value: string) => void;
  /** Optional label displayed above the field. Defaults to "Phone Number". */
  label?: string;
}

/**
 * Reusable phone number input with a fixed country code prefix.
 * Strips non-numeric characters and enforces a max length automatically.
 */
export const PhoneInput: React.FC<PhoneInputProps> = ({
  value,
  onChangeText,
  label = 'Phone Number',
}) => {
  const handleChange = (text: string) => {
    const digitsOnly = text.replace(/[^0-9]/g, '');
    onChangeText(digitsOnly.slice(0, PHONE_NUMBER_LENGTH));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.inputRow}>
        <Text style={styles.countryCode}>{DEFAULT_COUNTRY_CODE}</Text>
        <View style={styles.divider} />
        <TextInput
          value={value}
          onChangeText={handleChange}
          placeholder="Enter your phone number"
          placeholderTextColor={colors.textMuted}
          keyboardType="phone-pad"
          maxLength={PHONE_NUMBER_LENGTH}
          style={styles.input}
          accessibilityLabel={label}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  label: {
    ...typography.label,
    color: colors.textMuted,
    marginBottom: spacing.sm,
  },
  inputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    paddingHorizontal: spacing.lg,
  },
  countryCode: {
    ...typography.body,
    color: colors.textPrimary,
  },
  divider: {
    width: 1,
    height: 20,
    backgroundColor: colors.border,
    marginHorizontal: spacing.md,
  },
  input: {
    ...typography.body,
    color: colors.textPrimary,
    flex: 1,
    paddingVertical: spacing.lg,
  },
});
