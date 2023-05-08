import Vue from "vue";
import VueRouter from "vue-router";
import Reserve from "../views/Reserve.vue";
import Today from "../views/Today.vue";
import Editor from "../views/Editor.vue";
import Meal from "../views/Meal.vue";

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
        path: "/meal",
        name: "Meal",
        component: Meal,
    },
    {
        path: "/today",
        name: "Today",
        component: Today,
    },
    {
        path: "/editor",
        name: "Editor",
        component: Editor,
    },
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes,
});

export default router;
