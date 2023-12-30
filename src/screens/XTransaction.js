import { View, Text, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import TopBar from '../components/topBar'
import { PREDEFINED_LANGUAGE } from '../constants/config';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DropdownComponentLive from '../components/dropDrownLive';
import { destinationData } from '../constants';
import { useSelector } from 'react-redux';
import { getTranslation } from '../components/ASRComponents/NMTv2';
import { getLongitude } from '../components/Sensors/GPS';
import { PREDEFINED_ANNOUNCEMENT } from '../constants/config';
import Sound from "react-native-sound";
import fs, { stat } from "react-native-fs";
import { getAudio } from '../components/ASRComponents/TTS';


const XTransaction = () => {

  const [lang, setLang] = React.useState(null);
  const [dData, setDData] = React.useState([]);
  const [trainName, setTrainName] = React.useState([]);
  const currentLanguage = useSelector(state => state.language.currentLanguage);

  useEffect(() => {

    const listen = async () => {
      // console.log('GPS xt : ', await getLongitude());
      const slicedData = handleTime();
      let inputTT = '';
      slicedData.forEach((ele) => {
        inputTT += ele.train;
        inputTT += '/';
      })

      inputTT = inputTT.slice(0, inputTT.length - 1);
      // console.log('inputTT xt ', inputTT);

      // language handling
      const outputTT = await getTranslation(inputTT, 'en', currentLanguage);
      // console.log('outputTT xt ', outputTT);
      setDData(slicedData);
      setTrainName(outputTT.split("/"));
      setTimeout(() => handleSound(slicedData), 2000);
    }
    listen();
  }, [currentLanguage])

  const handleTime = () => {
    let currentDate = new Date();
    console.log('now : ', currentDate);
    let time = currentDate.getHours() + ":" + currentDate.getMinutes();
    const arrData = destinationData.filter((ele) => ele.arr >= time);
    console.log('(xtrans) current time : ', time);
    console.log('(xtrans) current time : ', arrData);
    return arrData;
  }

  const handleSound = (sData) => {
    let currentDate1 = new Date();
    let currentDate2 = new Date();

    console.log('handle sound ', sData);

    sData.forEach(async (ele) => {
      console.log(ele);
      const [hour, min] = ele.arr.split(':');
      currentDate2.setHours(hour);
      currentDate2.setMinutes(min);

      const timediff = Math.abs(currentDate2 - currentDate1);
      console.log('diff ', timediff);
      // <5 minutes
      if (timediff < 300_000) {
        // console.log('less than 5 min')
        console.log('xtran ',)
      }
      // <30 minutes
      if (timediff <= 1_800_000) {
        console.log('less than 30 min')
      }
      else {
        console.log('more than 30 min')
        let inputTT = ele.from + '/' + ele.to + '/' + ele.train;
        let outputTT = await getTranslation(inputTT, 'en', currentLanguage);
        outputTT = outputTT.split("/")
        console.log(outputTT);
        console.log('xtran ', inputTT);
        console.log('xtran ', PREDEFINED_ANNOUNCEMENT[currentLanguage]['arriving'].replace("(train_no)", ele.nos).replace("(origin)", outputTT[0]).replace("(destination)", outputTT[1]).replace("(train_name)", outputTT[2]).replace("(PF)", ele.platform));
        inputTT = PREDEFINED_ANNOUNCEMENT[currentLanguage]['arriving'].replace("(train_no)", ele.nos).replace("(origin)", outputTT[0]).replace("(destination)", outputTT[1]).replace("(train_name)", outputTT[2]).replace("(PF)", ele.platform);
        await getAudio(inputTT, currentLanguage, 'female');
        

        let sound = new Sound(
          `${fs.CachesDirectoryPath}/output.wav`,
          null,
          error => {
            if (error) console.log(error);
            else {
              sound.play(() => {
                console.log('play !');
              });
            }
          }
        );
      }
    })

  }

  return (
    <SafeAreaView>
      <TopBar heading={PREDEFINED_LANGUAGE["IVR"][lang]} />
      <DropdownComponentLive />

      <View className="flex-row justify-between py-2 bg-blue-900" style={{ justifyContent: 'center', height: hp(5) }}>
        <Text style={{ width: wp(16), textAlign: 'center' }} className="text-white">Train No.</Text>
        <Text style={{ width: wp(48), textAlign: 'center' }} className="text-white" >Train Name</Text>
        <Text style={{ width: wp(16), textAlign: 'center' }} className="text-white" >Dep.</Text>
        <Text style={{ width: wp(9), textAlign: 'center' }} className="text-white" >A/D</Text>
        <Text style={{ width: wp(9), textAlign: 'center' }} className="text-white mr-1" >PF</Text>
      </View>

      {/* <View style={{ flexDirection: 'row', marginLeft: 1, marginRight: 1 }}>
        <View style={{ width: wp(16), backgroundColor: 'lightyellow', height: hp(10), justifyContent: 'center', borderWidth: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>12633</Text>
        </View>
        <View style={{ width: wp(48), backgroundColor: 'lightpink', height: hp(10), justifyContent: 'center', borderWidth: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>KANYAKUMARI EXP</Text>
        </View>
        <View style={{ width: wp(16), backgroundColor: 'lightblue', height: hp(10), justifyContent: 'center', borderWidth: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>11:20</Text>
        </View>
        <View style={{ width: wp(9), backgroundColor: 'lavender', height: hp(10), justifyContent: 'center', borderWidth: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>A</Text>
        </View>
        <View style={{ width: wp(9), backgroundColor: 'lightgreen', height: hp(10), justifyContent: 'center', borderWidth: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>2</Text>
        </View>
      </View> */}

      <ScrollView className="mx-0 mt-2 px-2"
        style={{ height: hp(68), width: wp(100) }}>
        {dData.map((cardData, idx) =>
          <View key={idx} style={{ flexDirection: 'row', marginLeft: 1, marginRight: 1 }}>
            <View style={{ width: wp(16), backgroundColor: 'lightyellow', height: hp(10), justifyContent: 'center', borderWidth: 1 }}>
              {/* <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>12633</Text> */}
              <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{cardData.nos}</Text>
            </View>
            <View style={{ width: wp(48), backgroundColor: 'lightpink', height: hp(10), justifyContent: 'center', borderWidth: 1 }}>
              {/* <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>KANYAKUMARI EXP</Text> */}
              <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{trainName[idx]}</Text>
            </View>
            <View style={{ width: wp(16), backgroundColor: 'lightblue', height: hp(10), justifyContent: 'center', borderWidth: 1 }}>
              {/* <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>11:20</Text> */}
              <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{cardData.arr}</Text>
            </View>
            <View style={{ width: wp(9), backgroundColor: 'lavender', height: hp(10), justifyContent: 'center', borderWidth: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>A</Text>
            </View>
            <View style={{ width: wp(9), backgroundColor: 'lightgreen', height: hp(10), justifyContent: 'center', borderWidth: 1 }}>
              <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>{cardData.platform}</Text>
            </View>
          </View>)
        }
      </ScrollView>


    </SafeAreaView>
  )
}

export default XTransaction