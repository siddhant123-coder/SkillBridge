import React, { useState } from "react";
import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Switch,
  Pressable,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import HeaderBar from "../../components/common/HeaderBar";
import GlassCard from "../../components/common/GlassCard";
import { colors } from "../../theme/colors";
import { spacing, radius } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import { useAuth } from "../../context/AuthContext";

export default function Settings() {
  const navigation = useNavigation<any>();
  const { logout, role, switchRole } = useAuth();

  const [pushEnabled, setPushEnabled] = useState(true);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [locationEnabled, setLocationEnabled] = useState(true);

  return (
    <SafeAreaView style={styles.container}>
      <HeaderBar showBack eyebrow="PREFERENCES" title="Settings" />

      <ScrollView
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <Text style={styles.sectionHeader}>NOTIFICATIONS</Text>
        <GlassCard style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingTextWrap}>
              <Text style={styles.settingTitle}>Push Notifications</Text>
              <Text style={styles.settingSub}>
                Get real-time updates for session requests & chat
              </Text>
            </View>
            <Switch
              value={pushEnabled}
              onValueChange={setPushEnabled}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>

          <View style={styles.divider} />

          <View style={styles.settingRow}>
            <View style={styles.settingTextWrap}>
              <Text style={styles.settingTitle}>Sound & Vibrate</Text>
              <Text style={styles.settingSub}>
                Play audio alert on incoming learner requests
              </Text>
            </View>
            <Switch
              value={soundEnabled}
              onValueChange={setSoundEnabled}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>
        </GlassCard>

        <Text style={styles.sectionHeader}>PRIVACY & LOCATION</Text>
        <GlassCard style={styles.card}>
          <View style={styles.settingRow}>
            <View style={styles.settingTextWrap}>
              <Text style={styles.settingTitle}>Location Sharing</Text>
              <Text style={styles.settingSub}>
                Show approximate neighborhood distance to nearby coaches
              </Text>
            </View>
            <Switch
              value={locationEnabled}
              onValueChange={setLocationEnabled}
              trackColor={{ false: colors.border, true: colors.primary }}
              thumbColor={colors.white}
            />
          </View>
        </GlassCard>

        <Text style={styles.sectionHeader}>ACCOUNT ACTIONS</Text>
        <GlassCard style={styles.card}>
          <Pressable
            onPress={() => {
              switchRole();
              Alert.alert(
                "Role Switched",
                `Switched to ${role === "trainer" ? "Learner" : "Coach"} mode.`
              );
            }}
            style={styles.actionRow}
          >
            <Ionicons name="swap-horizontal" size={20} color={colors.primary} />
            <Text style={styles.actionText}>
              Switch to {role === "trainer" ? "Learner" : "Coach"} Mode
            </Text>
            <Ionicons
              name="chevron-forward"
              size={18}
              color={colors.textMuted}
            />
          </Pressable>

          <View style={styles.divider} />

          <Pressable
            onPress={() => {
              logout();
              navigation.reset({
                index: 0,
                routes: [{ name: "Login" }],
              });
            }}
            style={styles.actionRow}
          >
            <Ionicons name="log-out-outline" size={20} color={colors.error} />
            <Text style={[styles.actionText, { color: colors.error }]}>
              Log Out
            </Text>
          </Pressable>
        </GlassCard>

        <Text style={styles.versionText}>SkillBridge Android Glass v1.0.0</Text>
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
  sectionHeader: {
    ...typography.caption,
    color: colors.textMuted,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1,
    marginBottom: spacing.xs + 2,
    marginTop: spacing.md,
  },
  card: {
    marginBottom: spacing.md,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: spacing.xs,
  },
  settingTextWrap: {
    flex: 1,
    marginRight: spacing.md,
  },
  settingTitle: {
    ...typography.subtitle,
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "700",
  },
  settingSub: {
    ...typography.caption,
    color: colors.textMuted,
    marginTop: 2,
    fontSize: 11,
  },
  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: spacing.md,
  },
  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: spacing.xs,
  },
  actionText: {
    flex: 1,
    marginLeft: spacing.md,
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
  },
  versionText: {
    textAlign: "center",
    color: colors.textDisabled,
    fontSize: 11,
    marginTop: spacing.xl,
  },
});
