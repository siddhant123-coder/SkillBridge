import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  RefreshControl,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import HeaderBar from "../../components/common/HeaderBar";
import GlassCard from "../../components/common/GlassCard";
import SearchBar from "../../components/common/SearchBar";
import ChipFilter from "../../components/common/ChipFilter";
import TrainerCard from "../../components/cards/TrainerCard";
import EmptyState from "../../components/common/EmptyState";
import { colors } from "../../theme/colors";
import { spacing, radius } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import { useAuth } from "../../context/AuthContext";
import { CATEGORIES } from "../../constants/initialData";

export default function LearnerHome() {
  const navigation = useNavigation<any>();
  const { trainers, sessions, refreshData, switchRole } = useAuth();

  const [selectedCat, setSelectedCat] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshing, setRefreshing] = useState(false);

  const activeUpcomingSession = sessions.find(
    (s) => s.status === "confirmed" || s.status === "upcoming"
  );

  async function onRefresh() {
    setRefreshing(true);
    await refreshData();
    setRefreshing(false);
  }

  const filteredTrainers = trainers.filter((trainer) => {
    const matchesCat =
      selectedCat === "all" ||
      (trainer.category &&
        trainer.category.toLowerCase().includes(selectedCat.toLowerCase())) ||
      (trainer.skills &&
        trainer.skills.some((s) =>
          s.toLowerCase().includes(selectedCat.toLowerCase())
        ));

    const matchesSearch =
      !searchQuery.trim() ||
      (trainer.name &&
        trainer.name.toLowerCase().includes(searchQuery.toLowerCase())) ||
      (trainer.skills &&
        trainer.skills.some((s) =>
          s.toLowerCase().includes(searchQuery.toLowerCase())
        )) ||
      (trainer.location &&
        trainer.location.toLowerCase().includes(searchQuery.toLowerCase()));

    return matchesCat && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar eyebrow="FIND A COACH" title="Explore Skills" showRoleBadge />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={colors.learner}
          />
        }
      >
        {/* Search Bar */}
        <SearchBar
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholder="Search skills, coaches, or venue..."
          onFilterPress={() => navigation.navigate("Explore")}
          style={styles.searchBar}
        />

        {/* Categories Chips */}
        <ChipFilter
          items={CATEGORIES}
          selectedId={selectedCat}
          onSelect={setSelectedCat}
          variant="learner"
          style={styles.categoriesScroll}
        />

        {/* Active Upcoming Session Banner if any */}
        {activeUpcomingSession && (
          <GlassCard variant="learner" style={styles.upcomingBanner}>
            <View style={styles.upcomingRow}>
              <View style={styles.upcomingIconBox}>
                <Ionicons name="calendar" size={20} color={colors.learner} />
              </View>
              <View style={styles.upcomingTextWrap}>
                <Text style={styles.upcomingLabel}>Upcoming Session</Text>
                <Text style={styles.upcomingTitle}>
                  {activeUpcomingSession.skill}
                </Text>
                <Text style={styles.upcomingMeta}>
                  {activeUpcomingSession.scheduledAt} · {activeUpcomingSession.location}
                </Text>
              </View>
              <Pressable
                onPress={() =>
                  navigation.navigate("Chat", {
                    chatId: `chat-${activeUpcomingSession.trainerId}-${activeUpcomingSession.learnerId}`,
                    recipientName: activeUpcomingSession.trainerName,
                  })
                }
                style={styles.chatIconBtn}
              >
                <Ionicons
                  name="chatbubble-ellipses"
                  size={18}
                  color={colors.learner}
                />
              </Pressable>
            </View>
          </GlassCard>
        )}

        {/* Section Header */}
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>
            {selectedCat === "all"
              ? "Verified Coaches"
              : `${selectedCat.charAt(0).toUpperCase() + selectedCat.slice(1)} Coaches`}
          </Text>
          <Text style={styles.resultsCount}>
            {filteredTrainers.length} {filteredTrainers.length === 1 ? "Coach" : "Coaches"}
          </Text>
        </View>

        {/* Real Dynamic Coaches List */}
        {filteredTrainers.length === 0 ? (
          <EmptyState
            icon="people-outline"
            title="No Coaches Found"
            description={
              trainers.length === 0
                ? "No coaches have registered in the database yet. You can be the first to teach a skill!"
                : "No coaches match your search criteria. Try selecting 'All Skills' or a different query."
            }
            actionTitle={
              trainers.length === 0
                ? "Switch to Coach Mode"
                : "Reset Filter"
            }
            onAction={
              trainers.length === 0
                ? () => {
                    switchRole();
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "TrainerTabs" }],
                    });
                  }
                : () => {
                    setSelectedCat("all");
                    setSearchQuery("");
                  }
            }
            variant="learner"
          />
        ) : (
          filteredTrainers.map((trainer) => (
            <TrainerCard
              key={trainer.uid}
              name={trainer.name}
              skill={trainer.skills?.[0] || "Coach"}
              rating={trainer.rating || 5.0}
              sessions={trainer.totalSessions || 0}
              experience={trainer.experience}
              location={trainer.location}
              hourlyRate={trainer.hourlyRate}
              isVerified={trainer.isVerified}
              image={trainer.photoURL || undefined}
              onPress={() =>
                navigation.navigate("TrainerProfile", {
                  trainerId: trainer.uid,
                })
              }
              onRequestPress={() =>
                navigation.navigate("RequestSession", {
                  trainerId: trainer.uid,
                  trainerName: trainer.name,
                  trainerPhoto: trainer.photoURL,
                  skill: trainer.skills?.[0] || "Skill Coaching",
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
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  searchBar: {
    marginBottom: spacing.md,
  },
  categoriesScroll: {
    paddingHorizontal: 0,
    marginBottom: spacing.lg,
  },
  upcomingBanner: {
    marginBottom: spacing.lg,
  },
  upcomingRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  upcomingIconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.learnerSoft,
    justifyContent: "center",
    alignItems: "center",
    borderColor: "rgba(52, 216, 168, 0.4)",
    borderWidth: 1,
  },
  upcomingTextWrap: {
    flex: 1,
    marginLeft: spacing.md,
  },
  upcomingLabel: {
    ...typography.caption,
    color: colors.learner,
    fontSize: 10,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  upcomingTitle: {
    ...typography.subtitle,
    color: colors.textPrimary,
    fontWeight: "700",
    fontSize: 15,
    marginTop: 1,
  },
  upcomingMeta: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
    fontSize: 11,
  },
  chatIconBtn: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.surfaceSubtle,
    borderWidth: 1,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
  },
  sectionHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.md,
  },
  sectionTitle: {
    ...typography.subtitle,
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },
  resultsCount: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 12,
  },
});