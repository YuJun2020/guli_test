<template>
  <div class="app-container">
    <!--查询表单-->
    <el-form :inline="true" class="demo-form-inline">
      <!-- 所属分类：级联下拉列表 -->
      <!-- 一级分类 -->
      <el-form-item label="课程类别">
        <el-select
          v-model="courseQuery.subjectParentId"
          placeholder="请选择"
          @change="refreshtwoSubject"
        >
          <el-option
            v-for="subject in oneSubjectList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
        <!-- 二级分类 -->
        <el-select v-model="courseQuery.subjectId" placeholder="请选择">
          <el-option
            v-for="subject in twoSubjectList"
            :key="subject.id"
            :label="subject.title"
            :value="subject.id"
          />
        </el-select>
      </el-form-item>
      <!-- 标题 -->
      <el-form-item>
        <el-input v-model="courseQuery.title" placeholder="课程标题" />
      </el-form-item>
      <!-- 讲师 -->
      <el-form-item>
        <el-select v-model="courseQuery.teacherId" placeholder="请选择讲师">
          <el-option
            v-for="teacher in teacherList"
            :key="teacher.id"
            :label="teacher.name"
            :value="teacher.id"
          />
        </el-select>
      </el-form-item>
      <el-button type="primary" icon="el-icon-search" @click="queryList()"
        >查询</el-button
      >
      <el-button type="default" @click="resetData()">清空</el-button>
    </el-form>
    <!-- 表格 -->
    <el-table
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
      row-class-name="myClassList"
    >
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">
          {{ (pageIndex - 1) * pageSize + scope.$index + 1 }}
        </template>
      </el-table-column>
      <el-table-column label="课程信息" width="470" align="center">
        <template slot-scope="scope">
          <div class="info">
            <div class="pic">
              <img v-if="scope.row.cover" :src="scope.row.cover" alt="scope.row.title" width="150px" />
              <img v-else :src="cover" alt="scope.row.title" width="150px" />
            </div>
            <div class="title">
              <a href="">{{ scope.row.title }}</a>
              <p>{{ scope.row.lessonNum }}课时</p>
            </div>
          </div>
        </template>
      </el-table-column>
      <el-table-column label="创建时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.gmtCreate.substr(0, 10) }}
        </template>
      </el-table-column>
      <el-table-column label="发布时间" align="center">
        <template slot-scope="scope">
          {{ scope.row.gmtModified.substr(0, 10) }}
        </template>
      </el-table-column>
      <el-table-column label="价格" width="100" align="center">
        <template slot-scope="scope">
          {{
            Number(scope.row.price) === 0
              ? "免费"
              : "¥" + scope.row.price.toFixed(2)
          }}
        </template>
      </el-table-column>
      <el-table-column
        prop="buyCount"
        label="付费学员"
        width="100"
        align="center"
      >
        <template slot-scope="scope"> {{ scope.row.buyCount }}人 </template>
      </el-table-column>
      <el-table-column label="操作" width="150" align="center">
        <template slot-scope="scope">
          <router-link :to="'/course/info/' + scope.row.id">
            <el-button type="text" size="mini" icon="el-icon-edit"
              >编辑课程信息</el-button
            >
          </router-link>
          <router-link :to="'/course/chapter/' + scope.row.id">
            <el-button type="text" size="mini" icon="el-icon-edit"
              >编辑课程大纲</el-button
            >
          </router-link>
          <el-button type="text" size="mini" icon="el-icon-delete" @click="removeCourseById(scope.row.id)">删除
            </el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="pageIndex"
      :page-size="pageSize"
      :total="total"
      style="padding: 30px 0; text-align: center"
      layout="total, prev, pager, next, jumper"
      @current-change="queryList"
    />
  </div>
</template>
<script>
import course from "@/api/edu/course.js";
import teacher from "@/api/edu/teacher.js";
import subject from "@/api/edu/subject.js";
export default {
  data() {
    return {
      courseQuery: {},
      list: [],
      oneSubjectList:[],
      twoSubjectList:[],
      cover:"/static/dog.jpeg",
teacherList:[],
      pageIndex: 0,
      pageSize: 10,
      total: 0,
    };
  },
  created() {
    this.queryList();
    this.getTeacherList();
    this.getOneSubjectList();
  },
  methods: {
    queryList(page = 1) {
      this.pageIndex = page;
      course
        .queryList(this.pageIndex, this.pageSize, this.courseQuery)
        .then((response) => {
          var data = response.data;
          this.list = data.rows;
          this.total = data.total;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    resetData() {
      this.courseQuery = {};
      this.twoSubjectList=[];
      this.queryList();
    },
    removeCourseById(id) {
      this.$confirm("此操作将永久删除该课程, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          course
            .removeCourseById(id)
            .then((response) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.queryList();
            })
            .catch();
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    getTeacherList() {
      teacher.queryAll().then((response) => {
        this.teacherList = response.data.list;
      });
    },
    getOneSubjectList() {
      subject.queryList().then((response) => {
        this.oneSubjectList = response.data.list;
      });
    },
    refreshtwoSubject(value) {
      for (var oneSubject of this.oneSubjectList) {
        if (oneSubject.id === value) {
          this.twoSubjectList = oneSubject.children;
          if (!this.courseId) {
            this.courseInfo.subjectId = "";
          }
        }
      }
    }
  },
};
</script>