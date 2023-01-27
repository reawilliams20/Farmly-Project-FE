import { createContext } from "react"
import { useEffect, useState } from "react";

export const UserContext = createContext();


export const UserProvider= ({children}) =>{
    const [user,setUser] = useState({})

    useEffect(() => {
    const data = window.localStorage.getItem('MY_APP_STATE');
    if ( data !== null ) setUser(JSON.parse(data));
}, []);

    const isLoggedIn = user!==null;


return (
    <UserContext.Provider value={{user, setUser, isLoggedIn}}>{children}</UserContext.Provider>
)
}