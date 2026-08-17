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
import RequestCard from "../../components/cards/RequestCard";
import EmptyState from "../../components/common/EmptyState";
import ChipFilter from "../../components/common/ChipFilter";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import { useAuth } from "../../context/AuthContext";

export default function Requests() {
  const navigation = useNavigation<any>();
  const {
    requests,
    acceptSessionRequest,
    rejectSessionRequest,
    deleteSessionRequest,
  } = useAuth();

  const [activeTab, setActiveTab] = useState("all");

  const tabItems = [
    { id: "all", label: `All (${requests.length})` },
    {
      id: "pending",
      label: `Pending (${requests.filter((r) => r.status === "pending").length})`,
    },
    {
      id: "accepted",
      label: `Accepted (${requests.filter((r) => r.status === "accepted").length})`,
    },
  ];

  const filteredRequests = requests.filter((r) => {
    if (activeTab === "pending") return r.status === "pending";
    if (activeTab === "accepted") return r.status === "accepted";
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar eyebrow="INCOMING" title="Requests" showRoleBadge />

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
        {filteredRequests.length === 0 ? (
          <EmptyState
            icon="mail-open-outline"
            title="No Requests"
            description="Learner requests for this filter will appear here."
            variant="trainer"
          />
        ) : (
          filteredRequests.map((request) => (
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
              onDelete={() => deleteSessionRequest(request.id)}
              onChat={() =>
                navigation.navigate("Chat", {
                  chatId: `chat-${request.trainerId}-${request.learnerId}`,
                  recipientName: request.learnerName,
                })
              }
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