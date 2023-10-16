import * as React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card, Button } from 'react-native-paper';
import DropdownComponent from '../dropDrown';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Destinations from '../destinations';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function NearStation() {
  //use effect for first time rendering only
  const [lang, setLang] = React.useState('en');
  const [station, setStation] = React.useState("");
  return (
    <SafeAreaView>
      <View className="flex-row items-center mx-2 justify-between">
        <View style={{ width: wp(70) }}>
          <DropdownComponent  setStation={setStation}/>
        </View>
        <View className="flex-row justify-start mx-1" style={{ width: wp(30) }}>
          <TouchableOpacity className="p-3 mr-1 rounded-xl bg-blue-500" onPress={() => {  }} mode='elevated' dark={true}>
            <FontAwesome name="microphone" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity className="p-3 rounded-xl bg-blue-500"   onPress={() => {
              setLang('hi');
           }} mode='elevated' dark={true}>
            <Ionicons name="location" size={20} color="#fff"  />
          </TouchableOpacity>
        </View>
      </View>
      <View>
         {/*Access the data from index.js here then pass it to the destinations using props*/}
        <Destinations language = {lang} station={station} />
      </View>
      <TouchableOpacity className={`flex items-center rounded-3xl space-y-1 p-3 bg-blue-100`} style={{ width: wp(26), height: wp(20) }} >
        <Text className="text-neutral-700 font-medium" style={{ fontSize: wp(5), color: 'rgba(0,0,0,0.6)' }}>Mic</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}