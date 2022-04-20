import api from "../../http/api";

export default {
    namespaced:true,
    state:{
        orderPageInfo:{},
    },
    mutations:{
        SET_ORDER_LIST(state, orderPageInfo) {
            state.orderPageInfo = orderPageInfo;
        },

    },
    actions:{
        async queryOrderAsync(context, params) {
            let data = await api.order.queryOrderApi(params);
            context.commit("SET_ORDER_LIST", data.data);
        },
        async deleteOrderAsync(context, _id) {
            let data = await api.order.deleteOrderApi(_id);
            return data.data;
        },
        async deleteManyOrderAsync(context, idArr) {
            let data = await api.order.deleteManyOrderApi(idArr);
            return data.data;
        },
    }
}