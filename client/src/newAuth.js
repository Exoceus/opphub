import React, { useEffect, useState, useContext } from "react";
import firebase_app from './firebase'

import {auth} from './firebase'

const AuthContext = React.createContext();

export function useAuth(){
    return useContext(AuthContext)
}

export function AuthProvider ({ children }){
    const [currentUser, setCurrentUser] = useState(null);

    function signup(email, password){
        return auth.createUserWithEmailAndPassword(email, password);
    }

    useEffect(() => {
        const unsubscribe =  auth.onAuthStateChanged(user => {
            setCurrentUser(user)
        })

        return unsubscribe;
    }, []);


    return (
        <AuthContext.Provider value={{currentUser, signup}}>
            {children}
        </AuthContext.Provider>
    );
};