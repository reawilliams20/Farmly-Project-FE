import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Button, Card } from "react-native-elements";
import axios from 'axios';


const FarmsScreen = ({}) =>{
    const [farms, setFarms] = useState([])
    const fetchAPi = async ()=>{
        let res = await axios.get('http://192.168.1.104:3000/api/farms')
        console.log(res.data)
        setFarms(res.data)
    }
       
    useEffect(()=>{
        fetchAPi()
    },[])

   
    return (
        <View >
            <Text>Farms Screen</Text>
            {farms.map((farm)=>{
            return (
                <View>
                    <Card
                    >
                        <Text>
                        
                                 {farm.name}
                       
                           
                            </Text> 
                    </Card>
                   
                </View>
            )
            })}
        {/* <FlatList
        data={farms}
        renderItem={({Item})=>{
            return (
                <Text>
                    {Item.name}
                </Text>
            )
        }} /> */}
        
 
       

            
          
        </View>
    )
}

export default FarmsScreen

// const styles= StyleSheet.create({
//     container:{
//         flex:1,
//         alignItems:'center',
//         justifyContent:'center',
//         backgroundColor:'#8fcbbc'
//     }
// })