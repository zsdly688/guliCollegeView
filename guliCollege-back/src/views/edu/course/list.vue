<template>
  <div class="app-container">
    <div style="line-height: 40px; font-weight: 700; font-size: 22px; color: #a85a11; margin-left: 10px;"> 课程列表</div>
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item>
        <el-input v-model="courseQuery.title" placeholder="课程名称"/>
      </el-form-item>

      <el-form-item>
        <el-select v-model="courseQuery.status" clearable placeholder="课程状态">
          <el-option value="Normal" label="已发布"/>
          <el-option value="Draft" label="未发布"/>
        </el-select>
      </el-form-item>

      <el-button type="primary" plain="true" icon="el-icon-search" @click="getList()">查询</el-button>
      <el-button type="default" plain="true" @click="resetData()">清空</el-button>
    </el-form>

    <!-- 表格 -->
    <el-table
      :data="list"
      border
      fit
      highlight-current-row>

      <el-table-column
        label="序号"
        width="100"
        align="center">
        <template slot-scope="scope">
          {{ (page - 1) * limit + scope.$index + 1 }}
        </template>
      </el-table-column>

      <el-table-column label="封面" width="250" align="center">
        <template slot-scope="scope">
          <img :src="scope.row.cover" alt="scope.row.title" width="100%">
        </template>
      </el-table-column>

      <el-table-column label="课程信息">
        <template slot-scope="scope">
          <a href="">{{ scope.row.title }}</a>
          <p>
            课时：{{ scope.row.lessonNum }}
          </p>
          <p>
            浏览：{{ scope.row.viewCount }} /
            付费学员：{{ scope.row.buyCount }}
          </p>
        </template>
      </el-table-column>

      <el-table-column label="价格(元)" width="130" align="center" >
        <template slot-scope="scope">
          <!-- {{ typeof '0' }}  {{ typeof 0 }} {{ '0' == 0 }} -->
          <!-- {{ typeof scope.row.price }}
          {{ typeof Number(scope.row.price) }}
          {{ typeof Number(scope.row.price).toFixed(2) }} -->

          <el-tag v-if="Number(scope.row.price) === 0" type="success">免费</el-tag>

          <!-- 前端解决保留两位小数的问题 -->
          <!-- <el-tag v-else>{{ Number(scope.row.price).toFixed(2) }}</el-tag> -->

          <!-- 后端解决保留两位小数的问题，前端不用处理 -->
          <el-tag v-else>{{ scope.row.price }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="status" label="课程状态" width="130" align="center" >
        <template slot-scope="scope">
          <el-tag :type="scope.row.status === 'Draft' ? 'warning' : 'success'">{{ scope.row.status === 'Draft' ? '未发布' : '已发布' }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="gmtCreate" label="添加时间" width="170" />

      <el-table-column label="操作" align="center" style="height: 100%;">
        <template slot-scope="scope">
          <router-link :to="'/course/info/'+scope.row.id">
            <el-button type="primary" plain="true" size="mini" icon="el-icon-edit">编辑课程基本信息</el-button>
          </router-link>
          <router-link :to="'/course/chapter/'+scope.row.id">
            <el-button type="primary" plain="true" size="mini" icon="el-icon-edit">编辑课程大纲信息</el-button>
          </router-link>
          <el-button type="danger" plain="true" size="mini" icon="el-icon-delete" @click="removeDataById(scope.row.id)">删除课程信息</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <el-pagination :current-page="page" :page-size="limit" :total="total" style="padding: 30px 0; text-align: center;"
      layout="total, prev, pager, next, jumper" @current-change="getList" />
  </div>
</template>
<script>
  //引入调用course.js文件
  import courseApi from '@/api/edu/course.js'

  //引入调用teacher.js文件
  import teacherApi from '@/api/edu/teacher.js'

  //引入调用subject.js文件
  import subjectApi from '@/api/edu/subject.js'

  export default {
    //写核心代码的位置
    data() { //定义变量和初始值
      return {
        list: null, //查询之后接口返回集合
        page: 1, //当前页
        limit: 10, //每页记录数
        total: 0, //总记录数
        courseQuery: {} ,//条件封装的对象 v-model双向绑定
        subjectList: [], // 一级分类列表
        subjectLevelTwoList: [] // 二级分类列表,
      }
    },
    created() { //页面渲染之前执行，调用method定义的方法
      //调用
      this.getList()
      // 获取讲师列表
      this.initTeacherList()
    },
    methods: { //创建具体的方法，调用course.js定义的方法
      getList(page = 1) { //讲师列表的方法
        this.page = page
        courseApi.getCourseListPage(this.page, this.limit, this.courseQuery)
          .then(response => { //请求成功
            //response接口返回的数据
            this.list = response.data.records
            this.total = response.data.total
          })
          .catch(error => { //请求失败
            console.log(error)
          })
      },

      // 获取讲师列表
      initTeacherList() {
        teacherApi.listTeacher().then(response => {
          this.teacherList = response.data.items
        })
      },

      //清空按钮的方法
      resetData() {
        //清空已输入数据
        this.courseQuery = {}
        //查询所有  恢复未进行条件查询的状态
        this.getList()
      },

      //删除课程的方法
      removeDataById(courseId) {
        this.$confirm('此操作将永久删除该课程，以及该课程下的章节和视频，是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          courseApi.deleteCourseById(courseId)
            .then(response => { //删除成功
              //提示信息
              this.$message({
                type: 'success',
                message: '删除成功! '
              });
              //回到列表页面
              this.getList()
            })
        })
          //点取消执行catch方法  用户体验角度
          //此处无需进行提示取消
          //框架在./utils/request.js封装好了提示error的方法
      }
    }
  }
</script>
