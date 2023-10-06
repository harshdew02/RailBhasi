
import React from 'react'
import { View, Text, SafeAreaView, ScrollView, TouchableOpacity, Image, Platform, TextInput } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { useNavigation } from '@react-navigation/native';


export default function TopBar({heading}) {

    const navigation = useNavigation();

  return (

    <View className={"mx-0 pt-6 flex-row justify-between items-center px-4 mb-0 bg-[#16247d]"} style={{height: wp(24)}}>

    <TouchableOpacity
            onPress={()=> navigation.goBack()}
            className="p-2 rounded-full "
            style={{}}
    >
            <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="white" />
    </TouchableOpacity>

      <Text style={{fontSize: wp(5)}} className=" text-white">{heading}</Text>
      <TouchableOpacity>
        <Image source={require('../../assets/images/avatar.png')} style={{height: wp(12), width: wp(12)}} />
      </TouchableOpacity>
    </View>

  )
}