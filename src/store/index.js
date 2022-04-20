/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-23 18:40:52 Wed
 * @LastEditTime: 2022-02-24 14:19:26 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
import Vue from 'vue'
import Vuex from 'vuex'
import user from "./modules/user.js";
import film from "./modules/film.js";
import order from "./modules/order"

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isCollapse: false
    }, mutations: {
        switchCollapse(state) {
            state.isCollapse = !state.isCollapse
        }
    },
    modules: {
        user, film, order
    }
})
