import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, FlatList, TextInput, Image, Pressable, Button} from "react-native";
import { getProduceById, updateProduceById } from "../../utils/api";

const SingleProduce = ({route, navigation}) =>{
    const [oneProduce, setOneProduce] = useState({})
    const {produce_id} = route.params
    const [isEditable, setIsEditable] = useState(false);
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        getProduceById(produce_id).then((produce) => {
            setOneProduce(produce)
            setIsLoading(false)
        })
    }, [oneProduce])
    const produce = {...oneProduce}
    const [name, setName] = useState(produce.name)
    const [stock, setStock] = useState(produce.stock)
    const [price, setPrice] = useState(oneProduce.price)
    const [unit, setUnit] = useState(produce.unit)
    const [description, setDescription] = useState(produce.description)
    const [pic, setPic] = useState(produce.produce_pic)
    const [category, setCategory] = useState(produce.category)

    const editProduce = (e) => {
        if (e.target.textContent === "Cancel")
        {
            navigation.navigate("ProduceList")
        }
        setIsEditable(!isEditable)
    }

        const updateProduce = () => {
            //update produce 
            const patch = {
                "name": name,
                "category": category,
                "stock": stock,
                "price": price,
                "unit": unit,
                "description": description,
                "produce_pic": pic
            }

            updateProduceById(produce_id, patch).then((response) => {
                setOneProduce(response)
            }).then(() => {
                alert('Saved!')
                setIsEditable(!isEditable)
            })
            
    }
        return isLoading ? (<View style={styles.container}><Text>Loading...</Text></View>)
        :(
            <View style={styles.container}>
            <FlatList
            data = {oneProduce}
            renderItem= {({item})=>{
                return (
                    <View style={styles.card}>
                    <Text style={styles.text}>Name:</Text>
                    <TextInput style={styles.input} placeholder={item.name} editable={isEditable} onChangeText={name => setName(name)}/> 
                    <Text style={styles.text}>Stock:</Text>
                    <TextInput style={styles.input} placeholder={`${item.stock}`} editable={isEditable} onChangeText={stock => setStock(stock)}/> 
                    <Text style={styles.text}>Price:</Text>
                    <TextInput style={styles.input} placeholder={`${item.price}`} editable={isEditable} onChangeText={price => setPrice(price)}/> 
                    <Text style={styles.text}>Unit:</Text>
                    <TextInput style={styles.input} placeholder={item.unit} editable={isEditable} onChangeText={unit => setUnit(unit)}/> 
                    <Text style={styles.text}>Description:</Text>
                    <TextInput style={styles.input} placeholder={item.description} editable={isEditable} onChangeText={description => setDescription(description)}/> 
                    <Text style={styles.text}>Catgeory:</Text>
                    <TextInput style={styles.input} placeholder={item.category} editable={isEditable} onChangeText={category => setCategory(category)}/> 
                    <Text style={styles.text}>Image:</Text>
                    <Image style={styles.pic} source={{uri:`${item.produce_pic}`}}/>
                    <TextInput style={styles.input} placeholder={item.produce_pic} editable={isEditable} onChangeText={pic => setPic(pic)}/> 
                    <Button style={styles.editButtons} title={isEditable ? 'Cancel': 'Edit'} onPress={(e) => editProduce(e)} />
                    {isEditable ? (<Button title="Save" onPress={updateProduce} />) :null }
                    <Button style={styles.editButtons} title="Back" onPress={() => navigation.navigate("ProduceList")} />
                    </View>
                )
            }}
            />
            </View>
        )
    }
    

export default SingleProduce

const styles= StyleSheet.create({
    container:{
        flex:1,
        marginTop: 40,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'white'
    },
    card:{
        backgroundColor: "white",
        marginTop: 40,
        padding: 40
    },
    input:{
        margin: 10,
        borderBottomColor: "solid grey",
        borderBottomWidth: 0.5,
        padding: 10,
    },
    pic:{
        marginTop: 10,
        alignSelf: "center",
        width:200,
        height: 120
    },
    text: {
        paddingLeft: 10
    },
    editButtons: {
        backgroundColor: "#4d9900",
        padding: 10,
        borderRadius: 5,
        paddingBottom: 40
    }
})