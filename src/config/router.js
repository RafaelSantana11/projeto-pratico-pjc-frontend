import VueRouter from "vue-router"
import Vue from "vue";

import Auth from "@/components/Auth"
import Home from "@/components/Home"
import Albuns from "@/components/Albuns/Albuns";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    routes: [
        { name:"Home", path: '/', component: Home },
        { name: "Auth", path: '/login', component: Auth },
        { name: "Albums", path: "/albuns", component: Albuns },
    ]
})

export default router