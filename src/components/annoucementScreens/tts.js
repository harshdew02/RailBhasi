import React, { useEffect } from 'react'
import {
  Pressable,
  ScrollView,
  View,
  TouchableOpacity,
  Button,
  Text,
  SafeAreaView,
  TextInput,
  StyleSheet
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DropdownComponent4 from '../dropDown4';
import DropdownComponent5 from '../dropDown5';
import { getAudio } from '../ASRComponents/TTS';
import Sound from 'react-native-sound'
import fs from 'react-native-fs'

export default function TTS() {

  const [lang, setLang] = React.useState("en");
  const [gender, setGender] = React.useState("male");
  const [text, setText] = React.useState('');

  const handleCurrnetSound = async ()=> {
      await getAudio(text, lang, gender);
      let sound = new Sound(
        `${fs.CachesDirectoryPath}/output.wav`,
        null,
        error => {
          if (error) console.log(error);
          else {
            sound.play(() => {
              console.log('Sound played')
            });
          }
        }
      );
  };

  return (
    <SafeAreaView>
      <ScrollView>

        <View style={{ width: wp(100) }} className="items-center">
          <View className="flex-row items-center mx-2 mt-1 justify-between">
            <View style={{ width: wp(80) }}>
              {/* From */}
              <DropdownComponent4 setFromStation={setLang} />
            </View>
            {/* <TouchableOpacity className="p-3 ml-1 rounded-xl bg-blue-500" mode='elevated' onPress={
              async () => {
                setSound(await getAudio(text, lang, gender));
              }
            } dark={true}>
              <MapPinIcon size={20} color="#fff" />
            </TouchableOpacity> */}
          </View>

          <TextInput
            className="rounded-lg"
            style={styles.input}
            onChangeText={setText}
            value={text}
            placeholder="Please give your input text here..."
          />

          {/* To */}
          <View className="flex-row items-center mx-4 justify-between">
            <View className="mt-4" style={{ width: wp(80) }}>
              <DropdownComponent5 setToStation={setGender} />
            </View>
            {/* <TouchableOpacity className="p-3 ml-2 rounded-xl bg-blue-500" mode='elevated' dark={true}>
              <MicrophoneIcon size={20} color="#fff" />
            </TouchableOpacity> */}
          </View>

          <TouchableOpacity className="p-3 mt-4 rounded-xl bg-blue-500" onPress={
            () => {
              handleCurrnetSound()
            }
          } mode='elevated' dark={true}>
            <Text className="text-white">Speaker</Text>
          </TouchableOpacity>

        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    height: hp(20),
    marginTop: wp(2),
    width: wp(95),
    borderWidth: 1,
    padding: 10,
  },
});