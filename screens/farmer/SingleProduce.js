import React from "react";
import { View, Text, StyleSheet } from "react-native";

const SingleProduce = ({navigation}) =>{
    return (
        <View style={styles.container}>
            <Text>Single Produce</Text>
        </View>
    )
}

export default SingleProduce

const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#8fcbbc'
    }
})