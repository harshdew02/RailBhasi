import { View, Text } from 'react-native'
import * as React from 'react';
// import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import TopBar from '../components/topBar';
import { RadioButton, Switch } from 'react-native-paper';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function Settings() {

  const [isSwitchOn, setIsSwitchOn] = React.useState(false);
  const onToggleSwitch = () => setIsSwitchOn(!isSwitchOn);
  return (
    <SafeAreaView>
      <TopBar heading={"Setting"} />

      <View style={{ width: wp(100), height: hp(5) }} className="items-center">
        <View style={{ width: wp(70), height: hp(10)}} className="py-2 rounded-3xl font-semibold bg-slate-300 mt-1 items-center" >
          <Text className="text-black text-sm" >Give Permissions</Text>
        </View>
        <View>
          <View className="flex-col align-center">
            <View style={{ width: wp(90), height: wp(15) }} className=" rounded-xl font-semibold bg-slate-300 mt-2 items-center" >
              <Text className="text-black text-lg" >Give Permissions</Text>
              <Switch value={isSwitchOn} onValueChange={onToggleSwitch} />
            </View>
          </View>
        </View>
      </View>






    </SafeAreaView>
  )
}