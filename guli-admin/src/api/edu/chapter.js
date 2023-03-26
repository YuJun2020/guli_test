import request from '@/utils/request'

export default {
  queryChapterList(courseId) {
    return request({
      url: `/edu/course/queryChapterList/${courseId}`,
      method: 'post'
    })
  },
  addChapter(chapter) {
    return request({
      url: `/edu/course/addChapter`,
      method: 'post',
      data:chapter
    })
  },
  getChapter(chapterId) {
    return request({
      url: `/edu/course/getChapter/${chapterId}`,
      method: 'get'
    })
  },
  updateChapter(chapter) {
    return request({
      url: `/edu/course/updateChapter`,
      method: 'post',
      data:chapter
    })
  },
  deleteChapter(chapterId) {
    return request({
      url: `/edu/course/deleteChapter/${chapterId}`,
      method: 'delete'
    })
  },
  addVideo(vedio) {
    return request({
      url: `/edu/course/addVideo`,
      method: 'post',
      data:vedio
    })
  },
  getVideo(vedioId) {
    return request({
      url: `/edu/course/getVideo/${vedioId}`,
      method: 'get'
    })
  },
  updateVideo(vedio) {
    return request({
      url: `/edu/course/updateVideo`,
      method: 'post',
      data:vedio
    })
  },
  deleteVideo(vedioId) {
    return request({
      url: `/edu/course/deleteVideo/${vedioId}`,
      method: 'delete'
    })
  },
  deleteVod(videoSourceId) {
    return request({
      url: `/videovod/removeVideo/${videoSourceId}`,
      method: 'delete'
    })
  }
}
