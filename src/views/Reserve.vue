<template>
    <div class="reserve">
        <v-container>
            <v-row>
                <v-col cols="12" style="text-align: center">
                    <h1>Meal Reserving</h1>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12">
                    <h2>Breakfasts</h2>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="12">
                    <v-slide-group multiple v-model="model0">
                        <v-slide-item
                            v-for="meal in menuMorning"
                            :key="meal.id"
                            v-slot="{ active, toggle }"
                        >
                            <v-col>
                                <v-card width="140" rounded="lg" elevation="0">
                                    <v-img
                                        src="../assets/2681826 1.png"
                                        class="rounded-lg"
                                        height="180"
                                    ></v-img>
                                    <div class="my-2">
                                        <h4>{{ meal.mealName }}</h4>
                                        4/22
                                    </div>
                                    <v-btn
                                        :input-value="active"
                                        active-class="grey darken-4 white--text"
                                        depressed
                                        @click="toggle"
                                    >
                                        {{
                                            active ? "Reserved" : "Reserve this"
                                        }}
                                    </v-btn>
                                </v-card>
                            </v-col>
                        </v-slide-item>
                    </v-slide-group>
                </v-col>
            </v-row>

            <v-row>
                <v-col cols="12">
                    <h2>Diners</h2>
                </v-col>
            </v-row>
            <v-row no-gutters>
                <v-col cols="12">
                    <v-slide-group multiple v-model="model1">
                        <v-slide-item
                            v-for="meal in menuNight"
                            :key="meal.id"
                            v-slot="{ active, toggle }"
                        >
                            <v-col>
                                <v-card width="140" rounded="lg" elevation="0">
                                    <v-img
                                        src="../assets/2681826 1.png"
                                        class="rounded-lg"
                                    ></v-img>
                                    <h4 class="my-2">{{ meal.mealName }}</h4>
                                    <v-btn
                                        :input-value="active"
                                        active-class="grey darken-4 white--text"
                                        depressed
                                        @click="toggle"
                                    >
                                        {{
                                            active ? "Reserved" : "Reserve this"
                                        }}
                                    </v-btn>
                                </v-card>
                            </v-col>
                        </v-slide-item>
                    </v-slide-group>
                </v-col>
            </v-row>

            <!-- 更新ボタン -->
            <v-fab-transition>
                <v-btn
                    color="grey darken-4"
                    dark
                    fixed
                    right
                    bottom
                    class="mb-16"
                    @click="reserve()"
                    v-show="isChanged || updating"
                >
                    <v-expand-x-transition>
                        <div v-show="isChanged">update changes</div>
                    </v-expand-x-transition>
                    <v-expand-x-transition>
                        <v-progress-circular
                            indeterminate
                            color="grey lighten-3"
                            v-show="updating"
                        ></v-progress-circular>
                    </v-expand-x-transition>
                </v-btn>
            </v-fab-transition>

            <v-row>
                <v-col cols="12" class="mt-16" style="color: white">
                    <h1 class="white">ココ見つけたら連絡してよ</h1>
                </v-col>
            </v-row>
            <UnderMenu />
        </v-container>
    </div>
</template>

<script>
import UnderMenu from "@/components/UnderMenu.vue";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
    getAuth,
    signInWithRedirect,
    GoogleAuthProvider,
    onAuthStateChanged,
} from "firebase/auth";
import { getDatabase, ref, get, child, push } from "firebase/database";

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

const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getDatabase();
const dbRef = ref(db);

let menu;
export default {
    name: "Home",
    components: {
        UnderMenu,
    },
    data: () => ({
        menuMorning: {
            220516: { img: "test", mealName: "---" },
            220517: { img: "test", mealName: "---" },
            220518: { img: "test", mealName: "---" },
        },
        menuNight: {
            1: { id: 2205090, img: "test", mealName: "---" },
            2: { id: 2205091, img: "test", mealName: "---" },
            3: { id: 2205100, img: "test", mealName: "---" },
        },
        isChanged: false,
        updating: false,
        res: "",
        model0: null,
        model1: null,
        uid: null,
    }),
    methods: {
        reserve() {
            this.isChanged = false;
            this.updating = true;
        },
        updateReservation() {
            push(ref(db, "Users/" + this.uid.reserving), {
                2222220: true,
            });
        },
    },
    watch: {
        model0: function () {
            this.isChanged = true;
        },
        model1: function () {
            this.isChanged = true;
        },
    },
    created: function () {
        // ユーザー認証処理
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                signInWithRedirect(auth, provider);
            } else {
                this.uid = user.uid;
                console.log("uid: " + this.uid);
            }
        });
    },
    mounted: function () {
        // メニュー取得
        get(child(dbRef, `Menu/`)).then((snapshot) => {
            if (snapshot.exists()) {
                menu = snapshot.val();
                console.log("Database get Success");
                console.log(menu);
                this.menuMorning = menu.morning;
                this.menuNight = menu.night;
            } else {
                console.log("Database get errot");
                menu = {};
            }
        });
    },
};
</script>
