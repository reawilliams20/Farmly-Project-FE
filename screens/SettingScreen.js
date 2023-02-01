import React, {useContext, useEffect, useState} from "react";
import { View, StyleSheet, Text, TextInput,Image, Pressable, Alert} from "react-native";
import { Button } from "react-native-elements";
import { signOut, updateEmail, updatePassword,updateProfile, getAuth} from "firebase/auth";
import { auth, db } from "../firebase";
import { UserContext } from "../navigation/user";
import { getUsers, updateUserById } from "../utils/api";

const SettingScreen = ({navigation}) =>{
    let { user, isLoggedIn, type }= useContext(UserContext)
    const [account, setAccount] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    let myAccount = []
    const [isEditable, setIsEditable] = useState(false);
    const auth = getAuth();
    const [id, setId] = useState()

    useEffect(() => {
        getUsers()
        .then((response) => {
            const listOfUsers = [...response]
            return myAccount = listOfUsers.filter((account) => {
                return account.email === user.email
            })
        })
        .then(() => {
            setAccount(myAccount)
            setId(account[0].user_id)
            setIsLoading(false)
        })
    }, [])

    const thisAccount = {...account}
    const [username, setUsername] = useState(thisAccount.username)
    const [email, setEmail] = useState(thisAccount.email)
    const [postcode, setPostcode] = useState(thisAccount.postcode)
    const [pic, setPic] = useState(thisAccount.profile_pic)
    const [password, setPassword] = useState(thisAccount.password)

    const signOutNow = () => {
        signOut(auth)
          .then(() => {
            isLoggedIn = false
            type = ""
            navigation.navigate("LoginScreen");
          })
          .catch((error) => {
            alert(error.message);
          });
      };

    const resetPassword = () => {
        Alert.prompt("Change your password", "Please input your new password here", [
            {
                text:"Submit",
                onPress:(text) => setPassword(text)
            },
            {
                text:"Cancel",
                onPress:() => {alert('Canceled')}
            }
        ], "plain-text", "new password")
        const user = auth.currentUser;
        //const newPassword = getASecureRandomPassword();

        updatePassword(user, password)
        .then(() => {
            const updateBody = {
                password: password
            }
            updateUserById(id, updateBody)
        })
        .catch((error) => {
        // An error ocurred 
        });
    };

    const resetEmail = () => {
        Alert.prompt("Reset your email", "Please input the new email here", [
            {
                text:"Submit",
                onPress:(text) => setEmail(text)
            },
            {
                text:"Cancel",
                onPress:() => {alert('Canceled')}
            }
        ], "plain-text", "new Email here")

        const newEmail = email;
        updateEmail(auth.currentUser, newEmail)
        .then(() => {
            const updateBody = {
                email: email
            }
            updateUserById(id, updateBody)
          }).catch((error) => {
            alert('Something went wrong try again!')
          })
    };

    const changePic = () => {
        Alert.prompt("Upload your photo", "Please upload the pic here", [
            {
                text:"Submit",
                onPress:(text) => setPic(text)
            },
            {
                text:"Cancel",
                onPress:() => {console.log('Canceled')}
            }
        ], "plain-text", "put the url here")

        const thisName = auth.currentUser.displayName;
        const newPic = pic;
        updateProfile(auth.currentUser, {
            displayName: thisName, 
            photoURL: newPic
          })
        .then(() => {
            const updateBody = {
                profile_pic: pic
            }
            updateUserById(id, updateBody)
        })
        .catch((error) => {
          alert('Something went wrong try again!')
        });
          
    };

        return isLoading ? (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        )
        :
        (
            <View style={styles.container}>
            <Image 
            style={styles.Logo}
            source={{uri:`${account[0].profile_pic}`}}/>
            <Button 
            title = "Change photo"
            onPress={changePic}/>
            <Text style={styles.titleText}>{account[0].username}</Text>
            <Pressable><Text>✍🏼</Text></Pressable>
            {/* <TextInput style={styles.input} placeholder={account[0].username} editable={isEditable} onChangeText={username => setUsername(username)}/>  */}
            {/* <Text>Email:</Text>
            <TextInput style={styles.input} placeholder={account[0].email} editable={isEditable} onChangeText={email => setEmail(email)}/>  */}
            <Text>Postcode:</Text>
            <TextInput style={styles.input} placeholder={account[0].postcode} editable={isEditable} onChangeText={postcode => setPostcode(postcode)}/> 
            <Button title={isEditable ? 'Cancel': 'Edit'} onPress={(e) => editProfile(e)} />
                    {isEditable ? (<Button title="Save" onPress={updateProfile} />) :null }
            <Button 
            title = "Reset my email"
            onPress={resetEmail}/>
            <Button 
            title = "Reset my password"
            onPress={resetPassword}/>
            <Button
            title = "Sign Out"
            onPress={signOutNow}
            />
            </View>
          )
    
}

export default SettingScreen

const styles= StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center',
        backgroundColor:'#8fcbbc'
    },
    input:{
        margin: 10,
        borderBottomColor: "solid grey",
        borderBottomWidth: 0.5,
        padding: 10,
    },
    Logo: {
        width: 150,
        height: 150,
        borderRadius: 100/2,
        overflow: "hidden",
        borderWidth: 3,
        borderColor: "white",
    },
    titleText: {
        fontSize: 20,
        fontWeight: 'bold',
    }
})