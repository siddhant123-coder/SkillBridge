import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, Platform, StyleSheet } from "react-native";

import TrainerHome from "../screens/trainer/TrainerHome";
import Requests from "../screens/trainer/Requests";
import Sessions from "../screens/trainer/Sessions";
import Profile from "../screens/trainer/Profile";
import Chat from "../screens/shared/Chat";
import ReviewScreen from "../screens/shared/ReviewScreen";
import Settings from "../screens/shared/Settings";
import Notifications from "../screens/shared/Notifications";
import SessionDetails from "../screens/shared/Session";
import TrainerVerification from "../screens/trainer/TrainerVerification";
import TrainerSkillSetup from "../screens/trainer/TrainerSkillSetup";

import { colors } from "../theme/colors";
import { useAuth } from "../context/AuthContext";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function TrainerBottomTabs() {
  const { requests } = useAuth();
  const pendingCount = requests.filter((r) => r.status === "pending").length;

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "rgba(18, 20, 26, 0.95)",
          borderTopColor: colors.glassBorderHighlight,
          borderTopWidth: 1,
          height: Platform.OS === "ios" ? 82 : 68,
          paddingBottom: Platform.OS === "ios" ? 22 : 10,
          paddingTop: 8,
          elevation: 8,
          shadowColor: "#000",
          shadowOffset: { width: 0, height: -4 },
          shadowOpacity: 0.35,
          shadowRadius: 10,
        },
        tabBarActiveTintColor: colors.trainer,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
          marginTop: 2,
        },
        tabBarIcon: ({ color, focused, size }) => {
          let icon: keyof typeof Ionicons.glyphMap = "home-outline";

          switch (route.name) {
            case "Dashboard":
              icon = focused ? "grid" : "grid-outline";
              break;
            case "Requests":
              icon = focused ? "mail-open" : "mail-outline";
              break;
            case "Sessions":
              icon = focused ? "calendar" : "calendar-outline";
              break;
            case "Profile":
              icon = focused ? "person" : "person-outline";
              break;
          }

          return (
            <View style={focused ? styles.activeIconWrap : undefined}>
              <Ionicons name={icon} size={22} color={color} />
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Dashboard" component={TrainerHome} />
      <Tab.Screen
        name="Requests"
        component={Requests}
        options={{
          tabBarBadge: pendingCount > 0 ? pendingCount : undefined,
          tabBarBadgeStyle: {
            backgroundColor: colors.trainer,
            color: "#1A0C05",
            fontWeight: "800",
            fontSize: 10,
          },
        }}
      />
      <Tab.Screen name="Sessions" component={Sessions} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function TrainerTabs() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="TrainerHomeTabs"
        component={TrainerBottomTabs}
      />
      <Stack.Screen
        name="Chat"
        component={Chat}
      />
      <Stack.Screen
        name="ReviewScreen"
        component={ReviewScreen}
      />
      <Stack.Screen
        name="SessionDetails"
        component={SessionDetails}
      />
      <Stack.Screen
        name="TrainerSkillSetup"
        component={TrainerSkillSetup}
      />
      <Stack.Screen
        name="TrainerVerification"
        component={TrainerVerification}
      />
      <Stack.Screen
        name="Notifications"
        component={Notifications}
      />
      <Stack.Screen
        name="Settings"
        component={Settings}
      />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({
  activeIconWrap: {
    backgroundColor: colors.trainerSoft,
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 14,
  },
});