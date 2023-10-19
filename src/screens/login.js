import React from 'react';
import {
  SafeAreaView,
  View,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import GoogleSVG from '../../assets/images_copy/misc/google.svg';
import FacebookSVG from '../../assets/images_copy/misc/facebook.svg';

import CustomButton from '../components/CustomButton';
import LottieView from "lottie-react-native";

const LoginScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: 'center' }}>

      <StatusBar
        backgroundColor={"#f2f2f2"}
        barStyle={"dark-content"}
        hidden={false}
      />

      <View style={{ paddingHorizontal: 25 }}>
        <View style={{ alignItems: 'center' }}>
          <Image source={require('../../assets/images_copy/misc/logo.png')}
            style={{ width: wp(40), height: wp(40), borderRadius: 100, marginBottom: 20 }}
          />
          {/* <LottieView
            source={require('../assets/images/misc/train.json')}
            autoPlay
            loop
          /> */}
          <Text
            className={`font-roboto`}
            style={{
              // fontFamily: 'Roboto-Medium',
              fontSize: 28,
              fontWeight: '500',
              color: '#333',
              marginBottom: 30,
            }}>
            Login
          </Text>
        </View>

        <View
          style={styles.searchSection}
        >
          <Ionicons
            name="at-outline"
            size={20}
            color="#2776ff"
            style={{ marginRight: 5 }}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
          />

        </View>

        <View style={{
          flexDirection: 'row',
          borderBottomColor: '#ccc',
          borderBottomWidth: 1,
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 30,
        }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Ionicons
              name="lock-closed-outline"
              size={20}
              color="#2776ff"
              style={{ marginRight: 5 }}
            />
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}

            />
          </View>
          <TouchableOpacity onPress={() => { }}>
            <Text style={{ color: '#2776ff', fontWeight: '700' }}>Forgot?</Text>
          </TouchableOpacity>
        </View>

        <CustomButton label={"Login"} onPress={() => { navigation.navigate('Main') }} />

        <Text style={{ textAlign: 'center', color: '#666', marginBottom: 20 }}>
          Or, login with ...
        </Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-evenly',
            marginBottom: 30,
          }}>
          <TouchableOpacity
            onPress={() => { }}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <GoogleSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => { }}
            style={{
              borderColor: '#ddd',
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}>
            <FacebookSVG height={24} width={24} />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginBottom: 30,
          }}>
          <Text>New to RailBhasi?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={{ color: '#2776ff', fontWeight: '700' }}> Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchSection: {
    // flex: 1,
    flexDirection: 'row',
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
    justifyContent: 'left',
    alignItems: 'center',
    marginBottom: 30,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    // flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
    color: '#424242',
  },
});

export default LoginScreen;
