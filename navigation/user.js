import { createContext } from "react"
import { useEffect, useState } from "react";
import { auth } from "../firebase"
import {signInWithEmailAndPassword} from "firebase/auth"

export const UserContext = createContext();

export const UserProvider= ({children}) =>{
    const [user,setUser] = useState({})
    const isLoggedIn = user==null;
    const [type, setType] = useState('')

return (
    <UserContext.Provider 
    value={{
        user, 
        setUser, 
        isLoggedIn,
        type, 
        setType,
        signin: async (email, password) => {
        try {
        console.log(email,password)
        await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
        window.alert("Incorrect username or password!");
        }
    }
    }}>{children}</UserContext.Provider>
)
}