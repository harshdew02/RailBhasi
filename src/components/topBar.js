
import React from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Platform, TextInput,StatusBar } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';


export default function TopBar({heading}) {

    const navigation = useNavigation();

  return (

    <View className={"mx-0 pt-1 flex-row justify-start items-center px-4 mb-0 bg-[#16247d]"} style={{height: wp(16)}}>
            <StatusBar
            barStyle={"light-content"}
            backgroundColor="#16247d"
            hidden={false}
            />
      <TouchableOpacity onPress={() => navigation.openDrawer()}>
        <Image source={require('../../assets/images/avatar.png')} style={{height: wp(12), width: wp(12)}} />
      </TouchableOpacity>
      <Text style={{fontSize: wp(5)}} className=" text-white pl-6">{heading}</Text>

    </View>

  )
}