import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import HeaderBar from "../../components/common/HeaderBar";
import GlassCard from "../../components/common/GlassCard";
import PrimaryButton from "../../components/common/PrimaryButton";
import { colors } from "../../theme/colors";
import { spacing, radius } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import { useAuth } from "../../context/AuthContext";

export default function LearnerProfile() {
  const navigation = useNavigation<any>();
  const { currentUser, sessions, switchRole, logout } = useAuth();

  const learner = currentUser || {
    name: "Learner",
    email: "learner@skillbridge.app",
    role: "learner",
    location: "Location not set",
    bio: "Passionate about learning new skills with real coaches.",
    photoURL: null,
    totalSessions: 0,
  };

  const completedCount = sessions.filter((s) => s.status === "completed").length;

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar eyebrow="ACCOUNT" title="My Profile" showRoleBadge />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* User Hero Card */}
        <GlassCard variant="learner" style={styles.heroCard}>
          <View style={styles.avatarRow}>
            {learner.photoURL ? (
              <Image source={{ uri: learner.photoURL }} style={styles.avatar} />
            ) : (
              <View style={styles.placeholder}>
                <Text style={styles.initial}>
                  {learner.name.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}

            <View style={styles.heroInfo}>
              <Text style={styles.name}>{learner.name}</Text>
              <View style={styles.rolePill}>
                <Text style={styles.roleText}>Learner Member</Text>
              </View>
              <Text style={styles.emailText}>{learner.email}</Text>
            </View>
          </View>
        </GlassCard>

        {/* Stats Grid */}
        <View style={styles.statsRow}>
          <GlassCard style={styles.statBox}>
            <Text style={styles.statNumber}>{sessions.length}</Text>
            <Text style={styles.statLabel}>Total Booked</Text>
          </GlassCard>

          <GlassCard style={styles.statBox}>
            <Text style={[styles.statNumber, { color: colors.learner }]}>
              {completedCount}
            </Text>
            <Text style={styles.statLabel}>Completed</Text>
          </GlassCard>

          <GlassCard style={styles.statBox}>
            <Text style={[styles.statNumber, { color: "#FFB648" }]}>5.0</Text>
            <Text style={styles.statLabel}>Rating</Text>
          </GlassCard>
        </View>

        {/* Info Rows */}
        <GlassCard style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color={colors.learner} />
            <View style={styles.infoTextWrap}>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>{learner.location || "City not set"}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Ionicons name="sparkles-outline" size={20} color={colors.learner} />
            <View style={styles.infoTextWrap}>
              <Text style={styles.infoLabel}>Bio / Interests</Text>
              <Text style={styles.infoValue}>
                {learner.bio || "Looking to learn real-world sports and skills."}
              </Text>
            </View>
          </View>
        </GlassCard>

        {/* Role Switcher Banner */}
        <GlassCard variant="trainer" style={styles.switchBanner}>
          <View style={styles.switchRow}>
            <Ionicons name="fitness-outline" size={26} color={colors.trainer} />
            <View style={styles.switchTextWrap}>
              <Text style={styles.switchTitle}>Want to Teach a Skill?</Text>
              <Text style={styles.switchSub}>
                Switch to Coach mode and start earning locally
              </Text>
            </View>
          </View>
          <PrimaryButton
            title="Switch to Coach Mode"
            variant="trainer"
            size="sm"
            onPress={() => {
              switchRole();
              navigation.reset({
                index: 0,
                routes: [{ name: "TrainerTabs" }],
              });
            }}
            style={{ marginTop: spacing.md }}
          />
        </GlassCard>

        {/* Actions */}
        <View style={styles.actionButtons}>
          <PrimaryButton
            title="Log Out"
            variant="danger"
            icon="log-out-outline"
            onPress={() => {
              logout();
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              });
            }}
          />
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
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  heroCard: {
    marginBottom: spacing.md,
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    borderWidth: 2,
    borderColor: colors.learner,
  },
  placeholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.learnerSoft,
    borderColor: colors.learner,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  initial: {
    ...typography.heading,
    color: colors.learner,
    fontSize: 26,
  },
  heroInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  name: {
    ...typography.subtitle,
    color: colors.textPrimary,
    fontWeight: "800",
    fontSize: 18,
  },
  rolePill: {
    backgroundColor: colors.learnerSoft,
    borderColor: "rgba(52, 216, 168, 0.4)",
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.pill,
    alignSelf: "flex-start",
    marginTop: 3,
  },
  roleText: {
    color: colors.learner,
    fontSize: 10,
    fontWeight: "700",
  },
  emailText: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 4,
    fontSize: 12,
  },
  statsRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  statBox: {
    flex: 1,
    alignItems: "center",
    paddingVertical: spacing.md,
  },
  statNumber: {
    ...typography.heading,
    fontSize: 20,
    fontWeight: "800",
    color: colors.textPrimary,
  },
  statLabel: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
    fontSize: 10,
    textTransform: "uppercase",
  },
  infoCard: {
    marginBottom: spacing.md,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: spacing.xs,
  },
  infoTextWrap: {
    flex: 1,
    marginLeft: spacing.md,
  },
  infoLabel: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 10,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  infoValue: {
    ...typography.body,
    color: colors.textPrimary,
    marginTop: 2,
    fontSize: 13,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  switchBanner: {
    marginBottom: spacing.xl,
  },
  switchRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  switchTextWrap: {
    flex: 1,
    marginLeft: spacing.md,
  },
  switchTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  switchSub: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 2,
  },
  actionButtons: {
    gap: spacing.md,
  },
});