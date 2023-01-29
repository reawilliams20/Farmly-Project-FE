import { createContext } from "react"
import { useEffect, useState } from "react";
import { auth } from "../firebase"
import {signInWithEmailAndPassword} from "firebase/auth"

export const UserContext = createContext();

export const UserProvider= ({children}) =>{
    const [user,setUser] = useState({})
    const isLoggedIn = user==null;
    const [type, setType] = useState('')
    const [isFirstLaunch, setIsFirstLaunch] = useState(null);

return (
    <UserContext.Provider 
    value={{
        user, 
        setUser, 
        isLoggedIn,
        type, 
        setType,
        isFirstLaunch,
        setIsFirstLaunch,
        signin: async (email, password) => {
        try {
        await signInWithEmailAndPassword(auth, email, password);
        } catch (e) {
        window.alert("Incorrect username or password!");
        }
    }
    }}>{children}</UserContext.Provider>
)
}