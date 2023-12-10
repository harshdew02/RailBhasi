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
import { getAudio } from "./ASRComponents/TTS";
import {
  PREDEFINED_ANNOUNCEMENT,
  LANGUAGE_SELECTION,
  TYPE_SELECTION,
} from "../constants/config";

// need to disable
import Sound from "react-native-sound";
import fs, { stat } from "react-native-fs";
// 

import { useDispatch, useSelector } from "react-redux";
import { setDisable, setGlobalSound } from "../redux/soundSlice";
import { getStationInfo, getTrainBetweenStations, getTrainSchedules } from "./Information/Railwayapi";
import { getLiveStation } from "./Information/RapidAPI";

export default function Destinations({ language, station }) {
  const [trainData, setTrainData] = useState([]);
  const [currnetSound, setCurrentSound] = useState(null);
  const [sounds, setSound] = useState(null);
  const navigation = useNavigation();
  const dispatch = useDispatch();

  //use effect will be applied here as language changes
  //get the desired language information from nearStation via props
  //now useEffect will be called so inside that we will call NMTv2 translation engine to translate into desired lang,
  useEffect(() => {
    let index = LANGUAGE_SELECTION(language);
    const fetchData = async item => {
      setTrainData([]);
      let type = TYPE_SELECTION(
        item.arr,
        [item.late_hour, item.late_min],
        item.from,
        station
      );
      let info = await getTranslation(`${item.from}/${item.to}/${item.train}`,'en',language);
      let data = info.split('/');
      let message;

      switch (type) {
        case "origination":
          message = PREDEFINED_ANNOUNCEMENT[index].origination;
          break;
        case "arrived":
          message = PREDEFINED_ANNOUNCEMENT[index].arrived;
          break;
        case "arriving":
          message = PREDEFINED_ANNOUNCEMENT[index].arriving;
          break;
        case "late":
          message = PREDEFINED_ANNOUNCEMENT[index].late;
          break;
        case "ontime":
          message = PREDEFINED_ANNOUNCEMENT[index].ontime;
          break;
        case "custom":
          message = PREDEFINED_ANNOUNCEMENT[index].custom;
          break;
        default:
          message = PREDEFINED_ANNOUNCEMENT[index].custom_ontime;
          break;
      }

      message = message
        .replace("(train_no)", item.nos)
        .replace("(origin)", data[0])
        .replace("(destination)", data[1])
        .replace("(train_name)", data[2])
        .replace("(PF)", item.platform)
        .replace("(intime)", item.arr)
        .replace("(outtime)", item.dep)
        .replace("(stop)", item.stop)
        .replace("(ghante)", item.late_hour)
        .replace("(mintu)", item.late_min);

      let message1 = PREDEFINED_ANNOUNCEMENT[index].additional
        .replace("(intime)", item.arr)
        .replace("(outtime)", item.dep)
        .replace("(stop)", item.stop);

      const obj = {
        nos: "Train no: " + item.nos,
        train: data[2],
        type1: message,
        type2: message1,
        arr: item.arr,
        dep: item.dep,
        platform: item.platform,
        stop: item.stop + " min",
        langu: language,
        image: item.image,
      };
      console.log(language, station);
      setTrainData(prev => (prev ? [...prev, obj] : [obj]));
    };

    destinationData.map((item, index) => {
      fetchData(item);
    });
  }, [language, station]);

  const handleCurrnetSound = async item => {
    dispatch(setDisable(true));
    if (sounds == null || currnetSound != item) {
      if (currnetSound != item && sounds != null) {
        dispatch(setGlobalSound(null));
        sounds.stop();
      }
      setCurrentSound(item);
      await getAudio(item.type1 + item.type2, item.langu, "female");
      dispatch(setDisable(false));
      dispatch(setGlobalSound(item));
      // toggleFavourite(true);
      let sound = new Sound(
        `${fs.CachesDirectoryPath}/output.wav`,
        null,
        error => {
          if (error) console.log(error);
          else {
            setSound(sound);
            sound.play(() => {
              setSound(null);
              // toggleFavourite(false);
              dispatch(setGlobalSound(null));
              dispatch(setDisable(false));
            });
          }
        }
      );
    } else if (currnetSound == item) {
      sounds.stop();
      setSound(null);
      item = null;
      // toggleFavourite(false);
      dispatch(setGlobalSound(null));
      dispatch(setDisable(null));
    }
  };

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
            handleCurrnetSound={handleCurrnetSound}
            currnetSound={currnetSound}
          />
        );
      })}
    </ScrollView>
  );
}

const DestinationCard = ({
  item,
  navigation,
  handleCurrnetSound,
  currnetSound,
}) => {
  const [isFavourite, toggleFavourite] = useState(false);
  const [isDisabled, toggleDisabled] = useState(false);
  const mySound = useSelector(state => state.currentSound);
  const myDisabled = useSelector(state => state.disabledSound);
  // console.log("mySound", mySound);
  useEffect(() => {
    // console.log("Sound changed", mySound);
    toggleFavourite(mySound == item);
    toggleDisabled(myDisabled);
  }, [mySound, myDisabled]);
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
          disabled={isDisabled}
          onPress={() => {
            handleCurrnetSound(item);
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
