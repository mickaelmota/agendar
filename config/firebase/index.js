import firebase from 'firebase/app'
import 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyBGwhKt-UwlfRIY-JzbLkKtrnWcXPPYcGg",
    authDomain: "agendar-work.firebaseapp.com",
    projectId: "agendar-work",
    storageBucket: "agendar-work.appspot.com",
    messagingSenderId: "718012136395",
    appId: "1:718012136395:web:19e8fbe1bd2075e5c5944e",
    measurementId: "G-1RCBB11JMB"
  };
  
 export default firebase.apps.length 
    ? firebase.app() 
    : firebase.initializeApp(firebaseConfig);