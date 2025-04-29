import { auth } from "../../firebase/firebaseConfig.js";
import React, { useContext, useState, useEffect } from "react";
import { onAuthStateChanged, GoogleAuthProvider } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [isEmailUser, setIsEmailUser] = useState(false);
  const [isGoogleUser, setIsGoogleUser] = useState(false);

  useEffect(() =>{
    const unsubscribe = onAuthStateChanged(auth, initializeUser)
      return unsubscribe;
  },[]);

  async function initializeUser(user) {
    if (user) {
      setUser({...user});

      // // check if provider is email and password login
      // const isEmail = user.providerData.some(
      //   (provider) => provider.providerId === "password"
      // );
      // setIsEmailUser(isEmail);

      // //check if the auth provider is google or not
      // const isGoogle = user.providerData.some(
      //   (provider) => provider.providerId === GoogleAuthProvider.PROVIDER_ID
      // );
      // setIsGoogleUser(isGoogle);

      setUserLoggedIn(true);
    } else {
      setUser(null);
      setUserLoggedIn(false);
    }
    setLoading(false);
  }

  const value = {
    userLoggedIn,
    user,
    // isEmailUser,
    // isGoogleUser,
    loading,
    setUser
  }

  return (
    <AuthContext.Provider value={ value }>
      {!loading && children}
    </AuthContext.Provider>
  );
}