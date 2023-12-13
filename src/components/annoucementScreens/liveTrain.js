import { View, Text, StyleSheet, TextInput, TouchableOpacity, TextComponent } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getTrainSchedules } from '../Information/Railwayapi'
import { SafeAreaView } from 'react-native';
import { ArrowPathIcon, MapPinIcon } from 'react-native-heroicons/solid';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ArrowDownCircleIcon, ChevronDoubleDownIcon, ChevronDownIcon, MagnifyingGlassIcon, SpeakerWaveIcon } from 'react-native-heroicons/outline';
import { ScrollView } from 'react-native-gesture-handler';

export default function LiveTrain() {
  const [selectedTrain, setselectedTrain] = useState(13029);
  const [selectedTrainSchedule, setselectedTrainSchedule] = useState(13029);
  useEffect(() => {
    const getData = async () => {
      // call getTrainSchedules
      const data = await getTrainSchedules(selectedTrain);
      const schedule = data.schedule;
      setselectedTrainSchedule();
    }
    getData();
  }, [selectedTrain])

  // For Search Bar
  const [number, onChangeNumber] = React.useState('');


  return (
    <SafeAreaView>

      <View style={{ width: wp(100) }} className="flex-row items-center my-2 px-2 justify-around">

        <TextInput
          className="rounded-lg"
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Give Train Number"
          keyboardType="numeric"
        />

        {/*Location  */}
        <TouchableOpacity className="p-3 rounded-xl ml-2 bg-blue-500" onPress={async () => {
          getLongitude();
        }} mode='elevated' dark={true}>
          <MagnifyingGlassIcon size={20} color="#fff" />
        </TouchableOpacity>

        {/* Refresh */}
        <TouchableOpacity className="p-3 rounded-xl ml-2 bg-blue-500" onPress={() => {
          setLang('mr');
        }} mode='elevated' dark={true}>
          <ArrowPathIcon size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View className="flex-row justify-between py-2 bg-blue-900">
        <Text className="text-white ml-3">Arrival</Text>
        <Text className="text-white" >Station Name</Text>
        <Text className="text-white mr-6" >Departure</Text>
      </View>

      <View className="flex-col items-center" style={{ width: wp(100) }}>
        <TouchableOpacity pointerEvents='none' style={{ width: wp(100), height: wp(18) }} className="flex-row justify-between font-semibold bg-green-200 items-center px-3" >
          <View style={{ width: wp(24) }} className="flex-row items-center justify-between">
            <Text className="font-medium text-[16px]">
              07:09
            </Text>
            <ChevronDoubleDownIcon size={30} className="font-thin" color="#16247d" />
          </View>
          <View className="flex-col justify-between align-center">
            <Text className="text-[#16247d] text-[16px] font-medium" >Durg Junction</Text>
            <Text className="text-[14px] font-medium">(DURG)</Text>
            <Text>PF : </Text>
          </View>
          <Text className="font-medium text-[16px]" >
            07:11
          </Text>
          <TouchableOpacity className="rounded-3xl p-2 bg-green-600">
            <SpeakerWaveIcon size={20} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

      <ScrollView>
        <TouchableOpacity pointerEvents='none' style={{ width: wp(100), height: wp(18) }} className="flex-row justify-between font-semibold bg-blue-200 items-center px-3" >
          <View style={{ width: wp(24) }} className="flex-row items-center justify-between">
            <Text className="font-medium text-[16px]">
              07:09
            </Text>
            <ChevronDoubleDownIcon size={30} className="font-thin" color="#16247d" />
          </View>
          <View className="flex-col justify-between align-center">
            <Text className="text-[#16247d] text-[16px] font-medium" >Durg Junction</Text>
            <Text className="text-[14px] font-medium">(DURG)</Text>
            <Text>PF : </Text>
          </View>
          <Text className="font-medium text-[16px]" >
            07:11
          </Text>
          <TouchableOpacity className="rounded-3xl p-2 bg-blue-600">
            <SpeakerWaveIcon size={20} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>
      </ScrollView>

      <View>
        <TouchableOpacity pointerEvents='none' style={{ width: wp(100), height: wp(18) }} className="flex-row justify-between font-semibold bg-red-200 items-center px-3" >
          <View style={{ width: wp(24) }} className="flex-row items-center justify-between">
            <Text className="font-medium text-[16px]">
              07:09
            </Text>
            <ChevronDoubleDownIcon size={30} className="font-thin" color="#16247d" />
          </View>
          <View className="flex-col justify-between align-center">
            <Text className="text-[#16247d] text-[16px] font-medium" >Durg Junction</Text>
            <Text className="text-[14px] font-medium">(DURG)</Text>
            <Text>PF : </Text>
          </View>
          <Text className="font-medium text-[16px]" >
            07:11
          </Text>
          <TouchableOpacity className="rounded-3xl p-2 bg-red-600">
            <SpeakerWaveIcon size={20} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>
      </View>

    </SafeAreaView >
  )
}

const styles = StyleSheet.create({
  input: {
    height: 42,
    width: wp(70),
    borderWidth: 1,
    padding: 10,
  },
});
