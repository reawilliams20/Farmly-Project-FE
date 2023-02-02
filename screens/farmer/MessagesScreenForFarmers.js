import React, {useContext, useState, useLayoutEffect, useEffect} from "react";
import { View, Text, StyleSheet,FlatList, Image } from "react-native";
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
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getFarms()
        .then((response) => {
        setFarms(response);
       setIsLoading(false)
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
            snapshot.docs.map((doc) => (
              {
              _id: doc.data()._id,
              createdAt: doc.data().createdAt.toDate(),
              text: doc.data().text,
              user: doc.data().user,
            }))
          ),
        );
        return () => {
          unsubscribe();
        };
      }, []);


      const newMap = new Map(messages.map((m) => [m.user.sent_from_name, m]));
      const unique = [...newMap.values()];


     
      if (isLoading===true) {
        return (
          <>
          <View style={styles.container}>
            <Text>
            I am obsessed with perfection. I want to work. I don't want to take this for granted.
            {`\n`}
            --Team Ditto</Text>
            <Image
            style={{ width: "10%", height: "10%" , alignItems: "center",
            justifyContent: "center",}}
            source={require("../../gif/1477.png")}
            >
            </Image>
          </View>
          </>
        )
      }
      

      if ( messages.length ===0) return (
        <View style={styles.container}>
        <Text>{"Your messages will appear here..."}</Text>
      </View>
      ); 

    return (
        <Container style= {styles.area}>
        <FlatList
          data={unique}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <Card
              onPress={() =>
                navigation.navigate("FarmerChat", {
                  sent_to_farm_email: user['email'],
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
    },
    area: {
      padding: 60,
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "#8fcbbc",
    },
})