import firebase from "firebase/app";
import "firebase/storage";

var app = firebase.initializeApp({
    apiKey: "AIzaSyBGXgC0ChJMLYVo7MDDu6bayRx1YHxEYFU",
    authDomain: "sezzle-challenge-40eec.firebaseapp.com",
    projectId: "sezzle-challenge-40eec",
    databaseURL: "https://sezzle-challenge-40eec-default-rtdb.firebaseio.com",
    storageBucket: "sezzle-challenge-40eec.appspot.com",
    messagingSenderId: "653477347012",
    appId: "1:653477347012:web:5ff30479a16b8549f81391"
  });
export default app;