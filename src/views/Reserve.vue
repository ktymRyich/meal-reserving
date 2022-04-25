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
                <v-col cols="12">
                    <v-slide-group multiple v-model="model">
                        <v-slide-item
                            v-for="n in 10"
                            :key="n"
                            v-slot="{ active, toggle }"
                        >
                            <v-col cols="1">
                                <v-card class="" rounded="lg" elevation="0">
                                    <v-img
                                        src="../assets/2681826 1.png"
                                        class="rounded-lg"
                                    ></v-img>
                                    <div class="my-2">
                                        <h4>ご飯の名前</h4>
                                        4/22
                                    </div>
                                    <v-btn
                                        :input-value="active"
                                        active-class="grey darken-4 white--text"
                                        depressed
                                        @click="
                                            toggle();
                                            change();
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
                <v-col cols="12">
                    <v-slide-group multiple v-model="model2">
                        <v-slide-item
                            v-for="n in 10"
                            :key="n"
                            v-slot="{ active, toggle }"
                        >
                            <v-col cols="1">
                                <v-card class="" rounded="lg" elevation="0">
                                    <v-img
                                        src="../assets/2681826 1.png"
                                        class="rounded-lg"
                                    ></v-img>
                                    <h4 class="my-2">ご飯の名前</h4>
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

            <v-fab-transition>
                <v-btn
                    color="grey darken-4"
                    dark
                    fixed
                    right
                    bottom
                    class="mb-16"
                    @click="reserve()"
                >
                    <v-expand-x-transition>
                        <div v-show="!isChanged">update changes</div>
                    </v-expand-x-transition>
                    <v-expand-x-transition>
                        <v-progress-circular
                            indeterminate
                            color="grey lighten-3"
                            v-show="isChanged"
                        ></v-progress-circular>
                    </v-expand-x-transition>
                </v-btn>
            </v-fab-transition>

            <v-row>
                <v-col cols="12" class="mt-16">
                    <h1 class="white">ここどうすっかな</h1>
                </v-col>
            </v-row>
            <UnderMenu />
        </v-container>
    </div>
</template>

<script>
import UnderMenu from "@/components/UnderMenu.vue";

export default {
    name: "Home",
    components: {
        UnderMenu,
    },
    data: () => ({
        model: null,
        model2: null,
        isChanged: false,
        updating: false,
    }),
    methods: {
        change() {
            this.isChanged = true;
        },
        reserve() {
            this.isChanged = false;
        },
    },
};
</script>
