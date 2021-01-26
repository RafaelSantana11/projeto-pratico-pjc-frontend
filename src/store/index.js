import Vue from 'vue'
import Vuex from 'vuex'
import user from '@/store/modules/user'

Vue.use(Vuex)

const store = new Vuex.Store({
    modules: {
        user
    },
    strict: true
})

export default store