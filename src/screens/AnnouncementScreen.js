import { View, SafeAreaView, Image } from "react-native";
import * as React from "react";
import TopBar from "../components/topBar";
import { TTS, Combined, Speech, Translation } from "../components/annoucementScreens";

import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const screenOptions = {
  tabBarShowLabel: true,
  tabBarStyle: {
    background: "#fff",
  },
};

export default function AnnouncementScreen() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TopBar heading={"AI4Bharat Systems"} />

      <Tab.Navigator
        initialRouteName="Speech"
        screenOptions={screenOptions}
      >
        <Tab.Screen
          name="ASRCONF & ASRWHISP"
          component={Speech}
        />
        <Tab.Screen
          name="NMTv2"
          component={Translation}
        
        />
        <Tab.Screen
          name="Text-to-Speech (TTS)"
          component={TTS}
        />
        <Tab.Screen
          name="Speech to Speech (STS)"
          component={Combined}
        />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
