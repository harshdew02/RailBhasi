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

export default function Destinations({ language }) {
  const navigation = useNavigation();
  console.log(language);

  let obj = {
    xarr: "",
    xnos: "",
    xtrain: "",
    xdep: "",
  };
  let vect = [];

  //use effect will be applied here as language changes
  //get the desired language information from nearStation via props
  //now useEffect will be called so inside that we will call NMTv2 translation engine to translate into desired lang,
  useEffect(() => {
    destinationData.map(async (item, index) => {
      obj.xarr = await getTranslation("Arr: " + item.arr, "en", language);
      obj.xnos = await getTranslation("Train no:" + item.nos, "en", language);
      obj.xtrain = await getTranslation(item.train, "en", language);
      obj.xdep = await getTranslation("Dep: " + item.dep, "en", language);
    });
    console.log(obj);
    vect.push(obj);

  }, [language]);

  return (
    <ScrollView
      className="mx-0 mt-2 px-2"
      style={{ height: hp(68), width: wp(100) }}
    >
      {vect.map((item, index) => {
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

const DestinationCard = ({ item, navigation, langu }) => {
  const [isFavourite, toggleFavourite] = useState(false);
  return (
    <TouchableOpacity
      onPress={() => navigation.navigate("Destination", { ...item, langu })}
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
          {getTranslation("Hii I am anuj", "en", "hi")}
        </Text>
      </View>

      <View className="flex-row justify-between items-center">
        <View className="flex-row justify-between">
          <Text style={{ fontSize: wp(3.8) }} className="text-white mr-4">
            {item.arr}
          </Text>
          <Text style={{ fontSize: wp(3.8) }} className="text-white mx-2">
            {item.dep}
          </Text>
          <Text style={{ fontSize: wp(3.8) }} className="text-white ml-4">
            PF: {item.platform}
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => toggleFavourite(!isFavourite)}
          style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
          className="rounded-full p-3"
        >
          <SpeakerWaveIcon size={wp(5)} color={isFavourite ? "red" : "white"} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
};
