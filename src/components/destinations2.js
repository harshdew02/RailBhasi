import { View, Text, TouchableOpacity, Image, ScrollView, Alert } from "react-native";
import *  as React from 'react';
import { useState } from "react";
import { destinationData } from "../constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { HeartIcon, SpeakerWaveIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { getTranslation } from "./ASRComponents/NMTv2";
import { getAudio } from "./ASRComponents/TTS";
import {
  PREDEFINED_ANNOUNCEMENT,
  LANGUAGE_SELECTION,
  TYPE_SELECTION,
} from "../constants/config";

// need to disable
// import Sound from "react-native-sound";
// import fs, { stat } from "react-native-fs";
// 

import { useDispatch, useSelector } from "react-redux";
import { setDisable, setGlobalSound } from "../redux/soundSlice";
import { getStationInfo, getTrainBetweenStations, getTrainSchedules } from "./Information/Railwayapi";
import { PREDEFINED_LANGUAGE } from "../constants/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { getLiveStation } from "./Information/RapidAPI";

// export default function Destinations2() {

//   const navigation = useNavigation();

//   return (
//     <ScrollView
//       className="mx-0 mt-2 px-2"
//       style={{ height: hp(68), width: wp(100) }}
//     >
//       {/* Yaha Map laga ke sare cards show karna  */}
//       <DestinationCard navigation={navigation} />
//       <DestinationCard navigation={navigation} />

//     </ScrollView>
//   );
// }

const DestinationCard = ({ cardData, trainName, navigation }) => {

  const [isFavourite, toggleFavourite] = useState(false);
  const [isDisabled, toggleDisabled] = useState(false);
  const mySound = useSelector(state => state.currentSound);
  const myDisabled = useSelector(state => state.disabledSound);
  const [lang, setLang] = React.useState('en');

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const storedLang = await AsyncStorage.getItem('lang');
        if (storedLang != null)
          setLang(storedLang);
        else
          setLang('en')
      } catch (error) {
        console.error('Error: ', error);
      }
    }
    fetchData();
  }, [])
  React.useEffect(() => {
    console.log('Language changed: ', lang);
  }, [lang])

  return (
    <TouchableOpacity
      // onPress={() => navigation.navigate("Destination", { ...item })}
      style={{ width: wp(94) }}
      className="bg-blue-800 rounded-2xl relative p-4 space-y-4 mb-2"
    >
      <View>
        <Text
          style={{ fontSize: wp(2.7) }}
          className="text-white font-semibold"
        >
          {/* 22939 */}
          {`${PREDEFINED_LANGUAGE['train'][lang]} : ${cardData.train_no}`}
        </Text>
        <Text style={{ fontSize: wp(5) }} className="text-white  font-semibold">
          {/* HAPA BSP SUP EXP */}
          {trainName}
        </Text>
      </View>

      <View className="flex-row justify-between items-center">
        <View className="flex-row justify-between">
          <Text style={{ fontSize: wp(2.8), width: wp(20) }} className="text-white mr-4">
            {/* Arr: 00.50 */}
            {`${PREDEFINED_LANGUAGE['departure'][lang]} : ${cardData.from_time}`}
          </Text>
          <Text style={{ fontSize: wp(2.8), width: wp(20) }} className="text-white mx-2">
            {/* Duration: 02.10 */}
            {`${PREDEFINED_LANGUAGE['arrival'][lang]} : ${cardData.to_time} hours`}
          </Text>
          <Text style={{ fontSize: wp(2.8), width: wp(20) }} className="text-white ml-4">
            {`${PREDEFINED_LANGUAGE['duration'][lang]} : ${cardData.travel_time} hours`}
          </Text>
        </View>
        <TouchableOpacity
          style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
          className="rounded-full p-3"
        >
          <SpeakerWaveIcon size={wp(5)} color={isFavourite ? "red" : "white"} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};

export { DestinationCard };