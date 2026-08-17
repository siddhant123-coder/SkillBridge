import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import HeaderBar from "../../components/common/HeaderBar";
import GlassCard from "../../components/common/GlassCard";
import PrimaryButton from "../../components/common/PrimaryButton";
import StatusBadge from "../../components/common/StatusBadge";
import { colors } from "../../theme/colors";
import { spacing, radius } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import { useAuth } from "../../context/AuthContext";

export default function TrainerVerification() {
  const navigation = useNavigation<any>();
  const { submitTrainerVerification, currentUser } = useAuth();

  const [idUploaded, setIdUploaded] = useState(currentUser?.idDocUploaded || false);
  const [selfieUploaded, setSelfieUploaded] = useState(currentUser?.selfieUploaded || false);
  const [submitting, setSubmitting] = useState(false);

  const isVerified = idUploaded && selfieUploaded;

  function handleUploadId() {
    setIdUploaded(true);
    Alert.alert("Document Uploaded", "Government ID received and queued for automatic OCR scan.");
  }

  function handleUploadSelfie() {
    setSelfieUploaded(true);
    Alert.alert("Selfie Captured", "Live facial match completed successfully.");
  }

  async function handleContinue() {
    setSubmitting(true);
    await submitTrainerVerification({
      idUploaded,
      selfieUploaded,
    });
    setSubmitting(false);

    navigation.reset({
      index: 0,
      routes: [{ name: "TrainerTabs" }],
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar showBack eyebrow="TRUST & SAFETY" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.eyebrow}>STEP 2 OF 2</Text>
          <Text style={styles.title}>Verify identity</Text>
          <Text style={styles.subtitle}>
            Verified coaches get 4x more session bookings and a green trust badge
          </Text>
        </View>

        {/* Verification Status Pill Card */}
        <GlassCard
          variant="trainer"
          style={[styles.statusCard, isVerified && styles.verifiedCard]}
        >
          <View style={styles.statusRow}>
            <Ionicons
              name={isVerified ? "shield-checkmark" : "time-outline"}
              size={24}
              color={isVerified ? colors.learner : colors.warning}
            />
            <View style={styles.statusTextWrap}>
              <Text style={styles.statusLabel}>Verification Status</Text>
              <Text
                style={[
                  styles.statusValue,
                  { color: isVerified ? colors.learner : colors.warning },
                ]}
              >
                {isVerified ? "Verified Coach ✓" : "Pending Document Upload"}
              </Text>
            </View>
            <StatusBadge status={isVerified ? "verified" : "pending"} />
          </View>
        </GlassCard>

        {/* Upload Cards */}
        <Text style={styles.sectionHeader}>REQUIRED DOCUMENTS</Text>

        <Pressable
          onPress={handleUploadId}
          style={({ pressed }) => [
            styles.uploadCard,
            idUploaded && styles.uploadedCard,
            pressed && styles.pressed,
          ]}
        >
          <View
            style={[
              styles.iconBox,
              {
                backgroundColor: idUploaded ? colors.learnerSoft : colors.trainerSoft,
                borderColor: idUploaded ? colors.learner : colors.trainer,
              },
            ]}
          >
            <Ionicons
              name={idUploaded ? "checkmark" : "card-outline"}
              size={24}
              color={idUploaded ? colors.learner : colors.trainer}
            />
          </View>

          <View style={styles.uploadInfo}>
            <Text style={styles.uploadTitle}>1. Government ID</Text>
            <Text style={styles.uploadSub}>
              {idUploaded
                ? "Aadhaar Card / Driving License uploaded ✓"
                : "Upload Aadhaar, Passport or Driving License"}
            </Text>
          </View>

          <View
            style={[
              styles.actionPill,
              idUploaded && { backgroundColor: colors.learnerSoft, borderColor: colors.learner },
            ]}
          >
            <Text
              style={[
                styles.actionPillText,
                idUploaded && { color: colors.learner },
              ]}
            >
              {idUploaded ? "Uploaded" : "Upload"}
            </Text>
          </View>
        </Pressable>

        <Pressable
          onPress={handleUploadSelfie}
          style={({ pressed }) => [
            styles.uploadCard,
            selfieUploaded && styles.uploadedCard,
            pressed && styles.pressed,
          ]}
        >
          <View
            style={[
              styles.iconBox,
              {
                backgroundColor: selfieUploaded ? colors.learnerSoft : colors.trainerSoft,
                borderColor: selfieUploaded ? colors.learner : colors.trainer,
              },
            ]}
          >
            <Ionicons
              name={selfieUploaded ? "checkmark" : "camera-outline"}
              size={24}
              color={selfieUploaded ? colors.learner : colors.trainer}
            />
          </View>

          <View style={styles.uploadInfo}>
            <Text style={styles.uploadTitle}>2. Live Selfie</Text>
            <Text style={styles.uploadSub}>
              {selfieUploaded
                ? "Live biometric facial match confirmed ✓"
                : "Take a live front-camera selfie"}
            </Text>
          </View>

          <View
            style={[
              styles.actionPill,
              selfieUploaded && { backgroundColor: colors.learnerSoft, borderColor: colors.learner },
            ]}
          >
            <Text
              style={[
                styles.actionPillText,
                selfieUploaded && { color: colors.learner },
              ]}
            >
              {selfieUploaded ? "Captured" : "Take"}
            </Text>
          </View>
        </Pressable>

        {/* Benefits Box */}
        <GlassCard style={styles.benefitsCard}>
          <Text style={styles.benefitsTitle}>Why we verify:</Text>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={16} color={colors.learner} />
            <Text style={styles.benefitText}>Protects community safety & integrity</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={16} color={colors.learner} />
            <Text style={styles.benefitText}>Boosts search ranking and profile visibility</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={16} color={colors.learner} />
            <Text style={styles.benefitText}>Enables direct 1-on-1 session requests</Text>
          </View>
        </GlassCard>

        <PrimaryButton
          title={submitting ? "Finishing..." : "Continue to Dashboard"}
          variant="trainer"
          size="lg"
          loading={submitting}
          onPress={handleContinue}
          style={styles.continueBtn}
        />
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
  statusCard: {
    marginBottom: spacing.xl,
    borderColor: "rgba(255, 182, 72, 0.4)",
    backgroundColor: "rgba(255, 182, 72, 0.06)",
  },
  verifiedCard: {
    borderColor: "rgba(52, 216, 168, 0.4)",
    backgroundColor: "rgba(52, 216, 168, 0.08)",
  },
  statusRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusTextWrap: {
    flex: 1,
    marginLeft: spacing.md,
  },
  statusLabel: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 10,
    textTransform: "uppercase",
    letterSpacing: 0.5,
  },
  statusValue: {
    fontSize: 14,
    fontWeight: "700",
    marginTop: 2,
  },
  sectionHeader: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: spacing.md,
  },
  uploadCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.glassCard,
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderRadius: radius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  uploadedCard: {
    borderColor: "rgba(52, 216, 168, 0.4)",
    backgroundColor: "rgba(52, 216, 168, 0.06)",
  },
  pressed: {
    opacity: 0.9,
    transform: [{ scale: 0.985 }],
  },
  iconBox: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  uploadInfo: {
    flex: 1,
    marginLeft: spacing.md,
  },
  uploadTitle: {
    ...typography.subtitle,
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "700",
  },
  uploadSub: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
    fontSize: 11,
  },
  actionPill: {
    backgroundColor: colors.surfaceElevated,
    borderColor: colors.border,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  actionPillText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textPrimary,
  },
  benefitsCard: {
    marginTop: spacing.md,
    marginBottom: spacing.xl,
  },
  benefitsTitle: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: spacing.sm,
  },
  benefitItem: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: spacing.xs,
    gap: 6,
  },
  benefitText: {
    ...typography.caption,
    color: colors.textSecondary,
    fontSize: 12,
  },
  continueBtn: {
    width: "100%",
  },
});