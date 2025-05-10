import { auth } from "../../firebase/firebaseConfig.js";
import React, { useContext, useState, useEffect, useCallback } from "react";
import { onAuthStateChanged } from "firebase/auth";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}
// Token management with caching and refresh
let cachedToken = null;
let cachedTokenExpiry = 0;
const TOKEN_REFRESH_THRESHOLD = 5 * 60 * 1000; // 5 minutes before expiry

export async function getToken(forceRefresh = false) {
  const currentTime = Date.now();
  
  // If we have a cached token that's still valid (with buffer time for safety)
  if (!forceRefresh && cachedToken && cachedTokenExpiry > currentTime + TOKEN_REFRESH_THRESHOLD) {
    console.log("Using cached token");
    return cachedToken;
  }
  
  // No valid cached token, get a new one
  if (!auth.currentUser) {
    console.log("No user is signed in");
    return null;
  }

  try{
    const idToken = await auth.currentUser.getIdToken(forceRefresh);
    
    // Cache the token with its expiry time (tokens typically last 1 hour)
    cachedToken = idToken;
    cachedTokenExpiry = Date.now() + 60 * 60 * 1000; // 1 hour from now
    
    console.log("New token obtained", forceRefresh ? "(forced refresh)" : "");
    return idToken;
  } catch(error) {
    console.log("Error getting token:", error)
    throw error;
  }; 
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userLoggedIn, setUserLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);


  // Function to refresh token when needed
  const refreshToken = useCallback(async () => {
    if (auth.currentUser) {
      try {
        await getToken(true); // Force refresh
      } catch (error) {
        console.error("Failed to refresh token:", error);
      }
    }
  }, []);

  useEffect(() =>{
    let tokenRefreshInterval;

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser({...user});
        setUserLoggedIn(true);

        //Get initial token
        try{
          await getToken();
        }catch (error){
          console.error("Failed to get initial token:", error);
        }

        //Set up token refresh interval
        tokenRefreshInterval = setInterval(() => {
          refreshToken();
        }, 45 * 60 * 1000); // Refresh every 45 minutes
      } else {
        setUser(null);
        setUserLoggedIn(false);
        cachedToken = null;
        cachedTokenExpiry = 0;
      }
      setLoading(false);
    });
    return () => {
      unsubscribe();
      if (tokenRefreshInterval) {
        clearInterval(tokenRefreshInterval);
      }
    };
  },[refreshToken]);

  const value = {
    userLoggedIn,
    user,
    loading,
    setUser,
    refreshToken
  }

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}