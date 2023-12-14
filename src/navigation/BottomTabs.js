import * as React from 'react'
import { View, Text,Dimensions } from 'react-native'
import { Snackbar, Button } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


// Screens
import HomeScreen from '../screens/HomeScreen';
import AnnouncementScreen from '../screens/AnnouncementScreen';

// Icons
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
                                <Text style={{ fontSize: 8 }} color={focused ? "#16247d" : "#9e9d9d"}>Own Model</Text>
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
                                <MegaphoneIcon size={wp(7)} color={focused ? "#16247d" : "#9e9d9d"} />
                                <Text style={{ fontSize: 8 }} color={focused ? "#16247d" : "#9e9d9d"}>AI4Bharat</Text>
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