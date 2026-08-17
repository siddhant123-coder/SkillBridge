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

type Props = {
  name: string;
  skill: string;
  time: string;
  location?: string;
  message: string;
  photo?: string | null;
  status?: string;
  onAccept?: () => void;
  onReject?: () => void;
  onDelete?: () => void;
  onChat?: () => void;
  style?: StyleProp<ViewStyle>;
};

export default function RequestCard({
  name,
  skill,
  time,
  location,
  message,
  photo,
  status = "pending",
  onAccept,
  onReject,
  onDelete,
  onChat,
  style,
}: Props) {
  const isPending = status === "pending";

  return (
    <View style={[styles.card, style]}>
      <View style={styles.header}>
        {photo ? (
          <Image source={{ uri: photo }} style={styles.avatar} />
        ) : (
          <View style={styles.avatarPlaceholder}>
            <Text style={styles.avatarText}>
              {name.charAt(0).toUpperCase()}
            </Text>
          </View>
        )}

        <View style={styles.info}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{name}</Text>
            <StatusBadge status={status} />
          </View>

          <Text style={styles.skill}>{skill}</Text>

          <View style={styles.metaRow}>
            <Ionicons
              name="time-outline"
              size={12}
              color={colors.textMuted}
            />
            <Text style={styles.time}>{time}</Text>

            {location && (
              <>
                <Text style={styles.bullet}>•</Text>
                <Ionicons
                  name="location-outline"
                  size={12}
                  color={colors.textMuted}
                />
                <Text style={styles.time} numberOfLines={1}>
                  {location}
                </Text>
              </>
            )}
          </View>
        </View>
      </View>

      <View style={styles.messageBox}>
        <Ionicons
          name="chatbubble-ellipses-outline"
          size={14}
          color={colors.trainer}
          style={styles.quoteIcon}
        />
        <Text style={styles.message}>
          {message || "Looking for coaching sessions."}
        </Text>
      </View>

      {isPending ? (
        <View style={styles.buttons}>
          {onAccept && (
            <Pressable
              style={[styles.button, styles.accept]}
              onPress={onAccept}
            >
              <Ionicons
                name="checkmark"
                size={16}
                color="#1A0C05"
                style={{ marginRight: 4 }}
              />
              <Text style={styles.acceptText}>Accept</Text>
            </Pressable>
          )}

          {onReject && (
            <Pressable
              style={[styles.button, styles.reject]}
              onPress={onReject}
            >
              <Text style={styles.rejectText}>Reject</Text>
            </Pressable>
          )}
        </View>
      ) : (
        <View style={styles.buttons}>
          {onChat && (
            <Pressable
              style={[styles.button, styles.chatButton]}
              onPress={onChat}
            >
              <Ionicons
                name="chatbubble-outline"
                size={15}
                color={colors.textPrimary}
                style={{ marginRight: 6 }}
              />
              <Text style={styles.chatButtonText}>Open Chat</Text>
            </Pressable>
          )}

          {onDelete && (
            <Pressable
              style={styles.deleteIconButton}
              onPress={onDelete}
            >
              <Ionicons
                name="trash-outline"
                size={16}
                color={colors.error}
              />
            </Pressable>
          )}
        </View>
      )}
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
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1.5,
    borderColor: "rgba(232, 121, 75, 0.4)",
  },
  avatarPlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.trainerSoft,
    borderColor: colors.trainer,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  avatarText: {
    ...typography.heading,
    color: colors.trainer,
    fontSize: 20,
  },
  info: {
    flex: 1,
    marginLeft: spacing.md,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  name: {
    ...typography.subtitle,
    color: colors.textPrimary,
    fontWeight: "700",
    fontSize: 16,
  },
  skill: {
    ...typography.caption,
    color: colors.trainer,
    marginTop: 2,
    fontWeight: "600",
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 4,
  },
  time: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 11,
    marginLeft: 3,
  },
  bullet: {
    color: colors.textMuted,
    marginHorizontal: 4,
    fontSize: 10,
  },
  messageBox: {
    flexDirection: "row",
    backgroundColor: colors.surfaceSubtle,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radius.md,
    padding: spacing.md,
    marginTop: spacing.md,
    marginBottom: spacing.md,
  },
  quoteIcon: {
    marginRight: spacing.xs + 2,
    marginTop: 2,
  },
  message: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 13,
    lineHeight: 18,
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    gap: spacing.md,
    alignItems: "center",
  },
  button: {
    flex: 1,
    height: 44,
    borderRadius: radius.md,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  accept: {
    backgroundColor: colors.trainer,
    shadowColor: colors.trainer,
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 3,
  },
  reject: {
    backgroundColor: "transparent",
    borderWidth: 1,
    borderColor: colors.border,
  },
  chatButton: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.glassBorderHighlight,
    borderWidth: 1,
  },
  chatButtonText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "700",
  },
  acceptText: {
    ...typography.button,
    color: "#1A0C05",
    fontSize: 14,
    fontWeight: "700",
  },
  rejectText: {
    ...typography.button,
    color: colors.textMuted,
    fontSize: 14,
    fontWeight: "600",
  },
  deleteIconButton: {
    width: 44,
    height: 44,
    borderRadius: radius.md,
    backgroundColor: colors.errorSoft,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "rgba(242, 85, 90, 0.3)",
  },
});