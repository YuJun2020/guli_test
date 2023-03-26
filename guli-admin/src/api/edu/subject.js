import request from '@/utils/request'

export default{
    queryList(){
        return request({
            url: `/edu/subject/queryList`,
            method: 'post'
          })
    }
}