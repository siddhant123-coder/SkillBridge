import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';

type PrimaryButtonProps = {
  title: string;
  onPress: () => void;
};

export default function PrimaryButton({
  title,
  onPress,
}: PrimaryButtonProps) {
  return (
    <Pressable style={styles.button} onPress={onPress}>
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

  text: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});