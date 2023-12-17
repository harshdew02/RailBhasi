import React, { useEffect } from 'react'
import {
  Pressable,
  ScrollView,
  View,
  TouchableOpacity,
  Button,
  SafeAreaView,
  TextInput,
  StyleSheet
} from "react-native";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useNavigation, useRoute } from "@react-navigation/native";
import DropdownComponent2 from '../dropDown2';
import DropdownComponent3 from '../dropDown3';
import { MicrophoneIcon, MapPinIcon } from 'react-native-heroicons/outline';
import { getTranslation } from '../ASRComponents/NMTv2';


export default function Translation() {

  const [fromStation, setFromStation] = React.useState("");
  const [toStation, setToStation] = React.useState("");
  const [trans, setTrans] = React.useState("");
  const [number, onChangeNumber] = React.useState('');

  return (
    <SafeAreaView>
      <ScrollView>

        <View style={{ width: wp(100) }} className="items-center">
          <View className="flex-row items-center mx-2 mt-1 justify-between">
            <View style={{ width: wp(80) }}>
              {/* From */}
              <DropdownComponent2 setFromStation={setFromStation} />
            </View>
            <TouchableOpacity onPress={async ()=>{
              setTrans(await getTranslation(number, fromStation, toStation ))
              // console.log(fromStation, toStation, number);
            }} className="p-3 ml-1 rounded-xl bg-blue-500" mode='elevated' dark={true}>
              <MapPinIcon size={20} color="#fff" />
            </TouchableOpacity>
          </View>

          <TextInput
            className="rounded-lg"
            style={styles.input}
            onChangeText={onChangeNumber}
            value={number}
            placeholder="Give Train Number"
          />

          {/* To */}
          <View className="flex-row items-center mx-4 justify-between">
            <View className="mt-4" style={{ width: wp(80) }}>
              <DropdownComponent3 setToStation={setToStation} />
            </View>
            {/* <TouchableOpacity className="p-3 ml-2 rounded-xl bg-blue-500" mode='elevated' dark={true}>
              <MicrophoneIcon size={20} color="#fff" />
            </TouchableOpacity> */}
          </View>

          <TextInput
            showSoftInputOnFocus={false}
            className="rounded-lg"
            style={styles.input}
            onChangeText={setTrans}
            value={trans}
            placeholder="Give Train Number"
          />

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