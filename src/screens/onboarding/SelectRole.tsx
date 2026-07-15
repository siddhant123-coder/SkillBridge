import React, { useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import RoleCard from "../../components/RoleCard/RoleCard";
import { STRINGS } from "../../constants/strings";
import { useAuth } from "../../context/AuthContext";

export default function SelectRole() {
  const navigation = useNavigation<any>();

  const { setRole } = useAuth();

  const [selectedRole, setSelectedRole] = useState<
    "teacher" | "learner" | null
  >(null);

  function handleContinue(role: "teacher" | "learner") {
    setSelectedRole(role);
    setRole(role);

    setTimeout(() => {
      navigation.replace("Home");
    }, 150);
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.subtitle}>
          {STRINGS.ONE_QUICK_THING}
        </Text>

        <Text style={styles.title}>
          {STRINGS.WHO_ARE_YOU}
        </Text>

        <RoleCard
          title={STRINGS.TEACH_SKILL}
          selected={selectedRole === "teacher"}
          color="#FF7A45"
          onPress={() => handleContinue("teacher")}
        />

        <RoleCard
          title={STRINGS.LEARN_SKILL}
          selected={selectedRole === "learner"}
          color="#00D084"
          onPress={() => handleContinue("learner")}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {STRINGS.SWITCH_ROLE}
        </Text>
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
  },

  footer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: 40,
  },

  subtitle: {
    color: "#A0A0A0",
    fontSize: 14,
    marginBottom: 10,
    letterSpacing: 1,
  },

  title: {
    color: "white",
    fontSize: 32,
    fontWeight: "700",
    marginBottom: 40,
  },

  footerText: {
    color: "#6B7280",
    fontSize: 14,
  },
});