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

const FarmerChat = ({navigation, route}) =>{
    const [messages, setMessages] = useState([]);
    const {userName, sent_to_farm_id} = route.params; 
    const q = query(
        collection(db, "chats"),
        where("user.sent_from_username", "==", userName),
        where("user.sent_to_farm_id", "==", sent_to_farm_id ),
        orderBy("createdAt", "desc")
      );
      useLayoutEffect(() => {
        const unsubscribe = onSnapshot(q, (snapshot) =>
          setMessages(
            snapshot.docs.map((doc) => (
              console.log(doc.data(),"inside FarmerChat"),
              {
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

    return (
        <>
        <GiftedChat
          messages={messages}
          onSend={(messages) => onSend(messages)}
          showAvatarForEveryMessage={true}
          user={{
            _id:auth?.currentUser?.email,
            // sent_to_farm_id: sent_to_farm_id||farm_id,
            // sent_to_farm_name: farms.name,
            // sent_to_farm_email: farms.username,
            // sent_to_farm_pic: farms.profile_pic, 
            avatar: auth?.currentUser?.photoURL,
            sent_from_name: auth?.currentUser?.displayName,
            sent_from_username: auth?.currentUser?.email,
          }}
        />
      </>
    )
}

export default FarmerChat

const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#8fcbbc'
    }
})