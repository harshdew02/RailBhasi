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




const XTransaction = () => {

  const [lang, setLang] = React.useState(null);
  const [dData, setDData] = React.useState([]);
  const [trainName, setTrainName] = React.useState([]);
  const currentLanguage = useSelector(state => state.language.currentLanguage);

  useEffect(() => {

    const listen = async () => {
      console.log('GPS xt : ', await getLongitude());
      const slicedData = destinationData.slice(0, destinationData.length);
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
    }
    listen();
  }, [currentLanguage])

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