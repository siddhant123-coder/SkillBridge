import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { getAuth } from "@react-native-firebase/auth";

import { signOutGoogle } from "../../services/googleAuth";
import PrimaryButton from "../../components/Button/PrimaryButton";
import { useAuth } from "../../context/AuthContext";

export default function Home() {
  const navigation = useNavigation<any>();

  const { role } = useAuth();

  const user = getAuth().currentUser;

  async function handleLogout() {
    try {
      await signOutGoogle();

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
      {user?.photoURL && (
        <Image
          source={{ uri: user.photoURL }}
          style={styles.image}
        />
      )}

      <Text style={styles.title}>
        {user?.displayName}
      </Text>

      <Text style={styles.email}>
        {user?.email}
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