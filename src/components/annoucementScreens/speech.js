import * as React from 'react';
import { View, Text, TouchableOpacity,StyleSheet, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card, Button, TextInput } from 'react-native-paper';
import DropdownComponent from '../dropDrown';
import DropdownComponent1 from '../dropDrown1';

import Destinations from '../destinations';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPinIcon, MicrophoneIcon } from 'react-native-heroicons/solid';

import { ArrowPathIcon } from 'react-native-heroicons/outline';

import { getLiveStation, getTrainBetweenStation } from '../Information/ERail';
import { getTrainSchedules, getStationInfo } from '../Information/Railwayapi';
// import { MinusCircleIcon } from 'react-native-heroicons/solid';

export default function Speech() {
  //use effect for first time rendering only
  const [lang, setLang] = React.useState('en');
  const [station, setStation] = React.useState("");

  const [number, onChangeNumber] = React.useState('');

  return (
    <SafeAreaView>
      <ScrollView >
        <View className="flex-row items-center mx-2 mt-2 justify-between">
          <View style={{ width: wp(70) }}>
            <DropdownComponent setStation={setStation} />
          </View>
          {/* <View className="flex-row justify-start mx-1" style={{ width: wp(30) }}> */}
          <TouchableOpacity className="p-3 rounded-xl bg-blue-500" onPress={() => {
            
           }} mode='elevated' dark={true}>
            <MicrophoneIcon size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity className="p-3 rounded-xl bg-blue-500" onPress={() => {
            setLang('mr');
          }} mode='elevated' dark={true}>
            {/* <Ionicons name="location" size={20} color="#fff"  /> */}
            <ArrowPathIcon size={20} color="#fff" />
          </TouchableOpacity>
          {/* </View> */}
        </View>
      </ScrollView>


      <View className="flex-col items-center">
        <View style={{ width: wp(70) }}>
          <DropdownComponent1 setStation={setStation} />
        </View>
        <TextInput
          className="rounded-lg"
          style={styles.input}
          onChangeText={onChangeNumber}
          value={number}
          placeholder="Give Train Number"
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    height: hp(40),
    marginTop: wp(10),
    width: wp(95),
    borderWidth: 1,
    padding: 10,
  },
});
