import React, { useState } from "react";
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

import GoogleSVG from "../../assets/images_copy/misc/google.svg";
import FacebookSVG from "../../assets/images_copy/misc/facebook.svg";
import CustomButton from "../components/CustomButton";
import LottieView from "lottie-react-native";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { langSelection, stationListEN } from "../constants";
import { collection, addDoc, Firestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from '@react-native-firebase/firestore'
import { auth, db } from "../../firebase/firebase.config";
import { PREDEFINED_LANGUAGE } from "../constants/config";

const RegisterScreen = ({ navigation }) => {
  const [states, setStates] = useState(null);
  const [station, setStation] = useState(null);
  const [name, setName] = useState(null);
  const [lang, setLang] = useState('en');
  const [phone, setPhone] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
    React.useEffect(()=>{
      console.log('Language changed: ', lang);
    }, [lang])
  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // console.log(station, lang, phone);
        await AsyncStorage.setItem('lang',lang)
        await AsyncStorage.setItem('fname',name)
        // await AsyncStorage.setItem('sns',states)
        await AsyncStorage.setItem('email', email)
        await AsyncStorage.setItem('pass', password)
        await AsyncStorage.setItem('phone',Number.toString(phone))
        
        // await saveData();
        alert("User created successfully!");
        navigation.replace("Login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
  };
  const saveData = async () => {
    // await firestore()
    // console.log(db.toJSON())
    // const users = await firestore().collection('users').get();
    // console.log(users)
    const docRef = await addDoc(collection(db, "users"), {
      FullName: name,
      Language: lang,
      Mobile: phone,
      StationName: states,
    }).then(response => {
      console.log(response);
    }).catch(e => {
      console.log(console.log('errors:' + e));
    });
    console.log(name,lang,phone,states)
    console.log("Document written with ID: ", docRef.id);
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
            {PREDEFINED_LANGUAGE['register'][lang]}
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
          placeholder="Select Language"
          searchPlaceholder="Search..."
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
          searchPlaceholder="Search..."
          value={states}
          onChange={(item) => {
            setStates(item.value);
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
          label={PREDEFINED_LANGUAGE['register'][lang]}
          onPress={
            () => {
              signup();
            }
            // navigation.navigate("Login");
          }
        />

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-evenly",
            marginBottom: 20,
          }}
        >
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <GoogleSVG height={24} width={24} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {}}
            style={{
              borderColor: "#ddd",
              borderWidth: 2,
              borderRadius: 10,
              paddingHorizontal: 30,
              paddingVertical: 10,
            }}
          >
            <FacebookSVG height={24} width={24} />
          </TouchableOpacity>
        </View>

        <Text style={{ textAlign: "center", color: "#666", marginBottom: 30 }}>
        {PREDEFINED_LANGUAGE['register_with_email'][lang]}
        </Text>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            marginBottom: 60,
          }}
        >
          <Text>{PREDEFINED_LANGUAGE['aregistered'][lang]}</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Main")}>
            <Text style={{ color: "#2776ff", fontWeight: "700" }}> {PREDEFINED_LANGUAGE['login'][lang]}</Text>
          </TouchableOpacity>
        </View>
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
export default RegisterScreen;
