import React, { useEffect } from 'react'
import {
  Pressable,
  ScrollView,
  View,
  TouchableOpacity,
  Button,
  SafeAreaView
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation, useRoute } from "@react-navigation/native";
import DatePicker from "react-native-date-ranges";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropdownComponent2 from '../dropDown2';
import DropdownComponent3 from '../dropDown3';
import { MicrophoneIcon, MapPinIcon, ArrowPathIcon, MapIcon, CalendarDaysIcon } from 'react-native-heroicons/outline';
import { getTrainBetweenStation } from '../Information/ERail';
import Destinations2 from '../destinations2';
import { PREDEFINED_LANGUAGE } from '../../constants/config';
import { DestinationCard } from '../destinations2';
import { useSelector } from 'react-redux'
import { getTranslation } from '../ASRComponents/NMTv2';

// Dropdown module

const customButton = (onConfirm) => {
  return (
    <Button
      onPress={onConfirm}
      style={{
        container: { width: "80%", marginHorizontal: "3%" },
        text: { fontSize: 20 },
      }}
      primary
      title={"Submit"}
    />
  );
};

export default function FromTo() {

  const [fromStation, setFromStation] = React.useState("");
  const [toStation, setToStation] = React.useState("");
  const [selectedDate, setDate] = React.useState('14-12-2023');
  const [cardData, setCardData] = React.useState();
  const [station, setStation] = React.useState("");
  const [lang, setLang] = React.useState('en');
  const [trainName, setTrainName] = React.useState([]);

  const currentLanguage = useSelector(state => state.language.currentLanguage);

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
  useEffect(() => {
    console.log('Language changed: ', lang);
  }, [lang])


  const navigation = useNavigation();

  useEffect(() => {
    // console.log(fromStation, toStation, selectedDate);
    const listen = async () => {
      if (fromStation && toStation && selectedDate) {
        let data = await getTrainBetweenStation(fromStation, toStation, selectedDate);
        // console.log(data);
        if (data === 'No direct trains found') {
          setCardData("NO");
          return
        }
        const slicedData = data.slice(0, 5);
        let inputTT = '';
        slicedData.forEach((ele) => {
          inputTT += ele.train_base.train_name;
          inputTT += '/';
        })

        inputTT = inputTT.slice(0, inputTT.length - 1);
        const outputTT = await getTranslation(inputTT, 'en', currentLanguage);
        // const outputTT = await getTranslation(inputTT, 'en', 'hi');

        // console.log('Output TT', outputTT);
        setTrainName(outputTT.split("/"));
        // console.log(trainName);

        setCardData(slicedData);
        // console.log(cardData);
        // console.log('inputTT', inputTT);
      }
    }
    listen();

  }, [fromStation, toStation, selectedDate, currentLanguage])



  return (
    <SafeAreaView>
      <View style={{ width: wp(100) }} className="items-center">
        <View className="flex-row items-center mx-2 mt-1 justify-between">
          <View style={{ width: wp(80) }}>
            {/* From */}
            <DropdownComponent2 setFromStation={setFromStation} />
          </View>
          <TouchableOpacity className="p-3 ml-1 rounded-xl bg-blue-500" mode='elevated' dark={true}>
            <MapPinIcon size={20} color="#fff" />
          </TouchableOpacity>
        </View>
        {/* To */}
        <View className="flex-row items-center mx-2 justify-between">
          <View style={{ width: wp(80) }}>
            <DropdownComponent3 setToStation={setToStation} />
          </View>
          <TouchableOpacity className="p-3 ml-2 rounded-xl bg-blue-500" mode='elevated' dark={true}>
            <MicrophoneIcon size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
      <Pressable
        style={{
          gap: 12,
          width: wp(80),
          height: 45,
          backgroundColor: "white",
          borderRadius: 12,
          borderColor: "red",
          borderStyle: "solid",
          padding: 12,
          shadowColor: "#000",
          shadowOffset: {
            width: 0,
            height: 1,
          },
          shadowOpacity: 0.2,
          shadowRadius: 1.41,
          elevation: 2,
        }}
        className="flex-row py-2 px-3 ml-3 mt-1 rounded-lg shadow-2xl items-center bg-white"
      >
        <CalendarDaysIcon size={20} color="black" />
        <DatePicker
          style={{
            width: 350,
            height: 30,
            borderColor: "transparent",
          }}
          customStyles={{
            placeholderText: {
              fontSize: 15,
              flexDirection: "row",
              alignItems: "center",
              marginRight: "auto",
            },
            headerStyle: {
              backgroundColor: "#003580",
            },
            contentText: {
              fontSize: 15,
              flexDirection: "row",
              alignItems: "center",
              marginRight: "auto",
            },
          }}
          selectedBgColor="#0047AB"
          customButton={(onConfirm) => customButton(onConfirm)}
          allowFontScaling={false}
          placeholder={PREDEFINED_LANGUAGE['sdate'][lang]}
        />

      </Pressable>
      <ScrollView className="mx-0 mt-2 px-2"
        style={{ height: hp(68), width: wp(100) }}>
        {/* <Destinations2 /> */}
        {(cardData != 'NO') && cardData?.map((ele, indx) => <DestinationCard key={ele.train_base.train_no} trainName={trainName[indx]} cardData={ele.train_base} navigation={navigation} />)}

      </ScrollView>
    </SafeAreaView>
  )
}