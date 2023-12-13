import React, { useState , useEffect} from "react";
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

import CustomButton from "../components/CustomButton";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebase.config";
import { langSelection, stationListEN } from "../constants";

const Profile = ({ navigation }) => {
  const [states, setStates] = useState(null);
  const [station, setStation] = useState(null);
  const [lang, setLang] = useState(null);
  const [name, setName] = useState(null);
  const [phone, setPhone] = useState(null);
  const [languages, setLanguages] = useState(null);
  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  {/* // Assume you have a function to fetch existing user data
  // const fetchUserData = async () => {
  //   try {
  //     // Replace the following line with your actual logic to fetch existing user data
  //     const userData = await fetchUserDataFromAPI(); // Example function to fetch data

  //     setStates(userData.states || "");
  //     setStation(userData.station || "");
  //     setLang(userData.lang || "");
  //     setName(userData.name || "");
  //     setPhone(userData.phone || "");
  //     setLanguages(userData.languages || "");
  //     setEmail(userData.email || "");
  //     setPassword(userData.password || "");
  //   } catch (error) {
  //     console.error("Error fetching user data:", error);
  //     // Handle error fetching user data
  //   }
  // };
  // useEffect(() => {
  //   // Fetch existing user data when the component mounts
  //   fetchUserData();
// }, []); */}
  const signup = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log(station, lang, phone);
        alert("User created successfully!");
        navigation.replace("Login");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage);
      });
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
            Edit Details
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
            placeholder="Full Name"
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
          placeholder="Select nearest station"
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
            placeholder="Email"
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
            placeholder="Password"
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
            placeholder="Mobile Number"
            keyboardType="numeric"
            value={phone}
            onChangeText={(txt) => setPhone(txt)}
          />
        </View>

        <CustomButton
          label={"Save Change"}
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
