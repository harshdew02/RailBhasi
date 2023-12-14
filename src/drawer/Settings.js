import { View, Text, TouchableOpacity } from "react-native";
import * as React from "react";
import {
  MapPinIcon,
  MicrophoneIcon,
  AdjustmentsHorizontalIcon,
  SpeakerWaveIcon,
} from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import TopBar from "../components/topBar";
import { Switch } from "react-native-paper";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { ArrowRightOnRectangleIcon } from "react-native-heroicons/solid";
import { PREDEFINED_LANGUAGE } from "../constants/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings() {
  const [isSwitchOn1, setIsSwitchOn1] = React.useState(false);
  const [isSwitchOn2, setIsSwitchOn2] = React.useState(false);
  const [isSwitchOn3, setIsSwitchOn3] = React.useState(false);
  const [isSwitchOn4, setIsSwitchOn4] = React.useState(false);
  const [lang, setLang] = React.useState(null);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const storedLang = await AsyncStorage.getItem("lang");
        if (storedLang != null) setLang(storedLang);
        else setLang("en");
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchData();
  }, []);
  React.useEffect(() => {
    console.log("Language changed: ", lang);
  }, [lang]);

  return (
    <SafeAreaView>
      <TopBar heading={PREDEFINED_LANGUAGE['settings'][lang]} />
      <View style={{ width: wp(100), height: hp(10) }} className="items-center">
        <View
          style={{ width: wp(70) }}
          className="py-1 rounded-3xl font-semibold bg-slate-300 mt-6 items-center"
        >
          <Text className="text-black text-sm">{PREDEFINED_LANGUAGE['give_permissions'][lang]}</Text>
        </View>
        {/* cards */}
        <View className="mt-4 items-center">
          {/*  */}
          <TouchableOpacity
            onPress={() => setIsSwitchOn1(!isSwitchOn1)}
            pointerEvents="none"
            style={{ width: wp(95), height: wp(15) }}
            className="flex-row justify-between rounded-xl font-semibold bg-blue-200 mt-2 items-center px-3"
          >
            <View className="flex-row align-center">
              <MapPinIcon size={25} color="#16247d" />
              <Text className="text-[#16247d] text-lg mx-1 font-medium">
                GPS
              </Text>
            </View>
            <View pointerEvents="none">
              <Switch value={isSwitchOn1} />
            </View>
          </TouchableOpacity>
          {/*  */}
          <TouchableOpacity
            onPress={() => setIsSwitchOn2(!isSwitchOn2)}
            pointerEvents="none"
            style={{ width: wp(95), height: wp(15) }}
            className="flex-row justify-between rounded-xl font-semibold bg-blue-200 mt-2 items-center px-3"
          >
            <View className="flex-row align-center">
              <AdjustmentsHorizontalIcon size={25} color="#16247d" />
              <Text className="text-[#16247d] text-lg mx-1 font-medium">
                File System
              </Text>
            </View>
            <View pointerEvents="none">
              <Switch value={isSwitchOn2} />
            </View>
          </TouchableOpacity>
          {/*  */}
          <TouchableOpacity
            onPress={() => setIsSwitchOn3(!isSwitchOn3)}
            pointerEvents="none"
            style={{ width: wp(95), height: wp(15) }}
            className="flex-row justify-between rounded-xl font-semibold bg-blue-200 mt-2 items-center px-3"
          >
            <View className="flex-row align-center">
              <MicrophoneIcon size={25} color="#16247d" />
              <Text className="text-[#16247d] text-lg mx-1 font-medium">
                Microphone
              </Text>
            </View>
            <View pointerEvents="none">
              <Switch value={isSwitchOn3} />
            </View>
          </TouchableOpacity>
          {/*  */}
          <TouchableOpacity
            onPress={() => setIsSwitchOn4(!isSwitchOn4)}
            pointerEvents="none"
            style={{ width: wp(95), height: wp(15) }}
            className="flex-row justify-between rounded-xl font-semibold bg-blue-200 mt-2 items-center px-3"
          >
            <View className="flex-row align-center">
              <SpeakerWaveIcon size={25} color="#16247d" />
              <Text className="text-[#16247d] text-lg mx-1 font-medium">
                File System
              </Text>
            </View>
            <View pointerEvents="none">
              <Switch value={isSwitchOn4} />
            </View>
          </TouchableOpacity>
          {/* elements */}
          <TouchableOpacity
            onPress={() => setIsSwitchOn4(!isSwitchOn4)}
            pointerEvents="none"
            style={{ width: wp(50), height: wp(12) }}
            className="flex-row justify-center border-2 border-[#ff2400] rounded-xl font-semibold  bg-red-100 mt-10 items-center px-1"
          >
            {/* <View className="flex-row  "> */}
            <Text className="text-[#ff2400] text-lg mx-1 font-medium">
            {PREDEFINED_LANGUAGE['logout'][lang]}
            </Text>
            <ArrowRightOnRectangleIcon size={25} color="#ff2400" />
            {/* </View> */}
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
