import React from "react";
import { View, Text, StyleSheet,Image} from "react-native";
import { useEffect, useState } from "react";
import {getFarmById, getProduce} from '../../utils/api'
import { FlatList } from "react-native";
import { Button, Card } from "react-native-elements";

const SingleFarm = ({route, navigation}) =>{
    const {farm_id}= route.params
    const [farm, setFarm] = useState([]);
    const [produce, setProduce]= useState([]);

    useEffect(()=>{
        getFarmById(farm_id)
        .then((response) => {
            setFarm(response)
        })
        getProduce()
        .then((response)=> {
            setProduce(response)
        });
    },[]); 
    const produceInStock= produce.filter((item)=>{
        return item.farm_id === farm_id
    })
    
    if(farm.length !== 0) {
        return (
            <View style={styles.container}>
            < Button
            title="Back"
            onPress={() => {navigation.navigate("FarmList")}} />
    
            <Text>{farm.name}</Text>
            <Image source={{uri:`${farm.profile_pic}`}}
            style={{width: 200, height: 100}}/>
            <Text>{farm.address.street}</Text>
            <Text>{farm.address.town}</Text>
            <Text>{farm.address.county}</Text>
            <Text>{farm.address.postcode}</Text>
            <Text>{farm.address.country}</Text>
            <Text>{farm.description}</Text>
            <Text>{farm.description}</Text>
    
            <FlatList
            data={produceInStock}
            renderItem={({item}) => {
                return (
                    <Card>
                        <View>
                            <Text>{item.name}:</Text>
                            <Text>£{item.price}/per {item.unit}</Text>
                            <Image source={{uri:`${item.produce_pic}`}}
                            style={{width:100, height:50}}/>
                            <Text>{item.description}</Text>
                        </View>
                    </Card>
                )
            }}/>
            </View>
        )
    }
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