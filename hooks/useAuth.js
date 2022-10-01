import React, { useState, createContext, useContext } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithCredential,
  signOut,
} from '@firebase/auth';
import { auth } from '../firebase';

const AuthContext = createContext({});

const config = {
  expoClientId: process.env.EXPO_CLIENT_ID,
  iosClientId: process.env.IOS_CLIENT_ID,
  androidClientId: process.env.ANDROID_CLIENT_ID,
  scopes: ['profile', 'email'],
  permissions: ['public_profile', 'email', 'gender', 'location'],
};

export default () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [error, setError] = useState(null);
  const [user, setUser] = useState(null);
  const [isSplashLoading, setIsSplashLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [request, response, googlePromptLogin] = Google.useAuthRequest(config);

  React.useEffect(
    () =>
      onAuthStateChanged(auth, (_user) => {
        if (_user) setUser(_user);
        else setUser(null);
        setIsSplashLoading(false);
      }),
    []
  );

  const signInWithGoogle = async () => {
    setIsLoading(true);
    await googlePromptLogin()
      .then(async (loginResult) => {
        if (loginResult.type === 'success') {
          console.log(loginResult, null, 2);
          const { idToken, accessToken } = loginResult.authentication;
          const credential = GoogleAuthProvider.credential(
            idToken,
            accessToken
          );
          await signInWithCredential(auth, credential);
        }

        return Promise.reject();
      })
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  };

  const logout = () => {
    setIsLoading(true);
    signOut(auth)
      .catch((error) => setError(error))
      .finally(() => setIsLoading(false));
  };

  const providerProps = React.useMemo(
    () => ({
      user,
      isLoading,
      error,
      signInWithGoogle,
      logout,
    }),
    [user, isLoading, error]
  );

  return (
    <AuthContext.Provider value={{ ...providerProps }}>
      {!isSplashLoading && children}
    </AuthContext.Provider>
  );
};
