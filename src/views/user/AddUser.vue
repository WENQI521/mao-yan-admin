<template>
  <!--1.添加用户-->
  <el-row>
    <el-col :span="24">
      <el-dialog
          title="添加用户"
          :visible.sync="dialogObj.add"
          :close-on-click-modal="false"
      >
        <el-form label-width="80px" style="width: 400px; margin: 0px auto">
          <el-form-item label="用户名:">
            <el-input
                placeholder="请输入用户名:"
                clearable
                v-model="insertUser.userName"
                style="width: 300px"
                prefix-icon="el-icon-s-custom"
            ></el-input>
          </el-form-item>

          <el-form-item label="密　码:">
            <el-input placeholder="请输入密码:" v-model="insertUser.userPass" clearable style="width: 300px" prefix-icon="el-icon-lock" show-password></el-input>
          </el-form-item>

          <el-form-item label="邮　箱:">
            <el-input placeholder="请输入邮箱:" v-model="insertUser.email" clearable style="width: 300px" prefix-icon="el-icon-message"></el-input>
          </el-form-item>


          <el-form-item label="手机号:">
            <el-input placeholder="请输入手机号:" v-model="insertUser.userPhone" clearable style="width: 300px" prefix-icon="el-icon-phone"></el-input>
          </el-form-item>


          <el-row>
            <el-col :span="24" style="text-align: center">
              <el-button type="primary" @click="addUser">添加</el-button>
              <el-button type="danger" @click="dialogObj.add = false">
                取消
              </el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
    </el-col>
  </el-row>

</template>

<script>
import $ from "jquery";
export default {
  name: "AddUser",
  props:{
    dialogObj:{type:Object}
  },

  data() {
    return {
      insertUser: {},
    };
  },
  methods: {
    addUser() {
      //$("#addForm")[0].reset();
      // document.getElementById("#addForm").reset();
      this.$emit("addUser", {...this.insertUser});
    },
  },
  created() {
    // $("#addForm")[0].reset();
  },
};
</script>

<style scoped>
</style>
