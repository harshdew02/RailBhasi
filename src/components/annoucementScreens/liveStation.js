import * as React from 'react';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { Card, Button } from 'react-native-paper';
import DropdownComponent from '../dropDrown';
import { Ionicons, FontAwesome } from '@expo/vector-icons';
import Destinations from '../destinations';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPinIcon, MicrophoneIcon } from 'react-native-heroicons/solid';

// import { getLongitude } from '../Sensors/GPS';

import { useSelector } from 'react-redux'
import { ArrowPathIcon } from 'react-native-heroicons/outline';
import AudioRecord from 'react-native-audio-record'
import { getLiveStation, getTrainBetweenStation } from '../Information/ERail';
import { getTrainSchedules, getStationInfo } from '../Information/Railwayapi';
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

export default function LiveStation() {
  //use effect for first time rendering only
    //use effect for first time rendering only
  // const [lang, setLang] = React.useState('en');

  const [slang, setSlang] = React.useState("en");
  const [sample, setSample] = React.useState('16000');
  const [text, setText] = React.useState('');
  const [isActive, setIsActive] = React.useState(false);
  // const [AudioRecord, setAudio]
  React.useEffect(() => {
    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: 'test.wav',
    }
    // AudioRecord.init(options)
  }, [])

  return (
    <SafeAreaView>
      <ScrollView >
        <View className="flex-row items-center mx-2 mt-2 justify-between">
          <View style={{ width: wp(70) }}>
            <DropdownComponent setStation={setSlang} />
          </View>
          {/* <View className="flex-row justify-start mx-1" style={{ width: wp(30) }}> */}
          <TouchableOpacity className={`p-3 rounded-xl ${isActive ? "bg-red-500" : "bg-blue-500"}`} disabled={isActive} onPress={async () => {
            //This section for recording the voice
            await start();
            setIsActive(!isActive);
          }} mode='elevated' dark={true}>
            <MicrophoneIcon size={20} color="#fff" />
          </TouchableOpacity>

          <TouchableOpacity className={`p-3 rounded-xl ${!isActive ? "bg-red-500" : "bg-blue-500"}`} disabled={!isActive} onPress={async () => {
            //This section is for stopping the recording voice
            if (slang == 'en')
              setText(await ASROutputE(await stop(), sample))
            else
              setText(await ASROutputO(await stop(), slang, sample))

            setIsActive(!isActive);
          }} mode='elevated' dark={true}>
            {/* <Ionicons name="location" size={20} color="#fff"  /> */}
            <ArrowPathIcon size={20} color="#fff" />
          </TouchableOpacity>
          {/* </View> */}
        </View>
      </ScrollView>


      <View className="flex-col items-center">
        <View style={{ width: wp(70) }}>
          <DropdownComponent setStation={setSample} />
        </View>
        <Text
          selectable={true}
          multiline={true}
          showSoftInputOnFocus={false}
          
          className="rounded-lg"
          style={styles.input}
          onChangeText={setText}
          value={text}
          placeholder="Output text is here"
        >{text}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    height: hp(50),
    marginTop: wp(10),
    overflow: 'visible',
    width: wp(80),
    borderWidth: 1,
    padding: 15,
    fontSize: wp(5),
  },
});
