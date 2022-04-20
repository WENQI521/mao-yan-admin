/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-21 18:26:36 Mon
 * @LastEditTime: 2022-02-26 17:52:30 Sat
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
import axios from "axios";

export default {
    queryFilmApi(params) {
        return axios({
            url: "film/adminQueryFilm",
            method: "GET",
            params
        });
    },
    insertFilmApi(film) {
        return axios({
            url: "film/adminInsertFilm",
            method: "POST",
            data: { film }
        });
    },
    updateFilmApi(film) {

        return axios({
            url: "film/adminUpdateFilm",
            method: "POST",
            data: { film }
        });
    },
    deleteFilmApi(idArr) {
        return axios({
            url: "film/adminDeleteFilm",
            method: "POST",
            data: { idArr }
        });
    },
    queryFilmTypeApi(params) {
        return axios({
            url: "film/queryFilmType",
            method: "GET",
            params
        });
    },
}
