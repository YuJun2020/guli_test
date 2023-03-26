import request from '@/utils/request.js';
export default{
    login(member){
        return request({
            url:`ucenter/member/login`,
            method:'post',
            data:member
        })
    },
    getUserInfo(){
        return request({
            url:`ucenter/member/getMemberInfo`,
            method:'get'
        })
    }
}