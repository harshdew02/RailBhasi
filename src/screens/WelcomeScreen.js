import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  PermissionsAndroid,
  Alert,
  Linking,
} from "react-native";
import React from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { theme } from "../theme";
import AsyncStorage from "@react-native-async-storage/async-storage";
// import { nativeViewGestureHandlerProps } from "react-native-gesture-handler/lib/typescript/handlers/NativeViewGestureHandler";

const requestFilePermission = async (navigation) => {
  try {
    let overall = [false, true, true];
    await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
    ).then(async (value) => {
      if (!value) {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO
        );
        if (granted == PermissionsAndroid.RESULTS.GRANTED) {
          overall[0] = true;
        } else {
          overall[0] = false;
        }
      } else overall[0] = true;
    });

    if (((overall[0] == overall[1]) == overall[2]) == true)
    {
      let result = await AsyncStorage.getItem('byPass',(data)=>{
        console.log(data);
      })
      if(result == null || result == undefined || result != 'true'){
        navigation.navigate("Login");
      }
      else 
        navigation.navigate('Main');
    }
    
    else {
      if (overall[0] == false) {
        Alert.alert(
          "Permission Denied",
          `Permission for microphone denied, we need this permission for voice recognition`,
          [
            {
              text: "OK",
              onPress: () => {
                Linking.openSettings();
              },
            },
            {
              text: 'Cancel',
              style: 'cancel',
            },
          ]
        );
      }
    }
  } catch (err) {
    console.log(err);
    return false;
  }
};

export default function WelcomeScreen() {
  const navigation = useNavigation();
  return (
    <View className="flex-1 flex justify-end">
      {/* <StatusBar
      hidden={true}
      /> */}

      {/* background image */}
      <Image
        source={require("../../assets/images/welcome.png")}
        className="h-full w-full absolute"
      />

      {/* content & gradient */}
      <View className="p-5 pb-10 space-y-8">
        <LinearGradient
          colors={["transparent", "rgba(3,105,161,0.8)"]}
          style={{ width: wp(100), height: hp(60) }}
          start={{ x: 0.5, y: 0 }}
          end={{ x: 0.5, y: 1 }}
          className="absolute bottom-0"
        />
        <View className="space-y-3">
          <Text
            className="text-white font-bold text-5xl"
            style={{ fontSize: wp(10) }}
          >
            Traveling made easy!
          </Text>
          <Text
            className="text-neutral-200 font-medium"
            style={{ fontSize: wp(4) }}
          >
            Empowering Cultural Diversity in Indian Railways Through Language
            Inclusivity
          </Text>
        </View>
        <TouchableOpacity
          onPress={() => {
            requestFilePermission(navigation);
          }}
          style={{ backgroundColor: theme.bg(1) }}
          className="mx-auto p-3 px-12 rounded-full"
        >
          <Text className="text-white font-bold" style={{ fontSize: wp(5.5) }}>
            Let's go!
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
