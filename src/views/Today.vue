<template>
    <div class="today">
        <v-container>
            <v-row>
                <h1>This is a Today page</h1>
            </v-row>
            <v-row>
                <UnderMenu />
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
};
</script>
