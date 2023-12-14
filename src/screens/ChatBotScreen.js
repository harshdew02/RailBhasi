import React, { useState, useEffect } from "react";
import { View, Text } from "react-native";
import TopBar from "../components/topBar";
import { GiftedChat } from "react-native-gifted-chat";
import { Dialogflow_V2 } from "react-native-dialogflow";
import { dialogflowConfig } from "../../env";

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
    { title: "With PNR/running status/coach position/others", value: "With PNR/running status/coach position/others" },
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

const checkQuickReplies = {
  type: "radio",
  keepIt: true,
  values: [
    { title: "Check PNR status", value: "Check PNR status" },
    { title: "Check train seat availability", value: "Check train seat availability" },
    { title: "Check coach position", value: "Check coach position" },
    { title: "Change passenger details", value: "Change passenger details" },
    { title: "Check running status", value: "Check running status" },
  ],
};

const ChatBotScreen = () => {
  const [messages, setMessages] = useState([
    {
      _id: 1,
      text: "Hi! I'm Your RialBhasi Assistant for today. I can help you with the following options. Ask Away!",
      createdAt: new Date(),
      user: BOT,
      quickReplies: initialQuickReplies,
    },
  ]);

  useEffect(() => {
    Dialogflow_V2.setConfiguration(
      dialogflowConfig.client_email,
      dialogflowConfig.private_key,
      Dialogflow_V2.LANG_ENGLISH_US,
      dialogflowConfig.project_id
    );
  }, []);

  const handleGoogleResponse = (result) => {
    let text = result.queryResult.fulfillmentMessages[0].text.text[0];
    sendBotResponse(text);
  };

  const sendBotResponse = (text, quickReply) => {
    let msg;
      msg = {
        _id: messages.length + 1,
        text,
        createdAt: new Date(),
        user: BOT,
        quickReplies: quickReply,
      };
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, [msg])
    );
  };

  const onSend = (newMessages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, newMessages)
    );

    const message = newMessages[0].text;

    Dialogflow_V2.requestQuery(
      message,
      (result) => handleGoogleResponse(result),
      (error) => console.log(error)
    );
  };

  const onQuickReply = (quickReply) => {
    const selectedValue = quickReply[0]?.value;

    if (selectedValue) {
      const msg = {
        _id: messages.length + 1,
        text: selectedValue,
        createdAt: new Date(),
        user: { _id: 1 },
      };
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, [msg])
      );
      if (selectedValue == "With Booking")
        sendBotResponse("Here are the options I can help you with", bookingQuickReplies);
      else if (selectedValue == "With Refund Request")
        sendBotResponse("Here are the options I can help you with");
      else if (selectedValue == "With PNR/running status/coach position/others")
        sendBotResponse("Here are the options I can help you with", checkQuickReplies);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <TopBar heading={"Talk With Me"} />
      <GiftedChat
        messages={messages}
        onSend={(newMessages) => onSend(newMessages)}
        onQuickReply={(quickReply) => onQuickReply(quickReply)}
        user={{ _id: 1 }}
      />
    </View>
  );
};

export default ChatBotScreen;
