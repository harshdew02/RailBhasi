import * as React from 'react'
import { View, Text,Dimensions } from 'react-native'
import { Snackbar, Button } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


// Screens
import HomeScreen from '../screens/HomeScreen';
import AnnouncementScreen from '../screens/AnnouncementScreen';
import IVRScreen from '../screens/IVRScreen';
import XTransaction from '../screens/XTransaction';
import ChatBotScreen from '../screens/ChatBotScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import DestinationScreen from '../screens/DestinationScreen';

// Icons
import { Entypo } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { HomeIcon, MegaphoneIcon,SpeakerWaveIcon, ChatBubbleBottomCenterIcon, PhoneIcon } from "react-native-heroicons/solid";



import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { TouchableOpacity } from 'react-native-gesture-handler';

const { width, height } = Dimensions.get("window")



const screenOptions = {


    tabBarShowLabel: false,
    headerShown: false,
    tabBarHideOnKeyboard: true,
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

export default function BottomTabs() {

    const [visible, setVisible] = React.useState(false);

    const onToggleSnackBar = () => setVisible(!visible);

    const onDismissSnackBar = () => setVisible(false);


    const Tab = createBottomTabNavigator();

    return (

        <View style={{
            width,
            height,
        }}>

        <Tab.Navigator initialRouteName='Announcement' screenOptions={screenOptions}>
            <Tab.Screen
                name="Home"
                component={HomeScreen}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return (
                            // <TouchableOpacity>
                            <View style={{ alignItems: "center", justifyContent: "center" }}>
                                {/* <Entypo name="home" size={30} color={focused ? "#16247d" : "#9e9d9d"} /> */}
                                <HomeIcon size={wp(5)} color={focused ? "#16247d" : "#9e9d9d"} />
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
                                {/* <MaterialIcons name="campaign" size={30} color={focused ? "#16247d" : "#9e9d9d"} /> */}
                                <MegaphoneIcon size={wp(5)} color={focused ? "#16247d" : "#9e9d9d"} />
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
                            <>
                                {/* <View
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
                                    <FontAwesome name="volume-up" size={30} color="#fff" />

                                </View> */}

                                <View style={{
                                    alignItems: "center",
                                    justifyContent: "center",
                                    backgroundColor: "#16247d",
                                    width: Platform.OS == "ios" ? 50 : 60,
                                    height: Platform.OS == "ios" ? 50 : 60,
                                    top: Platform.OS == "ios" ? -10 : -20,
                                    borderRadius: Platform.OS == "ios" ? 25 : 30
                                }} >
                                    <TouchableOpacity onPress={onToggleSnackBar} classNam={`pt-5`}>
                                    {/* <FontAwesome name="volume-up" size={30} color={visible ? "#9e9d9d":"#fff"} /> */}
                                    <SpeakerWaveIcon size={wp(5)} color={visible ? "#9e9d9d":"#fff"} />
                                    </TouchableOpacity>
                                    {/* <Button  onPress={onToggleSnackBar}>{visible ? 'Hide' : 'Show'}</Button> */}
                                </View>
                            </>
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
                                {/* <MaterialCommunityIcons name="robot" size={30} color={focused ? "#16247d" : "#9e9d9d"} /> */}
                                <ChatBubbleBottomCenterIcon size={wp(5)} color={focused ? "#16247d" : "#9e9d9d"} />
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
                                {/* <Ionicons name="call" size={30} color={focused ? "#16247d" : "#9e9d9d"} /> */}
                                <PhoneIcon size={wp(5)} color={focused ? "#16247d" : "#9e9d9d"} />
                                <Text style={{ fontSize: 8 }} color={focused ? "#16247d" : "#9e9d9d"}>IVR</Text>
                            </View>
                            //  </TouchableOpacity>
                        )
                    }
                }}
            />
        </Tab.Navigator>
        </View>
    )
}