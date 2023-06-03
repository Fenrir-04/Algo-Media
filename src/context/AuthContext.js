import { createContext, useContext, useEffect, useState } from "react";
import { auth, googleProvider } from "../firebase";

import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  signInWithPopup,
  onAuthStateChanged
} from "firebase/auth";

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState();
  const signUp = (email, password) =>
    createUserWithEmailAndPassword(auth, email, password);
  const logIn = (email, password) =>
    signInWithEmailAndPassword(auth, email, password);
  const logOut = async() => signOut(auth);

  const googleAuth = () => signInWithPopup(auth,googleProvider);

  useEffect(()=>{
    onAuthStateChanged(auth,(user)=>{
      if(user){
        setUser(user)
      } else{
        setUser(null)
      }
    })
  })

  return (
    <AuthContext.Provider value={{ signUp, logIn, logOut, user, googleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth=()=> {
  return useContext(AuthContext);
}