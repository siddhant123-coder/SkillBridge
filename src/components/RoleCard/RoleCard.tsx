import React from "react";
import { Pressable, Text, StyleSheet } from "react-native";

type RoleCardProps = {
  title: string;
  selected: boolean;
  onPress: () => void;
  color: string;
};

export default function RoleCard({
  title,
  selected,
  onPress,
  color,
}: RoleCardProps) {
  return (
    <Pressable
      onPress={onPress}
      style={[
        styles.card,
        {
          borderColor: selected ? color : "#2A2D3A",
          backgroundColor: selected ? `${color}15` : "transparent",
        },
      ]}
    >
      <Text
        style={[
          styles.option,
          {
            color: selected ? color : "#A0A0A0",
          },
        ]}
      >
        OPTION
      </Text>

      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    width: "90%",
    height: 95,
    borderRadius: 18,
    borderWidth: 1.5,
    justifyContent: "center",
    alignItems: "center",
    marginVertical: 12,
  },

  option: {
    fontSize: 12,
    fontWeight: "700",
    marginBottom: 8,
    letterSpacing: 1,
  },

  title: {
    color: "white",
    fontSize: 22,
    fontWeight: "700",
  },
});