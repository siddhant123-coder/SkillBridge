import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Logo from "../../components/common/logo";
import PrimaryButton from "../../components/common/PrimaryButton";
import { colors } from "../../theme/colors";
import { spacing, radius } from "../../theme/spacing";
import { typography } from "../../theme/typography";

type SplashProps = {
  navigation: any;
};

export default function Splash({ navigation }: SplashProps) {
  return (
    <SafeAreaView style={styles.container}>
      {/* Background glow effects */}
      <View style={styles.glowTop} />
      <View style={styles.glowBottom} />

      <View style={styles.hero}>
        <Logo size={80} />

        <Text style={styles.title}>SkillBridge</Text>

        <Text style={styles.subtitle}>
          Learn from real people near you
        </Text>

        {/* Feature Pills */}
        <View style={styles.pillRow}>
          <View style={styles.pill}>
            <Ionicons name="shield-checkmark" size={13} color={colors.learner} />
            <Text style={styles.pillText}>Verified Coaches</Text>
          </View>

          <View style={styles.pill}>
            <Ionicons name="location" size={13} color={colors.trainer} />
            <Text style={styles.pillText}>Near You</Text>
          </View>

          <View style={styles.pill}>
            <Ionicons name="flash" size={13} color={colors.primary} />
            <Text style={styles.pillText}>1-on-1 Sessions</Text>
          </View>
        </View>
      </View>

      <View style={styles.footer}>
        <PrimaryButton
          title="Get Started"
          variant="primary"
          size="lg"
          icon="arrow-forward"
          iconPosition="right"
          onPress={() => navigation.navigate("Login")}
          style={styles.startButton}
        />
        <Text style={styles.footerNote}>
          Material 3 Dark · Glassmorphism V1
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    justifyContent: "space-between",
  },
  glowTop: {
    position: "absolute",
    top: -100,
    right: -60,
    width: 260,
    height: 260,
    borderRadius: 130,
    backgroundColor: "rgba(108, 107, 255, 0.12)",
  },
  glowBottom: {
    position: "absolute",
    bottom: 50,
    left: -80,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: "rgba(232, 121, 75, 0.08)",
  },
  hero: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: spacing.xl,
  },
  title: {
    ...typography.heading,
    color: colors.textPrimary,
    fontSize: 36,
    fontWeight: "800",
    marginTop: spacing.xl,
    letterSpacing: -0.5,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    fontSize: 16,
    marginTop: spacing.sm,
    textAlign: "center",
  },
  pillRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    gap: spacing.sm,
    marginTop: spacing.xxl,
  },
  pill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.glassCard,
    borderColor: colors.glassBorder,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs + 2,
    borderRadius: radius.pill,
    gap: 5,
  },
  pillText: {
    color: colors.textSecondary,
    fontSize: 12,
    fontWeight: "600",
  },
  footer: {
    paddingHorizontal: spacing.xl,
    paddingBottom: spacing.xxl,
    alignItems: "center",
  },
  startButton: {
    width: "100%",
  },
  footerNote: {
    ...typography.caption,
    color: colors.textDisabled,
    marginTop: spacing.md,
    fontSize: 11,
  },
});