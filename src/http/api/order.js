import axios from "axios";
export default {
    queryOrderApi(params){
        return axios({
            url:"order/adminQueryOrder",
            method:"GET",
            params,
        })
    },
    deleteOrderApi(_id) {
        return axios({
            url:"order/adminDeleteOrder",
            method:"POST",
            data:{_id}
        })
    },

}