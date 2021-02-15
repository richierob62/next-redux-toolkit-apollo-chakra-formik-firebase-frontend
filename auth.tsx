import 'firebase/auth';

import React, { createContext, useContext, useEffect, useState } from 'react';

import firebase from 'firebase/app';
import firebaseClient from './firebaseClient';
import nookies from 'nookies';

export interface CtxShape {
  user: firebase.User | null;
}

const AuthContext = createContext<CtxShape>({ user: null });

export const AuthProvider = ({ children }: { children: any }) => {
  firebaseClient();
  const [user, setUser] = useState<null | firebase.User>(null);

  useEffect(() => {
    return firebase.auth().onIdTokenChanged(async (user) => {
      if (!user) {
        setUser(null);
        nookies.set(undefined, 'token', '', {});
        return;
      }
      const token = await user.getIdToken();
      nookies.set(undefined, 'token', token, {});
      setUser(user);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>
  );
};

export const userAuth = () => useContext(AuthContext);
