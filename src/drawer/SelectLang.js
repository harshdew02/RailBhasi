import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import * as React from 'react'
import { Dropdown } from 'react-native-element-dropdown';

import TopBar from '../components/topBar'
import { LanguageIcon } from 'react-native-heroicons/outline';
import { langSelection } from '../constants';



export default function SelectLang() {

  const [languages, setLanguages] = React.useState('hi');

  return (
    <SafeAreaView>
      <TopBar heading={"Select Your Language"} />

      <Dropdown
        style={styles. dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        data={langSelection}
        search
        maxHeight={800}
        labelField="label"
        activeColor = "#ADD8E6"
        valueField="code"
        placeholder="Select Language"
        searchPlaceholder="Search..."
        value={languages}
        onChange={item => {
          setLanguages(item.code);
        }}
        renderLeftIcon={() => (
          <LanguageIcon
          name="language-outline"
            size={20}
            color="#2776ff"
            style={{marginRight: 5}}
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
    marginBottom:20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize:14,
    color:'#424242'
  },
  selectedTextStyle: {
    fontSize: 18,
    color:'#424242'
  },
  placeholderStyle: {
    fontSize: 14,
    color:'#424242'
  },
});