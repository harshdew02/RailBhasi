import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image,StatusBar, Platform, TextInput } from 'react-native'
import React, {useState} from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
// import { MagnifyingGlassIcon } from 'react-native-heroicons/outline'


// import SortCategories from '../components/sortCategories';
import Categories from '../components/categories';
import Destinations from '../components/destinations';
import { useNavigation } from '@react-navigation/native';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import TopBar from '../components/topBar';
// import { BottomTabBar } from '@react-navigation/bottom-tabs';


// const ios = Platform.OS=='ios';
// const topMargin = ios? 'mt-3': 'mt-10';
const topMargin = 'mt-10'


export default function AnnouncementScreen() {

  const navigation = useNavigation();
  
  return (
    <SafeAreaView className="flex-1 bg-white">
      <TopBar heading={"Get Announcement"} />
      <ScrollView showsVerticalScrollIndicator={false} className={"space-y-6"}>
        {/* categories */}
        <View className="mb-1">
          <Categories />
        </View>
        {/* destinations */}
        <View>
          {/* <Destinations /> */}
        </View>
      </ScrollView>
        
    </SafeAreaView>
  )
}