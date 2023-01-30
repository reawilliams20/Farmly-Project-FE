import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, Button, TextInput } from "react-native";
import RadioForm from 'react-native-simple-radio-button';
import { Card } from "react-native-elements";
import { getProduce, postProduce } from "../../utils/api";

const ProduceList = ({ navigation }) => {
  const [produce, setProduce] = useState([]);
  const [shouldShow, setShouldShow] = useState(false)
  const [category, setCategory] = useState('fruits');
  const [name, setName] = useState('')
  const [stock, setStock] = useState('')
  const [price, setPrice] = useState('')
  const [unit, setUnit] = useState('')
  const [description, setDescription] = useState('')
  const farm_id = 1 //will modify farm_id variable when backend has been updated 
  // const [isAddedToProduceList, setIsAddedToProduceList] = useState(false)

  const categories = [
    { label: 'fruits', value: 'fruits' },
    { label: 'vegetables', value: 'vegetables' },
    { label: 'condiments', value: 'condiments' }
  ]; 

  useEffect(() => {
    getProduce().then((response) => {
      setProduce(response);
    });
  }, []);

  const addProduce = () => {
    setShouldShow(!shouldShow)
    const newProduce = {
        "name": name,
        "category": category,
        "stock": stock,
        "price": price,
        "unit": unit,
        "description": description,
        "farm_id": farm_id,
    }

    //optimistic rendering:
    setProduce((produceList) => {
      const newProduceList = [...produceList]
      newProduceList.push(newProduce)
      return newProduceList
    })
    postProduce(newProduce)
    .catch((err) => {
      alert("sorry something went wrong, please try again later.")
      setProduce((produceList) => {
        const newProduceList = [...produceList]
        newProduceList.pop()
        return newProduceList
      })
    })
  }

  return (
    <View style={styles.container}>
      <Button
            title = " + "
            onPress={() => setShouldShow(!shouldShow)}
      />

      {shouldShow ?
        ( <View>
          <Text>Name:</Text>
          <TextInput 
          placeholder="e.g peas" 
          onChangeText={name => setName(name)}/>
          
          <Text>Stock:</Text>
          <TextInput
          placeholder="e.g 10"
          onChangeText={stock => setStock(stock)}                                     
          />

          <Text>Price(£):</Text>
          <TextInput
          placeholder="e.g 2.50" 
          onChangeText={price => setPrice(price)}
          />

          <Text>Unit:</Text>
          <TextInput
          placeholder="e.g 300g" 
          onChangeText={unit => setUnit(unit)}
          />  

          <Text>Description:</Text>
          <TextInput
          placeholder="description"
          onChangeText={description => setDescription(description)}
          />
          <Text>Category:</Text>
          <RadioForm
          radio_props={categories}
          initial={0}
          onPress={(value) => {
            setCategory(value);
          }}
          />

          <Button
          title = "Add Produce"
          onPress={()=> addProduce()}
          />
        </View>)
      : null }


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