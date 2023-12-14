import * as React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Drawer
import BottomTabs from "./BottomTabs";
import { Help, Profile, SelectLang, Settings } from "../drawer";
import {
  ChevronUpDownIcon,
  Cog6ToothIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  UserIcon,
} from "react-native-heroicons/outline";

export default function RightDrawer() {
  const Drawer = createDrawerNavigator();

  const DrawerHeaderContent = (props) => {
    return (
      <DrawerContentScrollView contentContainerStyle={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "#4f4f4f",
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            top: -5,
          }}
        >
          <Text style={{ color: "#fff" }}>Home</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  };

  return (
    <>
      {/* bvv */}
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: "#fff",
          },
        }}
        drawerContent={DrawerHeaderContent}
      >
        <Drawer.Screen
          name={"BottomBar"}
          component={BottomTabs}
          options={{
            drawerLabel: "Home Screen",
            drawerIcon: ({ focused, size, color }) => (
              // <MaterialCommunityIcons name="home" color={color} size={size} />
              <HomeIcon color={color} size={size} />
            ),
          }}
        />

        <Drawer.Screen
          name={"Profile"}
          component={Profile}
          options={{
            drawerLabel: "Profile",
            drawerIcon: ({ focused, size, color }) => (
              // <MaterialCommunityIcons name="firewire" color={color} size={size} />
              <UserIcon color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name={"SelectLang"}
          component={SelectLang}
          options={{
            drawerLabel: "Select Language",
            drawerIcon: ({ focused, size, color }) => (
              // <MaterialCommunityIcons
              //     name="location-enter"
              //     color={color}
              //     size={size}
              // />
              <ChevronUpDownIcon color={color} size={size} />
            ),
          }}
        />

        <Drawer.Screen
          name="Settings"
          component={Settings}
          options={{
            drawerLabel: "Settings",
            drawerIcon: ({ focused, size, color }) => (
              // <MaterialCommunityIcons
              //     name="location-enter"
              //     color={color}
              //     size={size}
              // />
              <Cog6ToothIcon color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Help"
          component={Help}
          options={{
            drawerLabel: "Contact Us",
            drawerIcon: ({ focused, size, color }) => (
              // <MaterialCommunityIcons
              //     name="location-enter"
              //     color={color}
              //     size={size}
              // />
              <QuestionMarkCircleIcon color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
    </>
  );
}
