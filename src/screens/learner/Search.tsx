import React, { useMemo, useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import HeaderBar from "../../components/common/HeaderBar";
import SearchBar from "../../components/common/SearchBar";
import ChipFilter from "../../components/common/ChipFilter";
import TrainerCard from "../../components/cards/TrainerCard";
import EmptyState from "../../components/common/EmptyState";
import { colors } from "../../theme/colors";
import { spacing } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import { useAuth } from "../../context/AuthContext";
import { CATEGORIES } from "../../constants/initialData";

export default function Search() {
  const navigation = useNavigation<any>();
  const { trainers, switchRole } = useAuth();

  const [search, setSearch] = useState("");
  const [selectedCat, setSelectedCat] = useState("all");

  const filteredTrainers = useMemo(() => {
    const query = search.toLowerCase().trim();

    return trainers.filter((trainer) => {
      const matchesCategory =
        selectedCat === "all" ||
        (trainer.category &&
          trainer.category.toLowerCase().includes(selectedCat.toLowerCase())) ||
        (trainer.skills &&
          trainer.skills.some((s) =>
            s.toLowerCase().includes(selectedCat.toLowerCase())
          ));

      if (!query) return matchesCategory;

      const matchesName = trainer.name && trainer.name.toLowerCase().includes(query);
      const matchesSkill =
        trainer.skills &&
        trainer.skills.some((skill) =>
          skill.toLowerCase().includes(query)
        );
      const matchesLocation =
        trainer.location && trainer.location.toLowerCase().includes(query);

      return (
        matchesCategory &&
        (matchesName || matchesSkill || matchesLocation)
      );
    });
  }, [search, selectedCat, trainers]);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar eyebrow="EXPLORE" title="Search Coaches" showRoleBadge />

      <View style={styles.searchWrapper}>
        <SearchBar
          value={search}
          onChangeText={setSearch}
          placeholder="Search by name, skill, or location..."
        />
      </View>

      <ChipFilter
        items={CATEGORIES}
        selectedId={selectedCat}
        onSelect={setSelectedCat}
        variant="learner"
        style={styles.categoryScroll}
      />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.resultsHeader}>
          <Text style={styles.resultsTitle}>
            {filteredTrainers.length} {filteredTrainers.length === 1 ? "Coach" : "Coaches"} Found
          </Text>
        </View>

        {filteredTrainers.length === 0 ? (
          <EmptyState
            icon="search-outline"
            title="No Coaches Found"
            description={
              trainers.length === 0
                ? "No coaches have registered in the database yet. You can list your skills as a coach!"
                : "No registered coaches match your search criteria. Try a different keyword or category."
            }
            actionTitle={
              trainers.length === 0 ? "Switch to Coach Mode" : "Reset Search"
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
                    setSearch("");
                    setSelectedCat("all");
                  }
            }
            variant="learner"
          />
        ) : (
          filteredTrainers.map((trainer) => (
            <TrainerCard
              key={trainer.uid}
              name={trainer.name}
              skill={trainer.skills?.[0] ?? "Coach"}
              rating={trainer.rating || 5.0}
              sessions={trainer.totalSessions || 0}
              experience={trainer.experience}
              location={trainer.location}
              hourlyRate={trainer.hourlyRate}
              isVerified={trainer.isVerified}
              image={trainer.photoURL ?? undefined}
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
                  skill: trainer.skills?.[0] || "Coaching",
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
  searchWrapper: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  categoryScroll: {
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.sm,
  },
  content: {
    padding: spacing.lg,
    paddingBottom: spacing.xxxl,
  },
  resultsHeader: {
    marginBottom: spacing.md,
  },
  resultsTitle: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
});