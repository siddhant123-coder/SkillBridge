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
import { useNavigation } from "@react-navigation/native";

import HeaderBar from "../../components/common/HeaderBar";
import GlassCard from "../../components/common/GlassCard";
import PrimaryButton from "../../components/common/PrimaryButton";
import ChipFilter from "../../components/common/ChipFilter";
import { colors } from "../../theme/colors";
import { spacing, radius } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import { useAuth } from "../../context/AuthContext";
import { CATEGORIES } from "../../constants/initialData";
import { sanitizeName, sanitizeNumber, isValidExperience } from "../../utils/validation";

export default function TrainerSkillSetup() {
  const navigation = useNavigation<any>();
  const { submitTrainerSkills, currentUser } = useAuth();

  const [selectedCat, setSelectedCat] = useState("sports");
  const [skill, setSkill] = useState(currentUser?.skills?.[0] || "");
  const [experience, setExperience] = useState(
    currentUser?.experience ? String(currentUser.experience) : ""
  );
  const [hourlyRate, setHourlyRate] = useState(currentUser?.hourlyRate || "₹500 / hr");
  const [about, setAbout] = useState(currentUser?.bio || "");
  const [loading, setLoading] = useState(false);

  const isSkillValid = skill.trim().length >= 2;
  const isExpValid = isValidExperience(experience);
  const isValid = isSkillValid && isExpValid;

  const handleSkillChange = (val: string) => {
    // Only letters and spaces for skill specialty
    setSkill(sanitizeName(val));
  };

  const handleExperienceChange = (val: string) => {
    // Digits only
    setExperience(sanitizeNumber(val));
  };

  async function handleContinue() {
    if (!isSkillValid) {
      Alert.alert("Invalid Skill", "Please enter the specific skill you teach (alphabets only).");
      return;
    }

    if (!isExpValid) {
      Alert.alert("Invalid Experience", "Please enter your years of experience (0 to 60).");
      return;
    }

    setLoading(true);

    try {
      const catObj = CATEGORIES.find((c) => c.id === selectedCat);
      const categoryName = catObj ? catObj.label : "Sports & Fitness";

      await submitTrainerSkills({
        category: categoryName,
        skill: skill.trim(),
        experience: parseInt(experience.trim(), 10) || 0,
        about: about.trim(),
        hourlyRate: hourlyRate.trim() || "₹500 / hr",
      });

      navigation.navigate("TrainerVerification");
    } catch (e) {
      console.log("Skill setup error:", e);
      Alert.alert("Error", "Could not save coach profile.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar showBack eyebrow="COACH SETUP" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>STEP 1 OF 2</Text>
          <Text style={styles.title}>What do you teach?</Text>
          <Text style={styles.subtitle}>
            Define your coaching specialty and hourly session rate
          </Text>
        </View>

        <GlassCard variant="trainer" style={styles.formCard}>
          {/* Category Selector */}
          <Text style={styles.label}>Select Category</Text>
          <ChipFilter
            items={CATEGORIES.filter((c) => c.id !== "all")}
            selectedId={selectedCat}
            onSelect={setSelectedCat}
            variant="trainer"
            style={styles.chipScroll}
          />

          {/* Specific Skill */}
          <View style={styles.fieldHeaderRow}>
            <Text style={styles.label}>Specific Skill *</Text>
            {skill.length > 0 && !isSkillValid && (
              <Text style={styles.errorHint}>Letters only</Text>
            )}
          </View>
          <TextInput
            style={[
              styles.input,
              skill.length > 0 && !isSkillValid && styles.inputError,
            ]}
            placeholder="e.g. Football Coaching, Hatha Yoga, Python"
            placeholderTextColor={colors.textMuted}
            value={skill}
            onChangeText={handleSkillChange}
            autoCapitalize="words"
          />

          {/* Experience and Hourly Rate */}
          <View style={styles.row}>
            <View style={styles.halfField}>
              <View style={styles.fieldHeaderRow}>
                <Text style={styles.label}>Years Exp *</Text>
                {experience.length > 0 && !isExpValid && (
                  <Text style={styles.errorHint}>0-60</Text>
                )}
              </View>
              <TextInput
                style={[
                  styles.input,
                  experience.length > 0 && !isExpValid && styles.inputError,
                ]}
                placeholder="e.g. 5"
                placeholderTextColor={colors.textMuted}
                keyboardType="number-pad"
                value={experience}
                onChangeText={handleExperienceChange}
                maxLength={2}
              />
            </View>

            <View style={styles.halfField}>
              <Text style={styles.label}>Session Rate</Text>
              <TextInput
                style={styles.input}
                placeholder="e.g. ₹500 / hr"
                placeholderTextColor={colors.textMuted}
                value={hourlyRate}
                onChangeText={setHourlyRate}
              />
            </View>
          </View>

          {/* Coaching Bio */}
          <Text style={styles.label}>About Your Coaching</Text>
          <TextInput
            style={[styles.input, styles.bio]}
            placeholder="Describe your coaching drills, equipment needed, and background..."
            placeholderTextColor={colors.textMuted}
            multiline
            value={about}
            onChangeText={setAbout}
            maxLength={350}
          />

          <PrimaryButton
            title={loading ? "Saving Skills..." : "Continue to Verification"}
            variant="trainer"
            size="lg"
            loading={loading}
            disabled={!isValid}
            onPress={handleContinue}
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
  header: {
    marginBottom: spacing.xl,
  },
  eyebrow: {
    ...typography.caption,
    color: colors.trainer,
    letterSpacing: 2,
    fontWeight: "700",
  },
  title: {
    ...typography.heading,
    color: colors.textPrimary,
    fontSize: 30,
    fontWeight: "800",
    marginTop: 2,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
    fontSize: 14,
  },
  formCard: {
    paddingVertical: spacing.xl,
  },
  chipScroll: {
    paddingHorizontal: 0,
    marginBottom: spacing.lg,
  },
  fieldHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
    marginTop: spacing.xs,
  },
  label: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  errorHint: {
    color: colors.error,
    fontSize: 11,
    fontWeight: "600",
  },
  input: {
    backgroundColor: colors.glassInput,
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    color: colors.textPrimary,
    fontSize: 15,
    height: 52,
    marginBottom: spacing.md,
  },
  inputError: {
    borderColor: colors.error,
  },
  row: {
    flexDirection: "row",
    gap: spacing.md,
  },
  halfField: {
    flex: 1,
  },
  bio: {
    height: 110,
    textAlignVertical: "top",
    paddingTop: spacing.md,
    marginBottom: spacing.xl,
  },
  submitBtn: {
    width: "100%",
  },
});