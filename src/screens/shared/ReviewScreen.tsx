import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Alert,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import HeaderBar from "../../components/common/HeaderBar";
import GlassCard from "../../components/common/GlassCard";
import PrimaryButton from "../../components/common/PrimaryButton";
import RatingStars from "../../components/common/RatingStars";
import { colors } from "../../theme/colors";
import { spacing, radius } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import { useAuth } from "../../context/AuthContext";

type RouteParams = {
  ReviewScreen: {
    trainerId: string;
    trainerName: string;
    skill: string;
    sessionId?: string;
  };
};

export default function ReviewScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RouteParams, "ReviewScreen">>();

  const { trainerId, trainerName, skill, sessionId } = route.params;
  const { addReview, completeSession } = useAuth();

  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("Great coach! Highly recommended.");
  const [sessionHappened, setSessionHappened] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit() {
    if (!comment.trim()) {
      Alert.alert("Review Required", "Please share a brief comment about your session experience.");
      return;
    }

    try {
      setSubmitting(true);

      if (sessionId) {
        await completeSession(sessionId);
      }

      await addReview({
        trainerId,
        rating,
        comment: comment.trim(),
        skill,
      });

      Alert.alert(
        "Review Submitted! ⭐",
        `Thank you for reviewing ${trainerName}. Your feedback helps our community flourish.`,
        [
          {
            text: "Done",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (e) {
      console.log(e);
      Alert.alert("Error", "Could not submit review.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar showBack eyebrow="RATE COACH" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* Completion Confirmation Card (Screen 13) */}
        <GlassCard variant="primary" style={styles.confirmationCard}>
          <View style={styles.confirmHeader}>
            <View style={styles.confirmIconBox}>
              <Ionicons name="checkbox" size={24} color={colors.primary} />
            </View>
            <View style={styles.confirmTextWrap}>
              <Text style={styles.confirmEyebrow}>WRAP UP</Text>
              <Text style={styles.confirmTitle}>Session completed?</Text>
            </View>
          </View>

          <View style={styles.confirmButtonsRow}>
            <PrimaryButton
              title="Yes, it happened"
              variant={sessionHappened ? "primary" : "ghost"}
              size="sm"
              onPress={() => setSessionHappened(true)}
              style={styles.confirmBtn}
            />
            <PrimaryButton
              title="Report issue"
              variant={!sessionHappened ? "danger" : "ghost"}
              size="sm"
              onPress={() => {
                setSessionHappened(false);
                Alert.alert("Report Issue", "Support team has been alerted.");
              }}
              style={styles.confirmBtn}
            />
          </View>
        </GlassCard>

        {/* Rating Card (Screen 14) */}
        <View style={styles.header}>
          <Text style={styles.title}>How was your session?</Text>
          <Text style={styles.subtitle}>
            Coaching for <Text style={styles.boldText}>{skill}</Text> with{" "}
            <Text style={styles.boldText}>{trainerName}</Text>
          </Text>
        </View>

        <GlassCard style={styles.reviewCard}>
          <Text style={styles.ratingPrompt}>Tap stars to rate:</Text>
          <View style={styles.starsCenter}>
            <RatingStars
              rating={rating}
              size={36}
              interactive
              onRatingChange={setRating}
            />
            <Text style={styles.starScoreLabel}>
              {rating === 5
                ? "⭐⭐⭐⭐⭐ Exceptional"
                : rating === 4
                ? "⭐⭐⭐⭐ Very Good"
                : rating === 3
                ? "⭐⭐⭐ Average"
                : "⭐⭐ Needs Improvement"}
            </Text>
          </View>

          <Text style={styles.commentLabel}>Write your review</Text>
          <TextInput
            style={styles.commentInput}
            placeholder="What went well? How was the coach's punctuality and training techniques?"
            placeholderTextColor={colors.textMuted}
            multiline
            value={comment}
            onChangeText={setComment}
          />

          <PrimaryButton
            title={submitting ? "Submitting Review..." : "Submit Review"}
            variant="learner"
            size="lg"
            icon="star"
            loading={submitting}
            onPress={handleSubmit}
            style={styles.submitBtn}
          />
        </GlassCard>
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
  confirmationCard: {
    marginBottom: spacing.xl,
  },
  confirmHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  confirmIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.primarySoft,
    justifyContent: "center",
    alignItems: "center",
  },
  confirmTextWrap: {
    marginLeft: spacing.md,
  },
  confirmEyebrow: {
    ...typography.caption,
    color: colors.primary,
    fontWeight: "700",
    letterSpacing: 1,
  },
  confirmTitle: {
    ...typography.subtitle,
    color: colors.textPrimary,
    fontWeight: "700",
    fontSize: 16,
  },
  confirmButtonsRow: {
    flexDirection: "row",
    gap: spacing.md,
  },
  confirmBtn: {
    flex: 1,
  },
  header: {
    marginBottom: spacing.md,
  },
  title: {
    ...typography.heading,
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: "800",
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
    fontSize: 14,
  },
  boldText: {
    color: colors.textPrimary,
    fontWeight: "700",
  },
  reviewCard: {
    paddingVertical: spacing.xl,
  },
  ratingPrompt: {
    ...typography.caption,
    color: colors.textMuted,
    textAlign: "center",
    textTransform: "uppercase",
    letterSpacing: 1,
    fontWeight: "700",
  },
  starsCenter: {
    alignItems: "center",
    marginVertical: spacing.lg,
  },
  starScoreLabel: {
    color: "#FFB648",
    fontSize: 14,
    fontWeight: "700",
    marginTop: spacing.sm,
  },
  commentLabel: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: spacing.xs + 2,
  },
  commentInput: {
    backgroundColor: colors.glassInput,
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    color: colors.textPrimary,
    height: 110,
    textAlignVertical: "top",
    marginBottom: spacing.xl,
  },
  submitBtn: {
    width: "100%",
  },
});
