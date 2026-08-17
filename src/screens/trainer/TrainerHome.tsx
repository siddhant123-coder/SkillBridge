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
import DashboardCard from "../../components/cards/DashboardCard";
import QuickActionCard from "../../components/cards/QuickActionCard";
import RequestCard from "../../components/cards/RequestCard";
import EmptyState from "../../components/common/EmptyState";
import { colors } from "../../theme/colors";
import { spacing, radius } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import { useAuth } from "../../context/AuthContext";

export default function TrainerHome() {
  const navigation = useNavigation<any>();
  const {
    currentUser,
    requests,
    sessions,
    reviews,
    acceptSessionRequest,
    rejectSessionRequest,
  } = useAuth();

  const trainerName = currentUser?.name || "Coach";
  const userUid = currentUser?.uid;

  // Real dynamic requests and sessions for this logged in coach
  const pendingRequests = requests.filter(
    (r) =>
      r.status === "pending" &&
      (!userUid || r.trainerId === userUid || r.trainerName === trainerName)
  );

  const upcomingSessions = sessions.filter(
    (s) =>
      (s.status === "confirmed" || s.status === "upcoming") &&
      (!userUid || s.trainerId === userUid || s.trainerName === trainerName)
  );

  const completedSessions = sessions.filter(
    (s) =>
      s.status === "completed" &&
      (!userUid || s.trainerId === userUid || s.trainerName === trainerName)
  );

  const totalStudents =
    (currentUser?.totalSessions || 0) +
    upcomingSessions.length +
    completedSessions.length;

  const rating = currentUser?.rating || 5.0;
  const reviewsCount = currentUser?.reviewsCount || reviews.length;

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar eyebrow="COACH DASHBOARD" showRoleBadge />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {/* Profile Card Header */}
        <GlassCard variant="trainer" style={styles.profileCard}>
          <View style={styles.profileRow}>
            {currentUser?.photoURL ? (
              <Image
                source={{ uri: currentUser.photoURL }}
                style={styles.avatar}
              />
            ) : (
              <View style={styles.avatarPlaceholder}>
                <Text style={styles.avatarLetter}>
                  {trainerName.charAt(0).toUpperCase()}
                </Text>
              </View>
            )}

            <View style={styles.profileInfo}>
              <View style={styles.badgeNameRow}>
                <Text style={styles.name}>{trainerName}</Text>
                {currentUser?.isVerified && (
                  <Ionicons
                    name="shield-checkmark"
                    size={16}
                    color={colors.learner}
                  />
                )}
              </View>
              <Text style={styles.skillText}>
                {currentUser?.skills?.[0] || "Add your coaching skills"}
              </Text>
              <Text style={styles.locationText}>
                {currentUser?.location || "Location not set"} · {currentUser?.isVerified ? "Verified Coach ✓" : "Verification Pending"}
              </Text>
            </View>
          </View>
        </GlassCard>

        {/* Dynamic Stats Grid */}
        <View style={styles.statsGrid}>
          <DashboardCard
            title="Requests"
            value={pendingRequests.length}
            icon="mail-unread-outline"
            variant="trainer"
          />

          <DashboardCard
            title="Students"
            value={totalStudents}
            icon="people-outline"
            variant="trainer"
          />

          <DashboardCard
            title="Rating"
            value={rating.toFixed(1)}
            icon="star"
            variant="trainer"
          />
        </View>

        {/* Dynamic Reviews Metric Box */}
        <GlassCard style={styles.reviewsBox}>
          <View style={styles.reviewsRow}>
            <View style={styles.reviewsIconWrap}>
              <Ionicons name="chatbubbles" size={20} color="#FFB648" />
            </View>
            <View style={styles.reviewsTextWrap}>
              <Text style={styles.reviewsTitle}>Student Feedback</Text>
              <Text style={styles.reviewsSub}>
                {reviewsCount > 0
                  ? `${reviewsCount} ${reviewsCount === 1 ? "review" : "reviews"} · ${rating.toFixed(1)} ★ average rating`
                  : "No reviews yet · Complete sessions to receive student ratings"}
              </Text>
            </View>
          </View>
        </GlassCard>

        {/* Quick Actions */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
        </View>

        <View style={styles.actionsRow}>
          <QuickActionCard
            title="Requests"
            subtitle="Review pending learners"
            icon="mail-open-outline"
            color={colors.trainer}
            badge={pendingRequests.length > 0 ? pendingRequests.length : undefined}
            onPress={() => navigation.navigate("Requests")}
          />

          <QuickActionCard
            title="Sessions"
            subtitle="Scheduled classes"
            icon="calendar-outline"
            color={colors.primary}
            badge={upcomingSessions.length > 0 ? upcomingSessions.length : undefined}
            onPress={() => navigation.navigate("Sessions")}
          />
        </View>

        {/* Recent Incoming Requests */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Recent Requests</Text>
          {pendingRequests.length > 0 && (
            <Pressable onPress={() => navigation.navigate("Requests")}>
              <Text style={styles.viewAllText}>View All ({pendingRequests.length})</Text>
            </Pressable>
          )}
        </View>

        {pendingRequests.length === 0 ? (
          <EmptyState
            icon="mail-open-outline"
            title="No Pending Requests"
            description="When learners book training sessions, they will appear here in real-time."
            variant="trainer"
          />
        ) : (
          pendingRequests.slice(0, 2).map((request) => (
            <RequestCard
              key={request.id}
              name={request.learnerName}
              skill={request.skill}
              time={request.preferredDate}
              location={request.location}
              message={request.message}
              photo={request.learnerPhoto}
              status={request.status}
              onAccept={() => acceptSessionRequest(request)}
              onReject={() => rejectSessionRequest(request.id)}
            />
          ))
        )}
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
  profileCard: {
    marginBottom: spacing.lg,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: colors.trainer,
  },
  avatarPlaceholder: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.trainerSoft,
    borderColor: colors.trainer,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarLetter: {
    ...typography.heading,
    color: colors.trainer,
    fontSize: 24,
  },
  profileInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  badgeNameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  name: {
    ...typography.subtitle,
    color: colors.textPrimary,
    fontWeight: "700",
    fontSize: 18,
  },
  skillText: {
    ...typography.caption,
    color: colors.trainer,
    marginTop: 2,
    fontWeight: "600",
  },
  locationText: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
    fontSize: 11,
  },
  statsGrid: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  reviewsBox: {
    marginBottom: spacing.lg,
    paddingVertical: spacing.md,
  },
  reviewsRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  reviewsIconWrap: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "rgba(255, 182, 72, 0.15)",
    justifyContent: "center",
    alignItems: "center",
  },
  reviewsTextWrap: {
    flex: 1,
    marginLeft: spacing.md,
  },
  reviewsTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  reviewsSub: {
    fontSize: 11,
    color: colors.textMuted,
    marginTop: 1,
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.subtitle,
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: "700",
  },
  viewAllText: {
    color: colors.trainer,
    fontSize: 12,
    fontWeight: "700",
  },
  actionsRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginBottom: spacing.xl,
  },
});