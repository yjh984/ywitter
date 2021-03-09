import firebase from "firebase/app";
import "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDJ4gDkMlimmEt-7WV80ycpTo-i8_TAzJY",
    authDomain: "ywitter-40872.firebaseapp.com",
    projectId: "ywitter-40872",
    storageBucket: "ywitter-40872.appspot.com",
    messagingSenderId: "255154569665",
    appId: "1:255154569665:web:0d4f3603e76689771faf40",
    measurementId: "G-157C1M1HZW"
};
// Initialize Firebase
export default firebase.initializeApp(firebaseConfig);
firebase.analytics();