<template>
  <div>
    <div v-show="(seen = false)">{{ myLove }}</div>
    <!-- {{myLove}} -->
    <el-table :data="collectData" style="width: 100%">
      <el-table-column prop="bookimg" label="封面" width="180">
        <template slot-scope="scope">
          <img :src="scope.row.bookimg" alt="" width="100px" height="150px" />
        </template>
      </el-table-column>
      <el-table-column prop="goodsName" label="书名" width="180">
      </el-table-column>
      <el-table-column prop="booktype" label="类型"> </el-table-column>
      <el-table-column prop="price" label="价格"> </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="danger" @click="delCollect(scope.$index)"
            >删除记录</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collectData: []
    };
  },
  computed: {
    myLove() {
      // let collectArr=this.$store.commit("mycollect/setCollect");
      let collectArr = this.$store.state.mycollect.collect;
      this.collectData = collectArr;
      // console.log(this.collectData)
      return true;
    }
  },
  methods: {
    delCollect(index) {
      // let bool=this.$confirm("确定删除?");
      // if(bool){
      //       this.collectData.splice(index,1);
      //       this.$message.success("删除成功");
      //       console.log(bool);
      // }
      this.$confirm(
        "确定删除该条收藏?",
        "提示",
        {
          distinguishCancelAndClose: true,
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        }
      )
        .then(() => {
              this.collectData.splice(index,1);
          this.$message({
            type: "success",
            message: "删除成功"
          });
        })
        .catch(action => {
          this.$message({
            type: "error",
            message:"取消删除"
          });
        });
    }
  }
};
</script>

<style>
</style>