import React, { useEffect } from 'react'
import {
  ScrollView,
  View,
  TouchableOpacity,
  Text,
  SafeAreaView,
  StyleSheet
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DropdownComponent6 from '../dropDown6';
import DropdownComponent7 from '../dropDown7';
import DropdownComponent8 from '../dropDown8';
import { MicrophoneIcon, MapPinIcon } from 'react-native-heroicons/outline';
import AudioRecord from 'react-native-audio-record';
import { ASROutputE } from '../ASRComponents/ASRWhisper';
import { ASROutputO } from '../ASRComponents/ASRConformer';
import { getTranslation } from '../ASRComponents/NMTv2';
import { getAudio } from '../ASRComponents/TTS';
import Sound from 'react-native-sound'
import fs from 'react-native-fs'

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

export default function Combined() {
  const [slang, setSlang] = React.useState("en");
  const [flang, setFlang] = React.useState("en");
  const [gender, setGender] = React.useState('male');
  const [text, setText] = React.useState('');
  const [trans, setTrans] = React.useState('');

  const handleCurrnetSound = async () => {
    await getAudio(trans, flang, gender);
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
      <ScrollView>
        <View style={{ width: wp(100) }} className="items-center">
          <View className="flex-row items-center mx-2 mt-1 justify-between">
            <View style={{ width: wp(80) }}>
              {/* From */}
              <DropdownComponent6 setFromStation={setSlang} />
            </View>
            <TouchableOpacity className="p-3 ml-1 rounded-xl bg-blue-500" mode='elevated' onPress={
              async () => {
                await start();
              }
            } dark={true}>

              <MicrophoneIcon size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          {/* To */}
          <View className="flex-row items-center mx-4 justify-between">
            <View className="mt-4" style={{ width: wp(80) }}>
              <DropdownComponent7 setToStation={setFlang} />
            </View>
            <TouchableOpacity className="p-3 ml-2 rounded-xl bg-blue-500" mode='elevated' onPress={async () => {
              console.log('Console: ', slang, flang);
              // setText(null)
              // setTrans(null)
              //This section is for stopping the recording voice
              if (slang == 'en')
                setText(await ASROutputE(await stop(), '16000'))
              else
                setText(await ASROutputO(await stop(), slang, '16000'))
              console.log(text);
              setTrans(await getTranslation(text, slang, flang))

              console.log('done')
            }} dark={true}>
              <MapPinIcon size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <View className="mt-4" style={{ width: wp(80) }}>
            <DropdownComponent8 setToStation={setGender} />
          </View>

          <TouchableOpacity className="p-3 mt-4 rounded-xl bg-blue-500" mode='elevated' onPress={() => {
            handleCurrnetSound();
          }} dark={true}>
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