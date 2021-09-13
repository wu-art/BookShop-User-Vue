<template>
  <div>
    <div class="breadcrumb">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>购物车管理</el-breadcrumb-item>
        <el-breadcrumb-item>书籍列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <product></product>
    <br />
    <cart></cart>
    <info></info>
  </div>
</template>

<script>
import product from "./mycart/product";
import cart from "./mycart/cart";
import info from "./mycart/info";
export default {
  components: {
    product,
    cart,
    info
  }
};
</script>

<style scoped>
.breadcrumb{
      margin-left: 10%;
      margin-top: 20px;
      margin-bottom: 20px;
}
</style>