import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  Image,
  Alert,
  SafeAreaView,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { useNavigation } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import HeaderBar from "../../components/common/HeaderBar";
import GlassCard from "../../components/common/GlassCard";
import PrimaryButton from "../../components/common/PrimaryButton";
import { colors } from "../../theme/colors";
import { spacing, radius } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import { useAuth } from "../../context/AuthContext";
import { createUser } from "../../services/firestore/users";
import { User } from "../../types/user";
import { getSafeAuth } from "../../services/firebase/safeFirebase";
import {
  isValidName,
  sanitizeName,
  isValidAge,
  sanitizeAge,
  isValidCity,
  sanitizeCity,
} from "../../utils/validation";

export default function CreateProfile() {
  const navigation = useNavigation<any>();
  const { role, profile, setProfile, setCurrentUser } = useAuth();

  const [name, setName] = useState(profile.name || "");
  const [age, setAge] = useState(profile.age || "");
  const [city, setCity] = useState(profile.city || "");
  const [bio, setBio] = useState(profile.bio || "");
  const [image, setImage] = useState<string | null>(profile.image || null);
  const [loading, setLoading] = useState(false);

  const isTrainer = role === "trainer";

  // Precautionary Validation Checks
  const nameValid = isValidName(name);
  const ageValid = isValidAge(age);
  const cityValid = isValidCity(city);
  const isFormValid = nameValid && ageValid && cityValid;

  const handleNameChange = (val: string) => {
    setName(sanitizeName(val));
  };

  const handleAgeChange = (val: string) => {
    setAge(sanitizeAge(val));
  };

  const handleCityChange = (val: string) => {
    setCity(sanitizeCity(val));
  };

  async function pickImage() {
    try {
      const permission = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (!permission.granted) {
        Alert.alert("Permission Required", "Please allow gallery permission to set a profile photo.");
        return;
      }

      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ["images"],
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.85,
      });

      if (!result.canceled && result.assets[0]) {
        setImage(result.assets[0].uri);
      }
    } catch (e) {
      console.log("Image picker note:", e);
    }
  }

  async function handleContinue() {
    if (!nameValid) {
      Alert.alert("Invalid Name", "Name must contain only alphabets (letters) and at least 2 characters.");
      return;
    }

    if (!ageValid) {
      Alert.alert("Invalid Age", "Please enter a valid age between 13 and 100.");
      return;
    }

    if (!cityValid) {
      Alert.alert("Invalid City", "City name must contain only alphabets.");
      return;
    }

    setLoading(true);

    try {
      const auth = getSafeAuth();
      const fbUser = auth?.currentUser;
      const userUid = fbUser?.uid || `user-${Date.now()}`;
      const userEmail = fbUser?.email || `${name.toLowerCase().replace(/\s+/g, "")}@example.com`;

      const newUser: User = {
        uid: userUid,
        name: name.trim(),
        email: userEmail,
        role: role || "learner",
        photoURL: image,
        age: parseInt(age.trim(), 10),
        bio: bio.trim(),
        skills: [],
        experience: 0,
        location: city.trim(),
        rating: 5.0,
        totalSessions: 0,
        reviewsCount: 0,
        isVerified: false,
        verificationStatus: "not_started",
        createdAt: Date.now(),
      };

      await createUser(newUser);
      setCurrentUser(newUser);

      setProfile({
        name: name.trim(),
        age: age.trim(),
        city: city.trim(),
        bio: bio.trim(),
        image,
      });

      if (isTrainer) {
        navigation.navigate("TrainerSkillSetup");
      } else {
        navigation.reset({
          index: 0,
          routes: [{ name: "LearnerTabs" }],
        });
      }
    } catch (error) {
      console.log("Create profile error:", error);
      Alert.alert("Error", "Could not save profile. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar showBack showRoleBadge={false} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text
            style={[
              styles.eyebrow,
              { color: isTrainer ? colors.trainer : colors.learner },
            ]}
          >
            PROFILE SETUP
          </Text>
          <Text style={styles.title}>Tell us about you</Text>
          <Text style={styles.subtitle}>
            Enter your real profile details to build trust in the community
          </Text>
        </View>

        <GlassCard style={styles.formCard}>
          {/* Avatar Section */}
          <View style={styles.avatarSection}>
            <Pressable onPress={pickImage} style={styles.avatarBox}>
              {image ? (
                <Image source={{ uri: image }} style={styles.avatarImage} />
              ) : (
                <View
                  style={[
                    styles.avatarPlaceholder,
                    {
                      borderColor: isTrainer ? colors.trainer : colors.learner,
                      backgroundColor: isTrainer ? colors.trainerSoft : colors.learnerSoft,
                    },
                  ]}
                >
                  <Ionicons
                    name="camera-outline"
                    size={32}
                    color={isTrainer ? colors.trainer : colors.learner}
                  />
                  <Text
                    style={[
                      styles.uploadText,
                      { color: isTrainer ? colors.trainer : colors.learner },
                    ]}
                  >
                    Upload Photo
                  </Text>
                </View>
              )}

              <View
                style={[
                  styles.editBadge,
                  { backgroundColor: isTrainer ? colors.trainer : colors.learner },
                ]}
              >
                <Ionicons name="camera" size={14} color="#000" />
              </View>
            </Pressable>
          </View>

          {/* Form Fields with Precautionary Real-Time Validation */}
          <View style={styles.fieldHeaderRow}>
            <Text style={styles.label}>Full Name *</Text>
            {name.length > 0 && !nameValid && (
              <Text style={styles.errorHint}>Letters only</Text>
            )}
          </View>
          <TextInput
            style={[
              styles.input,
              name.length > 0 && !nameValid && styles.inputError,
            ]}
            placeholder="e.g. Rahul Sharma"
            placeholderTextColor={colors.textMuted}
            value={name}
            onChangeText={handleNameChange}
            autoCapitalize="words"
          />

          <View style={styles.row}>
            <View style={styles.halfField}>
              <View style={styles.fieldHeaderRow}>
                <Text style={styles.label}>Age (13-100) *</Text>
                {age.length > 0 && !ageValid && (
                  <Text style={styles.errorHint}>13-100</Text>
                )}
              </View>
              <TextInput
                style={[
                  styles.input,
                  age.length > 0 && !ageValid && styles.inputError,
                ]}
                placeholder="e.g. 24"
                placeholderTextColor={colors.textMuted}
                keyboardType="number-pad"
                value={age}
                onChangeText={handleAgeChange}
                maxLength={3}
              />
            </View>

            <View style={styles.halfField}>
              <View style={styles.fieldHeaderRow}>
                <Text style={styles.label}>City *</Text>
                {city.length > 0 && !cityValid && (
                  <Text style={styles.errorHint}>Letters only</Text>
                )}
              </View>
              <TextInput
                style={[
                  styles.input,
                  city.length > 0 && !cityValid && styles.inputError,
                ]}
                placeholder="e.g. Mumbai"
                placeholderTextColor={colors.textMuted}
                value={city}
                onChangeText={handleCityChange}
                autoCapitalize="words"
              />
            </View>
          </View>

          <Text style={styles.label}>Short Bio</Text>
          <TextInput
            style={[styles.input, styles.bioInput]}
            placeholder={
              isTrainer
                ? "Share your coaching background, certifications, and philosophy..."
                : "Tell coaches what skills you are eager to learn..."
            }
            placeholderTextColor={colors.textMuted}
            multiline
            value={bio}
            onChangeText={setBio}
            maxLength={300}
          />

          <PrimaryButton
            title={loading ? "Saving Profile..." : "Continue"}
            variant={isTrainer ? "trainer" : "learner"}
            size="lg"
            loading={loading}
            disabled={!isFormValid}
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
    padding: spacing.xl,
    paddingBottom: spacing.xxxl,
  },
  header: {
    alignItems: "center",
    marginBottom: spacing.xl,
  },
  eyebrow: {
    ...typography.caption,
    letterSpacing: 2,
    fontWeight: "700",
  },
  title: {
    ...typography.heading,
    color: colors.textPrimary,
    fontSize: 32,
    fontWeight: "800",
    marginTop: 4,
  },
  subtitle: {
    ...typography.body,
    color: colors.textMuted,
    marginTop: spacing.xs,
    fontSize: 14,
    textAlign: "center",
  },
  formCard: {
    paddingVertical: spacing.xl,
  },
  avatarSection: {
    alignItems: "center",
    marginBottom: spacing.lg,
  },
  avatarBox: {
    position: "relative",
  },
  avatarImage: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 2,
    borderColor: colors.border,
  },
  avatarPlaceholder: {
    width: 104,
    height: 104,
    borderRadius: 52,
    borderWidth: 1.5,
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  uploadText: {
    fontSize: 11,
    fontWeight: "700",
    marginTop: 4,
  },
  editBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: colors.background,
  },
  fieldHeaderRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: spacing.xs,
    marginTop: spacing.sm,
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
  bioInput: {
    height: 100,
    textAlignVertical: "top",
    paddingTop: spacing.md,
    marginBottom: spacing.xl,
    marginTop: spacing.xs,
  },
  submitBtn: {
    width: "100%",
  },
});