import React from "react";
import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

import { colors } from "../../theme/colors";
import { spacing, radius } from "../../theme/spacing";
import { typography } from "../../theme/typography";

type ProfileHeaderProps = {
  name: string;
  subtitle?: string;
  image?: string;
  style?: StyleProp<ViewStyle>;
};

export default function ProfileHeader({
  name,
  subtitle,
  image,
  style,
}: ProfileHeaderProps) {
  return (
    <View style={[styles.container, style]}>
      {image ? (
        <Image
          source={{ uri: image }}
          style={styles.avatar}
        />
      ) : (
        <View style={styles.avatarPlaceholder}>
          <Text style={styles.avatarText}>
            {name.charAt(0).toUpperCase()}
          </Text>
        </View>
      )}

      <Text style={styles.name}>
        {name}
      </Text>

      {subtitle ? (
        <Text style={styles.subtitle}>
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },

  avatar: {
    width: 110,
    height: 110,
    borderRadius: 55,
    marginBottom: spacing.lg,
  },

  avatarPlaceholder: {
    width: 110,
    height: 110,
    borderRadius: 55,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: spacing.lg,
  },

  avatarText: {
    ...typography.heading,
    color: colors.white,
    fontSize: 36,
  },

  name: {
    ...typography.heading,
    color: colors.textPrimary,
  },

  subtitle: {
    ...typography.body,
    color: colors.textSecondary,
    marginTop: spacing.xs,
    textAlign: "center",
  },
});