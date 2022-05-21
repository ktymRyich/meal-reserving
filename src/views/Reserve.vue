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
                    <v-slide-group multiple v-model="modelMorning">
                        <v-slide-item
                            v-for="meal in menuMorning"
                            :key="meal.date"
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
                                        {{
                                            ((meal.date / 100).toFixed() %
                                                100) +
                                            "/" +
                                            (meal.date % 100)
                                        }}
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
                    <v-slide-group multiple v-model="modelNight">
                        <v-slide-item
                            v-for="meal in menuNight"
                            :key="meal.date"
                            v-slot="{ active, toggle }"
                        >
                            <v-col>
                                <v-card width="140" rounded="lg" elevation="0">
                                    <v-img
                                        src="../assets/2681826 1.png"
                                        class="rounded-lg"
                                    ></v-img>
                                    <div class="my-2">
                                        <h4>
                                            {{ meal.mealName }}
                                        </h4>
                                        {{
                                            ((meal.date / 100).toFixed() %
                                                100) +
                                            "/" +
                                            (meal.date % 100)
                                        }}
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

            <!-- 更新ボタン -->
            <!-- updateボタン -->
            <v-expand-x-transition>
                <v-btn
                    color="grey darken-4"
                    dark
                    fixed
                    right
                    bottom
                    class="mb-16"
                    @click="updateReservation()"
                    v-show="isChanged && !updating"
                >
                    <div>update changes</div>
                </v-btn>
            </v-expand-x-transition>
            <!-- 更新中ボタン -->
            <v-expand-x-transition>
                <v-btn
                    color="grey darken-4"
                    dark
                    fixed
                    right
                    bottom
                    class="mb-16"
                    v-show="!isChanged && updating"
                >
                    <v-progress-circular
                        indeterminate
                        color="grey lighten-3"
                    ></v-progress-circular>
                </v-btn>
            </v-expand-x-transition>

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
            220516: { date: 220516, img: "test", mealName: "---" },
            220517: { date: 220517, img: "test", mealName: "---" },
            220518: { date: 220518, img: "test", mealName: "---" },
        },
        menuNight: {
            220509: { date: 220509, img: "test", mealName: "---" },
            220510: { date: 220510, img: "test", mealName: "---" },
            220511: { date: 220511, img: "test", mealName: "---" },
        },
        isChanged: false,
        updating: false,
        res: "",
        modelMorning: {},
        modelNight: {},
        reserving: { morning: {}, night: {} },
        uid: null,
        today: null,
    }),
    methods: {
        reserve() {
            // テストよう
            this.isChanged = false;
            this.updating = true;
        },
        updateReservation() {
            this.isChanged = false;
            this.updating = true;

            console.log(this.modelMorning);
            console.log(this.modelNight);

            this.reserving = {
                morning: {},
                night: {},
            };
            // if (Object.keys(this.modelMorning).length > 0)
            for (let i = 0; i < Object.keys(this.modelMorning).length; i++) {
                let date =
                    "" +
                    this.menuMorning[
                        Object.keys(this.menuMorning)[this.modelMorning[i]]
                    ].date;
                this.reserving.morning[String(date)] = true;
            }
            for (let i = 0; i < Object.keys(this.modelNight).length; i++) {
                let date =
                    "" +
                    this.menuNight[
                        Object.keys(this.menuNight)[this.modelNight[i]]
                    ].date;
                this.reserving.night[String(date)] = true;
            }
            console.log(this.reserving);

            // update(ref(db, "Users/" + this.uid + "/"), {
            //     reserving: this.reserving,
            // })
            //     .then(() => {
            //         this.updating = false;
            //     })
            //     .catch((err) => {
            //         alert(err);
            //     });
        },
    },
    watch: {
        modelMorning: function () {
            this.isChanged = true;
        },
        modelNight: function () {
            this.isChanged = true;
        },
    },
    created: function () {
        // 今日の日付の取得
        let d = new Date();
        this.today =
            "" +
            d.getFullYear() +
            ("00" + (d.getMonth + 1)).slice(-2) +
            ("00" + d.getDate).slice(-2);

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
                // vue内の変数に反映
                this.menuMorning = menu.morning;
                this.menuNight = menu.night;
            } else {
                console.log("Database get errot");
                menu = {};
            }
        });

        // 注文状況取得
    },
};
</script>
