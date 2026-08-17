import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import HeaderBar from "../../components/common/HeaderBar";
import GlassCard from "../../components/common/GlassCard";
import PrimaryButton from "../../components/common/PrimaryButton";
import StatusBadge from "../../components/common/StatusBadge";
import { colors } from "../../theme/colors";
import { spacing, radius } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import { useAuth } from "../../context/AuthContext";

type RouteParams = {
  SessionDetails: {
    sessionId: string;
  };
};

export default function SessionDetails() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RouteParams, "SessionDetails">>();
  const { sessionId } = route.params || { sessionId: "sess-201" };

  const { sessions, completeSession } = useAuth();
  const session = sessions.find((s) => s.id === sessionId) || sessions[0];

  if (!session) {
    return (
      <SafeAreaView style={styles.container}>
        <HeaderBar showBack />
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Session not found</Text>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar showBack eyebrow="SESSION DETAILS" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <GlassCard variant="primary" style={styles.heroCard}>
          <View style={styles.heroHeader}>
            <Text style={styles.skillTitle}>{session.skill}</Text>
            <StatusBadge status={session.status} />
          </View>
          <Text style={styles.partnerName}>
            With {session.trainerName}
          </Text>
        </GlassCard>

        <GlassCard style={styles.metaCard}>
          <View style={styles.metaRow}>
            <Ionicons name="calendar-outline" size={20} color={colors.primary} />
            <View style={styles.metaTextWrap}>
              <Text style={styles.metaLabel}>Scheduled Time</Text>
              <Text style={styles.metaValue}>{session.scheduledAt}</Text>
            </View>
          </View>

          <View style={styles.divider} />

          <View style={styles.metaRow}>
            <Ionicons name="location-outline" size={20} color={colors.primary} />
            <View style={styles.metaTextWrap}>
              <Text style={styles.metaLabel}>Meeting Venue</Text>
              <Text style={styles.metaValue}>{session.location}</Text>
            </View>
          </View>

          {session.notes ? (
            <>
              <View style={styles.divider} />
              <View style={styles.metaRow}>
                <Ionicons name="document-text-outline" size={20} color={colors.primary} />
                <View style={styles.metaTextWrap}>
                  <Text style={styles.metaLabel}>Session Notes</Text>
                  <Text style={styles.metaValue}>{session.notes}</Text>
                </View>
              </View>
            </>
          ) : null}
        </GlassCard>

        <View style={styles.actions}>
          <PrimaryButton
            title="Open Chat"
            variant="glass"
            icon="chatbubble-outline"
            onPress={() =>
              navigation.navigate("Chat", {
                chatId: `chat-${session.trainerId}-${session.learnerId}`,
                recipientName: session.trainerName,
              })
            }
          />

          {session.status !== "completed" && (
            <PrimaryButton
              title="Mark Session Completed"
              variant="primary"
              icon="checkmark-done"
              onPress={async () => {
                await completeSession(session.id);
                navigation.navigate("ReviewScreen", {
                  trainerId: session.trainerId,
                  trainerName: session.trainerName,
                  skill: session.skill,
                  sessionId: session.id,
                });
              }}
              style={{ marginTop: spacing.md }}
            />
          )}
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
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyText: {
    color: colors.textMuted,
    fontSize: 14,
  },
  heroCard: {
    marginBottom: spacing.md,
  },
  heroHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skillTitle: {
    ...typography.heading,
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: "800",
  },
  partnerName: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 13,
    marginTop: 4,
  },
  metaCard: {
    marginBottom: spacing.xl,
  },
  metaRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: spacing.xs,
  },
  metaTextWrap: {
    marginLeft: spacing.md,
    flex: 1,
  },
  metaLabel: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 10,
    textTransform: "uppercase",
    fontWeight: "700",
  },
  metaValue: {
    ...typography.body,
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 2,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  actions: {
    marginTop: spacing.sm,
  },
});
