import React from "react";
import { View, Text, StyleSheet, Image, Button, Pressable } from "react-native";
import { useEffect, useState } from "react";
import { getFarmById, getProduce } from "../../utils/api";
import { FlatList } from "react-native";
import { Card } from "react-native-elements";

const SingleFarm = ({ route, navigation }) => {
  const { farm_id } = route.params;
  const [farm, setFarm] = useState([]);
  const [produce, setProduce] = useState([]);
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getFarmById(farm_id).then((response) => {
      setFarm(response);
    });
    getProduce().then((response) => {
      setProduce(response);
      setIsLoading(false)
    });
  }, []);
  const produceInStock = produce.filter((item) => {
    return item.farm_id === farm_id;
  });

  return isLoading ? (<View style={styles.container}><Text>Loading...</Text></View>)
  :(
      <View style={styles.container}>
        <Pressable
          title="Back"
          onPress={() => {
            navigation.navigate("FarmList");
          }}
        />

        <Text>{farm.name}</Text>
        <Image
          source={{ uri: `${farm.profile_pic}` }}
          style={{ width: 200, height: 100 }}
        />
        <Text>{farm.address.street}</Text>
        <Text>{farm.address.town}</Text>
        <Text>{farm.address.county}</Text>
        <Text>{farm.address.postcode}</Text>
        <Text>{farm.address.country}</Text>
        <Text>{farm.description}</Text>
        <Text>{farm.description}</Text>

        <FlatList
          data={produceInStock}
          renderItem={({ item }) => {
            return (
              <Card>
                <View>
                  <Text>{item.name}:</Text>
                  <Text>
                    £{item.price}/per {item.unit}
                  </Text>
                  <Image
                    source={{ uri: `${item.produce_pic}` }}
                    style={{ width: 100, height: 50 }}
                  />
                  <Text>{item.description}</Text>
                </View>
              </Card>
            );
          }}
        />
        <Pressable
          title="Message the farm"
          onPress={() =>
            navigation.navigate("UserChat", {
              farm_id: farm_id,
              farm_name: farm.name,
              farm_username : farm.username
            })
          }
        />
      </View>
    )

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
