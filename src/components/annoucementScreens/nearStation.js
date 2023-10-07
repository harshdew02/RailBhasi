import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
export default function NearStation() {
  return (
    <View>
      {/* 
      <TouchableOpacity onPress={() => setActiveSort(cat.title)} key={index} className={`flex items-center rounded-3xl space-y-1 p-3 ${activeButtonClass}`} style={{ width: wp(26), height: wp(20) }} >
        <Image source={cat.image} className="rounded-3xl" style={{ width: wp(10), height: wp(10) }} />
        <Text className="text-neutral-700 font-medium" style={{ fontSize: wp(3), color: isActive ? theme.text : 'rgba(0,0,0,0.6)' }}>{cat.title}</Text>
      </TouchableOpacity> */}

      <TouchableOpacity className={`flex items-center rounded-3xl space-y-1 p-3 bg-blue-100`} style={{ width: wp(26), height: wp(20) }} >
        <Text className="text-neutral-700 font-medium" style={{ fontSize: wp(5), color:'rgba(0,0,0,0.6)' }}>Button</Text>
      </TouchableOpacity>
      <TouchableOpacity className={`flex items-center rounded-3xl space-y-1 p-3 bg-blue-100`} style={{ width: wp(26), height: wp(20) }} >
        <Text className="text-neutral-700 font-medium" style={{ fontSize: wp(5), color:'rgba(0,0,0,0.6)' }}>Button</Text>
      </TouchableOpacity>
      <TouchableOpacity className={`flex items-center rounded-3xl space-y-1 p-3 bg-blue-100`} style={{ width: wp(26), height: wp(20) }} >
        <Text className="text-neutral-700 font-medium" style={{ fontSize: wp(5), color:'rgba(0,0,0,0.6)' }}>Mic</Text>
      </TouchableOpacity>

    </View>
  )
}