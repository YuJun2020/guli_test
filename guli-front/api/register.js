import request from '@/utils/request.js';
export default{
    sendCode(phone){
        return request({
            url:`msm/send/${phone}`,
            method:'get'
        })
    },
    register(formItem){
        return request({
            url:`ucenter/member/register`,
            method:'post',
            data:formItem
        })
    }
}