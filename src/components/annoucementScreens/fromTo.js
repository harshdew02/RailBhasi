import React, { useEffect, useState } from 'react'
import {
  Pressable,
  ScrollView,
  View,
  TouchableOpacity,
  Button,
  Text,
  SafeAreaView,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  Modal
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import DropdownComponent2 from '../dropDown2';
import DropdownComponent3 from '../dropDown3';
import { MicrophoneIcon, MapPinIcon, ArrowPathIcon, MapIcon, CalendarDaysIcon } from 'react-native-heroicons/outline';
import { getTrainBetweenStation } from '../Information/ERail';
import Destinations2 from '../destinations2';
import { PREDEFINED_LANGUAGE } from '../../constants/config';
import { DestinationCard } from '../destinations2';
import { useSelector } from 'react-redux'

// Dropdown module
import DatePicker from "react-native-modern-datepicker";
import { getFormatedDate } from "react-native-modern-datepicker";



// const calpik = (onConfirm) => {
//   console.log(onConfirm)
// }


const customButton = (onConfirm) => {

  return (
    <Button
      onPress={() => {
        const selectedDate = onConfirm();

        console.log('Selected Date:', selectedDate.startDate);

      }}
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
  // const [selectedDate, setDate] = React.useState('14-12-2023');
  const [cardData, setCardData] = React.useState();
  const [station, setStation] = React.useState("");
  const [lang, setLang] = React.useState('en');

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

  // useEffect(() => {
  //   console.log(fromStation, toStation, selectedDate);
  //   const listen = async () => {
  //     if (fromStation && toStation && selectedDate) {
  //       let data = await getTrainBetweenStation(fromStation, toStation, selectedDate);
  //       setCardData(data);
  //       console.log(cardData);
  //     }
  //   }
  //   listen();

  // }, [fromStation, toStation, selectedDate])


  const [openStartDatePicker, setOpenStartDatePicker] = useState(false);
  const today = new Date();
  const startDate = getFormatedDate(
    today.setDate(today.getDate() + 1),
    "YYYY/MM/DD"
  );
  const [selectedStartDate, setSelectedStartDate] = useState("2023/12/19");
  const [startedDate, setStartedDate] = useState("12/12/2023");

  function handleChangeStartDate(propDate) {
    setStartedDate(propDate);
  }

  const handleOnPressStartDate = () => {
    setOpenStartDatePicker(!openStartDatePicker);
  };


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
      {/* <Pressable
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

        onPress={() => setOpen(true)}
      >
        <CalendarDaysIcon size={20} color="black" /> */}
        {/* <DatePicker
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
          mode="single"
        /> */}

        {/* <DatePickerModal
          locale="en"
          mode="single"
          visible={open}
          onDismiss={onDismissSingle}
          date={date}
          onConfirm={onConfirmSingle}
        />
        {date}
      </Pressable> */}

      {/* <TouchableOpacity onPress={() => setOpen(true)} uppercase={false} mode="outlined">
        <Text>Pick single date</Text>
      </TouchableOpacity>
      <DatePickerModal
        locale="en"
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        date={date}
        onConfirm={onConfirmSingle}
      /> */}


      <KeyboardAvoidingView
        behavior={Platform.OS == "ios" ? "padding" : ""}
        style={{
          width: wp(80),
          height: hp(6)
          // backgroundColor: '#fff',
        }}
      >
        <View style={{ flex: 1, alignItems: "center"}}>
            <View>
              <TouchableOpacity
                style={styles.inputBtn}
                onPress={handleOnPressStartDate}
                
              >
                <View className="flex-row justify-between items-center" style={{width: wp(30)}}>
                <CalendarDaysIcon size={20} color="black" />
                <Text className="text-lg ml-2">{selectedStartDate}</Text>
                </View>
                
              </TouchableOpacity>
            </View>

          {/* Create modal for date picker */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={openStartDatePicker}
          >
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <DatePicker
                  mode="calendar"
                  minimumDate={startDate}
                  selected={startedDate}
                  onDateChanged={handleChangeStartDate}
                  onSelectedChange={(date) => setSelectedStartDate(date)}
                  options={{
                    backgroundColor: "#080516",
                    textHeaderColor: "#469ab6",
                    textDefaultColor: "#FFFFFF",
                    selectedTextColor: "#FFF",
                    mainColor: "#469ab6",
                    textSecondaryColor: "#FFFFFF",
                    borderColor: "rgba(122, 146, 165, 0.1)",
                  }}
                />

                <TouchableOpacity onPress={handleOnPressStartDate}>
                  <Text style={{ color: "white" }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal>
          
        </View>
      </KeyboardAvoidingView>


      <ScrollView className="mx-0 mt-2 px-2"
        style={{ height: hp(68), width: wp(100) }}>
        {/* <Destinations2 /> */}
        {cardData?.map(ele => <DestinationCard key={ele.train_base.train_no} cardData={ele.train_base} navigation={navigation} />)}

      </ScrollView>
    </SafeAreaView>
  )
}


const styles = StyleSheet.create({
  textHeader: {
    fontSize: 36,
    marginVertical: 60,
    color: "#111",
  },
  textSubHeader: {
    fontSize: 25,
    color: "#111",
  },
  inputBtn: {
    borderRadius: 12,
    backgroundColor: 'white',
    borderColor: "#222",
    height: 50,
    width: wp(78),
    paddingLeft:12,
    fontSize: 18,
    justifyContent: "center",
    marginTop: 2,
    marginLeft: 18,
    paddingBottom: 2
  },
  submitBtn: {
    backgroundColor: "#342342",
    paddingVertical: 22,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    paddingVertical: 12,
    marginVertical: 16,
  },
  centeredView: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  modalView: {
    margin: 20,
    backgroundColor: "#080516",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    padding: 35,
    width: "90%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});