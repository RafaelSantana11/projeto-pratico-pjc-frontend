import VueRouter from "vue-router"
import Vue from "vue";

import Auth from "@/components/Auth"
import Home from "@/components/Home"
import Albums from "@/components/Albums/Albums";
import AlbumForm from "@/components/Albums/AlbumForm";

Vue.use(VueRouter)

const router = new VueRouter({
    mode: "history",
    routes: [
        { name: "Home", path: '/', component: Home },
        { name: "Auth", path: '/login', component: Auth },
        { name: "Albums", path: "/albuns", component: Albums },
        {
            name: "InsertAlbum]",
            path: "/albuns/cadastrar",
            component: AlbumForm,
            props: { mode: "insert", title: "Cadastrar novo album" },
        },
    ]
})

export default router