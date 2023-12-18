import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import TopBar from '../components/topBar'
import { PREDEFINED_LANGUAGE } from '../constants/config';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import DropdownComponentLive from '../components/dropDrownLive';




const XTransaction = () => {

  const [lang, setLang] = React.useState(null);

  return (
    <SafeAreaView>

      <DropdownComponentLive/>

      <View className="flex-row justify-between py-2 bg-blue-900" style={{justifyContent: 'center' , height: hp(5)}}>
        <Text style={{ width: wp(16) , textAlign: 'center' }} className="text-white">Train No.</Text>
        <Text style={{ width: wp(48) , textAlign: 'center' }} className="text-white" >Train Name</Text>
        <Text style={{ width: wp(16) , textAlign: 'center' }} className="text-white" >Dep.</Text>
        <Text style={{ width: wp(9) , textAlign: 'center' }} className="text-white" >A/D</Text>
        <Text style={{ width: wp(9) , textAlign: 'center' }} className="text-white mr-1" >PF</Text>
      </View>




      <View style={{ flexDirection: 'row' , marginLeft: 1 , marginRight:1 }}>
        <View style={{ width: wp(16), backgroundColor: 'lightyellow' , height: hp(10) ,  justifyContent: 'center', borderWidth: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>12633</Text>
        </View>
        <View style={{ width: wp(48), backgroundColor: 'lightpink',  height: hp(10) ,  justifyContent: 'center', borderWidth: 1  }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>KANYAKUMARI EXP</Text>
        </View>
        <View style={{ width: wp(16) , backgroundColor: 'lightblue' ,  height: hp(10) ,  justifyContent: 'center', borderWidth: 1 }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>11:20</Text>
        </View>
        <View style={{ width: wp(9), backgroundColor: 'lavender' ,  height: hp(10) ,  justifyContent: 'center', borderWidth: 1  }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>A</Text>
        </View>
        <View style={{ width: wp(9), backgroundColor: 'lightgreen' ,  height: hp(10) ,  justifyContent: 'center', borderWidth: 1  }}>
          <Text style={{ fontSize: 16, fontWeight: 'bold', textAlign: 'center' }}>2</Text>
        </View>
      </View>


    </SafeAreaView>
  )
}

export default XTransaction