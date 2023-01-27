import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Button, Card } from "react-native-elements";
import axios from "axios";
import FarmScreen from "./FarmScreen";

const FarmsScreen = ({}) => {
  const [farms, setFarms] = useState([]);
  const fetchAPi = async () => {
    let res = await axios.get("https://farmly.onrender.com/api/farms");
    console.log(res.data);
    setFarms(res.data);
  };

  useEffect(() => {
    fetchAPi();
  }, []);

  return (
    <View style={styles.container}>
      <Text>Farms Screen</Text>
      <FlatList
        data={farms}
        renderItem={({ item }) => {
          return (
            <Card>
              <Text onPress={()=> navigation.navigate("FarmScreen")}>
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
