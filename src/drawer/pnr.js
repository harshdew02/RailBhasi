import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux'
import { setLanguage } from '../redux/languageSlice';
import CustomButton from "../components/CustomButton";


import TopBar from '../components/topBar'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PREDEFINED_LANGUAGE } from '../constants/config';
import {
  SafeAreaView,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";



export default function pnr() {
  const [lang,setLang] = React.useState('en');
  const [inputText, setInputText] = useState('');

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
  const dispatch = useDispatch();
 
  React.useEffect(() => {
    // console.log(languages);
    dispatch(setLanguage(lang));
  }, [lang])
  
 

  return (
    <SafeAreaView>
      <TopBar heading={PREDEFINED_LANGUAGE['pnr'][lang]} />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          onChangeText={(text) => setInputText(text)}
          value={inputText}
          placeholder="Enter PNR Number"
        />
        <CustomButton
          label={PREDEFINED_LANGUAGE['pnr'][lang]}
        />
      </View>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/pnr.jpg')}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  inputContainer: {
    margin: 20,
    padding: 20,
    backgroundColor: 'white',
  },
  input: {
    height: 40,
    marginBottom: 30,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
    paddingHorizontal: 10,
  },
  image: {
    width: 320,
    height: 200,
    borderColor:'black',
    borderWidth: 1,
  },
  imageContainer: {
    alignItems: 'center',
    marginTop:30,
  },
});

