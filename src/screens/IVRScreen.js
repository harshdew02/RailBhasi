import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  Linking,
} from "react-native";
import React from "react";
import TopBar from "../components/topBar";
import { PREDEFINED_LANGUAGE } from "../constants/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MapPinIcon, MicrophoneIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const IVRScreen = () => {
  const [lang, setLang] = React.useState(null);
  const navigation = useNavigation();
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
    <>
      <SafeAreaView className="flex-1 bg-white">
        <TopBar heading={PREDEFINED_LANGUAGE["IVR"][lang]} />
        <View style={{ height: hp(40) }}>
          <ScrollView className="flex-column m-4 p-0 item-center border-black border-2 rounded bg-slate-100">
            <View className="flex-row items-center justify-center my-1 mx-2 p-0">
              <Text className="text-xl p-1 font-bold">
                Hello and welcome to RailBhasi
              </Text>
            </View>
            <View className="flex-row items-center justify-center border-blue-800 border-2 my-1 mx-2 rounded-lg p-0">
              <Text className="text-base p-1 font-bold">
                Press 1 - Call the Emergency Medical Helpline
                {/* 138 */}
              </Text>
            </View>
            <View className="flex-row items-center justify-center border-blue-800 border-2 my-1 mx-2 rounded-lg p-0">
              <Text className="text-base p-1 font-bold">
                Press 2 - Call the Police Helpline
                {/* 182 */}
              </Text>
            </View>
            <View className="flex-row items-center justify-center border-blue-800 border-2 my-1 mx-2 rounded-lg p-0">
              <Text className="text-base p-1 font-bold">
                Press 3 - Check the PNR Information
                {/* navigateto pnr info */}
              </Text>
            </View>
            <View className="flex-row items-center justify-center border-blue-800 border-2 my-1 mx-2 rounded-lg p-0">
              <Text className="text-base p-1 font-bold">
                Press 4 - Get the Live station Annoucement and Station Informations
                {/* navigateto annoucement train */}
              </Text>
            </View>
            <View className="flex-row items-center justify-center border-blue-800 border-2 my-1 mx-2 rounded-lg p-0">
              <Text className="text-base p-1 font-bold">
              Press 5 - Check The Real-Time Railway Station Annoucements
                {/* navigateto station info */}
              </Text>
            </View>
            <View className="flex-row items-center justify-center border-blue-800 border-2 my-1 mx-2 rounded-lg p-0">
              <Text className="text-base p-1 font-bold">
                Press 6 - Register a complaint
                {/* 139 */}
              </Text>
            </View>
            <View className="flex-row items-center justify-center border-blue-800 border-2 my-1 mx-2 rounded-lg p-0">
              <Text className="text-base p-1 font-bold">
                Press 7 - Check the Refund and Cancellation Status
                {/* 139 */}
              </Text>
            </View>
            <View className="flex-row items-center justify-center border-blue-800 border-2 my-1 mx-2 rounded-lg p-0">
              <Text className="text-base p-1 font-bold">
                Press 8 - Check Special Services for Womens and Handicapped
                peoples
                {/* 139 */}
              </Text>
            </View>
            <View className="flex-row items-center justify-center border-blue-800 border-2 mt-1 mb-4 mx-2 rounded-lg p-0">
              <Text className="text-base p-1 font-bold">
                Press 0 - Change Current Language
                {/* App inbuild language change */}
              </Text>
            </View>
          </ScrollView>
        </View>
        <View className="flex-column items-center justify-center">
          <View className="flex-column items-center p-2 mx-2 mb-2 justify-between">
            <View className="flex-row justify-start mx-1 p-1">
              <TouchableOpacity
                className="p-3 mx-2 rounded-xl bg-blue-500"
                onPress={() => {
                  Linking.openURL("tel:138");
                }}
                mode="elevated"
                dark={true}
              >
                <Text className="text-center text-4xl text-white font-bold w-10 h-10">
                  1
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-3 mx-2 rounded-xl bg-blue-500"
                onPress={() => {Linking.openURL("tel:182");}}
                mode="elevated"
                dark={true}
              >
                <Text className="text-center text-4xl text-white font-bold w-10 h-10">
                  2
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-3 mx-2 rounded-xl bg-blue-500"
                onPress={() => navigation.navigate("Pnr")}
                mode="elevated"
                dark={true}
              >
                <Text className="text-center text-4xl text-white font-bold w-10 h-10">
                  3
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-start mx-1 p-1">
              <TouchableOpacity
                className="p-3 mx-2 rounded-xl bg-blue-500"
                onPress={() => navigation.navigate("annoucement")}
                mode="elevated"
                dark={true}
              >
                <Text className="text-center text-4xl text-white font-bold w-10 h-10">
                  4
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-3 mx-2 rounded-xl bg-blue-500"
                onPress={() => navigation.navigate("Xtransaction")}
                mode="elevated"
                dark={true}
              >
                <Text className="text-center text-4xl text-white font-bold w-10 h-10">
                  5
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-3 mx-2 rounded-xl bg-blue-500"
                onPress={() => {Linking.openURL("tel:139");}}
                mode="elevated"
                dark={true}
              >
                <Text className="text-center text-4xl text-white font-bold w-10 h-10">
                  6
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-start mx-1 p-1">
              <TouchableOpacity
                className="p-3 mx-2 rounded-xl bg-blue-500"
                onPress={() => {Linking.openURL("tel:139");}}
                mode="elevated"
                dark={true}
              >
                <Text className="text-center text-4xl text-white font-bold w-10 h-10">
                  7
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-3 mx-2 rounded-xl bg-blue-500"
                onPress={() => {Linking.openURL("tel:139");}}
                mode="elevated"
                dark={true}
              >
                <Text className="text-center text-4xl text-white font-bold w-10 h-10">
                  8
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-3 mx-2 rounded-xl bg-blue-500"
                onPress={() => {}}
                mode="elevated"
                dark={true}
              >
                <Text className="text-center text-4xl text-white font-bold w-10 h-10">
                  9
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-start mx-1 p-1">
              <TouchableOpacity
                className="p-3 mx-2 rounded-xl bg-blue-500"
                onPress={() => {}}
                mode="elevated"
                dark={true}
              >
                <Text className="text-center text-4xl text-white font-bold w-10 h-10">
                  *
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-3 mx-2 rounded-xl bg-blue-500"
                onPress={() => navigation.navigate("Changelanguage")}
                mode="elevated"
                dark={true}
              >
                <Text className="text-center text-4xl text-white font-bold w-10 h-10">
                  0
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-3 mx-2 rounded-xl bg-blue-500"
                onPress={() => {}}
                mode="elevated"
                dark={true}
              >
                <Text className="text-center text-4xl text-white font-bold w-10 h-10">
                  #
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default IVRScreen;
