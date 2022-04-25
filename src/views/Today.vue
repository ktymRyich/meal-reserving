<template>
    <div class="today">
        <v-container>
            <v-row>
                <v-col>
                    <h1>This is a Today page</h1>
                    <p>This page is under development!</p>
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
        cards: [
            {
                title: "Pre-fab homes",
                src: "https://cdn.vuetifyjs.com/images/cards/house.jpg",
                flex: 12,
            },
            {
                title: "Favorite road trips",
                src: "https://cdn.vuetifyjs.com/images/cards/road.jpg",
                flex: 6,
            },
            {
                title: "Best airlines",
                src: "https://cdn.vuetifyjs.com/images/cards/plane.jpg",
                flex: 6,
            },
        ],
    }),
};
</script>
