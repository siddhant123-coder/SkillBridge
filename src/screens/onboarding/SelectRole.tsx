import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import RoleCard from "../../components/role/RoleCard";
import HeaderBar from "../../components/common/HeaderBar";
import PrimaryButton from "../../components/common/PrimaryButton";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import { useAuth } from "../../context/AuthContext";
import { UserRole } from "../../types/user";

export default function SelectRole() {
  const navigation = useNavigation<any>();
  const { setRole } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole>("learner");

  function handleContinue() {
    setRole(selectedRole);
    navigation.navigate("CreateProfile", { selectedRole });
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar showBack showRoleBadge={false} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>ONE QUICK THING</Text>
          <Text style={styles.title}>Who are you?</Text>
          <Text style={styles.subtitle}>
            Choose your primary goal on SkillBridge
          </Text>
        </View>

        <View style={styles.rolesContainer}>
          <RoleCard
            subtitle="OPTION A · COACH"
            title="Teach a Skill"
            description="Share your expertise, set your rates, verify credentials, and receive local coaching requests."
            icon="fitness-outline"
            selected={selectedRole === "trainer"}
            color={colors.trainer}
            onPress={() => setSelectedRole("trainer")}
          />

          <RoleCard
            subtitle="OPTION B · LEARNER"
            title="Learn a Skill"
            description="Discover verified local coaches, request 1-on-1 sessions, chat, and learn hands-on."
            icon="school-outline"
            selected={selectedRole === "learner"}
            color={colors.learner}
            onPress={() => setSelectedRole("learner")}
          />
        </View>

        <View style={styles.footer}>
          <PrimaryButton
            title={`Continue as ${selectedRole === "trainer" ? "Coach" : "Learner"}`}
            variant={selectedRole === "trainer" ? "trainer" : "learner"}
            size="lg"
            onPress={handleContinue}
            style={styles.continueBtn}
          />
          <Text style={styles.footerText}>
            ⚡ You can seamlessly switch between Coach & Learner modes anytime
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  content: {
    padding: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  header: {
    alignItems: "center",
    marginTop: spacing.sm,
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
  rolesContainer: {
    marginBottom: spacing.xl,
  },
  footer: {
    alignItems: "center",
    marginTop: spacing.md,
  },
  continueBtn: {
    width: "100%",
  },
  footerText: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: spacing.lg,
    textAlign: "center",
    fontSize: 12,
  },
});