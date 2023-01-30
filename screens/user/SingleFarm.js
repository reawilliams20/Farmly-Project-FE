import React from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { useEffect, useState } from "react";
import { getProduce } from "../../utils/api";
import { Card } from "react-native-elements";
import { FlatList } from "react-native";
// import {Avatar, Card, Text} from 'react-native-paper'

const SingleFarm = ({ navigation , route }) => {
  const { farm_id, farm_name } = route.params;
  const [produce, setProduce] = useState([]);
  useEffect(() => {
    getProduce().then((response) => {
      setProduce(response);
    });
  }, []);


  const produceInStock = produce.filter((item) => {
    
    return item.farm_id === farm_id;
  });

  const ProduceCard = ({ name, description, produce, unit }) => (
  
      <Text>{name}</Text>

  );
      
  return (
    <>
    <View style={styles.container}>
    <Button 
          onPress={()=>goBack()} 
          title ="Go back to farm list" />
      <FlatList
        data={produceInStock}
        renderItem={({ item }) => {
            console.log(item,"in single Farm")
          return (
            <Card>
              <Text>{item.name}</Text>
            </Card>
            
          );
        }}
      />
    </View>
     <View style={styles.container}>
     <Button
     title = "Message the farm"
     onPress={()=> navigation.navigate("UserChat", {farm_id: farm_id, farm_name: farm_name})}
     />
 </View>
 </>
  );
};

export default SingleFarm;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8fcbbc",
  },
});
