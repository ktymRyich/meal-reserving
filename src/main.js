import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import vuetify from "./plugins/vuetify";
// Import the functions you need from the SDKs you need
import {
    getAuth,
    signInWithRedirect,
    GoogleAuthProvider,
    onAuthStateChanged,
} from "firebase/auth";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDtgBKlIY_tBn003irV44d9Qu54Kvt_dYo",
    authDomain: "meal-reserving-system.firebaseapp.com",
    databaseURL:
        "https://meal-reserving-system-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "meal-reserving-system",
    storageBucket: "meal-reserving-system.appspot.com",
    messagingSenderId: "1043572372155",
    appId: "1:1043572372155:web:0584b2959e3f6561782f9e",
    measurementId: "G-8BRYQ6B2HD",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
getAnalytics(app);

Vue.config.productionTip = false;

const provider = new GoogleAuthProvider();

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
    if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        // const uid = user.uid;
        // ...
        console.log("This user is already logined");
    } else {
        // User is signed out
        // ...
        console.log("Get auth");
        signInWithRedirect(auth, provider);
    }
});

new Vue({
    router,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");
