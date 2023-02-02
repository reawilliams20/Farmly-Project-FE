import React, {useContext, useEffect, useState} from "react";
import { View, StyleSheet, Text, Image, Alert} from "react-native";
import { Button } from "react-native-elements";
import { signOut, updateEmail, updatePassword,updateProfile, getAuth} from "firebase/auth";
import { UserContext } from "../navigation/user";
import { getUsers, updateUserById } from "../utils/api";

const SettingScreen = ({navigation}) =>{
    let { user, isLoggedIn, type }= useContext(UserContext)
    const [account, setAccount] = useState([]);
    const [isLoading, setIsLoading] = useState(true)
    const [copy, setCopy] = useState({})
    let myAccount = []
    const auth = getAuth();
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
            setCopy(myAccount[0])
            setIsLoading(false)
        })
    }, [copy])
    
    const signOutNow = ({navigation}) => {
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
    const handlePassword = (text) => {
        updatePassword(auth.currentUser, text)
        .then(() => {
            const updateBody = {
                password: text
            }
            updateUserById(account[0].user_id, updateBody)
            alert('Password Changed!')
        })
        .catch((error) => {
            alert('Something went wrong try again!')
        });
    }
    const resetPassword = () => {
        console.log(auth.currentUser, "ppppp")
        Alert.prompt("Change your password", "Please input your new password here", [
            {
                text:"Submit",
                onPress:(text) => handlePassword(text)
            },
            {
                text:"Cancel",
                onPress:() => {alert('Canceled')}
            }
        ], "plain-text", "")
    };

    const handleEmail = (text) => {
        updateEmail(auth.currentUser, text)
        .then(() => {
            const updateBody = {
                email: text
            }
            updateUserById(account[0].user_id, updateBody)
            signOutNow()
            alert('Email Changed!')
        })
        .catch((error) => {
            alert('Something went wrong try again!')
        })
    }

    const resetEmail = () => {
        Alert.prompt("Reset your email", "Please input the new email here", [
            {
                text:"Submit",
                onPress:(text) => handleEmail(text)
            },
            {
                text:"Cancel",
                onPress:() => {alert('Canceled')}
            }
        ], "plain-text", "")

    };

    const handleChangePic = (text) => {
        const accountCopy = {...account[0]}
        accountCopy.profile_pic = text
        setCopy(accountCopy)
        updateProfile(auth.currentUser, {
            displayName: auth.currentUser.displayName, 
            photoURL: text
          })
        .then(() => {
            const updateBody = {
                profile_pic: text
            }
            updateUserById(account[0].user_id, updateBody)
        })
        .catch((error) => {
          alert('Something went wrong try again!')
        });
    }

    const changePic = () => {
        Alert.prompt("Upload your photo", "Please upload the pic here", [
            {
                text:"Submit",
                onPress:(text) => {handleChangePic(text)}
            },
            {
                text:"Cancel",
                onPress:() => {console.log('Canceled')}
            }
        ], "plain-text", "")
    };

    const handleUsername = (text) => {
        const accountCopy = {...account[0]}
        accountCopy.username = text
        setCopy(accountCopy)
        const updateBody = {
            username: text
        }
        updateUserById(account[0].user_id, updateBody)
    }

    const resetUsername= () => {
        Alert.prompt("Change your username", "What's your next username", [
            {
                text:"Submit",
                onPress:(text) => {handleUsername(text)}
            },
            {
                text:"Cancel",
                onPress:() => {console.log('Canceled')}
            }
        ], "plain-text", "")
    }

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
            source={{uri:`${copy.profile_pic}`}}/>
            <Text style={styles.titleText}>{copy.username}</Text>

            <Button 
            title = "Change photo"
            onPress={changePic}/>
            <Button 
            title = "Reset my username"
            onPress={resetUsername}/>
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