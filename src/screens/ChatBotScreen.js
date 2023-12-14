import { View, Text } from 'react-native'
import React from 'react'
import TopBar from '../components/topBar'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { PREDEFINED_LANGUAGE } from '../constants/config'

const ChatBotScreen = () => {
  const [lang,setLang] = React.useState(null);
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
  return (
    <>
      <TopBar heading={PREDEFINED_LANGUAGE['twm'][lang]} />
    </>
  )
}

export default ChatBotScreen