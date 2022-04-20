<template>
  <div id="orderView">
    <h1 style="text-align: center">订单管理</h1>
    <el-row style="line-height: 100px; text-align: center">
      <el-col :span="16">
        订单编号　
        <el-input
            placeholder="请输入订单编号"
            v-model.trim="searchCondition.orderId"
            style="width: 150px"
        ></el-input>
        　订单状态: 　
        <el-select v-model="searchCondition.orderStatus">
          <el-option label="请选择" value=""></el-option>
          <el-option
              label="已完成"
              value="completed"
          ></el-option>
          <el-option
              label="未完成"
              value="waitingPay"
          ></el-option>
        </el-select>
        　
        <el-button
            type="primary"
            size="mini"
            icon="el-icon-search"
            @click="queryOrder"
        >
          搜索
        </el-button>
      </el-col>
      <el-col :span="8">
        <el-button
            size="mini"
            type="warning"
            icon="el-icon-delete"
            @click="deleteOrder()"
        >
          批量删除
        </el-button>
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="20" :offset="2">
        <el-table
            :data="orderPageInfo.orderList"
            border
            @selection-change="selOrder"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column
              label="编号"
              prop="_id"
              align="center"
              width="80px"
              sortable
          ></el-table-column>
          <el-table-column
              label="订单编号"
              prop="orderId"
              align="center"
          ></el-table-column>
          <el-table-column
              label="订单状态"
              prop="orderStatus"
              align="center"
          >
            <template slot-scope="scope">
              {{ scope.row.orderStatus | orderStatusFilter }}
            </template>
          </el-table-column>
          <el-table-column
              label="用户"
              width="120px"
              align="center"
          >
            <template slot-scope="scope">
                            {{ scope.row.user[0]|userNameFilter}}
<!--              {{ userName(scope.row.user[0]) }}-->
            </template>
          </el-table-column>
          <el-table-column
              label="电影名称"
              align="center"
              prop="film[0].filmName"
          >
          </el-table-column>
          <el-table-column label="操作" width="200px" align="center">
            <template slot-scope="scope">
              <el-button
                  size="mini"
                  icon="el-icon-delete"
                  type="danger"
                  @click="deleteOrder(scope.row._id)"
              >
                删除
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-col>
    </el-row>
    <el-pagination
        @size-change="changePageSize"
        @current-change="changeCurrentPage"
        :current-page="pageData.currentPage"
        :page-sizes="pageSizeList"
        :page-size="pageData.pageSize"
        :total="orderPageInfo.total"
        layout="total, sizes, prev, pager, next, jumper"
        style="text-align: center"
        class="border"
    ></el-pagination>
  </div>
</template>
<script>
import pageInFoMixins from "@/mixins/pageInFoMixins";
import {createNamespacedHelpers} from "vuex";

const {mapState, mapActions} = createNamespacedHelpers("order");

export default {
  mixins: [pageInFoMixins],
  name: "OrderView",
  data() {
    return {
      searchCondition: {},
      idArr: []
    }
  },
  methods: {
    ...mapActions(["queryOrderAsync", "deleteOrderAsync", "deleteManyOrderAsync"]),
    changePageSize(val) {
      this.pageData.pageSize = val
      this.queryOrder();
    },
    changeCurrentPage(val) {
      this.pageData.currentPage = val;
      this.queryOrder();
    },
    userName(data) {
      return data?.userName ?? "暂无";
    },

    //查询订单
    queryOrder() {
      this.queryOrderAsync({...this.pageData, ...this.searchCondition});
    },

    async deleteOrder(_id) {
      let idArr = _id ?? this.idArr;
      let res = await this.deleteOrderAsync(idArr);
      if (res == "1") {
        this.$message({
          type: "success",
          message: "删除成功"
        })
        this.queryOrder();
      } else {
        this.$message({
          type: "error",
          message: "删除失败",
        });
      }
    },

    selOrder(selVal) {
      this.idArr = selVal.map(item => {
        return item._id;
      })
    },

    deleteManyOrder() {
      // this.$confirm("您确定要删除吗?", "提示", {
      //   confirmButtonText: "删除",
      //   cancelButtonText: "取消",
      //   type: "info"
      // }).then(async () => {
      //   if (this.idArr.length > 0) {
      //     let res = await this.deleteManyOrderAsync(this.idArr.toString());
      //     if (res == "1") {
      //       this.$message({
      //         type: "success",
      //         message: "批量删除成功"
      //       });
      //       await this.queryOrder();
      //     } else {
      //       this.$message({
      //         type: "error",
      //         message: "批量删除失败..."
      //       });
      //     }
      //   } else {
      //     this.$message({
      //       type: "warning",
      //       message: "请先选择"
      //     });
      //   }
      // }).catch(() => {
      //   this.$message({
      //     type: "error",
      //     message: "已成功取消批量删除"
      //   });
      // });
    },

  },
  created() {
    this.queryOrder();
  },
  computed: {
    ...mapState(["orderPageInfo"])
  }
}
</script>

<style scoped>

</style>