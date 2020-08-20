import request from '@/utils/request'
import { data } from 'autoprefixer'
export default{   
    getTeacherListPage(current,limit,teacherQuery){
        return request({
           // url: '/eduservice/teacher/pageTeacherCondition/'+current+'/'+limit,
            url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
            method: 'post',
            //teacherQuery条件对象，后端使用RequestBody获取数据
            //data表示把对象转换成json进行传递到接口里面
            data: teacherQuery
          }) 
    },
    deleteTeacherId(id){
        return request({
           // url: '/eduservice/teacher/pageTeacherCondition/'+current+'/'+limit,
            url: `/eduservice/teacher/${id}`,
            method: 'delete'
        }) 
    },
    addTeacher(teacher){
        return request({
            url: '/eduservice/teacher/addTeacher',
            method: 'post',
            data: teacher
        })

    },
    getTeacherInfo(id){
        return request({
            url: `/eduservice/teacher/getTeacher/${id}`,
            method: 'get'          
        })
    },
    updateTeacher(id,teacher){
        return request({
            url: `/eduservice/teacher/updateTeacher/${id}`,
            method: 'put',   
            data: teacher       
        })
    }

}
