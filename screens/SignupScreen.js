import React, {useContext, useState} from "react";
import { View, Text, StyleSheet,ScrollView } from "react-native";
import { Button } from "react-native-elements";
import { Input } from "react-native-elements";
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import {Picker} from "@react-native-picker/picker";
import { auth } from "../firebase"
import { UserContext } from "../navigation/user";

const SignUpScreen = ({navigation}) =>{
    const [name, setName] = useState('');
    // const [secureTextEntry, setSecureTextEntry] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [avatar, setAvatar] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    let {type, setType, isFirstLaunch, setIsFirstLaunch} = useContext(UserContext)
    
    console.log(type,19999)
    const [postcode, setPostcode] = useState('')
    let currSelectType = ""
    let currPostcode = ""
    const handleSignUp = ()=>{
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential)=>{
            const user = userCredential.user;
            setIsFirstLaunch(true)
            updateProfile(auth.currentUser, {
            displayName: name, 
            photoURL: avatar? avatar: "https://example.com/jane-q-user/profile.jpg",
            })
            
        })
        
       .catch((error)=>{
            alert(`Something went wrong with sign up: ${error} `);
       })
    }
        console.log(type,"29999")
    if (type === "customer"){
        navigation.navigate('FarmList')
    }navigation.navigate('MyFarm')



    return (
        <ScrollView>
        <View style={styles.container}>
            <Input
                placeholder='Enter your name'
                label='Name'
                value={name}
                onChangeText={text => setName(text)} 
                required
            />
            <Input
                placeholder='Enter email'
                label='Email'
                value={email}
                onChangeText={text => setEmail(text)} 
                required
            />
            <Input
                placeholder='Enter password '
                label='Password'
                value={password} 
                onChangeText={text => setPassword(text)}
                secureTextEntry = {true}
                password
            />
             <Input
                placeholder='Confirm password '
                label='Confrim password'
                value={confirmPassword} 
                onChangeText={text => setConfirmPassword(text)}
                secureTextEntry 
                required
            />
             <Input
                placeholder='Enter your image url'
                label='Profile Picture'
                value = {avatar}
                onChangeText={text => setAvatar(text)} 
                required
            />
             <Input
                placeholder='Enter your postcode'
                label='Postcode'
                value = {postcode}
                onChangeText={postcode => setPostcode(postcode)} 
                required
            />
            </View >
            <View style={styles.picker}>
            <Text>Select a type</Text>
            <Picker 
            placeholder = {{label:"Select a type", value: null}}
            selectedValue = {type}
            onValueChange={value=> setType(value)}
            required >
            <Picker.Item label= "I am a customer"  value= "customer" />
            <Picker.Item label= "I am a farmer"  value= "farmer" />
            </Picker>
            </View>
            <View>
            <Button
            title = "Register"
            onPress={()=>handleSignUp(currPostcode,currSelectType)}
            />
        </View>
        </ScrollView>
        
    )
}

export default SignUpScreen

const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
    },
    picker :{
        flex:1,
        justifyContent:'center',
    }
})


// additional features -->  hide and show password + error handling for password and confirm password 

