<template>
  <div class="product">
    <!-- <h4>购物车书籍</h4> -->
    <el-button type="success">购物车书籍<i class="el-icon-caret-bottom"></i></el-button>
    <!-- <el-table :data="cartProducts" style="width: 100%">
          <el-table-column prop="bid" label="书籍ID" width="180">
          </el-table-column>
          <el-table-column prop="bookimg" label="封面" width="180">
            <template slot-scope="scope">
              <img :src="scope.row.bookimg" alt="" width="100" height="100">
            </template>
          </el-table-column>
          <el-table-column prop="goodsName" label="书名" width="180">
          </el-table-column>
          <el-table-column prop="booktype" label="类型"> </el-table-column>
          <el-table-column prop="price" label="价格"> </el-table-column>
          <el-table-column label="操作">
                <el-button type="primary" @click="delProduct(cartProducts)">删除</el-button>
          </el-table-column>
        </el-table> -->
    <!-- <p v-if="!cartProducts.length" style="width: 100%">
          您的购物车空空如也...
        </p> -->
    <!-- {{cartProducts}} -->
    <table border="1" cellspacing="0" class="table-hover">
      <thead>
        <tr>
          <td>书籍ID</td>
          <td>封面</td>
          <td>书名</td>
          <td>价格</td>
          <td>类型</td>
          <td>数量</td>
          <td>操作</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(shop, index) in cartProducts" :key="index">
          <td>{{ shop.bid }}</td>
          <td>
            <img :src="shop.bookimg" alt="" width="100" height="100" />
          </td>
          <td>{{ shop.goodsName }}</td>
          <td>{{ shop.price }}</td>
          <td>{{ shop.booktype }}</td>
          <td>{{ shop.num }}</td>
          <td>
            <el-button type="danger" @click="delProduct(shop)">删除</el-button>
          </td>
        </tr>
        <tr v-if="!cartProducts.length">
          <td colspan="7" class="text-center">您的购物车空空如也...</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {
      MyProducts:{}
    };
  },
  computed: {
    ...mapGetters(["cartProducts"]),
  },
  methods: {
    ...mapActions(["delProduct"]),
  }
};
</script>

<style scoped>
.table-hover {
  width: 80%;
  margin-left: 10%;
}
.table-hover tr {
  text-align: center;
}
img {
  border-radius: 10px;
}
.el-button {
  margin-left: 10%;
}
</style>