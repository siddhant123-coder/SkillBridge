import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  Pressable,
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

export default function TrainerProfile() {
  const navigation = useNavigation<any>();
  const { currentUser, sessions, switchRole, logout } = useAuth();

  const trainer = currentUser || {
    name: "Coach",
    email: "coach@skillbridge.app",
    role: "trainer",
    location: "Location not set",
    bio: "Passionate coach dedicated to personalized student learning and progress.",
    skills: ["Skill Coaching"],
    experience: 0,
    hourlyRate: "₹500 / hr",
    rating: 5.0,
    totalSessions: 0,
    isVerified: false,
    photoURL: null,
  };

  const totalStudentsCount = (trainer.totalSessions || 0) + sessions.length;

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar eyebrow="COACH ACCOUNT" title="My Profile" showRoleBadge />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* User Hero Card */}
        <GlassCard variant="trainer" style={styles.heroCard}>
          <View style={styles.avatarRow}>
            {trainer.photoURL ? (
              <Image source={{ uri: trainer.photoURL }} style={styles.avatar} />
            ) : (
              <View style={styles.placeholder}>
                <Text style={styles.initial}>
                  {trainer.name.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}

            <View style={styles.heroInfo}>
              <View style={styles.nameBadgeRow}>
                <Text style={styles.name}>{trainer.name}</Text>
                {trainer.isVerified && (
                  <Ionicons
                    name="shield-checkmark"
                    size={16}
                    color={colors.learner}
                  />
                )}
              </View>

              <View style={styles.rolePill}>
                <Text style={styles.roleText}>
                  {trainer.skills?.[0] || "Coach"}
                </Text>
              </View>
              <Text style={styles.emailText}>{trainer.email}</Text>
            </View>
          </View>
        </GlassCard>

        {/* Stats Grid */}
        <View style={styles.statsRow}>
          <GlassCard style={styles.statBox}>
            <Text style={styles.statNumber}>{totalStudentsCount}</Text>
            <Text style={styles.statLabel}>Students</Text>
          </GlassCard>

          <GlassCard style={styles.statBox}>
            <Text style={[styles.statNumber, { color: colors.trainer }]}>
              {trainer.experience || 0}y
            </Text>
            <Text style={styles.statLabel}>Experience</Text>
          </GlassCard>

          <GlassCard style={styles.statBox}>
            <Text style={[styles.statNumber, { color: "#FFB648" }]}>
              {(trainer.rating || 5.0).toFixed(1)}
            </Text>
            <Text style={styles.statLabel}>Rating</Text>
          </GlassCard>
        </View>

        {/* Info Rows */}
        <GlassCard style={styles.infoCard}>
          <View style={styles.infoRow}>
            <Ionicons name="location-outline" size={20} color={colors.trainer} />
            <View style={styles.infoTextWrap}>
              <Text style={styles.infoLabel}>Primary Venue</Text>
              <Text style={styles.infoValue}>{trainer.location || "City not set"}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Ionicons name="cash-outline" size={20} color={colors.trainer} />
            <View style={styles.infoTextWrap}>
              <Text style={styles.infoLabel}>Session Rate</Text>
              <Text style={styles.infoValue}>{trainer.hourlyRate || "₹500 / hr"}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.infoRow}>
            <Ionicons name="sparkles-outline" size={20} color={colors.trainer} />
            <View style={styles.infoTextWrap}>
              <Text style={styles.infoLabel}>Coaching Bio</Text>
              <Text style={styles.infoValue}>
                {trainer.bio || "Dedicated coaching for aspiring learners."}
              </Text>
            </View>
          </View>
        </GlassCard>

        {/* Verification Status Banner */}
        <GlassCard style={styles.verifyBanner}>
          <View style={styles.verifyRow}>
            <Ionicons
              name={trainer.isVerified ? "shield-checkmark" : "alert-circle-outline"}
              size={24}
              color={trainer.isVerified ? colors.learner : colors.warning}
            />
            <View style={styles.verifyTextWrap}>
              <Text style={styles.verifyTitle}>
                {trainer.isVerified ? "Identity Verified" : "Verification Pending"}
              </Text>
              <Text style={styles.verifySub}>
                {trainer.isVerified
                  ? "Govt ID & live biometric checks passed ✓"
                  : "Upload your ID to receive verified badge"}
              </Text>
            </View>
          </View>
        </GlassCard>

        {/* Role Switcher Banner */}
        <GlassCard variant="learner" style={styles.switchBanner}>
          <View style={styles.switchRow}>
            <Ionicons name="school-outline" size={26} color={colors.learner} />
            <View style={styles.switchTextWrap}>
              <Text style={styles.switchTitle}>Looking to Learn Something?</Text>
              <Text style={styles.switchSub}>
                Switch to Learner mode and discover other coaches
              </Text>
            </View>
          </View>
          <PrimaryButton
            title="Switch to Learner Mode"
            variant="learner"
            size="sm"
            onPress={() => {
              switchRole();
              navigation.reset({
                index: 0,
                routes: [{ name: "LearnerTabs" }],
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
    borderColor: colors.trainer,
  },
  placeholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.trainerSoft,
    borderColor: colors.trainer,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  initial: {
    ...typography.heading,
    color: colors.trainer,
    fontSize: 26,
  },
  heroInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  nameBadgeRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  name: {
    ...typography.subtitle,
    color: colors.textPrimary,
    fontWeight: "800",
    fontSize: 18,
  },
  rolePill: {
    backgroundColor: colors.trainerSoft,
    borderColor: "rgba(232, 121, 75, 0.4)",
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    borderRadius: radius.pill,
    alignSelf: "flex-start",
    marginTop: 3,
  },
  roleText: {
    color: colors.trainer,
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
  verifyBanner: {
    marginBottom: spacing.md,
  },
  verifyRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  verifyTextWrap: {
    flex: 1,
    marginLeft: spacing.md,
  },
  verifyTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  verifySub: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 1,
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