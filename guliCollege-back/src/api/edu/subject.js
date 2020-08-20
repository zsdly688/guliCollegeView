import request from '@/utils/request'
import { data } from 'autoprefixer'
export default{   
    getAllSubject(){
        return request({
           // url: '/eduservice/teacher/pageTeacherCondition/'+current+'/'+limit,
            url: `/eduservice/subject/getAllSubject`,
            method: 'get'          
          }) 
    }
}