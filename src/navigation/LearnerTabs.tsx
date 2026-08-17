import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, Platform, StyleSheet } from "react-native";

import LearnerHome from "../screens/learner/LearnerHome";
import Search from "../screens/learner/Search";
import Sessions from "../screens/learner/Sessions";
import Profile from "../screens/learner/Profile";
import RequestSession from "../screens/learner/RequestSession";
import TrainerProfile from "../screens/shared/TrainerProfile";
import Chat from "../screens/shared/Chat";
import ReviewScreen from "../screens/shared/ReviewScreen";
import Settings from "../screens/shared/Settings";
import Notifications from "../screens/shared/Notifications";
import SessionDetails from "../screens/shared/Session";

import { colors } from "../theme/colors";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function LearnerBottomTabs() {
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
        tabBarActiveTintColor: colors.learner,
        tabBarInactiveTintColor: colors.textMuted,
        tabBarLabelStyle: {
          fontSize: 11,
          fontWeight: "700",
          marginTop: 2,
        },
        tabBarIcon: ({ color, focused, size }) => {
          let icon: keyof typeof Ionicons.glyphMap = "home-outline";

          switch (route.name) {
            case "Home":
              icon = focused ? "home" : "home-outline";
              break;
            case "Explore":
              icon = focused ? "search" : "search-outline";
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
      <Tab.Screen name="Home" component={LearnerHome} />
      <Tab.Screen name="Explore" component={Search} />
      <Tab.Screen name="Sessions" component={Sessions} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}

export default function LearnerTabs() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animation: "slide_from_right",
      }}
    >
      <Stack.Screen
        name="LearnerHomeTabs"
        component={LearnerBottomTabs}
      />
      <Stack.Screen
        name="TrainerProfile"
        component={TrainerProfile}
      />
      <Stack.Screen
        name="RequestSession"
        component={RequestSession}
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
    backgroundColor: colors.learnerSoft,
    paddingHorizontal: 12,
    paddingVertical: 2,
    borderRadius: 14,
  },
});