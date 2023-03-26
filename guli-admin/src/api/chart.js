import request from '@/utils/request'
export default{
    getDaily(day){
        return request({
            url:`statistics/getDaily/${day}`,
            method:'get'
        })
    },
    getChartData(searchObj){
        return request({
            url:`statistics/getChartData/${searchObj.type}/${searchObj.begin}/${searchObj.end}`,
            method:'get'
        })
    }
}