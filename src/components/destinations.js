import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { destinationData } from "../constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { HeartIcon, SpeakerWaveIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { getTranslation } from "./ASRComponents/NMTv2";
import { getAudio } from './ASRComponents/TTS';

export default function Destinations({ language }) {
  const [trainData, setTrainData] = useState([]);
  const [cnt, setCnt] = useState(0);
  const navigation = useNavigation();

  //use effect will be applied here as language changes
  //get the desired language information from nearStation via props
  //now useEffect will be called so inside that we will call NMTv2 translation engine to translate into desired lang,
  useEffect(() => {
    const fetchData = async item => {
      setTrainData([]);

      const obj = {
        nos: "Train no: " + item.nos,
        train: await getTranslation(item.train, "en", language),
        type1: await getTranslation(`Passengers please pay attention train number ${item.nos} ${item.train} from ${item.from} to ${item.to} is arriving on platform number ${item.platform}.`,'en',language),
        type2: await getTranslation(`This train will arrive on ${item.arr} and will depart after ${item.stop} minutes at ${item.dep}.`,'en',language),
        arr: item.arr,
        dep: item.dep,
        platform: item.platform,
        stop: item.stop + ' min',
        langu: language,
        image: item.image,
      };

      setTrainData(prev => (prev ? [...prev, obj] : [obj]));
    };

    destinationData.map((item, index) => {
      fetchData(item);
    });
  }, [language]);

  return (
    <ScrollView
      className="mx-0 mt-2 px-2"
      style={{ height: hp(68), width: wp(100) }}
    >
      {trainData.map((item, index) => {
        return (
          <DestinationCard
            navigation={navigation}
            item={item}
            key={index}
            langu={language}
          />
        );
      })}
    </ScrollView>
  );
}

const DestinationCard = ({ item, navigation }) => {
  const [isFavourite, toggleFavourite] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Destination", { ...item })}
      style={{ width: wp(94) }}
      className="bg-blue-800 rounded-2xl relative p-4 space-y-4 mb-2"
    >
      <View>
        <Text
          style={{ fontSize: wp(2.7) }}
          className="text-white font-semibold"
        >
          {item.nos}
        </Text>
        <Text style={{ fontSize: wp(5) }} className="text-white  font-semibold">
          {item.train}
        </Text>
      </View>

      <View className="flex-row justify-between items-center">
        <View className="flex-row justify-between">
          <Text style={{ fontSize: wp(3.8) }} className="text-white mr-4">
            Arr: {item.arr}
          </Text>
          <Text style={{ fontSize: wp(3.8) }} className="text-white mx-2">
            Dep: {item.dep}
          </Text>
          <Text style={{ fontSize: wp(3.8) }} className="text-white ml-4">
            PF: {item.platform}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {toggleFavourite(!isFavourite)
            getAudio(item.type1 + item.type2, item.langu,'female')
          }}
          style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
          className="rounded-full p-3"
        >
          <SpeakerWaveIcon size={wp(5)} color={isFavourite ? "red" : "white"} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
