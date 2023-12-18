import { View, Text, Image, TouchableOpacity, ScrollView, Platform } from 'react-native'
import React, { useState } from 'react'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { ClockIcon, HeartIcon, MapPinIcon, SpeakerWaveIcon, SunIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';
import { theme } from '../theme';
const ios = Platform.OS == 'ios';
const topMargin = ios? '': 'mt-10';

export default function StationScreen(props) {
    const item = props.route.params;
    const navigation = useNavigation();
    const [isFavourite, toggleFavourite] = useState(false);

  return (
    <View className="bg-white flex-1">
        {/* destination image */}
        <Image source={require("../../assets/images/mountain.png")} style={{width: wp(100), height: hp(55)}} />
        <StatusBar style={'light'} />

        {/* back button */}
        <SafeAreaView className={"flex-row justify-between items-center w-full absolute " + topMargin}>
            <TouchableOpacity
                onPress={()=> navigation.goBack()}
                className="p-2 rounded-full ml-4"
                style={{backgroundColor: 'rgba(255,255,255,0.5)'}}
            >
                <ChevronLeftIcon size={wp(7)} strokeWidth={4} color="white" />
            </TouchableOpacity>
            <TouchableOpacity
                onPress={()=> toggleFavourite(!isFavourite)}
                className="p-2 rounded-full mr-4"
                style={{backgroundColor: 'rgba(255,255,255,0.5)'}} 
            >
                <SpeakerWaveIcon size={wp(7)} strokeWidth={4} color={isFavourite? "red": "white"} />
            </TouchableOpacity>
        </SafeAreaView>

        {/* title & descritpion & booking button */}
        <View style={{borderTopLeftRadius: 40, borderTopRightRadius: 40}} className="px-5 flex flex-1 justify-between bg-white pt-8 -mt-14">
            <ScrollView showsVerticalScrollIndicator={false} className="space-y-5">
                <View className="flex-row justify-between items-start">
                    <Text style={{fontSize: wp(7)}} className="font-bold flex-1 text-neutral-700">
                        R - Raipur Junction
                    </Text>
                    <Text style={{fontSize: wp(7), color: theme.text}} className="font-semibold">
                        PFs: 7
                    </Text>
                </View>
                <Text style={{fontSize: wp(3.7)}} className="text-neutral-700 tracking-wide mb-2">Raipur railway station code is R. Raipur Junction is the main railway station serving the city of Raipur.It is only few of the railway stations in India which has been given the grade 'A-1' by the Indian Railways and is one of the highest revenue earning railway stations in India.

This station is one of the prominent stations on the Howrah-Nagpur-Mumbai line. It is also the originating point of the Raipur-Vizianagarm branch line route.</Text>
                <Text style={{fontSize: wp(3.7)}} className="text-neutral-700 tracking-wide mb-2">Zone: South East Central Railway</Text>
            </ScrollView>
        </View>
    </View>
  )
}