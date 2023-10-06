import * as React from 'react';
import { Text, Platform, View, TouchableOpacity } from 'react-native';

// Screens
import HomeScreen from '../screens/HomeScreen';
import AnnouncementScreen from '../screens/AnnouncementScreen';
import IVRScreen from '../screens/IVRScreen';
import XTransaction from '../screens/XTransaction';
import ChatBotScreen from '../screens/ChatBotScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import DestinationScreen from '../screens/XDestinationScreen';

// Icons
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';

// Navigator
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// Style
const screenOptions = {
  tabBarShowLabel: false,
  headerShown: false,
  tabBarStyle: {
    position: "absolute",
    bottom: 0,
    right: 0,
    left: 0,
    elevation: 0,
    height: 60,
    background: "#fff"
  }
}

// Main Function
function AppNavigation() {
  const Stack = createNativeStackNavigator();
  const Tab = createBottomTabNavigator();

  function BottomTabs() {
    return (
      <Tab.Navigator initialRouteName='Home' screenOptions={screenOptions}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                // <TouchableOpacity>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <Entypo name="home" size={30} color={focused ? "#16247d" : "#9e9d9d"} />
                  <Text style={{ fontSize: 8 }} color={focused ? "#16247d" : "#9e9d9d"}>HOME</Text>
                </View>
                //  </TouchableOpacity>
              )
            }
          }}
        />

        <Tab.Screen
          name="Announcement"
          component={AnnouncementScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                // <TouchableOpacity>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  {/* <Entypo name="wallet" size={24} color={focused ? "#16247d": "#9e9d9d"} /> */}
                  <MaterialIcons name="campaign" size={30} color={focused ? "#16247d" : "#9e9d9d"} />
                  <Text style={{ fontSize: 8 }} color={focused ? "#16247d" : "#9e9d9d"}>ANNOUNCEMENT</Text>
                </View>
                //  </TouchableOpacity>
              )
            }
          }}
        />
        <Tab.Screen
          name="Transaction"
          component={XTransaction}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                // <TouchableOpacity>
                <View
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    backgroundColor: "#16247d",
                    width: Platform.OS == "ios" ? 50 : 60,
                    height: Platform.OS == "ios" ? 50 : 60,
                    top: Platform.OS == "ios" ? -10 : -20,
                    borderRadius: Platform.OS == "ios" ? 25 : 30
                  }}
                >
                  <FontAwesome name="microphone" size={30} color="#fff" />

                </View>
                //  </TouchableOpacity>
              )
            }
          }}
        />
        <Tab.Screen
          name="ChatBot"
          component={ChatBotScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                // <TouchableOpacity>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <MaterialCommunityIcons name="robot" size={30} color={focused ? "#16247d" : "#9e9d9d"} />
                  <Text style={{ fontSize: 8 }} color={focused ? "#16247d" : "#9e9d9d"}>CHAT BOT</Text>
                </View>
                //  </TouchableOpacity>
              )
            }
          }}
        />
        <Tab.Screen
          name="IVR"
          component={IVRScreen}
          options={{
            tabBarIcon: ({ focused }) => {
              return (
                // <TouchableOpacity>
                <View style={{ alignItems: "center", justifyContent: "center" }}>
                  <Ionicons name="call" size={30} color={focused ? "#16247d" : "#9e9d9d"} />
                  <Text style={{ fontSize: 8 }} color={focused ? "#16247d" : "#9e9d9d"}>IVR</Text>
                </View>
                //  </TouchableOpacity>
              )
            }
          }}
        />
      </Tab.Navigator>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Welcome' screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="Main" component={BottomTabs} />
        <Stack.Screen name="Announcement" component={AnnouncementScreen} />
        <Stack.Screen name="Transaction" component={XTransaction} />
        <Stack.Screen name="ChatBot" component={ChatBotScreen} />
        <Stack.Screen name="Destination" component={DestinationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default AppNavigation;