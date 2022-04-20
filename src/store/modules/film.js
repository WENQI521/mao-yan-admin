/*
 * @Author: TanGuangZhi
 * @Date: 2022-02-21 18:26:36 Mon
 * @LastEditTime: 2022-02-24 19:05:11 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
 */
import api from "../../http/api.js";

export default {
    namespaced: true,
    state: {
        filmPageInfo: {filmList: [], lastPage: 0},
    },
    mutations: {
        SET_FILM_LIST(state, filmPageInfo) {
            state.filmPageInfo = filmPageInfo;
        }

    },
    actions: {
        async queryFilmAsync(context, queryData) {
            let data = await api.film.queryFilmApi(queryData);
            context.commit("SET_FILM_LIST", data.data);
        },
        async insertFilmAsync(context, _id) {
            let data = await api.film.insertFilmApi(_id);
            return data.data;
        },
        async deleteFilmAsync(context, _id) {
            console.log(_id)
            let data = await api.film.deleteFilmApi(_id);
            return data.data;
        },
        async updateFilmAsync(context, film) {

            let data = await api.film.updateFilmApi(film);
            return data.data;
        }
    },
}
