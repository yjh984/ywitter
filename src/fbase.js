// import * as firebase from "firebase/app";
import firebase from "firebase/app";
import "firebase/analytics";
import 'firebase/auth';

const firebaseConfig = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGE_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASURE_ID
};
// Initialize Firebase
// export default firebase.initializeApp(firebaseConfig);
// firebase.analytics();
firebase.initializeApp(firebaseConfig);
export const authService=firebase.auth();
export const authService2=firebase.auth;