import * as React from 'react';
import { View, Text, TouchableOpacity, ScrollView, Image } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import DropdownComponent from '../dropDrown';

import Stations from '../stations';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPinIcon, MicrophoneIcon } from 'react-native-heroicons/solid';
import { getLongitude } from '../Sensors/GPS';
import { getStationInfo } from '../Information/Railwayapi';

export default function StationInfo() {
  //use effect for first time rendering only
  const [lang, setLang] = React.useState('en');
  const [station, setStation] = React.useState("");
  const [cardData, setCardData] = React.useState("");
  const selectedLanguage = useSelector(state => state.language.currentLanguage);

  useEffect(() => {
    const listen = async () => {
      if (station) {
        console.log("station", station);
        let apiData = await getStationInfo(station);
        console.log("station data", apiData.data[0]);
        setCardData(apiData.data[0]);
      }
    }
    listen();

  }, [station])

  return (
    <SafeAreaView>
      <View className="flex-row items-center mx-2 mt-2 justify-between">
        <View style={{ width: wp(70) }}>
          <DropdownComponent setStation={setStation} />
        </View>
        <View className="flex-row justify-start mx-1" style={{ width: wp(30) }}>
          <TouchableOpacity className="p-3 mr-1 rounded-xl bg-blue-500" onPress={() => { }} mode='elevated' dark={true}>
            {/* <FontAwesome name="microphone" size={20} color="#fff" /> */}
            <MicrophoneIcon size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity className="p-3 rounded-xl bg-blue-500" onPress={() => {
            // setLang('mr');
            getLongitude();
          }} mode='elevated' dark={true}>
            {/* <Ionicons name="location" size={20} color="#fff"  /> */}
            <MapPinIcon size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <View className="p-2">
          {/* <Image source={require("../../../assets/images/stationinfo.jpg")} className="w-full h-2/6 m-2 p-2"/> */}
        </View>
        {/*Access the datas from index.js here then pass it to the destinations using props*/}
        <Stations style={{ marginTop: -400 }} language={lang} stationData={cardData} />
      </View>
    </SafeAreaView>
  )
}