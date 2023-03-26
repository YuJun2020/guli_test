import request from "@/utils/request.js";
export default{
    queryList(){
        return request({
            url:`cms/banner/queryList`,
            method:'get'
        })
    }
}