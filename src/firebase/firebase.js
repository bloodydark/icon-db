import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

var firebaseConfig = {
  // ここに自分のプロジェクトのconfigをペースト
  apiKey: "AIzaSyCE6BGh5yqpMkMrIeDSK8-ZJVAXpUcxmGs",
  authDomain: "challenge-ea48d.firebaseapp.com",
  databaseURL: "https://challenge-ea48d.firebaseio.com",
  projectId: "challenge-ea48d",
  storageBucket: "challenge-ea48d.appspot.com",
  messagingSenderId: "48760760102",
  appId: "1:48760760102:web:c3cae014b65d1b81c343e7",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
export const storage = firebase.storage();
export default firebase;
