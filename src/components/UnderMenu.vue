<template>
    <v-bottom-navigation fixed color="primary">
        <v-btn to="/reserve">
            <!-- <span> Reserve </span> -->
            <v-icon>mdi-rice</v-icon>
        </v-btn>

        <v-btn to="/status">
            <!-- <span> Status </span> -->
            <v-icon>mdi-calendar-check</v-icon>
        </v-btn>

        <v-btn to="/today">
            <!-- <span> Nearby </span> -->
            <v-icon>mdi-account-group</v-icon>
        </v-btn>
    </v-bottom-navigation>
</template>

<script>
export default {
    name: "UnderMenu",
};
</script>
