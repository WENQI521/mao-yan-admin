<template>
  <!--2.修改用户-->
  <el-row>
    <el-col :span="24">
      <el-dialog title="修改用户" :visible.sync="dialogObj.update" :close-on-click-modal="false">
        <el-form label-width="80px" style="width: 400px; margin: 0px auto">


          <el-form-item label="编　号:">
            <el-input v-model="lookUser._id" readonly style="width: 300px"></el-input>
          </el-form-item>
          <el-form-item label="用户名:">
               <el-input placeholder="请输入用户名:" v-model="lookUser.userName" clearable style="width: 300px" prefix-icon="el-icon-s-custom"></el-input>
          </el-form-item>

          <el-form-item label="密　码:">
            <el-input placeholder="请输入密码:" v-model="lookUser.userPass" show-password clearable style="width: 300px" prefix-icon="el-icon-lock"></el-input>
          </el-form-item>

          <el-form-item label="手机号:">
            <el-input placeholder="请输入手机号:" v-model="lookUser.userPhone"  clearable style="width: 300px" prefix-icon="el-icon-lock"></el-input>
          </el-form-item>

           <el-form-item label="用户类型:">
            <el-select v-model="lookUser.userType" placeholder="用户类型" style="width: 300px">
              <el-option label="普通用户"  :value="1" ></el-option>
              <el-option label="管理员"    :value="2" ></el-option>
              <el-option label="超级管理员" :value="3"></el-option>
            </el-select>
          </el-form-item>
          <el-row>
            <el-col :span="24" style="text-align: center">
              <el-button type="primary" @click="updateUser">修改</el-button>
              <el-button type="danger" @click="dialogObj.update = false">取消</el-button>
            </el-col>
          </el-row>
        </el-form>
      </el-dialog>
    </el-col>
  </el-row>
</template>
<script>
import { createNamespacedHelpers } from "vuex";
const { mapState, mapActions } = createNamespacedHelpers("user");

export default {
  name: "UpdateUser",
  props:{
    dialogObj:{type:Object},
    lookUser:{type:Object},
    oldLookUser:{type:Object}
  },
  methods: {
    updateUser() {
      if(JSON.stringify(this.lookUser)==JSON.stringify(this.oldLookUser)){
        this.$message({
          type:"warning",
          message:"您修改的数据与原数据相同,无法修改"
        })
      }else {
        this.$emit("updateUser", {...this.lookUser});
      }
      console.log(this.lookUser)

    },
  },
  created() {},
  computed: {
    ...mapState(["pageInfo"]),
  },
};
</script>

<style scoped>
</style>
