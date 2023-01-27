import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { Card } from "react-native-elements";
import { getProduce } from "../../utils/api";

const ProduceList = ({ navigation }) => {
  const [produce, setProduce] = useState([]);

  useEffect(() => {
    getProduce().then((response) => {
      setProduce(response);
    });
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={produce}
        renderItem={({ item }) => {
          return (
            <Card>
              <Text>{item.name}</Text>
            </Card>
          );
        }}
      />
    </View>
  );
};

export default ProduceList;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#8fcbbc",
  },
});
