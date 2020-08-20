import request from '@/utils/request'
import { data } from 'autoprefixer'
export default{   
    addCourseInfo(courseInfo){
        return request({
           // url: '/eduservice/teacher/pageTeacherCondition/'+current+'/'+limit,
            url: `/eduservice/course/addCourseInfo`,
            method: 'post',
            data: courseInfo          
          }) 
    },
    getListTeacher(){
        return request({
            url:'/eduservice/teacher/findAll',
            method: 'get'
        })
    },
    
    //根据课程id查询课程基本信息
    getCourseInfoId(id) {
        return request({
            url: '/eduservice/course/getCourseInfo/'+id,
            method: 'get'
          })
    },
    //修改课程信息
    updateCourseInfo(courseInfo) {
        return request({
            url: '/eduservice/course/updateCourseInfo',
            method: 'post',
            data: courseInfo
          })
    },
    //课程确认信息显示
    getPublihCourseInfo(id) {
        return request({
            url: '/eduservice/course/getPublishCourseInfo/'+id,
            method: 'get'
          })
    },
    publihCourse(id) {
        return request({
            url: '/eduservice/course/publishCourse/'+id,
            method: 'post'
          })
    },
    getCourseListPage(current,limit,courseQuery){
        return request({
          url: `/eduservice/course/pageCourseCondition/${current}/${limit}`,
          method: 'post',
          //teacherQuery条件对象，后端使用RequestBody获取数据
          //data表示吧对象转换为json进行传递到接口里面
          data: courseQuery
        })
      },
    
      //8.删除课程
      deleteCourseById(courseId){
        return request({
          url: `/eduservice/course/deleteCourseById/${courseId}`,
          method: 'delete'
        })
      }
}