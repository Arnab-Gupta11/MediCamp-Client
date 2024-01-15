import { createContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
  FacebookAuthProvider,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import auth from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const Authprovider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const facebookProvider = new FacebookAuthProvider();
  const googleProvider = new GoogleAuthProvider();

  //<--------- Create User ----------->
  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  //<--------- Login User ----------->
  const loginUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  //<--------- Logout User ----------->
  const logOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  //<--------- Update User Profile----------->
  const updateUserProfile = (name, photo) => {
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photo,
    });
  };

  //<--------- Google Login ----------->
  const googleLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  //<--------- Facebook Login ----------->
  const facebookLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, facebookProvider);
  };

  //<--------- Set Observer to track user ----------->
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => {
      unsubscribe();
    };
  }, []);
  console.log("Observe ", user);

  const authInfo = { createUser, loginUser, logOutUser, updateUserProfile, loading, facebookLogin, googleLogin };
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

Authprovider.propTypes = {
  children: PropTypes.node,
};

export default Authprovider;
