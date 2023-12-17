import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
} from "react-native";
import React from "react";
import TopBar from "../components/topBar";
import { MapPinIcon, MicrophoneIcon } from "react-native-heroicons/solid";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const IVRScreen = () => {
  return (
    <>
      <SafeAreaView className="flex-1 bg-white">
        <TopBar heading={"Interactive Voice System"} />
        <View  style={{height:hp(50)}}>
        <ScrollView className="flex-column m-4 p-0 item-center border-black border-2 rounded bg-slate-100">
          <View className="flex-row items-center justify-center my-1 mx-2 p-0">
            <Text className="text-xl p-1 font-bold">
              Hello and welcome to RailBhasi
            </Text>
          </View>
          <View className="flex-row items-center justify-center border-blue-800 border-2 my-1 mx-2 rounded-lg p-0">
            <Text className="text-base p-1 font-bold">
              Press 1 - Call the Police Helpline
            </Text>
          </View>
          <View className="flex-row items-center justify-center border-blue-800 border-2 my-1 mx-2 rounded-lg p-0">
            <Text className="text-base p-1 font-bold">
              Press 2 - Check the PNR Information
            </Text>
          </View>
          <View className="flex-row items-center justify-center border-blue-800 border-2 my-1 mx-2 rounded-lg p-0">
            <Text className="text-base p-1 font-bold">
            Press 3 - Check the Train Running Status
            </Text>
          </View>
          <View className="flex-row items-center justify-center border-blue-800 border-2 my-1 mx-2 rounded-lg p-0">
            <Text className="text-base p-1 font-bold">
            Press 4 - Check the Station Information
            </Text>
          </View>
          <View className="flex-row items-center justify-center border-blue-800 border-2 my-1 mx-2 rounded-lg p-0">
            <Text className="text-base p-1 font-bold">
            Press 5 - Register a complaint
            </Text>
          </View>     
          <View className="flex-row items-center justify-center border-blue-800 border-2 my-1 mx-2 rounded-lg p-0">
            <Text className="text-base p-1 font-bold">
            Press 6 - Check the Refund Status
            </Text>
          </View>     
          <View className="flex-row items-center justify-center border-blue-800 border-2 my-1 mx-2 rounded-lg p-0">
            <Text className="text-base p-1 font-bold">
            Press 7 - Check Special Services for Womens and Handicapped peoples
            </Text>
          </View>     
        </ScrollView>
        </View>
        <View className="flex-column items-center justify-center">
          <View className="flex-column items-center p-2 mx-2 justify-between">
            <View className="flex-row justify-start mx-1 p-1">
              <TouchableOpacity
                className="p-3 mx-2 mb-1 rounded-xl bg-blue-500"
                onPress={() => {}}
                mode="elevated"
                dark={true}
              >
                <Text className="text-center text-4xl text-white font-bold w-10 h-10">
                  1
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-3 mx-2 mb-1 rounded-xl bg-blue-500"
                onPress={() => {}}
                mode="elevated"
                dark={true}
              >
                <Text className="text-center text-4xl text-white font-bold w-10 h-10">
                  2
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-3 mx-2 mb-1 rounded-xl bg-blue-500"
                onPress={() => {}}
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
                className="p-3 mx-2 mb-1 rounded-xl bg-blue-500"
                onPress={() => {}}
                mode="elevated"
                dark={true}
              >
                <Text className="text-center text-4xl text-white font-bold w-10 h-10">
                  4
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-3 mx-2 mb-1 rounded-xl bg-blue-500"
                onPress={() => {}}
                mode="elevated"
                dark={true}
              >
                <Text className="text-center text-4xl text-white font-bold w-10 h-10">
                  5
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-3 mx-2 mb-1 rounded-xl bg-blue-500"
                onPress={() => {}}
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
                className="p-3 mx-2 mb-1 rounded-xl bg-blue-500"
                onPress={() => {}}
                mode="elevated"
                dark={true}
              >
                <Text className="text-center text-4xl text-white font-bold w-10 h-10">
                  7
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-3 mx-2 mb-1 rounded-xl bg-blue-500"
                onPress={() => {}}
                mode="elevated"
                dark={true}
              >
                <Text className="text-center text-4xl text-white font-bold w-10 h-10">
                  8
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                className="p-3 mx-2 mb-1 rounded-xl bg-blue-500"
                onPress={() => {}}
                mode="elevated"
                dark={true}
              >
                <Text className="text-center text-4xl text-white font-bold w-10 h-10">
                  9
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
