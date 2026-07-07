import React from "react";
import { TextInput, StyleSheet } from "react-native";

type PhoneInputProps = {
  value: string;
  onChangeText: (text: string) => void;
};

export default function PhoneInput({
  value,
  onChangeText,
}: PhoneInputProps) {
  const handleChange = (text: string) => {
    // Keep only digits
    const numericText = text.replace(/[^0-9]/g, "");

    onChangeText(numericText);
  };

  return (
    <TextInput
      style={styles.input}
      value={value}
      onChangeText={handleChange}
      placeholder="Enter your phone number"
      placeholderTextColor="#808080"
      keyboardType="number-pad"
      maxLength={10}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: "90%",
    height: 56,
    borderRadius: 16,
    backgroundColor: "#1C1F26",
    color: "white",
    paddingHorizontal: 16,
    fontSize: 20,
    marginTop: 12,
    textAlign:"center"
  },
});