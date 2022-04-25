<template>
    <v-bottom-navigation fixed color="primary">
        <v-btn to="/reserve">
            <!-- <span> Reserve </span> -->
            <v-icon>mdi-history</v-icon>
        </v-btn>

        <v-btn to="/status">
            <!-- <span> Status </span> -->
            <v-icon>mdi-heart</v-icon>
        </v-btn>

        <v-btn to="/today">
            <!-- <span>Nearby</span> -->
            <v-icon>mdi-map-marker</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
export default {
    name: "UnderMenu",
};
</script>
