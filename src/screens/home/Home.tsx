import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import PrimaryButton from "../../components/common/PrimaryButton";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const navigation = useNavigation<any>();
  const { role, currentUser, logout } = useAuth();

  async function handleLogout() {
    try {
      await logout();
      navigation.reset({
        index: 0,
        routes: [{ name: "Login" }],
      });
    } catch (error) {
      Alert.alert("Logout Failed");
    }
  }

  return (
    <View style={styles.container}>
      {currentUser?.photoURL && (
        <Image
          source={{ uri: currentUser.photoURL }}
          style={styles.image}
        />
      )}

      <Text style={styles.title}>
        {currentUser?.name || "SkillBridge User"}
      </Text>

      <Text style={styles.email}>
        {currentUser?.email}
      </Text>

      <Text style={styles.role}>
        Role : {role}
      </Text>

      <View style={{ width: "90%", marginTop: 40 }}>
        <PrimaryButton
          title="Logout"
          onPress={handleLogout}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0F1117",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 24,
  },
  title: {
    color: "white",
    fontSize: 28,
    fontWeight: "700",
  },
  email: {
    color: "#A0A0A0",
    fontSize: 16,
    marginTop: 8,
  },
  role: {
    color: "#5B5CEB",
    fontSize: 18,
    fontWeight: "600",
    marginTop: 20,
    textTransform: "capitalize",
  },
});