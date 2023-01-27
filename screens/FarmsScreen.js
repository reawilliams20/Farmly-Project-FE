import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Card } from "react-native-elements";
import { getFarms } from "../utils/api";

const FarmsScreen = ({navigation}) => {
  const [farms, setFarms] = useState([]);

  useEffect(() => {
    getFarms()
    .then((response)=>{
      setFarms(response)
    })
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={farms}
        renderItem={({ item }) => {
          return (
            <Card>
              <Text onPress={()=> navigation.navigate('FarmScreen')}>
                {item.name}
              </Text>
            </Card>
          );
        }}
      />
    </View>
  );
};

export default FarmsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8fcbbc",
  },
});
