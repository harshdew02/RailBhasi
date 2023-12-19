import { View, Text, StyleSheet, TextInput, TouchableOpacity, TextComponent } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getTrainSchedules } from '../Information/Railwayapi'
import { SafeAreaView } from 'react-native';
import { ArrowPathIcon, MapPinIcon } from 'react-native-heroicons/solid';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { ArrowDownCircleIcon, ChevronDoubleDownIcon, ChevronDownIcon, MagnifyingGlassIcon, SpeakerWaveIcon } from 'react-native-heroicons/outline';
import { ScrollView } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PREDEFINED_LANGUAGE } from '../../constants/config';

export default function LiveTrain() {

  const [trainSchedule, setTrainSchedule] = useState(13029);
  const [lang, setLang] = React.useState(null);
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
  // React.useEffect(() => {
  //   const getData = async () => {
  //     // call getTrainSchedules
  //     const data = await getTrainSchedules(selectedTrain);
  //     const schedule = data.schedule;
  //     console.log(schedule);
  //     setselectedTrainSchedule();
  //   }
  //   getData();
  // }, [selectedTrain])

  // schedule handler
  const handleSchedule = async () => {
    if (number) {
      const data = await getTrainSchedules(number);
      setTrainSchedule(data.schedule);
      console.log(`(liveTrain.js) ${number} schedule `, trainSchedule);
    }
  }
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
          placeholder={PREDEFINED_LANGUAGE['give_train_number'][lang]}
          keyboardType="numeric"
        />

        {/*Location  */}
        <TouchableOpacity className="p-3 rounded-xl ml-2 bg-blue-500" onPress={async () => {
          // getLongitude();
          handleSchedule();

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
        <Text className="text-white ml-3">{PREDEFINED_LANGUAGE['arrival'][lang]}</Text>
        <Text className="text-white" >{PREDEFINED_LANGUAGE['station'][lang]}</Text>
        <Text className="text-white mr-6" >{PREDEFINED_LANGUAGE['departure'][lang]}</Text>
      </View>

      {/* green */}
      <Green />

      {/* blue */}
      <ScrollView>
        <TouchableOpacity pointerEvents='none' style={{ width: wp(100), height: wp(18) }} className="flex-row justify-between font-semibold bg-blue-200 items-center px-3" >
          <View style={{ width: wp(24) }} className="flex-row items-center justify-between">
            <Text className="font-medium text-[16px]">
              07:02
            </Text>
            <ChevronDoubleDownIcon size={30} className="font-thin" color="#16247d" />
          </View>
          <View className="flex-col justify-between align-center">
            <Text className="text-[#16247d] text-[16px] font-medium" >Durg Junction</Text>
            <Text className="text-[14px] font-medium">(DURG)</Text>
            <Text>{PREDEFINED_LANGUAGE['PF'][lang]} : </Text>
          </View>
          <Text className="font-medium text-[16px]" >
            07:11
          </Text>
          <TouchableOpacity className="rounded-3xl p-2 bg-blue-600">
            <SpeakerWaveIcon size={20} color="#fff" />
          </TouchableOpacity>
        </TouchableOpacity>
      </ScrollView>

      {/* red */}
      <View>
        <TouchableOpacity pointerEvents='none' style={{ width: wp(100), height: wp(18) }} className="flex-row justify-between font-semibold bg-red-200 items-center px-3" >
          <View style={{ width: wp(24) }} className="flex-row items-center justify-between">
            <Text className="font-medium text-[16px]">
              07:03
            </Text>
            <ChevronDoubleDownIcon size={30} className="font-thin" color="#16247d" />
          </View>
          <View className="flex-col justify-between align-center">
            <Text className="text-[#16247d] text-[16px] font-medium" >Durg Junction</Text>
            <Text className="text-[14px] font-medium">(DURG)</Text>
            <Text>{PREDEFINED_LANGUAGE['PF'][lang]} : </Text>
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

const Green = () => {
  const [lang, setLang] = React.useState(null);
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
  return <View className="flex-col items-center" style={{ width: wp(100) }}>
    <TouchableOpacity pointerEvents='none' style={{ width: wp(100), height: wp(18) }} className="flex-row justify-between font-semibold bg-green-200 items-center px-3" >
      <View style={{ width: wp(24) }} className="flex-row items-center justify-between">
        <Text className="font-medium text-[16px]">
          07:01
        </Text>
        <ChevronDoubleDownIcon size={30} className="font-thin" color="#16247d" />
      </View>
      <View className="flex-col justify-between align-center">
        <Text className="text-[#16247d] text-[16px] font-medium" >Durg Junction</Text>
        <Text className="text-[14px] font-medium">(DURG)</Text>
        <Text>{PREDEFINED_LANGUAGE['PF'][lang]} : </Text>
      </View>
      <Text className="font-medium text-[16px]" >
        07:11
      </Text>
      <TouchableOpacity className="rounded-3xl p-2 bg-green-600">
        <SpeakerWaveIcon size={20} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  </View>
}
