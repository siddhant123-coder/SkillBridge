import React from "react";
import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
} from "react-native";
import {
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import HeaderBar from "../../components/common/HeaderBar";
import GlassCard from "../../components/common/GlassCard";
import PrimaryButton from "../../components/common/PrimaryButton";
import RatingStars from "../../components/common/RatingStars";
import DashboardCard from "../../components/cards/DashboardCard";
import { colors } from "../../theme/colors";
import { spacing, radius } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import { useAuth } from "../../context/AuthContext";

type RouteParams = {
  TrainerProfile: {
    trainerId: string;
  };
};

export default function TrainerProfile() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RouteParams, "TrainerProfile">>();
  const { trainerId } = route.params;

  const { getTrainerById, reviews } = useAuth();
  const trainer = getTrainerById(trainerId);

  const trainerReviews = reviews.filter((r) => r.trainerId === trainerId);

  function handleRequestSession() {
    if (!trainer) return;

    navigation.navigate("RequestSession", {
      trainerId: trainer.uid,
      trainerName: trainer.name,
      trainerPhoto: trainer.photoURL,
      skill: trainer.skills[0] || "Coaching",
    });
  }

  function handleOpenChat() {
    if (!trainer) return;

    navigation.navigate("Chat", {
      chatId: `chat-${trainer.uid}-learner-demo-1`,
      recipientName: trainer.name,
      recipientPhoto: trainer.photoURL,
    });
  }

  if (!trainer) {
    return (
      <SafeAreaView style={styles.container}>
        <HeaderBar showBack />
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>Trainer profile not found.</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar showBack eyebrow="COACH PROFILE" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Profile Hero Card */}
        <GlassCard variant="learner" style={styles.heroCard}>
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
              <View style={styles.nameRow}>
                <Text style={styles.name}>{trainer.name}</Text>
                {trainer.isVerified && (
                  <Ionicons
                    name="shield-checkmark"
                    size={18}
                    color={colors.learner}
                  />
                )}
              </View>

              <Text style={styles.skillSubtitle}>
                {trainer.skills[0] || "Specialist Coach"}
              </Text>

              <View style={styles.locationRow}>
                <Ionicons
                  name="location-outline"
                  size={13}
                  color={colors.textMuted}
                />
                <Text style={styles.location}>{trainer.location}</Text>
              </View>

              {trainer.hourlyRate && (
                <View style={styles.ratePill}>
                  <Text style={styles.rateText}>{trainer.hourlyRate}</Text>
                </View>
              )}
            </View>
          </View>
        </GlassCard>

        {/* Stats Grid */}
        <View style={styles.statsRow}>
          <DashboardCard
            title="Experience"
            value={`${trainer.experience}y`}
            icon="ribbon-outline"
            variant="learner"
          />
          <DashboardCard
            title="Students"
            value={trainer.totalSessions || trainerReviews.length || 0}
            icon="people-outline"
            variant="learner"
          />
          <DashboardCard
            title="Rating"
            value={(trainer.rating || 5.0).toFixed(1)}
            icon="star"
            variant="learner"
          />
        </View>

        {/* About Section */}
        <GlassCard style={styles.sectionCard}>
          <Text style={styles.sectionHeader}>About the Coach</Text>
          <Text style={styles.bioText}>
            {trainer.bio || "Passionate coach dedicated to personalized student progress."}
          </Text>

          <Text style={[styles.sectionHeader, { marginTop: spacing.lg }]}>
            Coaching Specialties
          </Text>
          <View style={styles.skillsRow}>
            {trainer.skills.map((skill) => (
              <View key={skill} style={styles.skillPill}>
                <Ionicons
                  name="checkmark-circle-outline"
                  size={14}
                  color={colors.learner}
                  style={{ marginRight: 4 }}
                />
                <Text style={styles.skillPillText}>{skill}</Text>
              </View>
            ))}
          </View>
        </GlassCard>

        {/* Reviews Section */}
        <GlassCard style={styles.sectionCard}>
          <View style={styles.reviewsHeaderRow}>
            <Text style={styles.sectionHeader}>Student Reviews</Text>
            <View style={styles.reviewsScoreRow}>
              <RatingStars rating={trainer.rating || 5.0} size={15} />
              <Text style={styles.reviewScoreText}>
                {(trainer.rating || 5.0).toFixed(1)} ({trainer.reviewsCount || trainerReviews.length})
              </Text>
            </View>
          </View>

          {trainerReviews.length === 0 ? (
            <Text style={styles.noReviewsText}>
              No written reviews yet. Be the first to review after a session!
            </Text>
          ) : (
            trainerReviews.map((rev) => (
              <View key={rev.id} style={styles.reviewItem}>
                <View style={styles.reviewUserRow}>
                  <View style={styles.reviewAvatar}>
                    <Text style={styles.reviewAvatarText}>
                      {rev.learnerName.charAt(0).toUpperCase()}
                    </Text>
                  </View>
                  <View style={styles.reviewUserInfo}>
                    <Text style={styles.reviewUserName}>
                      {rev.learnerName}
                    </Text>
                    <Text style={styles.reviewDate}>{rev.createdAt}</Text>
                  </View>
                  <RatingStars rating={rev.rating} size={13} />
                </View>
                <Text style={styles.reviewComment}>"{rev.comment}"</Text>
              </View>
            ))
          )}
        </GlassCard>
      </ScrollView>

      {/* Floating Bottom CTA */}
      <View style={styles.bottomBar}>
        <Pressable
          onPress={handleOpenChat}
          style={styles.chatButton}
        >
          <Ionicons
            name="chatbubble-outline"
            size={20}
            color={colors.textPrimary}
          />
        </Pressable>

        <PrimaryButton
          title="Request Session"
          variant="learner"
          size="lg"
          icon="calendar"
          onPress={handleRequestSession}
          style={styles.requestButton}
        />
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
    padding: spacing.lg,
    paddingBottom: 100,
  },
  errorContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  errorText: {
    color: colors.error,
    fontSize: 16,
  },
  heroCard: {
    marginBottom: spacing.md,
  },
  avatarRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 76,
    height: 76,
    borderRadius: 38,
    borderWidth: 2,
    borderColor: colors.learner,
  },
  placeholder: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: colors.learnerSoft,
    borderColor: colors.learner,
    borderWidth: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  initial: {
    ...typography.heading,
    color: colors.learner,
    fontSize: 32,
  },
  heroInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  name: {
    ...typography.subtitle,
    color: colors.textPrimary,
    fontWeight: "800",
    fontSize: 20,
  },
  skillSubtitle: {
    ...typography.caption,
    color: colors.learner,
    marginTop: 2,
    fontWeight: "700",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  location: {
    ...typography.caption,
    color: colors.textMuted,
    marginLeft: 3,
    fontSize: 11,
  },
  ratePill: {
    backgroundColor: colors.surfaceSubtle,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.sm,
    paddingVertical: 2,
    alignSelf: "flex-start",
    marginTop: 6,
  },
  rateText: {
    color: colors.learner,
    fontWeight: "700",
    fontSize: 11,
  },
  statsRow: {
    flexDirection: "row",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  sectionCard: {
    marginBottom: spacing.md,
  },
  sectionHeader: {
    ...typography.subtitle,
    color: colors.textPrimary,
    fontWeight: "700",
    fontSize: 15,
    marginBottom: spacing.sm,
  },
  bioText: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 20,
  },
  skillsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.xs + 2,
  },
  skillPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surfaceSubtle,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
  },
  skillPillText: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "600",
  },
  reviewsHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  reviewsScoreRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  reviewScoreText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
  },
  noReviewsText: {
    color: colors.textMuted,
    fontSize: 12,
    fontStyle: "italic",
  },
  reviewItem: {
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingTop: spacing.md,
    marginTop: spacing.sm,
  },
  reviewUserRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.xs,
  },
  reviewAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.surfaceElevated,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.border,
    borderWidth: 1,
  },
  reviewAvatarText: {
    color: colors.textPrimary,
    fontWeight: "700",
    fontSize: 12,
  },
  reviewUserInfo: {
    flex: 1,
    marginLeft: spacing.sm,
  },
  reviewUserName: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
  },
  reviewDate: {
    color: colors.textMuted,
    fontSize: 10,
  },
  reviewComment: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 18,
    fontStyle: "italic",
  },
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(12, 13, 16, 0.95)",
    borderTopWidth: 1,
    borderTopColor: colors.border,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    flexDirection: "row",
    gap: spacing.md,
  },
  chatButton: {
    width: 52,
    height: 52,
    borderRadius: radius.lg,
    backgroundColor: colors.glassCard,
    borderColor: colors.glassBorderHighlight,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  requestButton: {
    flex: 1,
  },
});