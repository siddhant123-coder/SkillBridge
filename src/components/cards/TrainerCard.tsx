import React from "react";
import {
  Image,
  Pressable,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { colors } from "../../theme/colors";
import { spacing, radius } from "../../theme/spacing";
import { typography } from "../../theme/typography";

type TrainerCardProps = {
  name: string;
  skill: string;
  rating: number;
  sessions: number;
  experience?: number;
  location?: string;
  hourlyRate?: string;
  isVerified?: boolean;
  image?: string;
  onPress?: () => void;
  onRequestPress?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function TrainerCard({
  name,
  skill,
  rating,
  sessions,
  experience,
  location,
  hourlyRate,
  isVerified = true,
  image,
  onPress,
  onRequestPress,
  style,
}: TrainerCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.card,
        pressed && styles.pressed,
        style,
      ]}
    >
      <View style={styles.topRow}>
        {image ? (
          <Image source={{ uri: image }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {name.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}

        <View style={styles.content}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{name}</Text>
            {isVerified && (
              <Ionicons
                name="checkmark-circle"
                size={16}
                color={colors.learner}
                style={styles.verifiedIcon}
              />
            )}
          </View>

          <Text style={styles.skill}>{skill}</Text>

          {location && (
            <View style={styles.locationRow}>
              <Ionicons
                name="location-outline"
                size={12}
                color={colors.textMuted}
              />
              <Text style={styles.locationText} numberOfLines={1}>
                {location}
              </Text>
            </View>
          )}
        </View>

        <View style={styles.ratingBadge}>
          <Ionicons name="star" size={13} color="#FFB648" />
          <Text style={styles.ratingText}>
            {rating > 0 ? rating.toFixed(1) : "5.0"}
          </Text>
        </View>
      </View>

      <View style={styles.divider} />

      <View style={styles.footer}>
        <View style={styles.metaRow}>
          {experience !== undefined && (
            <View style={styles.chip}>
              <Text style={styles.chipText}>{experience}y exp</Text>
            </View>
          )}
          <View style={styles.chip}>
            <Text style={styles.chipText}>{sessions} sessions</Text>
          </View>
          {hourlyRate && (
            <View style={[styles.chip, styles.rateChip]}>
              <Text style={styles.rateText}>{hourlyRate}</Text>
            </View>
          )}
        </View>

        <Pressable
          onPress={onRequestPress || onPress}
          style={styles.viewButton}
        >
          <Text style={styles.viewButtonText}>View</Text>
          <Ionicons
            name="chevron-forward"
            size={14}
            color={colors.learner}
          />
        </Pressable>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.glassCard,
    borderRadius: radius.xl,
    borderWidth: 1,
    borderColor: colors.glassBorder,
    padding: spacing.lg,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.25,
    shadowRadius: 10,
    marginBottom: spacing.md,
  },
  pressed: {
    opacity: 0.92,
    transform: [{ scale: 0.985 }],
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    borderWidth: 1.5,
    borderColor: "rgba(52, 216, 168, 0.4)",
  },
  avatarPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.border,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    ...typography.heading,
    color: colors.primary,
    fontSize: 22,
  },
  content: {
    flex: 1,
    marginLeft: spacing.md,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    ...typography.subtitle,
    color: colors.textPrimary,
    fontWeight: "700",
    fontSize: 16,
  },
  verifiedIcon: {
    marginLeft: spacing.xs,
  },
  skill: {
    ...typography.caption,
    color: colors.learner,
    marginTop: 2,
    fontWeight: "600",
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 3,
  },
  locationText: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 11,
    marginLeft: 3,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255, 182, 72, 0.12)",
    borderColor: "rgba(255, 182, 72, 0.3)",
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.pill,
    alignSelf: "flex-start",
  },
  ratingText: {
    fontSize: 12,
    color: "#FFB648",
    fontWeight: "700",
    marginLeft: 3,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
    opacity: 0.6,
  },
  footer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.xs + 2,
  },
  chip: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    paddingHorizontal: spacing.sm,
    paddingVertical: 3,
    borderRadius: radius.pill,
  },
  chipText: {
    color: colors.textMuted,
    fontSize: 10,
    fontWeight: "600",
  },
  rateChip: {
    backgroundColor: colors.learnerSoft,
    borderColor: "rgba(52, 216, 168, 0.3)",
  },
  rateText: {
    color: colors.learner,
    fontSize: 10,
    fontWeight: "700",
  },
  viewButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    paddingVertical: 4,
  },
  viewButtonText: {
    color: colors.learner,
    fontSize: 12,
    fontWeight: "700",
    marginRight: 2,
  },
});