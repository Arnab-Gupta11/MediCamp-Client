import { createContext, useState } from "react";
import PropTypes from "prop-types";
import {
  FacebookAuthProvider,
  createUserWithEmailAndPassword,
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

  //<--------- Facebook Login ----------->
  const facebookLogin = () => {
    setLoading(true);
    return signInWithPopup(auth, facebookProvider);
  };

  const authInfo = { createUser, loginUser, logOutUser, updateUserProfile, loading, facebookLogin };
  return <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>;
};

Authprovider.propTypes = {
  children: PropTypes.node,
};

export default Authprovider;
