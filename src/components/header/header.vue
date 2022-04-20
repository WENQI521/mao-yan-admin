<template>
  <div class="header-box">
    <el-row type="flex" justify="space-between" style="line-height: 70px">
      <!-- <el-button type="primary" size="default" @click="test">
        面包屑测试按钮
      </el-button> -->

      <el-col :span="12">
        <!-- <button class="btn-tool" title="折叠" @click="collapse">
          <i class="el-icon-d-arrow-left"></i>
        </button>
        <button class="btn-tool" title="刷新" @click="refresh">
          <i class="el-icon-refresh"></i>
        </button>
        <button class="btn-tool" title="全屏" @click="Utils.fullScreen">
          <i class="el-icon-rank"></i>
        </button> -->
        <!-- <router-link to="/home">首页</router-link>
        <span>　>　</span>
        <router-link :to="$route.path">
          <span>{{ $route.meta.title }}</span>
        </router-link>
        <span>{{ $route.meta.subTitle }}</span> -->

        <el-breadcrumb class="app-breadcrumb" separator="/">
          <el-breadcrumb-item
            v-for="(item, index) in levelList"
            :key="item.path"
          >
            <a
              v-if="
                item.redirect === 'noRedirect' || index == levelList.length - 1
              "
              class="no-redirect"
            >
              {{ item.meta.title }}
            </a>
            <span v-else @click.prevent="handleLink(item)">
              {{ item.meta.title }}
            </span>
          </el-breadcrumb-item>
        </el-breadcrumb>
      </el-col>

      <el-col :span="6" align="right">
        <!-- <span>{{ Utils.todayDate() }}</span> -->
        <div class="block">
          <el-avatar shape="square" :size="50" :src="url"></el-avatar>
          <el-dropdown
            trigger="click"
            class="user-name"
            @command="handleCommand"
            style="margin-bottom: 20px"
          >
            <span class="el-dropdown-link" style="margin-bottom: 20px">
              {{ userName }}
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="profile" disabled>
                个人资料
              </el-dropdown-item>
              <el-dropdown-item command="updatepwd" disabled>
                修改密码
              </el-dropdown-item>
              <el-dropdown-item command="logout" divided>
                退出登录
              </el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import pathToRegexp from "path-to-regexp";
export default {
  inject: ["reload"],
  data() {
    return {
      isCollapse: false,
      dialogVisible: false,
      breadcrumb: [],
      userName: "kunkkaTest",
      levelList: null,
      url: "/images/avatar/avatar3.png",
    };
  },
  methods: {
    collapse() {
      this.$store.commit("switchCollapse");
    },
    refresh() {
      this.reload();
    },

    handleCommand(command) {
      switch (command) {
        case "logout":
          this.$router.replace({ path: "/login" });
          // #TODO set token expired
          break;
      }
    },
    // setQueryPath(index) {
    //   // 设置面包屑的query参数
    //   const tmp = JSON.parse(JSON.stringify(this.breadcrumb));
    //   if (index === 0) {
    //     return "/";
    //   } else {
    //     return "/" + tmp.slice(1).slice(0, index).join("/");
    //     // return tmp.slice(0, index + 1).join('/')
    //   }
    // },
    getBreadcrumb() {
      // only show routes with meta.title
      let matched = this.$route.matched.filter(
        (item) => item.meta && item.meta.title
      );
      const first = matched[0];

      if (!this.isDashboard(first)) {
        matched = [{ path: "/dashboard", meta: { title: "Dashboard" } }].concat(
          matched
        );
      }

      this.levelList = [
        ...matched.filter(
          (item) =>
            item.meta && item.meta.title && item.meta.breadcrumb !== false
        ),
      ];
    },
    isDashboard(route) {
      const name = route && route.name;
      if (!name) {
        return false;
      }
      return (
        name.trim().toLocaleLowerCase() === "Dashboard".toLocaleLowerCase()
      );
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route;
      var toPath = pathToRegexp.compile(path);
      return toPath(params);
    },
    handleLink(item) {
      const { redirect, path } = item;
      if (redirect) {
        this.$router.push(redirect);
        return;
      }
      this.$router.push(this.pathCompile(path));
    },
    // test() {
    //   let matched = this.$route.matched.find((item) => item.name);
    //   if (matched.name.toLocaleLowerCase() !== "home") {
    //     this.breadcrumb.push({ path: matched.path, title: matched.meta.title });
    //   } else {
    //   }
    //   // const first = matched[0];
    //   // if (first && first.name.trim().toLocaleLowerCase() !== "home") {
    //   //   matched = [{ path: "/home", meta: { title: "Home" } }].concat(matched);
    //   // }
    //   console.log(this.breadcrumb);
    // },
  },
  created() {
    this.getBreadcrumb();
  },
  watch: {
    $route() {
      this.getBreadcrumb();
    },
  },
};
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>
