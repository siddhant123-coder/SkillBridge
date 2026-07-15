import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Splash from "../screens/onboarding/splash";
import LoginScreen from "../screens/onboarding/login";
import CreateProfile from "../screens/onboarding/CreateProfile";
import SelectRole from "../screens/onboarding/SelectRole";

import HomeScreen from "../screens/home/Home";

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Splash"
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
        }}
      >
        <Stack.Screen
          name="Splash"
          component={Splash}
        />

        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="CreateProfile"
          component={CreateProfile}
        />

        <Stack.Screen
          name="SelectRole"
          component={SelectRole}
        />

        <Stack.Screen
          name="Home"
          component={HomeScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}