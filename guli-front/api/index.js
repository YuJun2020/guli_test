import request from "@/utils/request.js";
export default{
    getHotCourseTeacher(){
        return request({
            url:`edu/front/index`,
            method:'get'
        })
    },
    queryTeacherList(pageIndex,pageSize){
        return request({
            url:`edu/front/queryTeacherList/${pageIndex}/${pageSize}`,
            method:'get'
        })
    },
    getTeacherInfo(teacherId){
        return request({
            url:`edu/front/getTeacherInfo/${teacherId}`,
            method:'get'
        })
    },
    queryCourseList(pageIndex,pageSize,searchObj){
        return request({
            url:`edu/front/queryCourseList/${pageIndex}/${pageSize}`,
            method:'post',
            data:searchObj
        })
    },
    querySubjectList(){
        return request({
            url: `/edu/subject/queryList`,
            method: 'post'
          })
    },
    getCourseDetail(courseId){
        return request({
            url: `/edu/front/getCourseDetail/${courseId}`,
            method: 'get'
          })
    },
    updateCourseViewCount(courseId){
        return request({
            url: `/edu/front/updateCourseViewCount/${courseId}`,
            method: 'get'
          })
    },
    getPlayAuth(vid) {
        return request({
          url: `videovod/getPlayAuth/${vid}`,
          method: 'get'
        })
    },
    queryCommentList(pageIndex,pageSize,courseId){
        return request({
            url:`edu/front/queryCommentList/${pageIndex}/${pageSize}/${courseId}`,
            method:'get'
        })
    },
    addComment(comment){
        return request({
            url:`edu/front/addComment`,
            method:'post',
            data:comment
        })
    },
    addOrder(courseId){
        return request({
            url:`order/addOrder/${courseId}`,
            method:'post'
        })
    },
    getOrder(orderNo){
        return request({
            url:`order/getOrder/${orderNo}`,
            method:'get'
        })
    },
    createNative(orderNo){
        return request({
            url:`order/createNative/${orderNo}`,
            method:'get'
        })
    },
    queryPayStatus(orderNo){
        return request({
            url:`order/queryPayStatus/${orderNo}`,
            method:'get'
        })
    }
}