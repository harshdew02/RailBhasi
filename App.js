import 'react-native-gesture-handler';
import AppNavigation from './src/navigation';

// import TabNavigation from './src/screens/'
import React, {useState} from 'react';
{/* <StatusBar
animated={true}
backgroundColor="#61dafb"
barStyle={statusBarStyle}
showHideTransition={statusBarTransition}
hidden={hidden}
/> */}

// const hidden = true;

export default function App() {
  return (
    <>
    {/* <StatusBar
        backgroundColor="#16247d"
      /> */}
        <AppNavigation />
    </>
  );
}