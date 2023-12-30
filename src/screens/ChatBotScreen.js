import React, { useState, useEffect } from "react";
import { View, KeyboardAvoidingView, Platform, TouchableOpacity } from "react-native";
import { GiftedChat, InputToolbar } from "react-native-gifted-chat";
import Icon from "react-native-vector-icons/FontAwesome";
import TopBar from "../components/topBar";
import { Dialogflow_V2 } from "react-native-dialogflow";
import { dialogflowConfig } from "../../env";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { PREDEFINED_LANGUAGE } from "../constants/config";
import { getTranslation } from "../components/ASRComponents/NMTv2";
import { useDispatch, useSelector } from "react-redux";
import { ScrollView } from "react-native";


const botAvatar = require("../../assets/images/chatbot.png");

const BOT = {
  _id: 2,
  name: "bot",
  avatar: botAvatar,
};

const initialQuickReplies = {
  type: "radio",
  keepIt: true,
  values: [
    { title: "With Booking", value: "With Booking" },
    { title: "With Refund Request", value: "With Refund Request" },
    { title: "TDR Request", value: "TDR Request" },
    {
      title: "With PNR/running status/coach position/others",
      value: "With PNR/running status/coach position/others",
    },
  ],
};

const bookingQuickReplies = {
  type: "radio",
  keepIt: true,
  values: [
    { title: "How to book a ticket", value: "How to book a ticket" },
    { title: "Booking failed", value: "Booking failed" },
    { title: "Cancel Booking", value: "Cancel Booking" },
    { title: "Unable to reset password", value: "Unable to reset password" },
  ],
};

const tdrQuickReplies = {
  type: "radio",
  keepIt: true,
  values: [
    {
      title: "Can I cancel a ticket after chart is prepared",
      value: "Can I cancel a ticket after chart is prepared",
    },
    { title: "How can I file TDR", value: "How can I file TDR" },
    { title: "Check status of TDR", value: "Check status of TDR" },
  ],
};

const checkQuickReplies = {
  type: "radio",
  keepIt: true,
  values: [
    { title: "Check PNR status", value: "Check PNR status" },
    {
      title: "Check train seat availability",
      value: "Check train seat availability",
    },
    { title: "Check coach position", value: "Check coach position" },
    { title: "Change passenger details", value: "Change passenger details" },
    { title: "Check running status", value: "Check running status" },
    { title: "Change boarding point", value: "Check running status" },
    {
      title: "How to change passenger details in the ticket",
      value: "Check running status",
    },
  ],
};

const ChatBotScreen = () => {

  const selectedLanguage = useSelector(state => state.language.currentLanguage);
  
  const renderInputToolbar = (props) => (
    <InputToolbar
      {...props}
      containerStyle={{
        marginRight:10,
        flexDirection:"row",
        alignItems: "center",
        justifyContent: "center",
        paddingHorizontal: 10,
      }}
      renderAccessory={() => (
        <View style={{ marginTop: 10 }}> 
          <TouchableOpacity onPress={handleMicButtonPress}>
            <Icon name="microphone" size={18} color="#2776ff" />
          </TouchableOpacity>
        </View>
      )}
    />
  );

  const handleMicButtonPress = () => {
    
  };

  const [messages, setMessages] = useState([
    {
      _id: 1,
      createdAt: new Date(),
      user: BOT,
      quickReplies: initialQuickReplies,
    },
  ]);

  useEffect(() => {
    const set = async () => {
      const textt = await getTranslation(
        "Hi! I'm Your RailBhasi Assistant for today. I can help you with the following options. Ask Away!",
        "en",
        selectedLanguage
      );
      setMessages([
        {
          _id: 1,
          text: textt,
          createdAt: new Date(),
          user: BOT,
          quickReplies: initialQuickReplies,
        },
      ]);
    };
    set();
    console.log("coming from chatbot: "+selectedLanguage);
  }, [selectedLanguage]);

  useEffect(() => {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );
  }, []);
  const [lang, setLang] = React.useState(null);
  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const storedLang = await AsyncStorage.getItem("lang");
        if (storedLang != null) setLang(storedLang);
        else setLang("en");
      } catch (error) {
        console.error("Error: ", error);
      }
    };
    fetchData();
  }, []);
  React.useEffect(() => {
    console.log("Language changed: ", lang);
  }, [lang]);

  const [test, setTest] = useState(null)
  const handleGoogleResponse = async (result) => {
    setTest(result.queryResult.fulfillmentMessages[0].text.text[0]);
    let text = await getTranslation(result.queryResult.fulfillmentMessages[0].text.text[0],'en','hi');    
    await sendBotResponse(text);
  };

  const sendBotResponse = async (text, quickReply) => {
    let msg;
    let text2 = await getTranslation(text,'hi','en');
    if (quickReply) {
      msg = {
        _id: Math.random().toString(36).substring(7),
        text,
        createdAt: new Date(),
        user: BOT,
        quickReplies: quickReply,
      };
    } else if (text2 == "booking") {
      msg = {
        _id: Math.random().toString(36).substring(7),
        text: await getTranslation(
          "Thanks for trusting RailBhasi for booking your train ticket. Just follow the mentioned steps to book train tickets in no time\n\n\u{1F449}Visit the RailBhasi website/app & select the starting & arrival destinations\n\n\u{1F449}Select a train that you want to book.\n\n\u{1F449}Add traveler’s details.\n\n\u{1F449}Proceed to our easy secure payment gateway.\n\n\u{1F449}Enter your original IRCTC username and password.\n\n\u{1F449}Train Ticket booking confirmation via Email, SMS, will be sent to you.\n\n\u{1F449}You can also check confirmed tickets in the My Trips option on our app/website.",
          "en",
          selectedLanguage
        ),
        createdAt: new Date(),
        user: BOT,
      };
    } else {
      msg = {
        _id: Math.random().toString(36).substring(7),
        text,
        createdAt: new Date(),
        user: BOT,
      };
    }
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [msg])
    );
  };

  const onSend = async (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    const message = newMessages[0].text;

    await Dialogflow_V2.requestQuery(
      message,
      async (result) => await handleGoogleResponse(result),
      (error) => console.log(error)
    );
  };

  const onQuickReply = async (quickReply) => {
    const selectedValue = quickReply[0]?.value;

    if (selectedValue) {
      const msg = {
        _id: Math.random().toString(36).substring(7),
        text: selectedValue,
        createdAt: new Date(),
        user: { _id: 1 },
      };
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [msg])
      );
      if (selectedValue == "With Booking")
        await sendBotResponse(
          await getTranslation(
            "Here are the options I can help you with",
            "en",
            selectedLanguage
          ),
          bookingQuickReplies
        );
      else if (selectedValue == "TDR Request")
        await sendBotResponse(
          await getTranslation(
            "Here are the options I can help you with",
            "en",
            selectedLanguage
          ),
          tdrQuickReplies
        );
      else if (selectedValue == "With Refund Request")
        await sendBotResponse(
          await getTranslation(
            "Here are the modes with their respective refund processing time-\n\n\u{1F449}UPI(Instant refund)\n\n\u{1F449}Debit card (8-10 working days)\n\n\u{1F449}Credit card (2-3 working days)\n\n\u{1F449}Net Banking (8-10 working days)\n\n\u{1F449}Paytm Wallet (2-3 working days)",
            "en",
            selectedLanguage
          )
        );
      else if (selectedValue == "With PNR/running status/coach position/others")
        await sendBotResponse(
          await getTranslation(
            "Here are the options I can help you with",
            "en",
            selectedLanguage
          ),
          checkQuickReplies
        );
      else {
        await handleFurtherConversation(selectedValue);
      }
    }
  };

  const handleFurtherConversation = async (selectedValue) => {
    if (selectedValue === "How to book a ticket") {
      await sendBotResponse(
        await getTranslation(
          "Hey there!! Thanks for trusting RailBhasi for booking your train ticket. Just follow the mentioned steps to book train tickets in no time\n\n\u{1F449}Visit the RailBhasi website/app & select the starting & arrival destinations\n\n\u{1F449}Select a train that you want to book.\n\n\u{1F449}Add traveler’s details.\n\n\u{1F449}Proceed to our easy secure payment gateway.\n\n\u{1F449}Enter your original IRCTC username and password.\n\n\u{1F449}Train Ticket booking confirmation via Email, SMS, will be sent to you.\n\n\u{1F449}You can also check confirmed tickets in the My Trips option on our app/website.",
          "en",
          selectedLanguage
        )
      );
    } else if (selectedValue === "Booking failed") {
      await sendBotResponse(
        await getTranslation(
          "Fret not, RailBhasi is here to help you. Just follow the steps below:\n\n\u{1F449}Retry your booking by clicking on ‘Retry booking’ after 40 minutes.\n\n\u{1F449}Remember your payment has already been deducted and Seat selected are freezed.\n\n\u{1F449}Don’t create a new booking.\n\n\u{1F449}You can retry booking after 40 minutes until 12 hours after which your money will be automatically refunded.",
          "en",
          selectedLanguage
        )
      );
    } else if (selectedValue === "Cancel Booking") {
      await sendBotResponse(
        await getTranslation(
          "Here’s what you can do-\n\n\u{1F449}Login to your RailBhasi App.\n\n\u{1F449}Select the train ticket that you want to cancel.\n\n\u{1F449}Click on the “Cancel Booking” button.\n\n\u{1F449}Refunds will be initiated to the Original Payment Method.",
          "en",
          selectedLanguage
        )
      );
    } else if (selectedValue === "Unable to reset password") {
      await sendBotResponse(
        await getTranslation(
          "For that please contact our customer support number or email us",
          "en",
          selectedLanguage
        )
      );
    } else if (
      selectedValue === "Can I cancel a ticket after chart is prepared"
    ) {
      await sendBotResponse(
        await getTranslation(
          "Well, sadly no!! E-tickets cannot be canceled after chart preparation. Users are requested to use the online TDR filing for such cases and track the status of the refund case through tracking service provided by IRCTC",
          "en",
          selectedLanguage
        )
      );
    } else if (selectedValue === "How can I file TDR") {
      await sendBotResponse(
        await getTranslation(
          "For filing online TDR please follow the following steps:\n\n\u{1F449}Select File Ticket Deposit Receipt (TDR) from menu Services.\n\n\u{1F449}Then select File TDR ink in the left panel under the 'My Transactions' menu. \n\n\u{1F449}IRCTC will forward the claim to Concerned Railways to process the refund.\n\n\u{1F449}The money of refund amount will be credited back to the same account through which payment was made after receiving the same from the concerned Railways.",
          "en",
          selectedLanguage
        )
      );
    } else if (selectedValue === "Check status of TDR") {
      await sendBotResponse(
        await getTranslation(
          "Please Look into the link below. Hope it will help you: http://www.refunds.indianrail.gov.in/refund/refund.ref_status",
          "en",
          selectedLanguage
        )
      );
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "white", paddingBottom: 20 }}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 30}
    >
      <View style={{ flex: 1, backgroundColor: "white" }}>
        <TopBar heading={PREDEFINED_LANGUAGE["twm"][lang]} />
        <GiftedChat
          messages={messages}
          onSend={async (newMessages) => await onSend(newMessages)}
          onQuickReply={async (quickReply) => await onQuickReply(quickReply)}
          user={{ _id: 1 }}
          renderInputToolbar={renderInputToolbar}
        />
      </View>
    </KeyboardAvoidingView>
  );
};

export default ChatBotScreen;
