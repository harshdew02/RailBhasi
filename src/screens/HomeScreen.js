import { View, SafeAreaView, Image } from 'react-native';
import * as React from 'react';
import TopBar from '../components/topBar';
import { Model } from '../components/annoucementScreens';

import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const screenOptions = {
  tabBarShowLabel: true,
  tabBarStyle: {
    background: "#fff"
  }
}

export default function HomeScreen() {
  const Tab = createMaterialTopTabNavigator();

  return (
    <SafeAreaView className="flex-1 bg-white">
      <TopBar heading={"Our own model"} />


      <Tab.Navigator initialRouteName='Model' screenOptions={screenOptions}>

        <Tab.Screen
          name='Own Model'
          component={Model}
         />
      </Tab.Navigator>
    </SafeAreaView>
  )
}