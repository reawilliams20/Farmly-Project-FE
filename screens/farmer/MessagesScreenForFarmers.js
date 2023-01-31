import React, {useContext, useState, useLayoutEffect, useEffect} from "react";
import { View, Text, StyleSheet,FlatList } from "react-native";
import { UserContext } from "../../navigation/user";
import { getFarms } from "../../utils/api";
import { auth, db } from "../../firebase";
import { Bubble, GiftedChat, Send } from "react-native-gifted-chat";
import {
    collection,
    addDoc,
    getDocs,
    query,
    orderBy,
    onSnapshot,
    where,
  } from "firebase/firestore";
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
  } from "../../styles/MessageStyle";


const MessagesScreenForFarmers =({navigation})=>{
    const [farms, setFarms] = useState([]);
    const [messages, setMessages] = useState([]);
    const { user } = useContext(UserContext);
    console.log(user['email'], "in message screen for farmers");

    useEffect(() => {
        getFarms().then((response) => {
        setFarms(response);
        });
    }, []);

    const q = query(
        collection(db, "chats"),
        where('user.sent_to_farm_email', '==', user['email']),
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
    //   const msgFromUser = messages.filter((message) => {
    //     return message.user.sent_to_farm_id == user["farm_id"];
    //   });
    //   console.log(msgFromUser, "msgFromUser")
    //   const newMap = new Map(msgFromUser.map((m) => [m.user.sent_to_farm_id, m]));
    //   const unique = [...newMap.values()];
    //   console.log(unique,"73")

      if (messages.length ===0) return (
        <View style={styles.container}>
        <Text>{"You have no messages!"}</Text>
      </View>
      ); 

    return (
        <Container>
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
           
            <Card
              onPress={() =>
                navigation.navigate("FarmerChat", {
                  userName: item.user.sent_from_username,
                  sent_to_farm_id: item.user.sent_to_farm_id,
                })
              }
            >
              <UserInfo>
                <UserImgWrapper>
                  <UserImg source={item.user.avatar} />
                </UserImgWrapper>
                <TextSection>
                  <UserInfoText>
                    <UserName>{item.user.sent_from_name}</UserName>
                    {/* <PostTime>{item.messageTime}</PostTime> */}
                  </UserInfoText>
                  <MessageText>{item.text}</MessageText>
                </TextSection>
              </UserInfo>
            </Card>
          )}
        />
      </Container>
    )
}

export default MessagesScreenForFarmers

const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#8fcbbc'
    }
})