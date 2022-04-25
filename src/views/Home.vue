<template>
    <div class="home">
        <HelloWorld msg="Welcome to Your Vue.js App" />
        <UnderMenu />
    </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
import UnderMenu from "@/components/UnderMenu.vue";

export default {
    name: "Home",
    components: {
        HelloWorld,
        UnderMenu,
    },
};
</script>
