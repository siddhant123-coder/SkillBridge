import React from "react";
import {
  Pressable,
  Text,
  StyleSheet,
  View,
  Image,
} from "react-native";

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  variant?: "primary" | "google";
};

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
  variant = "primary",
}: PrimaryButtonProps) {
  const isGoogle = variant === "google";

  return (
    <Pressable
      style={[
        styles.button,
        isGoogle && styles.googleButton,
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      {isGoogle && (
        <Image
          source={{
            uri: "https://upload.wikimedia.org/wikipedia/commons/c/c1/Google_%22G%22_logo.svg",
          }}
          style={styles.icon}
        />
      )}

      <Text
        style={[
          styles.text,
          isGoogle && styles.googleText,
        ]}
      >
        {title}
      </Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: "90%",
    height: 56,
    backgroundColor: "#5B5CEB",
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 40,
  },

  googleButton: {
    backgroundColor: "white",
  },

  disabledButton: {
    backgroundColor: "#3B3D4A",
    opacity: 0.7,
  },

  text: {
    color: "white",
    fontSize: 18,
    fontWeight: "600",
  },

  googleText: {
    color: "#202124",
  },

  icon: {
    width: 22,
    height: 22,
    marginRight: 12,
  },
});