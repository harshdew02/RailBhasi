import * as React from "react";
import { View, StyleSheet, Image, Text, TouchableOpacity } from "react-native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import { PREDEFINED_LANGUAGE } from "../constants/config";
import AsyncStorage from "@react-native-async-storage/async-storage";

import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";

// Drawer
import BottomTabs from "./BottomTabs";
import { Help, Profile, SelectLang, Settings, pnr } from "../drawer";
import {
  ChevronUpDownIcon,
  Cog6ToothIcon,
  HomeIcon,
  QuestionMarkCircleIcon,
  UserIcon,
} from "react-native-heroicons/outline";

export default function RightDrawer() {
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
  const Drawer = createDrawerNavigator();

  const DrawerHeaderContent = (props) => {
    return (
      <DrawerContentScrollView contentContainerStyle={{ flex: 1 }}>
        <View
          style={{
            backgroundColor: "#4f4f4f",
            height: 100,
            justifyContent: "center",
            alignItems: "center",
            top: -5,
          }}
        >
          <Text style={{ color: "#fff" }}>{PREDEFINED_LANGUAGE['home'][lang]}</Text>
        </View>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
    );
  };

  return (
    <>
      {/* bvv */}
      <Drawer.Navigator
        screenOptions={{
          headerShown: false,
          drawerStyle: {
            backgroundColor: "#fff",
          },
        }}
        drawerContent={DrawerHeaderContent}
      >
        <Drawer.Screen
          name={"BottomBar"}
          component={BottomTabs}
          options={{
            drawerLabel: `${PREDEFINED_LANGUAGE['HomeS'][lang]}`,
            drawerIcon: ({ focused, size, color }) => (
              // <MaterialCommunityIcons name="home" color={color} size={size} />
              <HomeIcon color={color} size={size} />
            ),
          }}
        />

        <Drawer.Screen
          name={"Profile"}
          component={Profile}
          options={{
            drawerLabel: `${PREDEFINED_LANGUAGE['profile'][lang]}`,
            drawerIcon: ({ focused, size, color }) => (
              // <MaterialCommunityIcons name="firewire" color={color} size={size} />
              <UserIcon color={color} size={size} />
            ),
          }}
        />

        <Drawer.Screen
          name={"PNR"}
          component={pnr}
          options={{
            drawerLabel: `${PREDEFINED_LANGUAGE['pnr'][lang]}`,
            drawerIcon: ({ focused, size, color }) => (
              // <MaterialCommunityIcons name="firewire" color={color} size={size} />
              <UserIcon color={color} size={size} />
            ),
          }}
        />

        <Drawer.Screen
          name={"SelectLang"}
          component={SelectLang}
          options={{
            drawerLabel: `${PREDEFINED_LANGUAGE['selectLang'][lang]}`,
            drawerIcon: ({ focused, size, color }) => (
              // <MaterialCommunityIcons
              //     name="location-enter"
              //     color={color}
              //     size={size}
              // />
              <ChevronUpDownIcon color={color} size={size} />
            ),
          }}
        />

        <Drawer.Screen
          name="Settings"
          component={Settings}
          options={{
            drawerLabel: `${PREDEFINED_LANGUAGE['settings'][lang]}`,
            drawerIcon: ({ focused, size, color }) => (
              // <MaterialCommunityIcons
              //     name="location-enter"
              //     color={color}
              //     size={size}
              // />
              <Cog6ToothIcon color={color} size={size} />
            ),
          }}
        />
        <Drawer.Screen
          name="Help"
          component={Help}
          options={{
            drawerLabel: `${PREDEFINED_LANGUAGE['Cus'][lang]}`,
            drawerIcon: ({ focused, size, color }) => (
              // <MaterialCommunityIcons
              //     name="location-enter"
              //     color={color}
              //     size={size}
              // />
              <QuestionMarkCircleIcon color={color} size={size} />
            ),
          }}
        />
      </Drawer.Navigator>
    </>
  );
}
