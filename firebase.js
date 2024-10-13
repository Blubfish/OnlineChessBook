
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-app.js";
import { getDatabase, ref, set } from "https://www.gstatic.com/firebasejs/10.12.4/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyDyZfhSsmcC3KbXz6b6M3Ok4cCH4EY-R4k",
  authDomain: "onlinechessbook.firebaseapp.com",
  databaseURL: "https://onlinechessbook-default-rtdb.firebaseio.com",
  projectId: "onlinechessbook",
  storageBucket: "onlinechessbook.appspot.com",
  messagingSenderId: "1067856474046",
  appId: "1:1067856474046:web:9cbc2b1692f787e81ed3ef",
  measurementId: "G-4LQF1MN47Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
var num = 1
const db = getDatabase();

window.loginUser = (UserName) => {
    set(ref(db, UserName), {
      firstcreate: true
      });
      num ++
      console.log("done")
}


window.writeUserData = () => {
  const username = localStorage.getItem('username');
  set(ref(db, `${username}/` + "game" + num), {
    gamePosition: window.LogicPostion
  }).then(() => {
    window.location.href = "mainScreen.html"
  }).catch((error) => {
    console.log(error);
  });
  
}