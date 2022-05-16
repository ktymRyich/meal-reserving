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
import { getDatabase, child, ref, get } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

Vue.config.productionTip = false;

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
getAnalytics(app);

const provider = new GoogleAuthProvider();
const auth = getAuth();

if (1 === auth) {
    onAuthStateChanged(auth, (user) => {
        if (user) {
            // console.log("This user is already logined");
            user.getIdToken().then(() => {
                console.log("The token was got");
            });
            // user.providerData.forEach((profile) => {
            //     console.log("Sign-in provider: " + profile.providerId);
            //     console.log("  Provider-specific UID: " + profile.uid);
            //     console.log("  Name: " + profile.displayName);
            //     console.log("  Email: " + profile.email);
            //     console.log("  Photo URL: " + profile.photoURL);
            // });
            // console.log("User Display Name : " + user.displayName);
        } else {
            console.log("Get auth");
            signInWithRedirect(auth, provider);
        }
    });
}

// データベース取得
const database = getDatabase();
const dbRef = ref(database);
// メニューの取得
let menu;
if (1 === menu) {
    get(child(dbRef, `Menu/`))
        .then((snapshot) => {
            if (snapshot.exists()) {
                menu = snapshot.val();
                console.log(menu);
            } else {
                console.log("No data available");
            }
        })
        .catch((error) => {
            console.error(error);
        });
}
new Vue({
    router,
    vuetify,
    render: (h) => h(App),
}).$mount("#app");
