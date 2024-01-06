// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDVmjHF7PT5m85fOg7kmOGBBhaA5DwIqIc",
  authDomain: "medicamp-60110.firebaseapp.com",
  projectId: "medicamp-60110",
  storageBucket: "medicamp-60110.appspot.com",
  messagingSenderId: "811982228661",
  appId: "1:811982228661:web:5548d7254085db889b42fc",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
export default auth;
