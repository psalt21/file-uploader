import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/firestore';

// Initialize Firebase
var config = {
    apiKey: "AIzaSyDOsxSa2Mklh8hayX-tJtV-m08OFksA8ps",
    authDomain: "react-drawer-fa018.firebaseapp.com",
    databaseURL: "https://react-drawer-fa018.firebaseio.com",
    projectId: "react-drawer-fa018",
    storageBucket: "gs://react-drawer-fa018.appspot.com",
    messagingSenderId: "236294813938"
  };
  firebase.initializeApp(config);

  const storage = firebase.storage();
  const firestore = firebase.firestore();

  export {
      storage, firestore, firebase as default
  }