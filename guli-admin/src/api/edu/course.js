import request from '@/utils/request'

export default {
  addCourse(courseInfo) {
    return request({
      url: `/edu/course/addCourse`,
      method: 'post',
      data: courseInfo
    })
  },
  getCourseInfo(courseId) {
    return request({
      url: `/edu/course/getCourseInfo/${courseId}`,
      method: 'get'
    })
  },
  updateCourseInfo(courseInfo) {
    return request({
      url: `/edu/course/updateCourseInfo`,
      method: 'post',
      data:courseInfo
    })
  },
  getCoursePublishInfo(courseId) {
    return request({
      url: `/edu/course/getCoursePublishInfo/${courseId}`,
      method: 'get'
    })
  },
  publishCourse(courseId) {
    return request({
      url: `/edu/course/publishCourse/${courseId}`,
      method: 'post'
    })
  },
  queryList(pageIndex,pageSize,courseQuery){
    return request({
      url: `/edu/course/queryList/${pageIndex}/${pageSize}`,
      method: 'post',
      data:courseQuery
    })
  },
  removeCourseById(courseId){
    return request({
      url: `/edu/course/removeCourseById/${courseId}`,
      method: 'post'
    })
  }
}
