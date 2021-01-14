import firebase from 'firebase'
require("@firebase/firestore")


var firebaseConfig = {
    apiKey: "AIzaSyDYP35JSvTrBT-K9PbBXDq_B58xe6WwkWU",
    authDomain: "booksanta-bc5ed.firebaseapp.com",
    projectId: "booksanta-bc5ed",
    storageBucket: "booksanta-bc5ed.appspot.com",
    messagingSenderId: "314799156135",
    appId: "1:314799156135:web:c2ba5c230b831b1fa92482"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  export default firebase.firestore()