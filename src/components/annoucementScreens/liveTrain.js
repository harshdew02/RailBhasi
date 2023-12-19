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
  const [trainSchedule, setTrainSchedule] = useState(null);

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

  const handleSchedule = async () => {
    setTrainSchedule([]);
    if (number.length) {

      // time date 
      // let currentDate = new Date();
      // let cDay = currentDate.getDate()
      // let cMonth = currentDate.getMonth() + 1
      // let cYear = currentDate.getFullYear()
      // let time = currentDate.getHours() + ":" + currentDate.getMinutes() + ":" + currentDate.getSeconds();
      // console.log(cDay);
      // console.log(cMonth);
      // console.log(cYear)
      // console.log(time);
      // time date 
      // const data = await getTrainSchedules(number);
      const data = [{ "arrivalTime": null, "boardingDisabled": false, "dayCount": 1, "departureTime": "20:30", "distance": "0.0", "haltTime": null, "platform": "1", "speed": "0.0", "srNo": "1", "stationCode": "RJPB", "stationId": 850, "stationName": "Rajendra Nagar Terminal" }, { "arrivalTime": "20:42", "boardingDisabled": false, "dayCount": 1, "departureTime": "20:46", "distance": "7.3", "haltTime": "00:04", "platform": "1", "speed": "36.5", "srNo": "2", "stationCode": "PNC", "stationId": 331, "stationName": "Patna Saheb" }, { "arrivalTime": "20:53", "boardingDisabled": false, "dayCount": 1, "departureTime": "20:55", "distance": "19.2", "haltTime": "00:02", "platform": "2", "speed": "102.0", "srNo": "3", "stationCode": "FUT", "stationId": 596, "stationName": "Fatuha Junction" }, { "arrivalTime": "21:03", "boardingDisabled": false, "dayCount": 1, "departureTime": "21:05", "distance": "27.9", "haltTime": "00:02", "platform": "1", "speed": "65.3", "srNo": "4", "stationCode": "KOO", "stationId": 1154, "stationName": "Khusropur" }, { "arrivalTime": "21:21", "boardingDisabled": false, "dayCount": 1, "departureTime": "21:23", "distance": "42.8", "haltTime": "00:02", "platform": "1", "speed": "55.9", "srNo": "5", "stationCode": "BKP", "stationId": 595, "stationName": "Bakhtiyarpur Junction" }, { "arrivalTime": "21:33", "boardingDisabled": false, "dayCount": 1, "departureTime": "21:35", "distance": "60.8", "haltTime": "00:02", "platform": "1", "speed": "108.0", "srNo": "6", "stationCode": "BARH", "stationId": 594, "stationName": "Barh" }, { "arrivalTime": "22:10", "boardingDisabled": false, "dayCount": 1, "departureTime": "22:15", "distance": "86.6", "haltTime": "00:05", "platform": "1", "speed": "44.2", "srNo": "7", "stationCode": "MKA", "stationId": 330, "stationName": "Mokama" }, { "arrivalTime": "22:21", "boardingDisabled": false, "dayCount": 1, "departureTime": "22:23", "distance": "94.7", "haltTime": "00:02", "platform": "1", "speed": "81.0", "srNo": "8", "stationCode": "HTZ", "stationId": 593, "stationName": "Hathidah Junction" }, { "arrivalTime": "22:32", "boardingDisabled": false, "dayCount": 1, "departureTime": "22:34", "distance": "104.3", "haltTime": "00:02", "platform": "1", "speed": "64.0", "srNo": "9", "stationCode": "BRYA", "stationId": 592, "stationName": "Barhiya" }, { "arrivalTime": "22:48", "boardingDisabled": false, "dayCount": 1, "departureTime": "22:50", "distance": "119.5", "haltTime": "00:02", "platform": "2", "speed": "65.1", "srNo": "10", "stationCode": "LKR", "stationId": 591, "stationName": "Luckeesarai Junction" }, { "arrivalTime": "23:00", "boardingDisabled": false, "dayCount": 1, "departureTime": "23:05", "distance": "120.7", "haltTime": "00:05", "platform": "5", "speed": "7.2", "srNo": "11", "stationCode": "KIUL", "stationId": 329, "stationName": "Kiul Junction" }, { "arrivalTime": "23:26", "boardingDisabled": false, "dayCount": 1, "departureTime": "23:28", "distance": "148.1", "haltTime": "00:02", "platform": "2", "speed": "78.3", "srNo": "12", "stationCode": "JMU", "stationId": 589, "stationName": "Jamui" }, { "arrivalTime": "00:35", "boardingDisabled": false, "dayCount": 2, "departureTime": "00:40", "distance": "174.2", "haltTime": "00:05", "platform": "2", "speed": "23.4", "srNo": "13", "stationCode": "JAJ", "stationId": 328, "stationName": "Jhajha" }, { "arrivalTime": "01:12", "boardingDisabled": false, "dayCount": 2, "departureTime": "01:17", "distance": "218.2", "haltTime": "00:05", "platform": "1", "speed": "82.5", "srNo": "14", "stationCode": "JSME", "stationId": 327, "stationName": "Jasidih Junction" }, { "arrivalTime": "01:42", "boardingDisabled": false, "dayCount": 2, "departureTime": "01:46", "distance": "247.2", "haltTime": "00:04", "platform": "3", "speed": "69.6", "srNo": "15", "stationCode": "MDP", "stationId": 326, "stationName": "Madhupur Junction" }, { "arrivalTime": "02:33", "boardingDisabled": false, "dayCount": 2, "departureTime": "02:35", "distance": "303.6", "haltTime": "00:02", "platform": "2", "speed": "72.0", "srNo": "16", "stationCode": "CRJ", "stationId": 583, "stationName": "Chittaranjan" }, { "arrivalTime": "03:25", "boardingDisabled": false, "dayCount": 2, "departureTime": "03:45", "distance": "328.8", "haltTime": "00:20", "platform": "5", "speed": "30.2", "srNo": "17", "stationCode": "ASN", "stationId": 7, "stationName": "Asansol Junction" }, { "arrivalTime": "04:33", "boardingDisabled": false, "dayCount": 2, "departureTime": "04:35", "distance": "365.9", "haltTime": "00:02", "platform": "2,3", "speed": "46.4", "srNo": "18", "stationCode": "JOC", "stationId": 1462, "stationName": "Joychandi Pahar Junction" }, { "arrivalTime": "04:54", "boardingDisabled": false, "dayCount": 2, "departureTime": "04:56", "distance": "379.2", "haltTime": "00:02", "platform": null, "speed": "42.0", "srNo": "19", "stationCode": "ANR", "stationId": 1531, "stationName": "Anara" }, { "arrivalTime": "05:25", "boardingDisabled": false, "dayCount": 2, "departureTime": "05:30", "distance": "404.9", "haltTime": "00:05", "platform": "3", "speed": "53.2", "srNo": "20", "stationCode": "PRR", "stationId": 1463, "stationName": "Purulia Junction" }, { "arrivalTime": "05:58", "boardingDisabled": false, "dayCount": 2, "departureTime": "06:00", "distance": "436.7", "haltTime": "00:02", "platform": "1", "speed": "68.1", "srNo": "21", "stationCode": "BBM", "stationId": 1530, "stationName": "Barabhum" }, { "arrivalTime": "06:57", "boardingDisabled": false, "dayCount": 2, "departureTime": "06:58", "distance": "483.2", "haltTime": "00:01", "platform": "3", "speed": "48.9", "srNo": "22", "stationCode": "GMH", "stationId": 1583, "stationName": "Gamharia Junction" }, { "arrivalTime": "07:35", "boardingDisabled": false, "dayCount": 2, "departureTime": "08:05", "distance": "493.9", "haltTime": "00:30", "platform": "2,4", "speed": "17.4", "srNo": "23", "stationCode": "TATA", "stationId": 168, "stationName": "Tatanagar Junction" }, { "arrivalTime": "08:27", "boardingDisabled": false, "dayCount": 2, "departureTime": "08:28", "distance": "520.6", "haltTime": "00:01", "platform": "2", "speed": "72.8", "srNo": "24", "stationCode": "SINI", "stationId": 2033, "stationName": "Sini Junction" }, { "arrivalTime": "09:00", "boardingDisabled": false, "dayCount": 2, "departureTime": "09:05", "distance": "556.0", "haltTime": "00:05", "platform": "1", "speed": "66.4", "srNo": "25", "stationCode": "CKP", "stationId": 169, "stationName": "Chakradharpur" }, { "arrivalTime": "09:55", "boardingDisabled": false, "dayCount": 2, "departureTime": "09:57", "distance": "617.2", "haltTime": "00:02", "platform": "1", "speed": "73.4", "srNo": "26", "stationCode": "MOU", "stationId": 2029, "stationName": "Manoharpur" }, { "arrivalTime": "10:35", "boardingDisabled": false, "dayCount": 2, "departureTime": "10:50", "distance": "657.0", "haltTime": "00:15", "platform": "1", "speed": "62.8", "srNo": "27", "stationCode": "ROU", "stationId": 170, "stationName": "Rourkela Junction" }, { "arrivalTime": "11:16", "boardingDisabled": false, "dayCount": 2, "departureTime": "11:17", "distance": "686.9", "haltTime": "00:01", "platform": "1", "speed": "69.0", "srNo": "28", "stationCode": "GP", "stationId": 171, "stationName": "Rajgangpur" }, { "arrivalTime": "11:45", "boardingDisabled": false, "dayCount": 2, "departureTime": "11:47", "distance": "721.7", "haltTime": "00:02", "platform": null, "speed": "74.6", "srNo": "29", "stationCode": "BMB", "stationId": 172, "stationName": "Bamra" }, { "arrivalTime": "12:02", "boardingDisabled": false, "dayCount": 2, "departureTime": "12:04", "distance": "737.4", "haltTime": "00:02", "platform": null, "speed": "62.8", "srNo": "30", "stationCode": "BEH", "stationId": 2037, "stationName": "Bagdehi" }, { "arrivalTime": "13:10", "boardingDisabled": false, "dayCount": 2, "departureTime": "13:15", "distance": "758.2", "haltTime": "00:05", "platform": null, "speed": "18.9", "srNo": "31", "stationCode": "JSG", "stationId": 173, "stationName": "Jharsuguda Junction" }, { "arrivalTime": "13:28", "boardingDisabled": false, "dayCount": 2, "departureTime": "13:30", "distance": "769.8", "haltTime": "00:02", "platform": null, "speed": "53.5", "srNo": "32", "stationCode": "BRJN", "stationId": 174, "stationName": "Brajrajnagar" }, { "arrivalTime": "14:13", "boardingDisabled": false, "dayCount": 2, "departureTime": "14:18", "distance": "829.8", "haltTime": "00:05", "platform": "2", "speed": "83.7", "srNo": "33", "stationCode": "RIG", "stationId": 176, "stationName": "Raigarh" }, { "arrivalTime": "14:41", "boardingDisabled": false, "dayCount": 2, "departureTime": "14:43", "distance": "863.7", "haltTime": "00:02", "platform": null, "speed": "88.4", "srNo": "34", "stationCode": "KHS", "stationId": 177, "stationName": "Kharsia" }, { "arrivalTime": "14:56", "boardingDisabled": false, "dayCount": 2, "departureTime": "14:58", "distance": "879.2", "haltTime": "00:02", "platform": null, "speed": "71.5", "srNo": "35", "stationCode": "SKT", "stationId": 2013, "stationName": "Sakti" }, { "arrivalTime": "15:22", "boardingDisabled": false, "dayCount": 2, "departureTime": "15:27", "distance": "909.6", "haltTime": "00:05", "platform": null, "speed": "76.0", "srNo": "36", "stationCode": "CPH", "stationId": 179, "stationName": "Champa Junction" }, { "arrivalTime": "15:45", "boardingDisabled": false, "dayCount": 2, "departureTime": "15:47", "distance": "935.3", "haltTime": "00:02", "platform": null, "speed": "85.7", "srNo": "37", "stationCode": "AKT", "stationId": 181, "stationName": "Akaltara" }, { "arrivalTime": "17:35", "boardingDisabled": false, "dayCount": 2, "departureTime": "17:50", "distance": "962.1", "haltTime": "00:15", "platform": "4", "speed": "14.9", "srNo": "38", "stationCode": "BSP", "stationId": 182, "stationName": "Bilaspur Junction" }, { "arrivalTime": "18:28", "boardingDisabled": false, "dayCount": 2, "departureTime": "18:30", "distance": "1008.8", "haltTime": "00:02", "platform": null, "speed": "73.7", "srNo": "39", "stationCode": "BYT", "stationId": 183, "stationName": "Bhatapara" }, { "arrivalTime": "18:51", "boardingDisabled": false, "dayCount": 2, "departureTime": "18:53", "distance": "1034.9", "haltTime": "00:02", "platform": null, "speed": "74.6", "srNo": "40", "stationCode": "TLD", "stationId": 184, "stationName": "Tilda Neora" }, { "arrivalTime": "19:35", "boardingDisabled": false, "dayCount": 2, "departureTime": "19:40", "distance": "1073.0", "haltTime": "00:05", "platform": "1", "speed": "54.4", "srNo": "41", "stationCode": "R", "stationId": 185, "stationName": "Raipur Junction" }, { "arrivalTime": "20:06", "boardingDisabled": false, "dayCount": 2, "departureTime": "20:08", "distance": "1101.1", "haltTime": "00:02", "platform": "2", "speed": "64.8", "srNo": "42", "stationCode": "BPHB", "stationId": 186, "stationName": "Bhilai Power House" }, { "arrivalTime": "20:40", "boardingDisabled": false, "dayCount": 2, "departureTime": null, "distance": "1110.0", "haltTime": null, "platform": "1", "speed": "16.7", "srNo": "43", "stationCode": "DURG", "stationId": 187, "stationName": "Durg Junction" }];
      setTrainSchedule(null);
      setTimeout(() => {
        setTrainSchedule(data);

      }, 1000)
      // console.log(`(liveTrain.js) ${number} schedule `, trainSchedule);
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
      {trainSchedule && <Green cardData={trainSchedule[0]} />}
      <ScrollView>
        {(trainSchedule) && trainSchedule.map((cardData, idx) => {
          if (idx > 0 && idx < trainSchedule.length - 1)
            return <Blue key={idx} cardData={cardData} />
        })}

      </ScrollView>
      {trainSchedule && <Red cardData={trainSchedule[trainSchedule.length - 1]} />}

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

const Green = ({ cardData }) => {
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
          {/* 07:01 */}
          {cardData.arrivalTime}
        </Text>
        <ChevronDoubleDownIcon size={30} className="font-thin" color="#16247d" />
      </View>
      <View className="flex-col justify-between align-center">
        <Text className="text-[#16247d] text-[16px] font-medium" >{cardData.stationName}</Text>
        <Text className="text-[14px] font-medium">{`(${cardData.stationCode})`}</Text>
        <Text>{PREDEFINED_LANGUAGE['PF'][lang]} : {cardData.platform}</Text>
      </View>
      <Text className="font-medium text-[16px]" >
        {cardData.departureTime}
      </Text>
      <TouchableOpacity className="rounded-3xl p-2 bg-green-600" onPress={() => {
        console.log('click');
      }}>
        <SpeakerWaveIcon size={20} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  </View>
}

const Blue = ({ cardData }) => {
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
  return <TouchableOpacity pointerEvents='none' style={{ width: wp(100), height: wp(18) }} className="flex-row justify-between font-semibold bg-blue-200 items-center px-3" >
    <View style={{ width: wp(24) }} className="flex-row items-center justify-between">
      <Text className="font-medium text-[16px]">
        {/* 07:02 */}
        {cardData.arrivalTime}
      </Text>
      <ChevronDoubleDownIcon size={30} className="font-thin" color="#16247d" />
    </View>
    <View className="flex-col justify-between align-center">
      {/* <Text className="text-[#16247d] text-[16px] font-medium" >Durg Junction</Text> */}
      <Text className="text-[#16247d] text-[16px] font-medium" >{cardData.stationName}</Text>
      {/* <Text className="text-[14px] font-medium">(DURG)</Text> */}
      <Text className="text-[14px] font-medium">{`(${cardData.stationCode})`}</Text>
      <Text>{PREDEFINED_LANGUAGE['PF'][lang]} : {cardData.platform}</Text>
    </View>
    <Text className="font-medium text-[16px]" >
      {/* 07:11 */}
      {cardData.departureTime}
    </Text>
    <TouchableOpacity className="rounded-3xl p-2 bg-blue-600">
      <SpeakerWaveIcon size={20} color="#fff" />
    </TouchableOpacity>
  </TouchableOpacity>
}

const Red = ({ cardData }) => {
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
  return <View>
    <TouchableOpacity pointerEvents='none' style={{ width: wp(100), height: wp(18) }} className="flex-row justify-between font-semibold bg-red-200 items-center px-3" >
      <View style={{ width: wp(24) }} className="flex-row items-center justify-between">
        <Text className="font-medium text-[16px]">
          {cardData.arrivalTime}
        </Text>
        <ChevronDoubleDownIcon size={30} className="font-thin" color="#16247d" />
      </View>
      <View className="flex-col justify-between align-center">
        <Text className="text-[#16247d] text-[16px] font-medium" >{cardData.stationName}</Text>
        <Text className="text-[14px] font-medium">{`(${cardData.stationCode})`}</Text>
        <Text>{PREDEFINED_LANGUAGE['PF'][lang]} : {cardData.platform}</Text>
      </View>
      <Text className="font-medium text-[16px]" >
        {cardData.departureTime}
      </Text>
      <TouchableOpacity className="rounded-3xl p-2 bg-red-600">
        <SpeakerWaveIcon size={20} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  </View>
}