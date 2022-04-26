<template>
    <div class="status">
        <v-container fluid>
            <v-row dense justify="space-between" class="mb-7">
                <v-col cols="12" style="text-align: center">
                    <h1>Rserving status</h1>
                </v-col>
            </v-row>

            <v-row dense>
                <v-col
                    v-for="card in cards"
                    :key="card.title"
                    :cols="card.flex"
                >
                    <v-card elevation="0" class="mb-4" tile>
                        <v-img
                            src="../assets/2681826 1.png"
                            class="white--text align-end rounded-lg"
                            gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                            height="200px"
                        >
                            <v-card-title>
                                {{ card.title }}
                                <v-spacer></v-spacer>
                                <v-icon class="" style="color: white">
                                    mdi-white-balance-sunny
                                </v-icon>
                                <v-icon style="color: white">
                                    mdi-moon-waxing-crescent
                                </v-icon>
                            </v-card-title>
                        </v-img>
                    </v-card>
                </v-col>
            </v-row>
            <UnderMenu />

            <v-row>
                <v-col cols="12" class="mt-16" style="color: white">
                    <h1 class="white">
                        ココ見つけたら連絡してよ。リクルートだよ
                    </h1>
                </v-col>
            </v-row>
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
        cards: [
            {
                title: "4/25 Mon",
                src: "../assets/2681826 1.png",
                flex: 12,
            },
            {
                title: "4/26 Tue",
                src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
                flex: 6,
            },
            {
                title: "4/27 Wed",
                src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
                flex: 6,
            },
            {
                title: "4/28 Thu",
                src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
                flex: 6,
            },
            {
                title: "4/29 Fri",
                src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
                flex: 6,
            },
            {
                title: "4/30 Sut",
                src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
                flex: 6,
            },
            {
                title: "5/1 Sun",
                src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
                flex: 6,
            },
            {
                title: "5/2 Mon",
                src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
                flex: 6,
            },
            {
                title: "5/3 Tus",
                src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
                flex: 6,
            },
            {
                title: "5/4 Wed",
                src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
                flex: 6,
            },
        ],
    }),
};
</script>
