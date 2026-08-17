import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../theme/colors";
import { spacing, radius } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import StatusBadge from "../common/StatusBadge";

type SessionCardProps = {
  title: string;
  partnerName: string;
  roleType: "trainer" | "learner";
  scheduledAt: string;
  location: string;
  status: "upcoming" | "confirmed" | "completed" | "cancelled";
  notes?: string;
  photo?: string | null;
  hasReviewed?: boolean;
  onChatPress?: () => void;
  onCompletePress?: () => void;
  onReviewPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function SessionCard({
  title,
  partnerName,
  roleType,
  scheduledAt,
  location,
  status,
  notes,
  photo,
  hasReviewed,
  onChatPress,
  onCompletePress,
  onReviewPress,
  style,
}: SessionCardProps) {
  const isCompleted = status === "completed";
  const accentColor = roleType === "trainer" ? colors.trainer : colors.learner;

  return (
    <View style={[styles.card, style]}>
      {/* Header */}
      <View style={styles.header}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.avatar} />
        ) : (
          <View
            style={[
              styles.avatarPlaceholder,
              { backgroundColor: roleType === "trainer" ? colors.trainerSoft : colors.learnerSoft },
            ]}
          >
            <Ionicons
              name={roleType === "trainer" ? "fitness" : "school"}
              size={24}
              color={accentColor}
            />
          </View>
        )}

        <View style={styles.headerInfo}>
          <View style={styles.titleRow}>
            <Text style={styles.title} numberOfLines={1}>
              {title}
            </Text>
            <StatusBadge status={status} />
          </View>

          <Text style={styles.partnerText}>
            {roleType === "trainer" ? `Learner: ${partnerName}` : `Coach: ${partnerName}`}
          </Text>
        </View>
      </View>

      {/* Meta Grid */}
      <View style={styles.metaContainer}>
        <View style={styles.metaItem}>
          <Ionicons name="calendar-outline" size={14} color={colors.textMuted} />
          <Text style={styles.metaText}>{scheduledAt}</Text>
        </View>

        <View style={styles.metaItem}>
          <Ionicons name="location-outline" size={14} color={colors.textMuted} />
          <Text style={styles.metaText} numberOfLines={1}>
            {location}
          </Text>
        </View>
      </View>

      {notes ? (
        <View style={styles.notesBox}>
          <Text style={styles.notesText} numberOfLines={2}>
            "{notes}"
          </Text>
        </View>
      ) : null}

      {/* Actions */}
      <View style={styles.actionsRow}>
        {onChatPress && (
          <Pressable
            onPress={onChatPress}
            style={[styles.actionBtn, styles.chatBtn]}
          >
            <Ionicons
              name="chatbubble-outline"
              size={15}
              color={colors.textPrimary}
              style={{ marginRight: 6 }}
            />
            <Text style={styles.chatBtnText}>Chat</Text>
          </Pressable>
        )}

        {!isCompleted && onCompletePress && (
          <Pressable
            onPress={onCompletePress}
            style={[
              styles.actionBtn,
              { backgroundColor: accentColor },
            ]}
          >
            <Ionicons
              name="checkmark-done"
              size={15}
              color="#000"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.completeBtnText}>Mark Done</Text>
          </Pressable>
        )}

        {isCompleted && !hasReviewed && onReviewPress && roleType === "learner" && (
          <Pressable
            onPress={onReviewPress}
            style={[styles.actionBtn, styles.reviewBtn]}
          >
            <Ionicons
              name="star"
              size={14}
              color="#FFB648"
              style={{ marginRight: 6 }}
            />
            <Text style={styles.reviewBtnText}>Rate Session</Text>
          </Pressable>
        )}

        {isCompleted && hasReviewed && (
          <View style={styles.reviewedPill}>
            <Ionicons name="checkmark-circle" size={14} color={colors.learner} />
            <Text style={styles.reviewedText}>Reviewed</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.glassCard,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    padding: spacing.lg,
    marginBottom: spacing.md,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
  },
  avatarPlaceholder: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: "center",
    alignItems: "center",
  },
  headerInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  title: {
    ...typography.subtitle,
    color: colors.textPrimary,
    fontWeight: "700",
    fontSize: 16,
    flex: 1,
    marginRight: spacing.sm,
  },
  partnerText: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
    fontSize: 12,
  },
  metaContainer: {
    backgroundColor: colors.surfaceSubtle,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.md,
    gap: spacing.xs + 2,
    borderWidth: 1,
    borderColor: colors.border,
  },
  metaItem: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
    marginLeft: spacing.xs + 2,
  },
  notesBox: {
    marginTop: spacing.sm,
    paddingHorizontal: spacing.xs,
  },
  notesText: {
    ...typography.caption,
    color: colors.textMuted,
    fontStyle: "italic",
    fontSize: 11,
  },
  actionsRow: {
    flexDirection: "row",
    gap: spacing.md,
    marginTop: spacing.lg,
    alignItems: "center",
  },
  actionBtn: {
    flex: 1,
    height: 42,
    borderRadius: radius.md,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  chatBtn: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.glassBorderHighlight,
    borderWidth: 1,
  },
  chatBtnText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
  },
  completeBtnText: {
    color: "#000",
    fontSize: 13,
    fontWeight: "700",
  },
  reviewBtn: {
    backgroundColor: "rgba(255, 182, 72, 0.15)",
    borderColor: "rgba(255, 182, 72, 0.4)",
    borderWidth: 1,
  },
  reviewBtnText: {
    color: "#FFB648",
    fontSize: 13,
    fontWeight: "700",
  },
  reviewedPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.learnerSoft,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
    gap: 4,
  },
  reviewedText: {
    color: colors.learner,
    fontSize: 11,
    fontWeight: "700",
  },
});