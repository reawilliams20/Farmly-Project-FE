import React, { useCallback, useContext,useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { auth, db } from "../../firebase";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { UserContext } from "../../navigation/user";

const UserChat = ({ navigation, route }) => {

  const [messages, setMessages] = useState([]);
  const {  farm_id , sent_to_farm_id } = route.params;
  console.log( sent_to_farm_id);
  const { user } = useContext(UserContext);
  console.log(user, "15555");

  const q = query(
    collection(db, "chats"),
    where("user.sent_to_farm_id", "==", sent_to_farm_id||farm_id),
    orderBy("createdAt", "desc")
  );

  useLayoutEffect(() => {
    const unsubscribe = onSnapshot(q, (snapshot) =>
      setMessages(
        snapshot.docs.map((doc) => ({
          _id: doc.data()._id,
          createdAt: doc.data().createdAt.toDate(),
          text: doc.data().text,
          user: doc.data().user,
        }))
      )
    );
    return () => {
      unsubscribe();
    };
  }, [sent_to_farm_id||farm_id]);
  

  console.log(messages, "messages in chat1");

  useEffect(() => {
    setMessages([]);
  }, []);
  const onSend = useCallback((messages = []) => {
    setMessages((previousMessages) =>
      GiftedChat.append(previousMessages, messages)
    );
    const { _id, createdAt, text, user } = messages[0];
    addDoc(collection(db, "chats"), { _id, createdAt, text, user });
  }, []);

  console.log(messages, "in UserChat");

  return (
    <>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          sent_to_farm_id: sent_to_farm_id||farm_id,
          sent_from_username: user["email"],
        }}
      />
    </>
  );
};

export default UserChat;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8fcbbc",
  },
});
