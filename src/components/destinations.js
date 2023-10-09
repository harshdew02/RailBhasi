import { View, Text, TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useState } from 'react'
import { destinationData } from '../constants'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { HeartIcon, SpeakerWaveIcon } from 'react-native-heroicons/solid';
import { useNavigation } from '@react-navigation/native';

export default function Destinations() {
    const navigation = useNavigation();
    return (
        <ScrollView className="mx-0 mt-2 px-2" style={{ height: hp(68), width: wp(100) }}>
            {
                destinationData.map((item, index) => {
                    return (
                        <DestinationCard navigation={navigation} item={item} key={index} />
                    )
                })
            }
        </ScrollView>
    )
}

const DestinationCard = ({ item, navigation }) => {
    const [isFavourite, toggleFavourite] = useState(false);
    return (
        <TouchableOpacity
            onPress={() => navigation.navigate('Destination', { ...item })}
            style={{ width: wp(94) }}
            className="bg-blue-800 rounded-2xl relative p-4 space-y-4 mb-2">

            <View>
                <Text style={{ fontSize: wp(2.7) }} className="text-white font-semibold">Train No: 13834</Text>
                <Text style={{ fontSize: wp(5) }} className="text-white  font-semibold">{item.title}</Text>
            </View>

            <View className="flex-row justify-between items-center">
                <View className="flex-row justify-between">
                    <Text style={{ fontSize: wp(3.8) }} className="text-white mr-4">Arr:15:50</Text>
                    <Text style={{ fontSize: wp(3.8) }} className="text-white mx-2">Dep:15:55</Text>
                    <Text style={{ fontSize: wp(3.8) }} className="text-white ml-4">Dep:15:55</Text>
                </View>
                <TouchableOpacity onPress={() => toggleFavourite(!isFavourite)} style={{ backgroundColor: 'rgba(255,255,255,0.4)' }} className="rounded-full p-3">
                    <SpeakerWaveIcon size={wp(5)} color={isFavourite ? "red" : "white"} />
                </TouchableOpacity>
            </View>
        </TouchableOpacity>
    )
}