import Vue from "vue";
import VueRouter from "vue-router";
import Reserve from "../views/Reserve.vue";
import Today from "../views/Today.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "Reserve",
        component: Reserve,
    },
    {
        path: "/status",
        name: "Status",
        component: () =>
            import(/* webpackChunkName: "about" */ "../views/Status.vue"),
    },
    {
        path: "/reserve",
        name: "Reserve",
        component: Reserve,
    },
    {
        path: "/today",
        name: "Today",
        component: Today,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
