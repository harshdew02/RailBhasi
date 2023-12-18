import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import * as React from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { useDispatch } from 'react-redux'
import { setLanguage } from '../redux/languageSlice';

import TopBar from '../components/topBar'
import { LanguageIcon } from 'react-native-heroicons/outline';
import { langSelection } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { PREDEFINED_LANGUAGE } from '../constants/config';



export default function SelectLang() {
  const [lang, setLang] = React.useState('en');
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const storedLang = await AsyncStorage.getItem('lang');
        if (storedLang != null)
          setLang(storedLang);
        else
          setLang('en')
      } catch (error) {
        console.error('Error: ', error);
      }
    }
    fetchData();
  }, [])


  const dispatch = useDispatch();
  // React.useEffect(() => {
  //   console.log('Language changed: ', lang);
  //   // dispatch(setLanguage(lang));
  // }, [lang])

  return (
    <SafeAreaView>
      <TopBar heading={PREDEFINED_LANGUAGE['selectLang'][lang]} />

      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={langSelection}
        search
        maxHeight={800}
        labelField="label"
        activeColor="#ADD8E6"
        valueField="code"
        placeholder={PREDEFINED_LANGUAGE['selectLang'][lang]}
        searchPlaceholder={PREDEFINED_LANGUAGE['search'][lang]}
        value={lang}
        onChange={(item) => {
          setLang(item.code);
          dispatch(setLanguage(item.code));
        }}
        renderLeftIcon={() => (
          <LanguageIcon
            name="language-outline"
            size={20}
            color="#2776ff"
            style={{ marginRight: 5 }}
          />
        )}
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  dropdown: {
    margin: 2,
    marginLeft: 8,
    marginRight: 8,
    height: 60,
    borderBottomColor: 'blue',
    borderBottomWidth: 2,
    marginBottom: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 14,
    color: '#424242'
  },
  selectedTextStyle: {
    fontSize: 18,
    color: '#424242'
  },
  placeholderStyle: {
    fontSize: 14,
    color: '#424242'
  },
});