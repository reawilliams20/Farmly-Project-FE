import React, { useContext, useState, useLayoutEffect, useEffect } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Button } from "react-native-elements";
import { UserContext } from "../navigation/user";
import {
  collection,
  addDoc,
  getDocs,
  query,
  orderBy,
  onSnapshot,
  where,
} from "firebase/firestore";
import { getFarms } from "../utils/api";
import { auth, db } from "../firebase";
import {
  Container,
  Card,
  UserInfo,
  UserImgWrapper,
  UserImg,
  UserInfoText,
  UserName,
  PostTime,
  MessageText,
  TextSection,
} from "../styles/MessageStyle";

const MessagesScreen = ({ navigation }) => {
  const [farms, setFarms] = useState([]);
  const [messages, setMessages] = useState([]);
  const { user } = useContext(UserContext);


  useEffect(() => {
    getFarms().then((response) => {
      setFarms(response);
    });
  }, []);

  if (farms.length !== 0) {
    const currFarm = farms.filter((farm) => {
      return farm.username === user["email"];
    });

  }

  const q = query(
    collection(db, "chats"),
    where('user.sent_from_username', "==" , user["email"] ),
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
  }, []);

  const msgFromUser = messages.filter((message) => {
    return message.user.sent_from_username == user["email"];
  });
  console.log(msgFromUser, "733333")
  const newMap = new Map(msgFromUser.map((m) => [m.user.sent_to_farm_id, m]));
  const unique = [...newMap.values()];

  if (unique.length === 0) {
    return (
      <View style={styles.container}>
        <Text>{"You have no messages!"}</Text>
      </View>
    );
  }
  
  return (
    <Container>
      <FlatList
        data={unique}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card
            onPress={() =>
              navigation.navigate("UserChat",
              {
                userName: item.user.sent_from_username,
                sent_to_farm_id: item.user.sent_to_farm_id,
                sent_to_farm_email: item.user.sent_to_farm_email
              }
              )
            }
          >
            <UserInfo>
              <UserImgWrapper>
                <UserImg source={item.user.sent_to_farm_pic} />
              </UserImgWrapper>
              <TextSection>
                <UserInfoText>
                  <UserName>{item.user.sent_to_farm_name}</UserName>
                  {/* <PostTime>{item.messageTime}</PostTime> */}
                </UserInfoText>
                <MessageText>{item.text}</MessageText>
              </TextSection>
            </UserInfo>
          </Card>
        )}
      />
    </Container>
  );
};

export default MessagesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8fcbbc",
  },
});
