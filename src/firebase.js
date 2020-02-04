import firebase from 'firebase';
import 'firebase/firestore';


var firebaseConfig = {
    apiKey: "AIzaSyDbiiB5f3jgIduWZSzJSFqdNTf8aELBW08",
    authDomain: "todos-6accd.firebaseapp.com",
    databaseURL: "https://todos-6accd.firebaseio.com",
    projectId: "todos-6accd",
    storageBucket: "todos-6accd.appspot.com",
    messagingSenderId: "348992307715",
    appId: "1:348992307715:web:4989389887802ff9b78436",
    measurementId: "G-ZQK0DGDFR9"
  };


  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const firestore = firebaseApp.firestore();
  firestore.settings({
      timestampsInSnapshots: true
  })

  export default firestore