import React, { useState } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { PrimaryButton } from '../../components/Button/PrimaryButton';
import { PhoneInput } from '../../components/Input/PhoneInput';
import { colors, spacing, typography } from '../../theme';
import { APP_NAME, PHONE_NUMBER_LENGTH } from '../../constants/app';

/**
 * Login screen — Sprint 1.
 * Static UI + local phone number state only.
 * No navigation, no OTP dispatch, no backend calls yet.
 */
const LoginScreen: React.FC = () => {
  const [phoneNumber, setPhoneNumber] = useState('');

  const isPhoneNumberValid = phoneNumber.length === PHONE_NUMBER_LENGTH;

  const handleSendOtp = () => {
    // Sprint 2 will wire this to real OTP dispatch logic.
    // eslint-disable-next-line no-console
    console.log('Send OTP pressed for:', phoneNumber);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="light-content" backgroundColor={colors.background} />
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoWrapper}>
            <View style={styles.logoPlaceholder}>
              <Text style={styles.logoInitial}>S</Text>
            </View>
          </View>

          <Text style={styles.eyebrow}>WELCOME</Text>
          <Text style={styles.title}>Login to {APP_NAME}</Text>

          <View style={styles.form}>
            <PhoneInput value={phoneNumber} onChangeText={setPhoneNumber} />
          </View>

          <View style={styles.buttonWrapper}>
            <PrimaryButton
              label="Send OTP"
              onPress={handleSendOtp}
              disabled={!isPhoneNumberValid}
            />
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },
  flex: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: spacing.xl,
    paddingTop: spacing.xxxl,
    paddingBottom: spacing.xxl,
    justifyContent: 'center',
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: spacing.xxl,
  },
  logoPlaceholder: {
    width: 72,
    height: 72,
    borderRadius: 20,
    backgroundColor: colors.surfaceElevated,
    borderWidth: 1,
    borderColor: colors.border,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoInitial: {
    ...typography.heading,
    color: colors.accent,
  },
  eyebrow: {
    ...typography.eyebrow,
    color: colors.textMuted,
    textAlign: 'center',
    marginBottom: spacing.xs,
  },
  title: {
    ...typography.heading,
    color: colors.textPrimary,
    textAlign: 'center',
    marginBottom: spacing.xxl,
  },
  form: {
    marginBottom: spacing.xl,
  },
  buttonWrapper: {
    marginTop: spacing.sm,
  },
});

export default LoginScreen;
