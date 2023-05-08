<template>
    <div class="editor">
        <v-container>
            <v-row>
                <v-col cols="12" style="text-align: center">
                    <h1>{{ mealData.date }}</h1>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12">
                    <v-text-field
                        label="Meal Name"
                        placeholder="meal"
                    ></v-text-field>
                </v-col>
                <v-col cols="12">
                    <v-file-input
                        accept="image/*"
                        label="Meal Image"
                        prepend-icon="mdi-camera"
                        :v-model="mealData.img"
                    ></v-file-input>
                    <v-img
                        lazy-src="https://picsum.photos/id/11/10/6"
                        height="150"
                        width="100%"
                        :src="mealData.img"
                    ></v-img>
                </v-col>
            </v-row>
        </v-container>
    </div>
</template>

<script>
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// import {
//     getAuth,
//     signInWithRedirect,
//     GoogleAuthProvider,
//     onAuthStateChanged,
// } from "firebase/auth";
import { getDatabase, ref, get, child } from "firebase/database";

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

const app = initializeApp(firebaseConfig);
getAnalytics(app);

// const auth = getAuth();
// const provider = new GoogleAuthProvider();
const db = getDatabase();
const dbRef = ref(db);

export default {
    name: "Editor",
    components: {},
    data: () => ({
        mealData: {
            name: "",
            date: "0",
            img: "",
        },
    }),
    methods: {},
    watch: {
        mealData: function () {
            console.log(this.mealData.img);
        },
    },
    created: function () {},
    mounted: function () {
        // メニュー取得
        this.mealID = parseInt(this.$route.query.mealID);
        this.mealDay = Math.floor(this.mealID / 10);
        this.mealTime = this.mealID % 10 == 0 ? "morning" : "night";
        this.requestUrl = `Menu/` + this.mealTime + `/` + this.mealDay;
        this.mealType = this.mealID % 10 == 0 ? "morning" : "night";

        this.mealData.date =
            String(parseInt(this.mealDay / 10000)) +
            "." +
            String(parseInt((this.mealDay % 10000) / 100)) +
            "." +
            String(parseInt(this.mealDay % 100));

        console.log(this.requestUrl);
        get(child(dbRef, this.requestUrl)).then((snapshot) => {
            if (snapshot.exists()) {
                let meal = snapshot.val();
                this.mealData.name = meal.mealname;
                this.mealData.img = meal.img;
                console.log(meal);
            } else {
                console.log("Not exist");
                this.mealData.name = "inputhere" + this.mealType;
                this.mealData.img = "https://picsum.photos/id/11/10/6";
            }
        });
    },
};
</script>
