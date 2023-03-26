<template>
  <div class="app-container">
    <h2 style="text-align: center">发布新课程</h2>
    <el-steps
      :active="2"
      process-status="wait"
      align-center
      style="margin-bottom: 40px"
    >
      <el-step title="填写课程基本信息" />
      <el-step title="创建课程大纲" />
      <el-step title="最终发布" />
    </el-steps>
    <el-button type="text" @click="openChapterDlg()">添加章节</el-button>
    <!-- 章节 -->
    <ul class="chanpterList">
      <li v-for="chapter in chapterNestedList" :key="chapter.id">
        <p>
          {{ chapter.title }}
          <span class="acts">
            <el-button type="text" @click="openVideoDlg(chapter.id)"
              >添加课时</el-button
            >
            <el-button style="" type="text" @click="openChapterDlg(chapter.id)"
              >编辑</el-button
            >
            <el-button type="text" @click="deleteChapter(chapter.id)"
              >删除</el-button
            >
          </span>
        </p>
        <!-- 视频 -->
        <ul class="chanpterList videoList">
          <li v-for="video in chapter.children" :key="video.id">
            <p>
              {{ video.title }}
              <span class="acts">
                <el-button
                  type="text"
                  @click="openVideoDlg(chapter.id, video.id)"
                  >编辑</el-button
                >
                <el-button type="text" @click="deleteVideo(video.id)"
                  >删除</el-button
                >
              </span>
            </p>
          </li>
        </ul>
      </li>
    </ul>
    <div>
      <el-button @click="previous">上一步</el-button>
      <el-button :disabled="saveBtnDisabled" type="primary" @click="next"
        >下一步</el-button
      >
    </div>
    <!-- 添加和修改章节表单 -->
    <el-dialog :visible.sync="dialogChapterFormVisible" title="添加章节">
      <el-form :model="chapter" label-width="120px">
        <el-form-item label="章节标题">
          <el-input v-model="chapter.title" />
        </el-form-item>
        <el-form-item label="章节排序">
          <el-input-number
            v-model="chapter.sort"
            :min="0"
            controls-position="right"
          />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogChapterFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="saveOrUpdateChapter">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 添加和修改课时表单 -->
    <el-dialog :visible.sync="dialogVideoFormVisible" title="添加课时">
      <el-form :model="video" label-width="120px">
        <el-form-item label="课时标题">
          <el-input v-model="video.title" />
        </el-form-item>
        <el-form-item label="课时排序">
          <el-input-number
            v-model="video.sort"
            :min="0"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item label="是否免费">
          <el-radio-group v-model="video.isFree">
            <el-radio :label="true">免费</el-radio>
            <el-radio :label="false">默认</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="上传视频">
          <el-upload
            :on-success="handleVodUploadSuccess"
            :on-remove="handleVodRemove"
            :before-remove="beforeVodRemove"
            :on-exceed="handleUploadExceed"
            :file-list="fileList"
            :action="BASE_API + '/videovod/uploadVideo'"
            :limit="1"
            class="upload-demo"
          >
            <el-button size="small" type="primary">上传视频</el-button>
            <el-tooltip placement="right-end">
              <div slot="content">
                最大支持1G，<br />
                支持3GP、ASF、AVI、DAT、DV、FLV、F4V、<br />
                GIF、M2T、M4V、MJ2、MJPEG、MKV、MOV、MP4、<br />
                MPE、MPG、MPEG、MTS、OGG、QT、RM、RMVB、<br />
                SWF、TS、VOB、WMV、WEBM 等视频格式上传
              </div>
              <i class="el-icon-question" />
            </el-tooltip>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogVideoFormVisible = false">取 消</el-button>
        <el-button
          :disabled="saveVideoBtnDisabled"
          type="primary"
          @click="saveOrUpdateVideo"
          >确 定</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import chapter from "@/api/edu/chapter.js";
export default {
  data() {
    return {
      saveBtnDisabled: false,
      saveVideoBtnDisabled: false,
      courseId: "",
      chapterNestedList: [],
      chapter: {},
      dialogChapterFormVisible: false,
      video: {},
      dialogVideoFormVisible: false,
      fileList: [], //上传文件列表
      BASE_API: process.env.BASE_API, // 接口API地址
    };
  },
  created() {
    if (this.$route.params && this.$route.params.id) {
      this.courseId = this.$route.params.id;
    }
    this.queryChapterList();
  },
  methods: {
    handleVodRemove(file, fileList) {
      chapter.deleteVod(this.video.videoSourceId).then((response) => {
        this.$message({
          type: "success",
          message: "删除视频成功",
        });
        this.video.videoSourceId = "";
        this.video.videoOriginalName = "";
        this.fileList=[];
      });
    },
    beforeVodRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    handleVodUploadSuccess(response, file, fileList) {
      this.video.videoSourceId = response.data.videoId;
      this.video.videoOriginalName = file.name;
    },
    handleUploadExceed() {
      this.$message.warning("想要重新上传视频，请先删除已上传的视频");
    },
    openVideoDlg(chapterId, videoId) {
      this.video = {};
      this.video.courseId = this.courseId;
      this.video.chapterId = chapterId;
      this.dialogVideoFormVisible = true;
      if (videoId) {
        chapter.getVideo(videoId).then((response) => {
          this.video = response.data.video;
        });
      }
    },
    saveOrUpdateVideo(chapterId) {
      if (this.video.id) {
        chapter.updateVideo(this.video).then((response) => {
          this.dialogVideoFormVisible = false;
          this.$message({
            type: "success",
            message: "编辑课时成功",
          });
          this.queryChapterList();
        });
      } else {
        chapter.addVideo(this.video).then((response) => {
          this.dialogVideoFormVisible = false;
          this.$message({
            type: "success",
            message: "添加课时成功",
          });
          this.queryChapterList();
        });
      }
    },
    deleteVideo(videoId) {
      this.$confirm("此操作将永久删除该课时, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          chapter
            .deleteVideo(videoId)
            .then((response) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.queryChapterList();
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
    openChapterDlg(chapterId) {
      this.chapter = {};
      this.dialogChapterFormVisible = true;
      if (chapterId) {
        chapter.getChapter(chapterId).then((response) => {
          this.chapter = response.data.chapter;
        });
      }
    },
    saveOrUpdateChapter() {
      this.chapter.courseId = this.courseId;
      if (this.chapter.id) {
        chapter.updateChapter(this.chapter).then((response) => {
          this.dialogChapterFormVisible = false;
          this.$message({
            type: "success",
            message: "编辑章节成功",
          });
          this.queryChapterList();
        });
      } else {
        chapter.addChapter(this.chapter).then((response) => {
          this.dialogChapterFormVisible = false;
          this.$message({
            type: "success",
            message: "添加章节成功",
          });
          this.queryChapterList();
        });
      }
    },
    deleteChapter(chapterId) {
      this.$confirm("此操作将永久删除该章节, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          chapter
            .deleteChapter(chapterId)
            .then((response) => {
              this.$message({
                type: "success",
                message: "删除成功!",
              });
              this.queryChapterList();
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
    queryChapterList() {
      chapter.queryChapterList(this.courseId).then((response) => {
        this.chapterNestedList = response.data.list;
      });
    },
    previous() {
      this.$router.push({ path: "/course/info/" + this.courseId });
    },
    next() {
      this.$router.push({ path: "/course/publish/" + this.courseId });
    },
  },
};
</script>
<style scoped>
.chanpterList {
  position: relative;
  list-style: none;
  margin: 0;
  padding: 0;
}
.chanpterList li {
  position: relative;
}
.chanpterList p {
  float: left;
  font-size: 20px;
  margin: 10px 0;
  padding: 10px;
  height: 70px;
  line-height: 50px;
  width: 100%;
  border: 1px solid #ddd;
}
.chanpterList .acts {
  float: right;
  font-size: 14px;
}
.videoList {
  padding-left: 50px;
}
.videoList p {
  float: left;
  font-size: 14px;
  margin: 10px 0;
  padding: 10px;
  height: 50px;
  line-height: 30px;
  width: 100%;
  border: 1px dotted #ddd;
}
</style>