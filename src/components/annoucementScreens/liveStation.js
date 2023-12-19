import * as React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card, Button } from 'react-native-paper';
import DropdownComponent from '../dropDrown';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Destinations from '../destinations';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPinIcon, MicrophoneIcon } from 'react-native-heroicons/solid';

// import { getLongitude } from '../Sensors/GPS';

import { useSelector } from 'react-redux'
import { ArrowPathIcon } from 'react-native-heroicons/outline';
import { getLiveStation, getTrainBetweenStation } from '../Information/ERail';
import { getTrainSchedules, getStationInfo } from '../Information/Railwayapi';
// import { MinusCircleIcon } from 'react-native-heroicons/solid';

export default function LiveStation() {
  //use effect for first time rendering only
  const [lang, setLang] = React.useState('en');
  const [station, setStation] = React.useState("");

  const currentLanguage = useSelector(state => state.language);
  React.useEffect(() => {
    console.log('live station', currentLanguage);
  }, [currentLanguage]);

  return (
    <SafeAreaView>
      <View className="flex-row items-center mx-2 mt-2 justify-between">
        <View style={{ width: wp(55) }}>
          <DropdownComponent setStation={setStation} />
        </View>
        {/* <View className="flex-row justify-start mx-1" style={{ width: wp(30) }}> */}
        <TouchableOpacity className="p-3 rounded-xl bg-blue-500" onPress={() => { }} mode='elevated' dark={true}>
          <MicrophoneIcon size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity className="p-3 rounded-xl bg-blue-500" onPress={async () => {
          getLongitude();
        }} mode='elevated' dark={true}>
          {/* <Ionicons name="location" size={20} color="#fff"  /> */}
          <MapPinIcon size={20} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity className="p-3 rounded-xl bg-blue-500" onPress={() => {
          setLang('mr');
        }} mode='elevated' dark={true}>
          {/* <Ionicons name="location" size={20} color="#fff"  /> */}
          <ArrowPathIcon size={20} color="#fff" />
        </TouchableOpacity>
        {/* </View> */}
      </View>
      <View>
        {/*Access the data from index.js here then pass it to the destinations using props*/}
        <Destinations language={lang} station={station} />
      </View>
    </SafeAreaView>
  )
}