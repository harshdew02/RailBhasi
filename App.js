import "react-native-gesture-handler";
import AppNavigation from "./src/navigation";

// import TabNavigation from './src/screens/'
import React, { useState } from "react";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import { auth } from "./firebase/firebase.config";
{
  /* <StatusBar
animated={true}
backgroundColor="#61dafb"
barStyle={statusBarStyle}
showHideTransition={statusBarTransition}
hidden={hidden}
/> */
}

// const hidden = true;

export default function App() {
  return (
    <>
      <Provider store={store}>
        {/* <StatusBar
        backgroundColor="#16247d"
      /> */}
        <AppNavigation />
      </Provider>
    </>
  );
}
