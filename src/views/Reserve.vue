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
                            v-for="(meal, i) in menuMorning"
                            :key="i"
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
                                        @click="
                                            toggle();
                                            userChange(0);
                                        "
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
                                        @click="
                                            toggle();
                                            userChange(1);
                                        "
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
import { getDatabase, ref, get, child, update } from "firebase/database";

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

let getDateString = function (d) {
    return (
        "" +
        d.getFullYear() +
        ("00" + (d.getMonth() + 1)).slice(-2) +
        ("00" + d.getDate()).slice(-2)
    );
};

let menu;
export default {
    name: "Home",
    components: {
        UnderMenu,
    },
    data: () => ({
        menuMorning: {},
        menuNight: {},
        isChanged: false,
        updating: false,
        res: "",
        modelMorning: [],
        modelNight: [],
        reserving: { morning: {}, night: {} },
        uid: null,
        today: null,
        loading: true,
        asdf: 0,
    }),
    methods: {
        abc() {
            alert("abc");
        },
        userChange(m) {
            console.log(
                "User changed the reserving states : " +
                    (m === 0 ? "morning" : "night")
            );
            this.isChanged = true;
        },
        // ============================== 予約状況のアップロード ==============================
        updateReservation() {
            // ボタンのモード変更
            this.isChanged = false;
            this.updating = true;

            console.log("model morning: ");
            console.log(this.modelMorning);
            console.log("model Night: ");

            console.log(this.modelNight);
            this.reserving = {
                morning: {},
                night: {},
            };
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

            update(ref(db, "Users/" + this.uid + "/"), {
                reserving: this.reserving,
            })
                .then(() => {
                    this.updating = false;
                })
                .catch((err) => {
                    alert(err);
                });
        },
        // ============================== 注文状況取得 ==============================
        getReservingState() {
            let reservingUrl = `Users/` + this.uid + `/`;
            get(child(dbRef, reservingUrl)).then((snapshot) => {
                if (snapshot.exists()) {
                    let me = snapshot.val();
                    // vue内の変数に反映
                    this.user = {
                        name: me.name,
                        roomNumber: me.roomNumber,
                    };
                    this.loading = true;
                    for (let i = 0; i < 7; i++) {
                        if (me.reserving.morning[this.getDate(i)] === true) {
                            this.modelMorning.push(i);
                        }
                        if (me.reserving.night[this.getDate(i)] === true) {
                            this.modelNight.push(i);
                        }
                    }
                    this.loading = false;
                } else {
                    console.log("Getting user data error");
                    this.user = {
                        name: "取得失敗",
                        roomNumber: "取得失敗",
                    };
                }
            });
        },
        getDate(n) {
            let d = new Date();
            d.setDate(d.getDate() + n);
            return getDateString(d);
        },
    },
    watch: {
        modelMorning: function () {},
        modelNight: function () {},
    },
    created: function () {
        // 今日の日付の取得
        let d = new Date();
        this.today = getDateString(d);

        this.modelMorning = [];

        // ユーザー認証処理
        onAuthStateChanged(auth, (user) => {
            if (!user) {
                signInWithRedirect(auth, provider);
            } else {
                this.uid = user.uid;
                this.getReservingState();
            }
        });
    },
    mounted: function () {
        // メニュー取得
        get(child(dbRef, `Menu/`)).then((snapshot) => {
            if (snapshot.exists()) {
                menu = snapshot.val();

                let day = new Date();
                let m = {};
                let n = {};
                for (let i = 0; i < 7; i++) {
                    let d = getDateString(day);
                    // 朝ご飯のメニュー反映
                    m[parseInt(d)] =
                        parseInt(d) in menu.morning
                            ? {
                                  date: parseInt(d),
                                  img: menu.morning[parseInt(d)].img,
                                  mealName: menu.morning[parseInt(d)].mealName,
                              }
                            : {
                                  date: parseInt(d),
                                  img: 0,
                                  mealName: "no info",
                              };
                    // 夜ご飯のメニュー反映
                    n[parseInt(d)] =
                        parseInt(d) in menu.night
                            ? {
                                  date: parseInt(d),
                                  img: menu.night[parseInt(d)].img,
                                  mealName: menu.night[parseInt(d)].mealName,
                              }
                            : {
                                  date: parseInt(d),
                                  img: 0,
                                  mealName: "no info",
                              };
                    day.setDate(day.getDate() + 1);
                }
                // vue内の変数に反映
                this.menuMorning = m;
                this.menuNight = n;
            } else {
                console.log("Database get error @Menu");
                menu = {};
            }
        });
    },
};
</script>
