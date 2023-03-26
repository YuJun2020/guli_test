import request from '@/utils/request'

export default{
  queryAll() {
    return request({
        url: `/edu/teacher/queryAll`,
        method: 'get'
      })
},
  queryList(pageIndex, pageSize, teacherQuery) {
        return request({
            url: `/edu/teacher/queryList/${pageIndex}/${pageSize}`,
            method: 'post',
            data:teacherQuery
          })
  },
  removeDataById(id){
    return request({
      url: `/edu/teacher/deleteTeacher/${id}`,
      method: 'delete'
    })
  },
  saveOrUpdate(teacher){
    return request({
      url: `/edu/teacher/saveOrUpdate`,
      method: 'post',
      data:teacher
    })
  },
  getTeacherInfo(id){
    return request({
      url: `/edu/teacher/getTeacher/${id}`,
      method: 'get'
    })
  }
}

