import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Image,
  ScrollView,
  Linking,
  TextInput,
} from "react-native";
import React from "react";
import some from "../components/sounds/en.wav"
import TopBar from "../components/topBar";
import { PREDEFINED_LANGUAGE } from "../constants/config";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { MapPinIcon, MicrophoneIcon, PhoneIcon } from "react-native-heroicons/solid";
import { useNavigation } from "@react-navigation/native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Sound from 'react-native-sound'



const IVRScreen = () => {
  // const [customText, setCustomText] = React.useState('');
  // const [showCustomText, setShowCustomText] = React.useState(false);
  const [lang, setLang] = React.useState(null);

  const [inputText, setInputText] = React.useState('');
  const handleNumericInput = (num) => {
    setInputText(prevInput => prevInput + num);
  };

  // const handleOptionPress = (option) => {
  //   switch (option) {
  //     case '3':
  //       setCustomText('Enter your Mobile Number');
  //       setShowCustomText(true);
  //       break;
  //     default:
  //       setCustomText('');
  //       setShowCustomText(false);
  //       break;
  //   }
  // };
  const [sound, setSound] = React.useState(null);
  
  const navigation = useNavigation();
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const storedLang = await AsyncStorage.getItem("lang");
        if (storedLang != null) setLang(storedLang);
        else setLang("en");
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchData();
    setSound(new Sound("E:/Learn React/React-native/Production/RailBhasi/src/components/sounds/en.wav", Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        console.log('Error loading sound: ', error);
      }
    }))
  }, []);

  
  
  React.useEffect(() => {
    console.log("Language changed: ", lang);
  }, [lang]);
  return (
    <>
      <SafeAreaView className="flex-1 bg-white">
        <TopBar heading={PREDEFINED_LANGUAGE["IVR"][lang]} />
        <View className="flex-column items-center justify-center" style={{ height: hp(33) }}>
        <Text style={{ fontSize: 20, fontWeight: 'bold', marginTop: 200 }}>{inputText}</Text>

          {/* <ScrollView className="flex-column m-4 p-0 item-center border-black border-2 rounded bg-slate-100">
          {showCustomText && (
            <View style={{ alignItems: 'center' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', textAlign: 'center' }}>
              {customText}
            </Text>
            <View style={{ width: '80%' }}>
            <TextInput
                  style={{ borderWidth: 1, borderColor: 'gray', padding: 8, borderRadius: 5 }}
                  placeholder="Enter your input"
                  keyboardType="numeric"
                />
              </View>
            </View>
          )}
          {!showCustomText && (
          <View>
            <View className="flex-row items-center justify-center my-1 mx-2 p-0">
              <Text className="text-xl p-1 font-bold">
                Hello and welcome to RailBhasi
              </Text>
            </View>
            <View className="flex-row items-center justify-center border-blue-800 border-2 my-1 mx-2 rounded-lg p-0">
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>
                Press 1- Call the medical emergency helpline
              </Text>
            </View>
            <View className="flex-row items-center justify-center border-blue-800 border-2 my-1 mx-2 rounded-lg p-0">
              <Text className="text-base p-1 font-bold">
                Press 2 - Call the Police Helpline
              </Text>
            </View>
            <View className="flex-row items-center justify-center border-blue-800 border-2 my-1 mx-2 rounded-lg p-0">
              <Text style={{ fontSize: 16, padding: 8, fontWeight: 'bold' }}>
                Press 3 - Check the PNR Information
              </Text>
            </View>
            <View className="flex-row items-center justify-center border-blue-800 border-2 my-1 mx-2 rounded-lg p-0">
              <Text className="text-base p-1 font-bold">
                Press 4 - Get the Live station Annoucement and Station Informations
              </Text>
            </View>
            <View className="flex-row items-center justify-center border-blue-800 border-2 my-1 mx-2 rounded-lg p-0">
              <Text className="text-base p-1 font-bold">
              Press 5 - Check The Real-Time Railway Station Annoucements
              </Text>
            </View>
            <View className="flex-row items-center justify-center border-blue-800 border-2 my-1 mx-2 rounded-lg p-0">
              <Text className="text-base p-1 font-bold">
                Press 6 - Register a complaint
              </Text>
            </View>
            <View className="flex-row items-center justify-center border-blue-800 border-2 my-1 mx-2 rounded-lg p-0">
              <Text className="text-base p-1 font-bold">
                Press 7 - Check the Refund and Cancellation Status
              </Text>
            </View>
            <View className="flex-row items-center justify-center border-blue-800 border-2 my-1 mx-2 rounded-lg p-0">
              <Text className="text-base p-1 font-bold">
                Press 8 - Check Special Services for Womens and Handicapped
                peoples
              </Text>
            </View>
            <View className="flex-row items-center justify-center border-blue-800 border-2 mt-1 mb-4 mx-2 rounded-lg p-0">
              <Text className="text-base p-1 font-bold">
                Press 0 - Change Current Language
              </Text>
            </View>
          </View>
          )}
          </ScrollView> */}
        </View>
        
        <View className="flex-column items-center justify-center">
          <View className="flex-column items-center p-2 mx-2 mb-2 justify-between">
            <View className="flex-row justify-start mx-1 p-1">
            <TouchableOpacity className="p-3 mx-2 rounded-xl bg-blue-500" onPress={() => handleNumericInput('1')}>
                <Text className="text-center text-4xl text-white font-bold w-10 h-10">
                  1
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="p-3 mx-2 rounded-xl bg-blue-500" onPress={() => handleNumericInput('2')}>
                <Text className="text-center text-4xl text-white font-bold w-10 h-10">
                  2
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="p-3 mx-2 rounded-xl bg-blue-500" onPress={() => handleNumericInput('3')}>
                <Text className="text-center text-4xl text-white font-bold w-10 h-10">
                  3
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-start mx-1 p-1">
            <TouchableOpacity className="p-3 mx-2 rounded-xl bg-blue-500" onPress={() => handleNumericInput('4')}>
                <Text className="text-center text-4xl text-white font-bold w-10 h-10">
                  4
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="p-3 mx-2 rounded-xl bg-blue-500" onPress={() => handleNumericInput('5')}>
                <Text className="text-center text-4xl text-white font-bold w-10 h-10">
                  5
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="p-3 mx-2 rounded-xl bg-blue-500" onPress={() => handleNumericInput('6')}>
                <Text className="text-center text-4xl text-white font-bold w-10 h-10">
                  6
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-start mx-1 p-1">
            <TouchableOpacity className="p-3 mx-2 rounded-xl bg-blue-500" onPress={() => handleNumericInput('7')}>
                <Text className="text-center text-4xl text-white font-bold w-10 h-10">
                  7
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="p-3 mx-2 rounded-xl bg-blue-500" onPress={() => handleNumericInput('8')}>
                <Text className="text-center text-4xl text-white font-bold w-10 h-10">
                  8
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="p-3 mx-2 rounded-xl bg-blue-500" onPress={() => handleNumericInput('9')}>
                <Text className="text-center text-4xl text-white font-bold w-10 h-10">
                  9
                </Text>
              </TouchableOpacity>
            </View>
            <View className="flex-row justify-start mx-1 p-1">
            <TouchableOpacity className="p-3 mx-2 rounded-xl bg-blue-500" onPress={() => handleNumericInput('*')}>
                <Text className="text-center text-4xl text-white font-bold w-10 h-10">
                  *
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="p-3 mx-2 rounded-xl bg-blue-500" onPress={() => handleNumericInput('0')}>
                <Text className="text-center text-4xl text-white font-bold w-10 h-10">
                  0
                </Text>
              </TouchableOpacity>
              <TouchableOpacity className="p-3 mx-2 rounded-xl bg-blue-500" style={{width: wp(16) , height: wp(16)}} onPress={() => handleNumericInput('#')}>
                <Text className="text-center text-4xl text-white font-bold w-15 h-15">
                  #
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        <View className="flex-column items-center justify-center">
        <TouchableOpacity onPressIn={async ()=>{
          await sound.play((success) => {
            if (success) {
              console.log('Sound played successfully');
            } else {
              console.log('Error playing sound');
            }
          });
        }} style={{width: wp(17) , height: wp(17), borderRadius: 400, paddingTop: 18, paddingLeft:20 }} className="p-3 mx-2 bg-green-500" onPress={() => handleNumericInput('#')}>
                  <PhoneIcon size={35} color="#fff"/>
              </TouchableOpacity>
        </View>
      </SafeAreaView>
    </>
  );
};

export default IVRScreen;
