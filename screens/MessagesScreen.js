import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Button } from "react-native-elements";

const MessagesScreen = ({navigation}) =>{
    return (
        <View style={styles.container}>
            <Text>Messages</Text>
            <Button
            title = "Click Here"
            onPress={()=>alert('button clicked')}
            />
        </View>
    )
}

export default MessagesScreen

const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#8fcbbc'
    }
})