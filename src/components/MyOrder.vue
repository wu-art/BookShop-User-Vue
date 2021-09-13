<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>购物车</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <el-table :data="BookArr" style="width: 80%" class="tableone">
      <el-table-column prop="orderInfo.OrderId" label="订单编号">
      </el-table-column>
      <el-table-column prop="orderInfo.OrderDate" label="订单日期">
      </el-table-column>
      <el-table-column prop="orderInfo.OrderState" label="订单状态">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" size="mini" @click="lookDetail(scope.row)"
            >订单详情</el-button
          >
          <el-button type="danger" size="mini" @click="cancelOrder(scope.row)"
            >取消订单</el-button
          >
          <el-button
            type="danger"
            size="mini"
            @click="delOrder(scope.row, scope.$index)"
            >删除订单</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <!-- 详情弹窗 -->
    <el-dialog title="其他信息" :visible.sync="detailDialog" width="60%">
      <el-table :data="otherInfo" style="width: 100%">
        <el-table-column prop="BookId" label="书籍ID"> </el-table-column>
        <el-table-column prop="Quantity" label="书籍数量"> </el-table-column>
        <el-table-column prop="UnitPrice" label="订单价格"> </el-table-column>
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button @click="detailDialog = false">取 消</el-button>
        <el-button type="primary" @click="detailDialog = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      detailDialog: false,
      BookArr: [],
      otherInfo: []
    };
  },
  created() {
    this.getOrderList();
  },
  methods: {
    //   获取订单列表
    getOrderList() {
      let uid = sessionStorage.getItem("uid");
      if (uid != null) {
        this.$http.post("/myorder").then(res => {
            //   console.log(res);
          if (res.status == 200) {
            this.BookArr = res.data;
          } else {
            this.$message.error("服务器错误!");
          }
        });
      } else {
        this.$message.error("请先登录");
      }
    },
    //     订单详情
    lookDetail(row) {
      this.detailDialog = true;
      // console.log(row);
      this.otherInfo = row.orderBooksInfo;
    },
    //     删除订单
    delOrder(row, index) {
      this.$confirm("确定删除该订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.BookArr.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //     取消订单
    cancelOrder(row) {
      //     console.log(row);
      this.$confirm("确定取消该订单?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
          let orderid=row.orderInfo.OrderId;
          this.$http.post("/cancelorder?orderid="+orderid).then((res)=>{
            //     console.log(res);
                if(res.status==200){
                      this.$message.success(res.data.statedesc);
                }else{
                      this.$message.error(res.data.statedesc);
                }
          })
        }).catch(() => {
          this.$message({
            type: "info",
            message: "已取消操作"
          });
        });
    }
  }
};
</script>

<style scoped>
.el-breadcrumb {
  margin-left: 100px;
  margin-top: 20px;
}
.tableone {
  margin-left: 100px;
  margin-top: 20px;
}
</style>