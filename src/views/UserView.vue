<!--
 * @Author: TanGuangZhi
 * @Date: 2022-02-23 18:40:52 Wed
 * @LastEditTime: 2022-03-03 16:16:35 Thu
 * @LastEditors: TanGuangZhi
 * @Description: 
 * @KeyWords: Vue, Web-Server, ElementUI
-->
<template>
  <div id="app">
    <!-- 添加用户   -->
    <AddUser :dialogObj="dialogObj" @addUser="addUser" />
    <!-- 修改用户   -->
    <UpdateUser
      :dialogObj="dialogObj"
      :lookUser="lookUser"
      :oldLookUser="oldLookUser"
      @updateUser="updateUser"
    />

    <h1 style="text-align: center">用户管理</h1>
    <el-row style="line-height: 150px" justify="space-around">
      <el-col :span="20">
        用户名:　
        <el-input
          placeholder="请输入用户名"
          v-model="searchCondition.userName"
          style="width: 120px"
        ></el-input>
        　手机号:　
        <el-input
          placeholder="请输入手机号"
          v-model="searchCondition.userPhone"
          style="width: 200px"
        ></el-input>
        　用户类型:　
        <!--<el-select v-model="searchCondition.userType.toString()" style="width: 300px" >
          <el-option label="普通用户" value="1"></el-option>
          <el-option label="影院管理员" value="2"></el-option>
          <el-option label="超级管理员" value="3"></el-option>
         </el-select>-->
        <el-button
          type="primary"
          size="mini"
          icon="el-icon-search"
          @click="searchUser"
        >
          搜索
        </el-button>
      </el-col>

      <el-col :span="4">
        <el-button type="success" size="mini" @click="dialogObj.add = true">
          添加
        </el-button>
        <el-button type="danger" size="mini" @click="deleteManyUser">
          批量删除
        </el-button>
      </el-col>
    </el-row>

    <el-row type="flex" justify="end"></el-row>
    <el-table
      :data="userPageInfo.userList"
      border
      style="width: 90%; margin: 0px auto"
      @selection-change="selApp"
    >
      <!--1.设置一个全选全消，可以实现批量删除操作-->
      <el-table-column type="selection" align="center"></el-table-column>

      <el-table-column
        align="center"
        prop="_id"
        width="80px"
        label="编号"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        prop="userName"
        label="用户名"
        sortable
      ></el-table-column>
      <el-table-column
        align="center"
        prop="userPass"
        label="密码"
      ></el-table-column>
      <el-table-column
        align="center"
        prop="userPhone"
        label="联系电话"
      ></el-table-column>
      <el-table-column align="center" prop="userType" label="类型">
        <template slot-scope="scope">
          {{ scope.row.userType | userTypeFilter }}
        </template>
      </el-table-column>

      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="info" plain size="mini" @click="showUser(scope.row)">
            修改
          </el-button>
          <el-button
            type="danger"
            plain
            size="mini"
            @click="deleteUser(scope.row._id)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--
        @size-change:当改变一页显示的数据量pageSize的时候  调用该函数 并且将改变之后pageSize作为函数的参数传入
        @current-change: 当页码改变的时候 调用该函数 并且将改变之后的nowPage作为函数的参数传入
        :current-page: 绑定的是 当前的页码值
        :page-sizes: 绑定一个数组 用来记录 改变pageSize下拉列表中的数据的
        :page-size:记录当前 一页显示的最大数据量
        :total:记录当前数据的总数
         layout：布局 total 总数, sizes 改变一页数据量的下拉列表, prev 上一页, pager 数字页码, next下一页, jumper 当前页码
      -->
    <el-pagination
      @size-change="changePageSize"
      @current-change="changeCurrentPage"
      :current-page="pageData.currentPage"
      :page-sizes="pageSizeList"
      :page-size="pageData.pageSize"
      :total="userPageInfo.total"
      layout="total, sizes, prev, pager, next, jumper"
      style="text-align: center"
      class="border"
    ></el-pagination>
  </div>
</template>
<script>
import AddUser from "./user/AddUser.vue";
import UpdateUser from "./user/UpdateUser.vue";
import { createNamespacedHelpers } from "vuex";
import pageInFo from "../mixins/pageInFoMixins.js";
import pageMixins from "../mixins/commonMixins.js";
const { mapState, mapActions } = createNamespacedHelpers("user");
export default {
  mixins: [pageMixins],
  components: {
    AddUser,
    UpdateUser,
  },
  name: "UserView",
  data() {
    return {
      lookUser: {},
      oldLookUser: {},
      idArray: [],
      insertUserArr: {},
      searchCondition: {},
    };
  },
  methods: {
    ...mapActions([
      "queryUserAsync",
      "addUserAsync",
      "deleteUserAsync",
      "updateUserAsync",
    ]),
    // 1. 查询用户
    queryUser() {
      this.queryUserAsync({ ...this.searchCondition, ...this.pageData });
    },
    // 1.1多条件查询
    searchUser() {
      console.log("111", 111);
      this.pageData.currentPage = 1;
      this.queryUser();
    },
    // 2.删除用户
    async deleteUser(_id) {
      console.log(_id);
      let status = await this.deleteUserAsync(_id);
      console.log("22", status);
      if (status == "1") {
        this.$message({
          type: "success",
          message: "删除成功",
        });
        this.queryUser();
      } else {
        this.$message({
          type: "error",
          message: "删除失败",
        });
      }
    },
    // 2.1批量删除
    deleteManyUser() {
      this.$confirm("您确定要删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "info",
      })
        .then(async () => {
          if (this.idArray.length > 0) {
            let res = await this.deleteUserAsync(this.idArray.toString());
            if (res == "1") {
              this.$message({
                type: "success",
                message: "批量删除成功",
              });
              this.changeCurrentPage(1); //修改页码为1
              this.queryUser();
            } else {
              this.$message({
                type: "error",
                message: "批量删除失败...",
              });
            }
          } else {
            this.$message({
              type: "warning",
              message: "请先选择",
            });
          }
        })
        .catch(() => {
          this.$message({
            type: "error",
            message: "已成功取消批量删除",
          });
        });
    },
    // 3. 添加用户
    async addUser(user) {
      // console.log(user)
      let status = await this.addUserAsync(user);
      if (status == "1") {
        this.dialogObj.add = false;
        this.$message({
          type: "success",
          message: "添加成功",
        });
        this.queryUser();
      } else {
        this.$message({
          type: "error",
          message: "添加失败",
        });
      }
    },
    // 4. 修改用户
    async updateUser(user) {
      console.log("user", user);
      let status = await this.updateUserAsync(user);
      console.log("status", status);
      if (status == "1") {
        this.dialogObj.update = false;
        this.$message({
          type: "success",
          message: "修改成功",
        });
        this.queryUser();
      } else if (status == "userNameAlreadyExist") {
        this.$message({
          type: "error",
          message: "用户名已存在,请修改",
        });
      } else {
        this.$message({
          type: "error",
          message: "修改失败",
        });
      }
    },
    // 5.回显数据
    showUser(user) {
      this.dialogObj.update = true;
      this.lookUser = { ...user };
      this.oldLookUser = { ...user };
    },

    // ## other
    // 1. 全选全消
    selApp(res) {
      this.idArray = res.map((item) => {
        return item._id;
      });
      console.log("222", this.idArray);
    },
  },
  created() {
    this.queryUser();
    // console.log(this.pageData.pageSizeList);
    //this.initMixinsData();
  },
  computed: {
    ...mapState(["userPageInfo"]),
  },
  watch: {
    pageData: {
      handler() {
        this.queryUser();
      },
      deep: true,
    },
  },
};
</script>
