import React, { useState, useEffect } from "react";
import { Dropdown } from "react-native-element-dropdown";
import {
  SafeAreaView,
  ScrollView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { PREDEFINED_LANGUAGE } from "../constants/config";

import CustomButton from "../components/CustomButton";
import { langSelection, stationListEN } from "../constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = ({ navigation }) => {
  const [states,setStates] = useState(null)
  const [station, setStation] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [lang,setLang] = React.useState('en');
  React.useEffect( () => {
     const fetchData = async () => {
      try{
        const storedLang = await AsyncStorage.getItem('lang');
        if(storedLang != null)
          setLang(storedLang);
        else
          setLang('en')
      }catch(error)
      {
        console.error('Error: ',error);
      }
     }
     fetchData();
  }, [])
  React.useEffect(()=>{
    console.log('Language changed: ', lang);
  }, [lang])

  // // Assume you have a function to fetch existing user data

  const fetchUserData = async () => {
    try {
      // Replace the following line with your actual logic to fetch existing user data
      setStation(await AsyncStorage.getItem('sns'))
      setLang(await AsyncStorage.getItem('lang'))
      setName(await AsyncStorage.getItem('fname'))
      setPhone(await AsyncStorage.getItem('phone'))
      setEmail(await AsyncStorage.getItem('email'))
      setPassword(await AsyncStorage.getItem('pass'))
    } catch (error) {
      console.error("Error fetching user data:", error);
      // Handle error fetching user data
    }
  };
  useEffect(() => {
    // Fetch existing user data when the component mounts
    fetchUserData();
  }, []);
  const signup = async () => {
    await AsyncStorage.setItem("lang", lang);
    await AsyncStorage.setItem("fname", name);
    // await AsyncStorage.setItem("sns", states);
    await AsyncStorage.setItem("phone", phone);
    // await saveData();
    alert("User updated successfully!");
  };
  return (
    <SafeAreaView style={{ flex: 1, justifyContent: "center" }}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{ paddingHorizontal: 25, paddingTop: 40 }}
      >
        <View style={{ alignItems: "center" }}>
          <Image
            source={require("../../assets/images_copy/misc/logo.png")}
            style={{
              width: wp(30),
              height: wp(30),
              borderRadius: 100,
              marginTop: wp(6),
            }}
          />
          <Text
            className={`font-roboto`}
            style={{
              // fontFamily: 'Roboto_Medium',
              fontSize: 28,
              fontWeight: "500",
              color: "#333",
              marginBottom: 20,
              marginTop: 30,
            }}
          >
           {PREDEFINED_LANGUAGE['edit_details'][lang]}
          </Text>
        </View>

        {/* <InputField
          label={'Full Name'}
          icon={
            <Ionicons
              name="person-outline"
              size={20}
              color="#666"
              style={{marginRight: 5}}
            />
          }
        /> */}
        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={langSelection}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={PREDEFINED_LANGUAGE['selectLang'][lang]}
          searchPlaceholder={PREDEFINED_LANGUAGE['search'][lang]}
          value={languages}
          onChange={(item) => {
            setLanguages(item.value);
            setLang(item.code);
          }}
          renderLeftIcon={() => (
            <Ionicons
              name="language-outline"
              size={20}
              color="#2776ff"
              style={{ marginRight: 5 }}
            />
          )}
        />

        <View style={styles.searchSection}>
          <Ionicons
            name="person-outline"
            size={20}
            color="#2776ff"
            style={{ marginRight: 5 }}
          />
          <TextInput
            style={styles.input}
            value={name}
            placeholder={PREDEFINED_LANGUAGE['fname'][lang]}
            onChangeText={(text) => {
              setName(text);
            }}
          />
        </View>

        <Dropdown
          style={styles.dropdown}
          placeholderStyle={styles.placeholderStyle}
          selectedTextStyle={styles.selectedTextStyle}
          inputSearchStyle={styles.inputSearchStyle}
          data={stationListEN}
          search
          maxHeight={300}
          labelField="label"
          valueField="value"
          placeholder={PREDEFINED_LANGUAGE['sns'][lang]}
          searchPlaceholder={PREDEFINED_LANGUAGE['search'][lang]}
          value={states}
          onChange={(item) => {
            setStation(item.code);
          }}
          renderLeftIcon={() => (
            <Ionicons
              name="home-outline"
              size={20}
              color="#2776ff"
              style={{ marginRight: 5 }}
            />
          )}
        />

        {/* <View style={styles.searchSection}>
          <Ionicons
            name="home-outline"
            size={20}
            color="#2776ff"
            style={{marginRight: 5}}
          />
          <TextInput
            style={styles.input}
            placeholder="State"
          />
        </View> */}

        {/* <View style={styles.searchSection}>
          <Ionicons
            name="language-outline"
            size={20}
            color="#2776ff"
            style={{marginRight: 5}}
          />
          <TextInput
            style={styles.input}
            placeholder="Preferred Language"
          />
        </View> */}

        <View style={styles.searchSection}>
          <Ionicons
            name="at-outline"
            size={20}
            color="#2776ff"
            style={{ marginRight: 5 }}
          />
          <TextInput
            style={styles.input}
            placeholder={PREDEFINED_LANGUAGE['email'][lang]}
            value={email}
            onChangeText={(txt) => setEmail(txt)}
          />
        </View>

        <View style={styles.searchSection}>
          <Ionicons
            name="lock-closed-outline"
            size={20}
            color="#2776ff"
            style={{ marginRight: 5 }}
          />
          <TextInput
            style={styles.input}
            placeholder={PREDEFINED_LANGUAGE['password'][lang]}
            value={password}
            secureTextEntry={true}
            onChangeText={(txt) => setPassword(txt)}
          />
        </View>

        <View style={styles.searchSection}>
          <Ionicons
            name="call-outline"
            size={20}
            color="#2776ff"
            style={{ marginRight: 5 }}
          />
          <TextInput
            style={styles.input}
            placeholder={PREDEFINED_LANGUAGE['mnum'][lang]}
            keyboardType="numeric"
            value={phone}
            onChangeText={(txt) => setPhone(txt)}
          />
        </View>

        <CustomButton
          label={PREDEFINED_LANGUAGE['save_changes'][lang]}
          onPress={
            () => signup()
            // navigation.navigate("Login");
          }
        />
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 5,
    paddingLeft: 0,
    color: "#424242",
  },
  dropdown: {
    margin: 0,
    height: 50,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
    marginBottom: 20,
  },
  icon: {
    marginRight: 5,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    color: "#424242",
  },
  selectedTextStyle: {
    fontSize: 14,
    color: "#424242",
  },
  placeholderStyle: {
    fontSize: 14,
    color: "#424242",
  },
});
export default Profile;
