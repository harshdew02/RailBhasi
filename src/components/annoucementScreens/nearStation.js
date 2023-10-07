import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Recorder } from "../Sensors/Recorder.js";
import AudioRecord from "react-native-audio-record";
import {ASROutputE} from '../ASRComponents/ASRWhisper.js';
export default function NearStation() {
  const [audioFile, setAudioFile] = useState("");
  const [recording, setRecording] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [paused, setPaued] = useState(false);

  useEffect(() => {
    const options = {
      sampleRate: 16000,
      channels: 1,
      bitsPerSample: 16,
      wavFile: "command.wav",
    };
    AudioRecord.init(options);
  }, []);

  const start = () => {
    console.log("start record");
    setAudioFile("");
    AudioRecord.start();
  };

  const stop = async () => {
    if (!recording) return;
    console.log("stop record");
    let audioFile = await AudioRecord.stop();
    let baseAudio = fs.readFile(audioFile, "base64");
    ASROutputE(baseAudio);
    console.log(baseAudio);
  };

  return (
    <View>
      {/* 
      <TouchableOpacity onPress={() => setActiveSort(cat.title)} key={index} className={`flex items-center rounded-3xl space-y-1 p-3 ${activeButtonClass}`} style={{ width: wp(26), height: wp(20) }} >
        <Image source={cat.image} className="rounded-3xl" style={{ width: wp(10), height: wp(10) }} />
        <Text className="text-neutral-700 font-medium" style={{ fontSize: wp(3), color: isActive ? theme.text : 'rgba(0,0,0,0.6)' }}>{cat.title}</Text>
      </TouchableOpacity> */}

      <TouchableOpacity
        className={`flex items-center rounded-3xl space-y-1 p-3 bg-blue-100`}
        style={{ width: wp(26), height: wp(20) }}
      >
        <Text
          className="text-neutral-700 font-medium"
          style={{ fontSize: wp(5), color: "rgba(0,0,0,0.6)" }}
        >
          Button
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        className={`flex items-center rounded-3xl space-y-1 p-3 bg-blue-100`}
        style={{ width: wp(26), height: wp(20) }}
      >
        <Text
          className="text-neutral-700 font-medium"
          style={{ fontSize: wp(5), color: "rgba(0,0,0,0.6)" }}
        >
          Button
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={!recording ? start : stop}
        className={`flex items-center rounded-3xl space-y-1 p-3 bg-blue-100`}
        style={{ width: wp(26), height: wp(20) }}
      >
        <Text
          className="text-neutral-700 font-medium"
          style={{ fontSize: wp(5), color: "rgba(0,0,0,0.6)" }}
        >
          {!recording ? "Record" : "Stop"}
        </Text>
      </TouchableOpacity>
    </View>
  );
}
