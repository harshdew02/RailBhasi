import * as React from "react";
// Screens
import WelcomeScreen from "../screens/WelcomeScreen";
import LoginScreen from "../screens/login";
import RegisterScreen from "../screens/register";

// Navigator
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// Type
import RightDrawer from "./RightDrawer";
import DestinationScreen from "../screens/DestinationScreen";
import StationScreen from "../screens/StationScreen";
import { SelectLang, pnr } from "../drawer";
import AnnouncementScreen from "../screens/AnnouncementScreen";
import XTransaction from "../screens/XTransaction";

// Main Function
function AppNavigation() {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Welcome"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Main" component={RightDrawer} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Destination" component={DestinationScreen} />
        <Stack.Screen name="Station" component={StationScreen} />
        <Stack.Screen name="annoucement" component={AnnouncementScreen} />
        <Stack.Screen name="Changelanguage" component={SelectLang} />
        <Stack.Screen name="Xtransaction" component={XTransaction} />
        <Stack.Screen name="Pnr" component={pnr} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;