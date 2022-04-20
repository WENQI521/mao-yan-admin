<template>
  <!--2.修改电影-->
  <div id="updateModal">
    <el-dialog title="修改电影" :visible.sync="dialogObj.update">
      <div slot="footer" class="dialog-footer">
        <el-form label-width="80px" style="margin: 0px auto; width: 400px">
          <el-form-item label="电影编号:">
            <el-input
                clearable
                v-model.number="updateObj._id"
                readonly
                style="width: 300px"
            ></el-input>
          </el-form-item>
          <el-form-item label="电影名称:">
            <el-input
                placeholder="请输入电影名称"
                clearable
                v-model.trim="updateObj.filmName"
                style="width: 300px"
            ></el-input>
          </el-form-item>

          <el-form-item label="电影语言:">
            <el-input
                placeholder="请输入电影语言"
                clearable
                v-model.number="updateObj.language"
                style="width: 300px"
            ></el-input>
          </el-form-item>

          <el-form-item label="拍摄国家:" justify="center">
            <el-input
                placeholder="请输入拍摄国家"
                clearable
                v-model.number="updateObj.filmArea"
                style="width: 300px"
            ></el-input>
          </el-form-item>

          <el-form-item label="电影类型:">
            <el-select
                v-model="updateObj.filmTypeId"
                style="width: 300px"
            >
              <el-option :label="type.filmType" :value="type._id" v-for="(type,index) in filmType" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="电影图片">
            <el-upload
                action="http://localhost:3000/film/upLoadImg"
                list-type="picture-card"
                :auto-upload="false"
                name="filmImg"
                :on-success="successUploadImg"
                :on-error="errorUploadImg"
                ref="updateImg"
            >
              <i slot="default" class="el-icon-plus"></i>
            </el-upload>
          </el-form-item>

          <el-row style="text-align: center">
            <el-col :span="24">
              <el-button type="primary" @click="uploadFilmImg">
                确认修改
              </el-button>
              <el-button type="danger" @click="dialogObj.update = false">
                返回
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: "UpdateFilm",
  props: {
    dialogObj: {type: Object},
    updateObj: {type: Object},
    oldUpdateObj: {type: Object},
  },
  data() {
    return {
      colors: ["#99A9BF", "#F7BA2A", "#FF9900"],
      filmType: [
        {
          "_id": 1,
          "filmType": "爱情"
        },
        {
          "_id": 2,
          "filmType": "喜剧"
        },
        {
          "_id": 3,
          "filmType": "动画"
        },
        {
          "_id": 4,
          "filmType": "剧情"
        },
        {
          "_id": 5,
          "filmType": "惊悚"
        },
        {
          "_id": 6,
          "filmType": "科幻"
        },
        {
          "_id": 7,
          "filmType": "动作"
        },
        {
          "_id": 8,
          "filmType": "悬疑"
        },
        {
          "_id": 9,
          "filmType": "犯罪"
        },
        {
          "_id": 10,
          "filmType": "冒险"
        },
        {
          "_id": 11,
          "filmType": "战争"
        },
        {
          "_id": 12,
          "filmType": "奇幻"
        },
        {
          "_id": 13,
          "filmType": "运动"
        },
        {
          "_id": 14,
          "filmType": "武侠"
        },
        {
          "_id": 15,
          "filmType": "历史"
        }
      ],
    };
  },
  methods: {
    // 1.上传图片成功的时候触发
    successUploadImg(filmImg) {
      this.updateObj.filmImg = filmImg;
      this.$emit("updateFilm", {...this.updateObj});
    },
    //2.上传图片失败触发
    errorUploadImg() {
      this.$message({
        type: "error",
        message: "上传图片失败，修改失败",
      });
    },
    //3.点击修改按钮触发
    uploadFilmImg() {
      if (this.$refs.updateImg.uploadFiles.length > 0) {
        this.$refs.updateImg.submit();
      } else if (
          JSON.stringify(this.updateObj) == JSON.stringify(this.oldUpdateObj)
      ) {
        this.$message({
          type: "error",
          message: "您要修改的数据与原数据一致，修改失败",
        });
      } else {
        //说明没有修改图片，修改了其他的信息
        this.$emit("updateFilm", {...this.updateObj});
      }
    },
  },
};
</script>

<style scoped></style>
