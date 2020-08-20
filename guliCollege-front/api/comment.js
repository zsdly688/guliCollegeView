import request from '@/utils/request'

export default {

  getPageList(page, limit, courseId) {
    return request({
      url: `/eduservice/comment/commentList/${page}/${limit}`,
      method: 'get',
      params: {courseId}
    })
  },
  addComment(comment) {
    return request({
      url: `/eduservice/comment/saveComment`,
      method: 'post',
      data: comment
    })
  },
  //用户删除评论
  deleteComment(commentId) {
    return request({
      url: `/eduservice/comment/deleteComment/${commentId}`,
      method: 'delete',
    })
  },
  
  //判断是否是该用户的评论
  isComment(commentId) {
    return request({
      url: `/eduservice/omment/isComment/${commentId}`,
      method: 'get',
      params: {commentId}
    })
  },
}