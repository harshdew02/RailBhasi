import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card, Button, TextInput } from 'react-native-paper';

import Destinations from '../destinations';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPinIcon, MicrophoneIcon } from 'react-native-heroicons/solid';
import fs from 'react-native-fs'
import Permissions from 'react-native-permissions'
import Sound from 'react-native-sound'
import AudioRecord from 'react-native-audio-record'
import { ArrowPathIcon } from 'react-native-heroicons/outline';

import { getLiveStation, getTrainBetweenStation } from '../Information/ERail';
import { getTrainSchedules, getStationInfo } from '../Information/Railwayapi';
import { ASROutputE } from '../ASRComponents/ASRWhisper';
import { ASROutputO } from '../ASRComponents/ASRConformer';
import DropdownComponentL from '../dropDrown-copy';
import { getTranslation } from '../ASRComponents/NMTv2';
import { getAudio } from '../ASRComponents/TTS';
import SmsAndroid from 'react-native-get-sms-android';
import {useSelector} from 'react-redux'

// import { MinusCircleIcon } from 'react-native-heroicons/solid';
const start = async () => {
  console.log('start record')
  // this.setState({ audioFile: '', recording: true, loaded: false })
  AudioRecord.start()
}

const stop = async () => {
  // if (!this.state.recording) return
  console.log('stop record')
  let audioFile = await AudioRecord.stop()
  let baseAudio = await fs.readFile(audioFile, 'base64')
  // console.log(baseAudio);
  return baseAudio;
}





export default function Speech() {
  //use effect for first time rendering only
  // const [lang, setLang] = React.useState('en');
  const currentLanguage = useSelector(state => state.language.currentLanguage);

  const [slang, setSlang] = React.useState("en");
  const [trans, setTrans] = React.useState('');
  const [isActive, setIsActive] = React.useState(false);
  const [isSpeakerActive, setIsSpeakerActive] = React.useState(true);
  const sendM = (message, number) => {
    SmsAndroid.autoSend(
      number,
      message,
      (fail) => {
        console.log('Failed with this error: ' + fail);
      },
      (success) => {
        console.log('SMS sent successfully');
      },
    );
  }

  // sendM(trans, '');
  // sendM(trans, '');

  const handleCurrnetSound = async () => {
    // await getAudio(trans, 'ta', 'female');
    await getAudio(trans, currentLanguage, 'female');
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
  // const [AudioRecord, setAudio]
  React.useEffect(() => {
    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: 'test.wav',
    }
    AudioRecord.init(options)
  }, [])

  return (
    <SafeAreaView>
      <ScrollView >
        <View className="flex-row items-center mx-2 mt-2 justify-between">
          <View style={{ width: wp(70) }}>
            <DropdownComponentL setStation={setSlang} />
          </View>
          {/* <View className="flex-row justify-start mx-1" style={{ width: wp(30) }}> */}
          <TouchableOpacity className={`p-3 rounded-xl ${isActive ? "bg-red-500" : "bg-blue-500"}`} disabled={isActive} onPress={async () => {
            //This section for recording the voice
            setIsSpeakerActive(true);
            await start();
            setIsActive(!isActive);
          }} mode='elevated' dark={true}>
            <MicrophoneIcon size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity className={`p-3 rounded-xl ${!isActive ? "bg-red-500" : "bg-blue-500"}`} disabled={!isActive} onPress={async () => {
            //This section is for stopping the recording voice

            let inputText;
            if (slang == 'en')
              inputText = await ASROutputE(await stop(), '8000')
            else
              inputText = await ASROutputO(await stop(), slang, '8000')
            // setText(inputText);
            // setTrans(await getTranslation(inputText, 'en', 'ta'));
            let inn = await getTranslation(inputText, 'en', 'ta')
            setTrans(inn);
            // sendM(inn, '6207756328');
            // sendM(inputText, '9399435543');
            setIsActive(!isActive);
            setIsSpeakerActive(false);
          }} mode='elevated' dark={true}>
            {/* <Ionicons name="location" size={20} color="#fff"  /> */}
            <ArrowPathIcon size={20} color="#fff" />
          </TouchableOpacity>
          {/* </View> */}
        </View>
      </ScrollView>


      <View className="flex-col items-center">
        <TextInput
          showSoftInputOnFocus={false}
          className="rounded-lg"
          style={styles.input}
          onChangeText={setTrans}
          value={trans}
          placeholder="Output text is here"
        />
      </View>

      <TouchableOpacity className={`p-3 mt-4 rounded-xl ${isSpeakerActive ? "bg-red-500" : "bg-blue-500"}`} mode='elevated' disabled={isSpeakerActive} onPress={async () => {
        await handleCurrnetSound();
      }} dark={true}>
        <Text className="text-white">Speaker</Text>
      </TouchableOpacity>
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
