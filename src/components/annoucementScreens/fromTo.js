import React from 'react'
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
  Button,
  Image,
  Alert
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { Feather } from "@expo/vector-icons";
import DatePicker from "react-native-date-ranges";

const customButton = (onConfirm) => {
  return (
    <Button
      onPress={onConfirm}
      style={{
        container: { width: "80%", marginHorizontal: "3%" },
        text: { fontSize: 20 },
      }}
      primary
      title="Submit"
    />
  );
};

export default function FromTo() {
  return (
    <View>
        <ScrollView>
          <View
            className="bg-neutral-100 py-4 px-6 m-5 item-center rounded-md"
          >
            {/* Destination */}
            <Pressable
              onPress={() => navigation.navigate("Search")}
              className="px-4 py-3 border-b border-gray-400 items-center gap-3 flex-row"
            >
              <Feather name="search" size={24} color="green" />
              <TextInput
                placeholderTextColor="black"
                placeholder={
                  "From Station"
                }
              />
            </Pressable>
            <Pressable
              onPress={() => navigation.navigate("Search")}
              className="px-4 py-3 border-b border-gray-400 items-center gap-3 flex-row"
            >
              <Feather name="map-pin" size={24} color="red" />
              <TextInput
                placeholderTextColor="black"
                placeholder={
                   "To Station"
                }
              />
            </Pressable>

            {/* Selected Dates */}
            <Pressable
              style={{
                gap:12
                
              }}
              className="px-4 py-3 item-center flex-row"
            >
              <Feather name="calendar" size={24} color="black" />
              <DatePicker
                style={{
                  width: 350,
                  height: 30,
                  borderColor: "transparent",
                }}
                customStyles={{
                  placeholderText: {
                    fontSize: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: "auto",
                  },
                  headerStyle: {
                    backgroundColor: "#003580",
                  },
                  contentText: {
                    fontSize: 15,
                    flexDirection: "row",
                    alignItems: "center",
                    marginRight: "auto",
                  },
                }}
                selectedBgColor="#0047AB"
                customButton={(onConfirm) => customButton(onConfirm)}
                allowFontScaling={false}
                placeholder={"Select Date"}

              />
            </Pressable>



            {/* Search Button */}
            <Pressable
              onPress={() => searchPlaces()}
              className="px-4 py-3 bg-blue-500 rounded-lg"
            >
              <Text
                className="text-center text-white font-medium text-base"
              >
                Search
              </Text>
            </Pressable>
          </View>
          </ScrollView>
          </View>
  )
}