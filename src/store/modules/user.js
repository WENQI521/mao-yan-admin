/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-21 18:26:36 Mon
 * @LastEditTime: 2022-02-22 15:47:00 Tue
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
import api from "../../http/api.js";

export default {
    namespaced: true,
    state: {
        /*userList: [], lastPage: 0, updateShowBackObj: {}*/
        userPageInfo: {},
        userInfo:{},
    },
    mutations: {
        SET_USER_PAGE_INFO(state,userPageInfo){
            state.userPageInfo=userPageInfo
        },
        SET_USER_INFO(state,userInfo){
            state.userInfo=userInfo
        }
    },
    actions: {
        async queryUserAsync(context, params){
            let data = await api.user.queryUserApi(params);
            context.commit("SET_USER_PAGE_INFO", data.data);
            console.log("1",data.data)
        },
        async deleteUserAsync(context, _id) {
            let data = await api.user.deleteUserApi(_id);
            return data.data;
        },
        async addUserAsync(context, user) {
            console.log("user2",user)
            let data = await api.user.addUserApi(user);
            return data.data;
        },
        async updateUserAsync(context, user) {
            let data = await api.user.updateUserApi(user);
            return data.data;
           // console.log(data.data)
        },
        async loginAsync(context, user) {
            let data = await api.user.login(user);
            if (data.data.token) {
                localStorage.setItem("token", data.data.token);
            }
            return data.data;
        },

    }
}
