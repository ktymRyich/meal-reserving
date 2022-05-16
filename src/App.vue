<template>
    <v-app>
        <v-app-bar app color="white" dark elevation="0"> </v-app-bar>

        <v-main>
            <router-view />
        </v-main>
    </v-app>
</template>

<script>
export default {
    name: "App",
    data: () => ({
        //
    }),
    created: () => {},
};
</script>
