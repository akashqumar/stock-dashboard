import firebase from "firebase/compat/app";
import "firebase/compat/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBfp-eQvUGHikrzalvU-YYQHV_hquTfXJw",
  authDomain: "stock-d6120.firebaseapp.com",
  projectId: "stock-d6120",
  storageBucket: "stock-d6120.appspot.com",
  messagingSenderId: "79716590377",
  appId: "1:79716590377:web:2324690c26f20166be4d38",
  measurementId: "G-LBM5ZJ3GPW",
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export default firebase;
