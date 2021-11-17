import firebase from "firebase/compat/app";
import "firebase/compat/database";
import "firebase/compat/storage";
import "firebase/compat/auth";

const firebaseConfig = {

  apiKey: "AIzaSyADtE8Qax14yVoiqVa2Jv1pHhPU8E_gdJs",

  authDomain: "afkari-5bad4.firebaseapp.com",

  projectId: "afkari-5bad4",

  storageBucket: "afkari-5bad4.appspot.com",

  messagingSenderId: "1027182547574",

  appId: "1:1027182547574:web:35de22fd4bca3dd3cf8557",

  measurementId: "G-CVGJQBC8YJ"
  

};

  const fireBase = firebase.initializeApp(firebaseConfig);
  export const auth = fireBase.auth();
  export const database = fireBase.database()
  export default fireBase.database().ref();