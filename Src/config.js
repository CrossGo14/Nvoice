import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBE-tKZNjaFJGBaRQ1WlexmPQoi2-wQcYk",
  authDomain: "nvoice-ef063.firebaseapp.com",
  projectId: "nvoice-ef063",
  storageBucket: "nvoice-ef063.appspot.com",
  messagingSenderId: "882602028852",
  appId: "1:882602028852:web:a0ba9e4c41415e31fd3f61",
  measurementId: "G-ZNQ0EQ81MN"
  };
  
  // Initialize Firebase
  let app;
  if (firebase.apps.length === 0) {
    app = firebase.initializeApp(firebaseConfig);
  } else {
    app = firebase.app()
  }
  
  const auth = firebase.auth();
  
  export { firebase};
  export { auth};

