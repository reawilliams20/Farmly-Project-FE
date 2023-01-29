import React, {useContext} from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Button } from "react-native-elements";
import { signOut } from "firebase/auth";
import { auth, db } from "../firebase";
import { UserContext } from "../navigation/user";


const SettingScreen = ({navigation}) =>{
    let { isLoggedIn, type }= useContext(UserContext)
    const signOutNow = () => {
        signOut(auth)
          .then(() => {
            isLoggedIn = false
            type = ""
            navigation.replace("LoginScreen");
          })
          .catch((error) => {
            alert(error.message);
          });
      };

    return (
        <View style={styles.container}>
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