import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

export const UserContext = React.createContext(null);

export const Provider = ({ children }) => {
  const [auth, setAuth] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [submissions, setSubmissions] = useState([]);

  const updateBalance = async (newBalance) => {
    await fetch("/user", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        uid: currentUser.uid,
        balance: newBalance,
      }),
    });

    setCurrentUser({
      ...currentUser,
      balance: newBalance,
    });
  };

  const recordSubmission = async (user, type, amount) => {
    await fetch("/transaction", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        user,
        type,
        amount,
      }),
    });
  };

  const getSubmissions = async () => {
    const submissions = await fetch(`/transaction?user=${currentUser?.name}`);
    const res = await submissions.json();
    setSubmissions(res.content);
  };

  const logout = () => {
    signOut(auth);
    setCurrentUser(null);
  };

  const logIn = async (email, password) => {
    try {
      return await signInWithEmailAndPassword(auth, email, password);
    } catch (err) {
      return null;
    }
  };

  const register = async (name, email, password) => {
    try {
      const { user } = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (user) {
        await fetch("/user", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            uid: user.uid,
          }),
        });
        return false;
      }
      return true;
    } catch (err) {
      return true;
    }
  };

  useEffect(() => {
    initializeApp({
      apiKey: "AIzaSyD0Rij0C7w5RwwLdZdX-D4U3-TdIbPEwLM",
      authDomain: "personal-610aa.firebaseapp.com",
      projectId: "personal-610aa",
      storageBucket: "personal-610aa.appspot.com",
      messagingSenderId: "866483691308",
      appId: "1:866483691308:web:9b0f317fdf778ee3419689",
    });

    const auth = getAuth();
    setAuth(auth);

    (async () => {
      if (auth.currentUser) {
        const response = await fetch(`/user?uid=${auth.currentUser.uid}`);
        const info = await response.json();
        const { uid, email } = auth.currentUser;

        setCurrentUser({ uid, email, ...info.content });
      } else {
        setCurrentUser(auth.currentUser);
      }
    })();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const response = await fetch(`/user?uid=${user.uid}`);
        const info = await response.json();
        const { uid, email } = user;
        setCurrentUser({ uid, email, ...info.content });
      }
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        currentUser,
        updateBalance,
        recordSubmission,
        logout,
        logIn,
        register,
        getSubmissions,
        submissions,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};
