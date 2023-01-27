import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
// import { Button } from "react-native-elements";

const FarmScreen = ({navigation, route}) =>{
    console.log('in farmScreen')
    return (
        <View style={styles.container}>
            <Text>Test</Text>
        </View>
    )
}

export default FarmScreen

const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#8fcbbc'
    }
})