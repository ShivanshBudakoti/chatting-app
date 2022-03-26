import firebase from 'firebase/compat/app';
import 'firebase/compat/app'
 import 'firebase/compat/auth';
 import 'firebase/compat/firestore';
 import 'firebase/compat/storage';
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBYzVEg1VYYYa-Ym3bwtTJvGYQ3J9Notqk",
  authDomain: "chattingapp-129fc.firebaseapp.com",
  projectId: "chattingapp-129fc",
  storageBucket: "chattingapp-129fc.appspot.com",
  messagingSenderId: "768426616220",
  appId: "1:768426616220:web:cac3e58bdf940283b69459"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);//initial firebase
const db= firebase.firestore();//connect db
const auth= firebase.auth();//authorization

const provider =new firebase.auth.GoogleAuthProvider();
const storage=firebase.storage()//it will contain data
export {auth,storage,provider};
export default db;