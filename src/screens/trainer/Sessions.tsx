import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import HeaderBar from "../../components/common/HeaderBar";
import SessionCard from "../../components/cards/SessionCard";
import EmptyState from "../../components/common/EmptyState";
import ChipFilter from "../../components/common/ChipFilter";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { useAuth } from "../../context/AuthContext";

export default function TrainerSessions() {
  const navigation = useNavigation<any>();
  const { sessions, completeSession } = useAuth();
  const [activeTab, setActiveTab] = useState("all");

  const tabItems = [
    { id: "all", label: `All (${sessions.length})` },
    {
      id: "upcoming",
      label: `Upcoming (${sessions.filter((s) => s.status === "confirmed" || s.status === "upcoming").length})`,
    },
    {
      id: "completed",
      label: `Completed (${sessions.filter((s) => s.status === "completed").length})`,
    },
  ];

  const filteredSessions = sessions.filter((s) => {
    if (activeTab === "upcoming")
      return s.status === "confirmed" || s.status === "upcoming";
    if (activeTab === "completed") return s.status === "completed";
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar eyebrow="COACH SCHEDULE" title="Sessions" showRoleBadge />

      <ChipFilter
        items={tabItems}
        selectedId={activeTab}
        onSelect={setActiveTab}
        variant="trainer"
        style={styles.filterScroll}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {filteredSessions.length === 0 ? (
          <EmptyState
            icon="calendar-outline"
            title="No Sessions"
            description="Accepted learner coaching sessions will appear here."
            actionTitle="View Requests"
            onAction={() => navigation.navigate("Requests")}
            variant="trainer"
          />
        ) : (
          filteredSessions.map((session) => (
            <SessionCard
              key={session.id}
              title={session.skill}
              partnerName={session.learnerName}
              roleType="trainer"
              scheduledAt={session.scheduledAt}
              location={session.location}
              status={session.status}
              notes={session.notes}
              photo={session.learnerPhoto}
              onChatPress={() =>
                navigation.navigate("Chat", {
                  chatId: `chat-${session.trainerId}-${session.learnerId}`,
                  recipientName: session.learnerName,
                })
              }
              onCompletePress={() => completeSession(session.id)}
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
  filterScroll: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
});