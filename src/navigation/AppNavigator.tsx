import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash from "../screens/onboarding/splash";
import LoginScreen from "../screens/onboarding/login";
import OtpScreen from "../screens/onboarding/OtpScreen";
import SelectRole from "../screens/onboarding/SelectRole";
import CreateProfile from "../screens/onboarding/CreateProfile";
import TrainerSkillSetup from "../screens/trainer/TrainerSkillSetup";
import TrainerVerification from "../screens/trainer/TrainerVerification";

import TrainerTabs from "./TrainerTabs";
import LearnerTabs from "./LearnerTabs";

import TrainerProfile from "../screens/shared/TrainerProfile";
import RequestSession from "../screens/learner/RequestSession";
import Chat from "../screens/shared/Chat";
import ReviewScreen from "../screens/shared/ReviewScreen";
import SessionDetails from "../screens/shared/Session";
import Notifications from "../screens/shared/Notifications";
import Settings from "../screens/shared/Settings";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: { backgroundColor: "#0C0D10" },
        }}
      >
        {/* Onboarding Stack */}
        <Stack.Screen name="Splash" component={Splash} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="OtpScreen" component={OtpScreen} />
        <Stack.Screen name="SelectRole" component={SelectRole} />
        <Stack.Screen name="CreateProfile" component={CreateProfile} />

        {/* Trainer Setup Stack */}
        <Stack.Screen
          name="TrainerSkillSetup"
          component={TrainerSkillSetup}
        />
        <Stack.Screen
          name="TrainerVerification"
          component={TrainerVerification}
        />

        {/* Main Tab Navigators */}
        <Stack.Screen name="TrainerTabs" component={TrainerTabs} />
        <Stack.Screen name="LearnerTabs" component={LearnerTabs} />

        {/* Shared Screens Accessible Globally */}
        <Stack.Screen
          name="TrainerProfile"
          component={TrainerProfile}
        />
        <Stack.Screen
          name="RequestSession"
          component={RequestSession}
        />
        <Stack.Screen name="Chat" component={Chat} />
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
        <Stack.Screen name="Settings" component={Settings} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}