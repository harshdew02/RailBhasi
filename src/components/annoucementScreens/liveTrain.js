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
import { getTranslation } from '../ASRComponents/NMTv2';
import Sound from "react-native-sound";
import fs, { stat } from "react-native-fs";
import { useSelector } from 'react-redux';
import { getAudio } from '../ASRComponents/TTS';
import SmsAndroid from 'react-native-get-sms-android';

export default function LiveTrain() {
  const [trainSchedule, setTrainSchedule] = useState(null);
  const [boarding, setBoarding] = useState();
  const currentLanguage = useSelector(state => state.language.currentLanguage);
  const [liveText, setLiveText] = useState("");

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
    if (number.length) {
      let data = [
        {
          "srNo": "1",
          "stationId": 35,
          "stationName": "MGR Chennai Central",
          "stationCode": "MAS",
          "arrivalTime": null,
          "departureTime": "07:10",
          "distance": "0.0",
          "haltTime": null,
          "dayCount": 1,
          "platform": "2A",
          "boardingDisabled": false,
          "speed": "0.0"
        },
        {
          "srNo": "2",
          "stationId": 36,
          "stationName": "Katpadi Junction",
          "stationCode": "KPD",
          "arrivalTime": "08:48",
          "departureTime": "08:50",
          "distance": "129.6",
          "haltTime": "00:02",
          "dayCount": 1,
          "platform": "1",
          "boardingDisabled": false,
          "speed": "79.3"
        },
        {
          "srNo": "3",
          "stationId": 37,
          "stationName": "Jolarpettai Junction",
          "stationCode": "JTJ",
          "arrivalTime": "09:58",
          "departureTime": "10:00",
          "distance": "214.1",
          "haltTime": "00:02",
          "dayCount": 1,
          "platform": "1",
          "boardingDisabled": false,
          "speed": "74.6"
        },
        {
          "srNo": "4",
          "stationId": 38,
          "stationName": "Salem Junction",
          "stationCode": "SA",
          "arrivalTime": "11:28",
          "departureTime": "11:30",
          "distance": "334.5",
          "haltTime": "00:02",
          "dayCount": 1,
          "platform": "1",
          "boardingDisabled": false,
          "speed": "82.1"
        },
        {
          "srNo": "5",
          "stationId": 39,
          "stationName": "Erode Junction",
          "stationCode": "ED",
          "arrivalTime": "12:22",
          "departureTime": "12:25",
          "distance": "394.2",
          "haltTime": "00:03",
          "dayCount": 1,
          "platform": "2",
          "boardingDisabled": false,
          "speed": "68.9"
        },
        {
          "srNo": "6",
          "stationId": 40,
          "stationName": "Tiruppur",
          "stationCode": "TUP",
          "arrivalTime": "13:08",
          "departureTime": "13:10",
          "distance": "444.5",
          "haltTime": "00:02",
          "dayCount": 1,
          "platform": "1",
          "boardingDisabled": false,
          "speed": "70.2"
        },
        {
          "srNo": "7",
          "stationId": 41,
          "stationName": "Coimbatore Junction",
          "stationCode": "CBE",
          "arrivalTime": "14:15",
          "departureTime": null,
          "distance": "495.0",
          "haltTime": null,
          "dayCount": 1,
          "platform": "4",
          "boardingDisabled": false,
          "speed": "46.6"
        }
      ]
      setTrainSchedule(null);
      setTimeout(() => {
        // let currentDate = new Date();
        // let time = '0' + currentDate.getHours() + ":" + currentDate.getMinutes();
        let time = '09:00';
        console.log('now : ', time);
        // setTrainSchedule(data.filter((ele) => ele.arrivalTime >= time));
        const newData = data.filter(ele => {
          // console.log(ele.arrivalTime, ' ', time, ' ', time >= ele.arrivalTime);
          return ele.arrivalTime >= time
        });
        // console.log('newData ', newData)
        setTrainSchedule(newData);
      }, 100)
      // console.log(`(liveTrain.js) ${number} schedule `, trainSchedule);
    }
  }


  const handleAnnouncement = async () => {
    const message = [
      "Attention dear passenger! Train number 12243 MAS CBE SHATABDI Express booked under mobile number 9399435543 is scheduled to arrive at the Salem Junction on 27th December 7:40 AM at platform number 5 and will reach Tiruppur Junction on 21st December 18:00.Your seat number is 22 in the B3 coach of the train.",
      "Attention dear passenger! Train number 12243 MAS CBE SHATABDI Express booked under mobile number 9399435543 scheduled to depart from Salem Junction on 27th December at 07:10 and going to Tiruppur junction via Erode Junction has been delayed by 2 hours 30 minutes. The inconvenience caused is highly regretted.",
      "Attention dear passenger! Train number 12243 MAS CBE SHATABDI Express booked under mobile number 9399435543 departed from Salem Junction on 27th December at 7:40 AM and going to Tiruppur junction via Salem, Erode has the next stoppage as Tiruppur Junction which is 20 KM ahead with a halt of 5minutes.",
    ]

    let rndIdx = Math.abs(Math.floor(Math.random() * 3));
    let inputTT = await getTranslation(message[rndIdx], 'en', currentLanguage);
    const sendm = () => {
      SmsAndroid.autoSend(
        '9399435543',
        inputTT,
        (fail) => {
          console.log('Failed with this error: ' + fail);
        },
        (success) => {
          console.log('SMS sent successfully');
        },
      );
    }
    try {
      sendm();
    } catch (error) {
      
    }
    
    // console.log(inputTT)
    await getAudio(inputTT, currentLanguage, 'female');
    setLiveText(inputTT);

    let sound = new Sound(
      `${fs.CachesDirectoryPath}/output.wav`,
      null,
      error => {
        if (error) console.log(error);
        else {
          sound.play(() => {
            console.log('play !');
            setLiveText('');
          });
        }
      }
    );

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

        }} mode='elevated' dark={true}>
          <ArrowPathIcon size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <View className="flex-row">
        <ScrollView className="border-2 border-black h-44 m-4" style={{ width: '70%' }}><Text>{liveText}</Text></ScrollView>
        <View className="flex-row items-center justify-center mr-4">
          {/* <TouchableOpacity
            onPress={() => {}}
            className="rounded-3xl p-2 flex-row justify-center items-center bg-blue-600 w-12 h-12"
          >
            <SpeakerWaveIcon size={20} color="#fff" />
          </TouchableOpacity> */}
        </View>
      </View>
      <View className="flex-row justify-between py-2 bg-blue-900">
        <Text className="text-white ml-3">{PREDEFINED_LANGUAGE['arrival'][lang]}</Text>
        <Text className="text-white" >{PREDEFINED_LANGUAGE['station'][lang]}</Text>
        <Text className="text-white mr-6" >{PREDEFINED_LANGUAGE['departure'][lang]}</Text>
      </View>

      {/* green */}
      {trainSchedule && <Green cardData={trainSchedule[0]} handleAnnouncement={handleAnnouncement} />}
      <ScrollView>
        {(trainSchedule) && trainSchedule.map((cardData, idx) => {
          if (idx > 0 && idx < trainSchedule.length - 1)
            return <Blue key={idx} cardData={cardData} handleAnnouncement={handleAnnouncement} />
        })}

      </ScrollView>
      {trainSchedule && <Red cardData={trainSchedule[trainSchedule.length - 1]} handleAnnouncement={handleAnnouncement} />}

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

const Green = ({ cardData, handleAnnouncement}) => {
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
      <TouchableOpacity className="rounded-3xl p-2 bg-green-600" onPress={handleAnnouncement}>
        <SpeakerWaveIcon size={20} color="#fff" />
      </TouchableOpacity>
    </TouchableOpacity>
  </View>
}

const Blue = ({ cardData, handleAnnouncement }) => {
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
      <SpeakerWaveIcon size={20} color="#fff" onPress={handleAnnouncement}/>
    </TouchableOpacity>
  </TouchableOpacity>
}

const Red = ({ cardData, handleAnnouncement }) => {
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
        <SpeakerWaveIcon size={20} color="#fff" onPress={handleAnnouncement}/>
      </TouchableOpacity>
    </TouchableOpacity>
  </View>
}