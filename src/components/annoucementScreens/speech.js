import * as React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card, Button, TextInput } from 'react-native-paper';
import DropdownComponent from '../dropDrown';
import DropdownComponent1 from '../dropDrown1';

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

  const [slang, setSlang] = React.useState("en");
  const [sample, setSample] = React.useState('16000');
  const [text, setText] = React.useState('');
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
            <DropdownComponent setStation={setSlang} />
          </View>
          {/* <View className="flex-row justify-start mx-1" style={{ width: wp(30) }}> */}
          <TouchableOpacity className="p-3 rounded-xl bg-blue-500" onPress={async () => {
            //This section for recording the voice
            await start();
          }} mode='elevated' dark={true}>
            <MicrophoneIcon size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity className="p-3 rounded-xl bg-blue-500" onPress={async() => {
            //This section is for stopping the recording voice
            if (slang == 'en')
              setText(await ASROutputE(await stop(), sample))
            else
              setText(await ASROutputO(await stop(), slang, sample))
          }} mode='elevated' dark={true}>
            {/* <Ionicons name="location" size={20} color="#fff"  /> */}
            <ArrowPathIcon size={20} color="#fff" />
          </TouchableOpacity>
          {/* </View> */}
        </View>
      </ScrollView>


      <View className="flex-col items-center">
        <View style={{ width: wp(70) }}>
          <DropdownComponent1 setStation={setSample} />
        </View>
        <TextInput
          showSoftInputOnFocus={false}
          className="rounded-lg"
          style={styles.input}
          onChangeText={setText}
          value={text}
          placeholder="Output text is here"
        />
      </View>
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
