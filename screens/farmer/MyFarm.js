import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { getAuth } from "firebase/auth";

const auth = getAuth();
const user = auth.currentUser;

const MyFarm = ({navigation}) =>{
    if(user!==null){
        const displayName = user.displayName;
        const email = user.email;
        const photoURL = user.photoURL;
    }

    return (
        <View style={styles.container}>
            <Text>My Farm</Text>
        </View>
    )
}

export default MyFarm

const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#8fcbbc'
    }
})