import { View, Text, TouchableOpacity, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { destinationData, stationListEN } from "../constants";
// import { destinationData } from "../constants";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { HeartIcon, SpeakerWaveIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import { getTranslation } from "./ASRComponents/NMTv2";
import { getAudio } from "./ASRComponents/TTS";
import {
  LANGUAGE_SELECTION,
} from "../constants/config";

// need to disable
// import Sound from "react-native-sound";
// import fs, { stat } from "react-native-fs";
// 

import { useDispatch, useSelector } from "react-redux";
import { setDisable, setGlobalSound } from "../redux/soundSlice";
import { getStationInfo, getTrainSchedules } from "./Information/Railwayapi";
import { getLiveTrain, getTrainBetweenStation } from "./Information/ERail";


export default function stations({ language, stationData }) {
  // const [trainData, setTrainData] = useState([]);

  const [currnetSound, setCurrentSound] = useState(null);
  const [sounds, setSound] = useState(null);
  const [desc, setDesc] = useState();
  // const navigation = useNavigation();
  const dispatch = useDispatch();

  //use effect will be applied here as language changes
  //get the desired language information from nearStation via props
  //now useEffect will be called so inside that we will call NMTv2 translation engine to translate into desired lang,

  // useEffect(() => {
  //   let index = LANGUAGE_SELECTION(language);
  //   const fetchData = async item => {
  //     setTrainData([]);
  //     let type = TYPE_SELECTION(
  //       item.arr,
  //       [item.late_hour, item.late_min],
  //       item.from,
  //       station
  //     );
  //     let info = await getTranslation(`${item.from}/${item.to}/${item.train}`, 'en', language);
  //     let data = info.split('/');
  //     let message;
  //   }
  //   fetchData();
  // }, [language, stations]);

  // TTS
  const selectedLanguage = useSelector(state => state.language.currentLanguage);

  useEffect(() => {

    // console.log('sl', selectedLanguage);
    const listen = async () => {
      const inputDesc = `Description: Welcome to ${stationData.stationName} in ${stationData.stateName}! As part of the ${stationData.zones.zoneName} (${stationData.zones.zoneCode}) zone, this station offers ${stationData.numberOfPlatforms} platforms for your travel needs.`;
      let outputDesc = await getTranslation(inputDesc, 'en', selectedLanguage);
      console.log(outputDesc);
      setDesc(outputDesc);
    }
    listen();


  }, [selectedLanguage]);

  const handleCurrnetSound = async () => {
    if (sounds == null) {

      // await getAudio(item.type1 + item.type2, item.langu, "female");
      await getAudio(desc, selectedLanguage, "female");
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
              // dispatch(setGlobalSound(null));
              // dispatch(setDisable(false));
            });
          }
        }
      );
    } else {
      sounds.stop();
      setSound(null);
      // item = null;
      // toggleFavourite(false);
      // dispatch(setGlobalSound(null));
      // dispatch(setDisable(null));
    }
  };

  return (
    <ScrollView
      className="mx-0 mt-0 px-2"
      style={{ height: hp(68), width: wp(100) }}
    >
      {stationData && <DestinationCard
        stationData={stationData}
        langu={language}
        handleCurrnetSound={handleCurrnetSound}
        currnetSound={currnetSound}
        desc={desc}
      />}
    </ScrollView>
  );
}

export const DestinationCard = ({
  stationData,
  navigation,
  handleCurrnetSound,
  desc,
  currnetSound,
}) => {
  const [isFavourite, toggleFavourite] = useState(false);
  const [isDisabled, toggleDisabled] = useState(false);
  const mySound = useSelector(state => state.currentSound);
  const myDisabled = useSelector(state => state.disabledSound);
  // console.log("mySound", mySound);
  useEffect(() => {
    // console.log("Sound changed", mySound);
    toggleFavourite(mySound == stationData);
    toggleDisabled(myDisabled);
  }, [mySound, myDisabled]);

  return (
    <TouchableOpacity
      // onPress={() => navigation.navigate("Station")}
      style={{ width: wp(94) }}
      disabled={true}
      className="bg-blue-800 rounded-2xl relative py-7 px-5 space-y-1 mb-2"
    >
      <View>
        <Text
          style={{ fontSize: wp(4.5) }}
          className="text-white font-semibold"
        >
          {/* {item.nos} */}
          {/* Station Code: R */}
          {`Station Code: ${stationData.stationCode}`}
        </Text>
        <Text style={{ fontSize: wp(7) }} className="text-white  font-semibold">
          {/* {item.train} */}
          {/* Raipur Junction */}
          {stationData.stationName}
        </Text>
      </View>

      <View className="flex-row justify-between items-center p-1">
        <View className="flex-column justify-between">
          <Text style={{ fontSize: wp(4.8) }} className="text-white">
            {/* Number of PFs: 7 */}
            {`Number of PFs: ${stationData.numberOfPlatforms}`}
          </Text>
          <Text style={{ fontSize: wp(4.8) }} className="text-white">
            {/* Number of PFs: 7 */}
            {`State: ${stationData.stateName}`}
          </Text>
          <Text style={{ fontSize: wp(4.8) }} className="text-white w-56">
            {/* Zone: SECR */}
            {`Zone: ${stationData.zones.zoneName}`}
          </Text>
          <Text style={{ fontSize: wp(4.8) }} className="text-white w-56">
            {/* Zone: SECR */}
            {/* {`Description: Welcome to ${stationData.stationName} in ${stationData.stateName}! As part of the ${stationData.zones.zoneName} (${stationData.zones.zoneCode}) zone, this station offers ${stationData.numberOfPlatforms} platforms for your travel needs.`} */}
            {desc}
          </Text>
        </View>
        <TouchableOpacity
          disabled={isDisabled}
          onPress={() => {
            handleCurrnetSound();
          }}
          style={{ backgroundColor: "rgba(255,255,255,0.4)" }}
          className="rounded-full p-3"
        >
          <SpeakerWaveIcon size={wp(5)} color={isFavourite ? "red" : "white"} />
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );
}