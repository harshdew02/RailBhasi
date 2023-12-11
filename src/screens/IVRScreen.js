import { View, Text, TouchableOpacity, SafeAreaView, Image} from "react-native";
import React from "react";
import TopBar from "../components/topBar";
import { MapPinIcon, MicrophoneIcon } from 'react-native-heroicons/solid';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const IVRScreen = () => {
  return (
    <>
      <SafeAreaView className="flex-1 bg-white">
        <TopBar heading={"Interactive Voice System"} />
        
        <View className="flex-column items-center p-2 mx-2 mt-2 justify-between">
          <View className="flex-row justify-start mx-1 p-1">
            <TouchableOpacity
              className="p-3 mr-1 rounded-xl bg-blue-500"
              onPress={() => {}}
              mode="elevated"
              dark={true}
            >
              <Text className="text-center text-4xl text-white font-bold w-10 h-10">1</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-3 mr-1 rounded-xl bg-blue-500"
              onPress={() => {}}
              mode="elevated"
              dark={true}
            >
              <Text className="text-center text-4xl text-white font-bold w-10 h-10">2</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-3 mr-1 rounded-xl bg-blue-500"
              onPress={() => {}}
              mode="elevated"
              dark={true}
            >
              <Text className="text-center text-4xl text-white font-bold w-10 h-10">3</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-start mx-1 p-1">
            <TouchableOpacity
              className="p-3 mr-1 rounded-xl bg-blue-500"
              onPress={() => {}}
              mode="elevated"
              dark={true}
            >
              <Text className="text-center text-4xl text-white font-bold w-10 h-10">4</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-3 mr-1 rounded-xl bg-blue-500"
              onPress={() => {}}
              mode="elevated"
              dark={true}
            >
              <Text className="text-center text-4xl text-white font-bold w-10 h-10">5</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-3 mr-1 rounded-xl bg-blue-500"
              onPress={() => {}}
              mode="elevated"
              dark={true}
            >
              <Text className="text-center text-4xl text-white font-bold w-10 h-10">6</Text>
            </TouchableOpacity>
          </View>
          <View className="flex-row justify-start mx-1 p-1">
            <TouchableOpacity
              className="p-3 mr-1 rounded-xl bg-blue-500"
              onPress={() => {}}
              mode="elevated"
              dark={true}
            >
              <Text className="text-center text-4xl text-white font-bold w-10 h-10">7</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-3 mr-1 rounded-xl bg-blue-500"
              onPress={() => {}}
              mode="elevated"
              dark={true}
            >
              <Text className="text-center text-4xl text-white font-bold w-10 h-10">8</Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="p-3 mr-1 rounded-xl bg-blue-500"
              onPress={() => {}}
              mode="elevated"
              dark={true}
            >
              <Text className="text-center text-4xl text-white font-bold w-10 h-10">9</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
};

export default IVRScreen;
