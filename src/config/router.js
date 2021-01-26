
import Auth from "@/components/Auth"
import Home from "@/components/Home"
import VueRouter from "vue-router"
import Vue from "vue";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    routes: [
        { path: '/', component: Home },
        { path: '/login', component: Auth }
    ]
})

export default router