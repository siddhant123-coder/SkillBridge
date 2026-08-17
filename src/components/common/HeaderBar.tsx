import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
  StyleProp,
  ViewStyle,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

import { colors } from "../../theme/colors";
import { spacing, radius } from "../../theme/spacing";
import { typography } from "../../theme/typography";
import { useAuth } from "../../context/AuthContext";

type HeaderBarProps = {
  title?: string;
  eyebrow?: string;
  showBack?: boolean;
  onBack?: () => void;
  showRoleBadge?: boolean;
  rightAction?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

export default function HeaderBar({
  title,
  eyebrow,
  showBack = false,
  onBack,
  showRoleBadge = true,
  rightAction,
  style,
}: HeaderBarProps) {
  const navigation = useNavigation<any>();
  const { role, switchRole } = useAuth();

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else if (navigation.canGoBack()) {
      navigation.goBack();
    }
  };

  const isTrainer = role === "trainer";

  return (
    <View style={[styles.container, style]}>
      {/* Top Status / Subtitle Bar */}
      <View style={styles.topRow}>
        {showBack ? (
          <Pressable
            onPress={handleBack}
            style={styles.backButton}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons
              name="arrow-back"
              size={22}
              color={colors.textPrimary}
            />
          </Pressable>
        ) : eyebrow ? (
          <Text
            style={[
              styles.eyebrow,
              isTrainer ? styles.trainerEyebrow : styles.learnerEyebrow,
            ]}
          >
            {eyebrow}
          </Text>
        ) : (
          <View style={styles.brandPill}>
            <View
              style={[
                styles.dot,
                { backgroundColor: isTrainer ? colors.trainer : colors.learner },
              ]}
            />
            <Text style={styles.brandText}>SkillBridge</Text>
          </View>
        )}

        <View style={styles.rightCluster}>
          {showRoleBadge && (
            <Pressable
              onPress={switchRole}
              style={[
                styles.roleBadge,
                isTrainer ? styles.trainerBadge : styles.learnerBadge,
              ]}
            >
              <Ionicons
                name={isTrainer ? "fitness-outline" : "school-outline"}
                size={14}
                color={isTrainer ? colors.trainer : colors.learner}
                style={{ marginRight: 4 }}
              />
              <Text
                style={[
                  styles.roleBadgeText,
                  { color: isTrainer ? colors.trainer : colors.learner },
                ]}
              >
                {isTrainer ? "Coach" : "Learner"}
              </Text>
              <Ionicons
                name="swap-horizontal"
                size={12}
                color={colors.textMuted}
                style={{ marginLeft: 4 }}
              />
            </Pressable>
          )}

          {rightAction}
        </View>
      </View>

      {/* Main Title if present */}
      {title && (
        <View style={styles.titleRow}>
          <Text style={styles.title}>{title}</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.sm,
    paddingBottom: spacing.md,
    backgroundColor: "transparent",
  },
  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 36,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.glassCard,
    borderColor: colors.glassBorder,
    borderWidth: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  eyebrow: {
    ...typography.caption,
    textTransform: "uppercase",
    letterSpacing: 1.5,
    fontWeight: "700",
    fontSize: 11,
  },
  trainerEyebrow: {
    color: colors.trainer,
  },
  learnerEyebrow: {
    color: colors.learner,
  },
  brandPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.glassCard,
    borderColor: colors.glassBorder,
    borderWidth: 1,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    borderRadius: radius.pill,
  },
  dot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    marginRight: spacing.xs + 2,
  },
  brandText: {
    color: colors.textPrimary,
    fontWeight: "700",
    fontSize: 12,
    letterSpacing: 0.5,
  },
  rightCluster: {
    flexDirection: "row",
    alignItems: "center",
    gap: spacing.sm,
  },
  roleBadge: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.md,
    paddingVertical: 5,
    borderRadius: radius.pill,
    borderWidth: 1,
  },
  trainerBadge: {
    backgroundColor: colors.trainerSoft,
    borderColor: "rgba(232, 121, 75, 0.3)",
  },
  learnerBadge: {
    backgroundColor: colors.learnerSoft,
    borderColor: "rgba(52, 216, 168, 0.3)",
  },
  roleBadgeText: {
    fontSize: 12,
    fontWeight: "700",
  },
  titleRow: {
    marginTop: spacing.xs,
  },
  title: {
    ...typography.heading,
    fontSize: 24,
    color: colors.textPrimary,
    fontWeight: "700",
  },
});
