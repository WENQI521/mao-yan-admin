/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-21 18:26:36 Mon
 * @LastEditTime: 2022-02-26 15:01:02 Sat
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
import axios from "axios";

export default {
    queryUserApi(params) {
        return axios({
            url: "user/queryUser",
            method: "GET",
            params
        });
    },
    deleteUserApi(_id) {
        return axios({
            url: "user/deleteUser",
            method: "GET",
            params: {_id}
        });
    },
    updateUserApi(user) {
        return axios({
            url: "user/updateUser",
            method: "GET",
            params: user
        });
    },
    addUserApi(user) {
        return axios({
            url: "user/addUser",
            method: "GET",
            params:user
        });
    },
    login(user) {
        return axios({
            url: "user/loginUser",
            method: "get",
            params: user
        })
    },
    checkTokenApi(token) {
        return axios({
            url: "user/checkToken",
            method: "post",
            data: { token }
        });
    }
}
