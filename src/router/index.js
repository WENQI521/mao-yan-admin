/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-22 09:55:55 Tue
 * @LastEditTime: 2022-03-13 20:04:36 Sun
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
import Vue from 'vue'
import VueRouter from 'vue-router'


import Login from "../views/Login.vue";
import UserView from "../views/UserView.vue";
import FilmView from "../views/FilmView.vue";
import Index from "../views/Index.vue";
import Dashboard from "../views/Dashboard.vue";
import OrderView from "../views/OrderView.vue";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        component: Index,
        name: "index",
        // meta: { title: "首页" },
        children: [
            // {
            //     path: "/dashboard",
            //     name: "Dashboard",
            //     component: Dashboard,
            //     meta: {title: "Dashboard"}
            // },
            {
                path: "/userView",
                name: "UserView",
                component: UserView,
                meta: { title: "用户管理" }
            },
            {
                path: "/filmView",
                name: "FilmView",
                component: FilmView,
                meta: { title: "电影管理" }
            }, {
                path: "/orderView",
                name: "OrderView",
                component: OrderView,
                meta: { title: "订单管理" }
            }]
    }, {
        path: "/login",
        name: "Login",
        component: Login
    },
    {
        path: "*",
        name: "Error",
        component: () => import("../views/error/Error.vue")
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

// set global guider
// let noCheckTokenArray = ["/login"]
// router.beforeEach((to, from, next) => {
//     if (noCheckTokenArray.includes(to.path)) {
//         next();
//     } else {
//         let token = localStorage.getItem("token");
//         if (token) {
//             api.user.checkTokenApi(token).then(res => {
//                 next();
//             }).catch(err => {
//                 localStorage.removeItem("token");
//                 // store.commit("SET_USER_INFO", {});
//                 next("/login");
//             })
//         } else {
//             // this.$message({
//             //     type: "error",
//             //     message: "登录信息失效,请重新登录...",
//             // });
//             next("/login");
//         }
//     }
// })
export default router;
