import { View, SafeAreaView, Image } from 'react-native';
import * as React from 'react';
import TopBar from '../components/topBar';
import { LiveTrain, FromTo } from '../components/annoucementScreens';

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
      <TopBar heading={"Get Announcement"} />


      <Tab.Navigator initialRouteName='From To' screenOptions={screenOptions}>

        <Tab.Screen
          name='From To'
          component={FromTo}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <Image source={require("../../assets/images/location.png")} className="rounded" style={{ width: wp(10), height: wp(10) }} />
                </View>
              )
            }
          }} />

        <Tab.Screen
          name='Live Train'
          component={LiveTrain}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                <View className="flex-col justify-around items-center bg-neutral-100 rounded-xl mt-3 space-x-1 space-y-1 mb-1">
                  <Image source={require("../../assets/images/traintotrain.png")} className="rounded" style={{ width: wp(10), height: wp(10) }} />
                </View>
              )
            }
          }} />
      </Tab.Navigator>
    </SafeAreaView>
  )
}