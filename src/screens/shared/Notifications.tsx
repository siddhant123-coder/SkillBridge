import React from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import HeaderBar from "../../components/common/HeaderBar";
import GlassCard from "../../components/common/GlassCard";
import { colors } from "../../theme/colors";
import { spacing, radius } from "../../theme/spacing";
import { typography } from "../../theme/typography";

const NOTIFICATIONS = [
  {
    id: "notif-1",
    title: "Session Request Accepted 🎉",
    message: "Rahul Sharma accepted your request for Football Coaching on Saturday at 7:00 PM.",
    time: "10m ago",
    icon: "checkmark-circle",
    color: colors.learner,
  },
  {
    id: "notif-2",
    title: "New Message from Rahul",
    message: "Bring turf boots and a water bottle.",
    time: "25m ago",
    icon: "chatbubble-ellipses",
    color: colors.primary,
  },
  {
    id: "notif-3",
    title: "Identity Verified ✓",
    message: "Your government ID check has been approved. You now have the verified coach badge.",
    time: "2h ago",
    icon: "shield-checkmark",
    color: colors.trainer,
  },
];

export default function Notifications() {
  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar showBack eyebrow="UPDATES" title="Notifications" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {NOTIFICATIONS.map((item) => (
          <GlassCard key={item.id} style={styles.card}>
            <View style={styles.row}>
              <View
                style={[
                  styles.iconBox,
                  {
                    backgroundColor: `${item.color}20`,
                    borderColor: item.color,
                  },
                ]}
              >
                <Ionicons name={item.icon as any} size={22} color={item.color} />
              </View>

              <View style={styles.textWrap}>
                <View style={styles.headerRow}>
                  <Text style={styles.title}>{item.title}</Text>
                  <Text style={styles.time}>{item.time}</Text>
                </View>
                <Text style={styles.message}>{item.message}</Text>
              </View>
            </View>
          </GlassCard>
        ))}
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
  card: {
    marginBottom: spacing.md,
  },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
  },
  iconBox: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  textWrap: {
    flex: 1,
    marginLeft: spacing.md,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    ...typography.subtitle,
    color: colors.textPrimary,
    fontWeight: "700",
    fontSize: 14,
  },
  time: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 11,
  },
  message: {
    ...typography.body,
    color: colors.textSecondary,
    fontSize: 12,
    marginTop: 3,
    lineHeight: 18,
  },
});
