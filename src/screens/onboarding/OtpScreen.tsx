import React, { useState, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  SafeAreaView,
  Pressable,
  Alert,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import HeaderBar from "../../components/common/HeaderBar";
import GlassCard from "../../components/common/GlassCard";
import PrimaryButton from "../../components/common/PrimaryButton";
import { colors } from "../../theme/colors";
import { spacing, radius } from "../../theme/spacing";
import { typography } from "../../theme/typography";

type RouteParams = {
  OtpScreen: {
    phone?: string;
  };
};

export default function OtpScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RouteParams, "OtpScreen">>();
  const phone = route.params?.phone || "+91 98765 43210";

  const [otp, setOtp] = useState(["4", "2", "8", "1"]);
  const [loading, setLoading] = useState(false);

  const inputRefs = [
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
    useRef<TextInput>(null),
  ];

  const handleOtpChange = (text: string, index: number) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);

    // Auto-focus next input
    if (text.length > 0 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs[index - 1].current?.focus();
    }
  };

  const handleVerify = () => {
    const fullOtp = otp.join("");
    if (fullOtp.length < 4) {
      Alert.alert("Incomplete OTP", "Please enter the 4-digit verification code.");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      navigation.navigate("SelectRole");
    }, 600);
  };

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar showBack showRoleBadge={false} />

      <View style={styles.content}>
        <View style={styles.header}>
          <Text style={styles.eyebrow}>VERIFY</Text>
          <Text style={styles.title}>Enter OTP</Text>
          <Text style={styles.subtitle}>
            Code sent to <Text style={styles.highlightText}>{phone}</Text>
          </Text>
        </View>

        <GlassCard style={styles.card}>
          <View style={styles.otpRow}>
            {otp.map((digit, idx) => (
              <TextInput
                key={idx}
                ref={inputRefs[idx]}
                style={[
                  styles.otpInput,
                  digit ? styles.otpInputFilled : null,
                ]}
                value={digit}
                onChangeText={(val) => handleOtpChange(val, idx)}
                onKeyPress={(e) => handleKeyPress(e, idx)}
                keyboardType="number-pad"
                maxLength={1}
                textAlign="center"
              />
            ))}
          </View>

          <View style={styles.resendRow}>
            <Text style={styles.resendText}>Didn't receive code? </Text>
            <Pressable onPress={() => Alert.alert("OTP Sent", "A new code 4281 was sent.")}>
              <Text style={styles.resendLink}>Resend</Text>
            </Pressable>
          </View>

          <PrimaryButton
            title={loading ? "Verifying..." : "Verify & Continue"}
            variant="primary"
            loading={loading}
            onPress={handleVerify}
            style={styles.verifyBtn}
          />
        </GlassCard>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    flex: 1,
    padding: spacing.xl,
    justifyContent: "center",
  },
  header: {
    alignItems: "center",
    marginBottom: spacing.xxl,
  },
  eyebrow: {
    ...typography.caption,
    color: colors.textMuted,
    letterSpacing: 2,
    fontWeight: "700",
  },
  title: {
    ...typography.heading,
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: "800",
    marginTop: 4,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
    fontSize: 14,
  },
  highlightText: {
    color: colors.textPrimary,
    fontWeight: "700",
  },
  card: {
    paddingVertical: spacing.xxl,
  },
  otpRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
  otpInput: {
    flex: 1,
    height: 60,
    backgroundColor: colors.glassInput,
    borderColor: colors.glassBorder,
    borderWidth: 1.5,
    borderRadius: radius.lg,
    color: colors.textPrimary,
    fontSize: 24,
    fontWeight: "700",
  },
  otpInputFilled: {
    borderColor: colors.primary,
    backgroundColor: "rgba(108, 107, 255, 0.1)",
  },
  resendRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: spacing.xl,
  },
  resendText: {
    color: colors.textMuted,
    fontSize: 13,
  },
  resendLink: {
    color: colors.primary,
    fontWeight: "700",
    fontSize: 13,
  },
  verifyBtn: {
    width: "100%",
  },
});
