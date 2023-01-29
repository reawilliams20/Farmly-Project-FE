import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { useEffect, useState } from "react";
import {getProduce} from '../../utils/api'
import { SafeAreaView } from 'react-native-safe-area-context';
import { FlatList } from "react-native";
// import {Avatar, Card, Text} from 'react-native-paper'

const SingleFarm = ({route}) =>{
    const {farm_id}= route.params
    const [produce, setProduce]= useState([]);
    useEffect(()=>{
        getProduce()
        .then((response)=> {
            setProduce(response)
        });
    },[]); 

    const produceInStock= produce.filter((item)=>{
        return item.farm_id === farm_id
    })

     const ProduceCard = ({name, description, produce, unit})=>(
        <SafeAreaView>
        
        <Text>{name}</Text>
        {/* <TouchableOpacity onPress= {()=>navigation.navigate("SingleFarm", {farm_id: farm_id, description: description, img_url: profile_pic})}
            <View> 
        </View>
        </TouchableOpacity> */}
        </SafeAreaView>
 )

    return (
        <View style={styles.container}>
        <Text>Test</Text>
        <FlatList
        data = {produceInStock}
        renderItem= {(item)=>
        <ProduceCard 
        name = {item.name} 
        description= {item.description} /> }
        />
        </View>

    )
}

export default SingleFarm

const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#8fcbbc'
    }
})