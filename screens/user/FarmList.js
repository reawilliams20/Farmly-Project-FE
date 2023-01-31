import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, ScrollView, Image } from "react-native";
import { Card } from "react-native-elements";
import { getFarms } from "../../utils/api";

const FarmList = ({ navigation }) => {
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    getFarms()
    .then((response) => {
      setFarms(response);
    });
  }, []);

// const FarmCard = ({profile_pic, description, farm_id})=>(
//   <SafeAreaView>
//     <TouchableOpacity onPress= {()=>navigation.navigate("SingleFarm", {farm_id: farm_id, description: description, img_url: profile_pic})}
//     <View> 
//     </View>
//     </TouchableOpacity>
//   </SafeAreaView>
// )


  return (

      <View style={styles.container}>
      <Text> List of Farm</Text>
      <FlatList
        data={farms}
        renderItem={({ item }) => {
          return (
            <Card>
              <View >
                <Text onPress={() => navigation.navigate("SingleFarm", {farm_id: item.farm_id, farm_name: item.name})}>{item.name}</Text>
              </View>
             
            
            </Card>
          );
        }}
      />
    </View>

    
  );
};

export default FarmList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8fcbbc",
  },
});
