import React, { useCallback, useContext,useLayoutEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { auth, db } from "../../firebase";
import { getFarmById } from "../../utils/api";
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
  const [farms, setFarms] = useState([])
  const {  farm_id , sent_to_farm_id } = route.params;
  console.log( sent_to_farm_id);
  const { user } = useContext(UserContext);


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
 const newMsg = messages.filter((msg)=>{
  return msg.user.sent_from_username === auth.currentUser.email
})
console.log(newMsg, "after filter")
 useEffect(() => {
        getFarmById(sent_to_farm_id||farm_id)
        .then((response) => {
          setFarms(response);
        });
      }, [sent_to_farm_id||farm_id]);
      console.log(farms,"in UserChat farm by id")
      console.log(auth.currentUser)
  return (
    <>
      <GiftedChat
        messages={newMsg}
        onSend={(newMsg) => onSend(newMsg)}
        showAvatarForEveryMessage={true}
        user={{
          sent_to_farm_id: sent_to_farm_id||farm_id,
          sent_to_farm_name: farms.name,
          sent_to_farm_email: farms.username,
          sent_to_farm_pic: farms.profile_pic, 
          avatar: auth?.currentUser?.photoURL,
          sent_from_name: auth?.currentUser?.displayName,
          _id: auth?.currentUser?.email,
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
