import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
};

export default function PrimaryButton({
  title,
  onPress,
  disabled = false,
}: PrimaryButtonProps) {
  return (
    <Pressable
      style={[
        styles.button,
        disabled && styles.disabledButton,
      ]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '90%',
    height: 56,
    backgroundColor: '#5B5CEB',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
  },

  disabledButton: {
    backgroundColor: '#3B3D4A',
    opacity: 0.7,
  },

  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});