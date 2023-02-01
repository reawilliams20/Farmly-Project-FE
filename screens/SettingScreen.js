import React, {useContext, useEffect, useState} from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import { Button } from "react-native-elements";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { UserContext } from "../navigation/user";
import { getUsers } from "../utils/api";


const SettingScreen = ({navigation}) =>{
    let { user, isLoggedIn, type }= useContext(UserContext)
    const [account, setAccount] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    let myAccount = []

    const signOutNow = () => {
        signOut(auth)
          .then(() => {
            isLoggedIn = false
            type = ""
            navigation.navigate("LoginScreen");
          })
          .catch((error) => {
            alert(error.message);
          });
      };
    
    useEffect(() => {
        getUsers()
        .then((response) => {
            const listOfUsers = [...response]
            return myAccount = listOfUsers.filter((account) => {
                return account.email === user.email
            })
        })
        .then(() => {
            setAccount(myAccount)
            setIsLoading(false)
        })
    }, [])


        return isLoading ? (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
        :
        (
            <View style={styles.container}>
            <Image source={{uri:`${account[0].profile_pic}`}}
                style={{width: 400, height: 200}}/>

            <Text>User: {account[0].username}</Text>
            <Text>Email: {account[0].email}</Text>
            <Text>Postcode:{account[0].postcode}</Text>
            <Button 
            title = "Reset my password"/>
            <Button
            title = "Sign Out"
            onPress={signOutNow}
            />
            </View>
          )
    
}

export default SettingScreen

const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#8fcbbc'
    }
})