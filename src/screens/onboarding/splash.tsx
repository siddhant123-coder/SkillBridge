import React from "react";
import { View, Text, StyleSheet } from "react-native";

import Logo from "../../components/Logo/logo";
import PrimaryButton from "../../components/Button/PrimaryButton";

type SplashProps = {
  navigation: any; // We'll replace 'any' with proper types later.
};

export default function Splash({ navigation }: SplashProps) {
  return (
    <View style={styles.container}>
      {/* Hero Section */}
      <View style={styles.hero}>
        <Logo />

        <Text style={styles.title}>
          SkillBridge
        </Text>

        <Text style={styles.subtitle}>
          Learn from real people near you
        </Text>
      </View>

      {/* Footer Section */}
      <View style={styles.footer}>
        <PrimaryButton
          title="Get Started"
          onPress={() => navigation.navigate("Login")}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1117",
  },

  hero: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },

  footer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 40,
  },

  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "700",
    marginTop: 20,
  },

  subtitle: {
    color: "#A0A0A0",
    fontSize: 16,
    marginTop: 8,
  },
});