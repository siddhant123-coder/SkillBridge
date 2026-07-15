import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import PrimaryButton from "../../components/Button/PrimaryButton";
import { STRINGS } from "../../constants/strings";
import { signInWithGoogle } from "../../services/googleAuth";

export default function LoginScreen() {
  const navigation = useNavigation<any>();

  const [loading, setLoading] = useState(false);

  async function handleGoogleSignIn() {
    try {
      setLoading(true);

      await signInWithGoogle();

      navigation.replace("CreateProfile");

    } catch (error: any) {
      console.log(error);

      Alert.alert(
        "Google Sign In",
        error?.message || "Something went wrong."
      );
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>
          {STRINGS.WELCOME}
        </Text>

        <Text style={styles.title}>
          {STRINGS.LOGIN}
        </Text>

        <Text style={styles.description}>
          Continue with your Google account to start learning and teaching skills.
        </Text>
      </View>

      <View style={styles.footer}>
        <PrimaryButton
          title={
            loading
              ? "Signing in..."
              : "Continue with Google"
          }
          variant="google"
          onPress={handleGoogleSignIn}
          disabled={loading}
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

  header: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 30,
  },

  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "700",
    marginTop: 8,
  },

  subtitle: {
    color: "#A0A0A0",
    fontSize: 16,
  },

  description: {
    color: "#8E8E93",
    textAlign: "center",
    marginTop: 20,
    fontSize: 15,
    lineHeight: 22,
  },

  footer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 40,
  },
});