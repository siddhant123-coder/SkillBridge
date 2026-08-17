import React, { useState } from "react";
import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from "react-native";
import {
  RouteProp,
  useNavigation,
  useRoute,
} from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";

import HeaderBar from "../../components/common/HeaderBar";
import GlassCard from "../../components/common/GlassCard";
import PrimaryButton from "../../components/common/PrimaryButton";
import { colors } from "../../theme/colors";
import { spacing, radius } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import { useAuth } from "../../context/AuthContext";

type RouteParams = {
  RequestSession: {
    trainerId: string;
    trainerName: string;
    trainerPhoto: string | null;
    skill: string;
  };
};

const DATE_OPTIONS = ["Saturday", "Sunday", "Tomorrow", "Next Monday"];
const TIME_OPTIONS = ["7:00 AM", "10:00 AM", "5:00 PM", "7:00 PM"];

export default function RequestSession() {
  const navigation = useNavigation<any>();
  const route = useRoute<RouteProp<RouteParams, "RequestSession">>();

  const {
    trainerId,
    trainerName,
    trainerPhoto,
    skill,
  } = route.params;

  const { sendSessionRequest } = useAuth();

  const [selectedDate, setSelectedDate] = useState("Saturday");
  const [selectedTime, setSelectedTime] = useState("7:00 PM");
  const [location, setLocation] = useState("");
  const [message, setMessage] = useState(
    `Hi ${trainerName}, I would like to book a 1-on-1 coaching session for ${skill}.`
  );
  const [loading, setLoading] = useState(false);

  async function handleSendRequest() {
    if (!location.trim()) {
      Alert.alert("Missing Location", "Please enter a meeting location.");
      return;
    }

    try {
      setLoading(true);

      await sendSessionRequest({
        trainerId,
        trainerName,
        trainerPhoto,
        skill,
        message: message.trim(),
        preferredDate: `${selectedDate} · ${selectedTime}`,
        location: location.trim(),
      });

      Alert.alert(
        "Request Sent! 🚀",
        `Your session request for ${skill} has been sent to ${trainerName}. You'll be notified as soon as they accept.`,
        [
          {
            text: "View Sessions",
            onPress: () => navigation.navigate("Sessions"),
          },
          {
            text: "Done",
            onPress: () => navigation.goBack(),
          },
        ]
      );
    } catch (error) {
      console.log(error);
      Alert.alert("Error", "Failed to send request.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar showBack eyebrow={`WITH ${trainerName.toUpperCase()}`} />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.header}>
          <Text style={styles.title}>Request a session</Text>
          <Text style={styles.skillBadge}>{skill}</Text>
        </View>

        <GlassCard variant="learner" style={styles.card}>
          {/* Preferred Day */}
          <Text style={styles.label}>Preferred Day</Text>
          <View style={styles.optionsRow}>
            {DATE_OPTIONS.map((day) => (
              <Pressable
                key={day}
                onPress={() => setSelectedDate(day)}
                style={[
                  styles.optionPill,
                  selectedDate === day && styles.optionPillActive,
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedDate === day && styles.optionTextActive,
                  ]}
                >
                  {day}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Preferred Time Slot */}
          <Text style={styles.label}>Preferred Time Slot</Text>
          <View style={styles.optionsRow}>
            {TIME_OPTIONS.map((time) => (
              <Pressable
                key={time}
                onPress={() => setSelectedTime(time)}
                style={[
                  styles.optionPill,
                  selectedTime === time && styles.optionPillActive,
                ]}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedTime === time && styles.optionTextActive,
                  ]}
                >
                  {time}
                </Text>
              </Pressable>
            ))}
          </View>

          {/* Meeting Location */}
          <Text style={styles.label}>Meeting Location *</Text>
          <View style={styles.inputBox}>
            <Ionicons
              name="location-outline"
              size={18}
              color={colors.learner}
              style={{ marginRight: 8 }}
            />
            <TextInput
              style={styles.input}
              placeholder="e.g. ABC Ground / Sector 14 Park"
              placeholderTextColor={colors.textMuted}
              value={location}
              onChangeText={setLocation}
            />
          </View>

          {/* Message / Goals */}
          <Text style={styles.label}>Note / Goals for the Coach</Text>
          <TextInput
            style={[styles.input, styles.messageInput]}
            placeholder="Tell the coach your current level and what you want to achieve..."
            placeholderTextColor={colors.textMuted}
            multiline
            value={message}
            onChangeText={setMessage}
          />

          <PrimaryButton
            title={loading ? "Sending Request..." : "Send Request"}
            variant="learner"
            size="lg"
            icon="paper-plane"
            loading={loading}
            onPress={handleSendRequest}
            style={styles.sendBtn}
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
    marginBottom: spacing.lg,
  },
  title: {
    ...typography.heading,
    color: colors.textPrimary,
    fontSize: 28,
    fontWeight: "800",
  },
  skillBadge: {
    color: colors.learner,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 2,
  },
  card: {
    paddingVertical: spacing.xl,
  },
  label: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    marginBottom: spacing.sm,
    marginTop: spacing.sm,
  },
  optionsRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  optionPill: {
    backgroundColor: colors.glassInput,
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderRadius: radius.pill,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
  optionPillActive: {
    backgroundColor: colors.learnerSoft,
    borderColor: colors.learner,
  },
  optionText: {
    color: colors.textMuted,
    fontSize: 12,
    fontWeight: "600",
  },
  optionTextActive: {
    color: colors.learner,
    fontWeight: "700",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.glassInput,
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    height: 50,
    marginBottom: spacing.md,
  },
  input: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 14,
  },
  messageInput: {
    height: 100,
    backgroundColor: colors.glassInput,
    borderColor: colors.glassBorder,
    borderWidth: 1,
    borderRadius: radius.lg,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.md,
    textAlignVertical: "top",
    marginBottom: spacing.xl,
  },
  sendBtn: {
    width: "100%",
  },
});