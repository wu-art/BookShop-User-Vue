<template>
  <div class="product">
        <!-- <h4>已选书籍列表信息</h4> -->
        <el-button type="success">已选书籍列表信息<i class="el-icon-caret-bottom"></i></el-button>
        <table border="1" cellspacing="0" class="table table-hover table-bordered">
              <thead>
                    <tr>
                          <td>书籍ID</td>
                          <td>封面</td>
                          <td>书名</td>
                          <td>类型</td>
                          <td>价格</td>
                          <td>操作</td>
                    </tr>
              </thead>
              <tbody>
                    <tr v-for="(shop,index) in shoplist" :key="index">
                          <td>{{shop.bid}}</td>
                          <td>
                                <img :src="shop.bookimg" alt="" width="100" height="100">
                          </td>
                          <td>{{shop.goodsName}}</td>
                          <td>{{shop.booktype}}</td>
                          <td>{{shop.price}}</td>
                          <td>
                                <el-button type="primary" @click="addToCart(shop)">加入购物车</el-button>
                          </td>
                    </tr>
              </tbody>
        </table>
  </div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex';
export default {
data(){
      return{
      //      shoplist:this.$store.mycart.shop_list
      }
},
computed:{
      ...mapGetters(['shoplist'])
},
methods:{
      ...mapActions(['addToCart']),
}
}
</script>

<style scoped>
.table-bordered{
      width: 80%;
      margin-left: 10%;
}
.table-bordered tr{
      text-align: center;
}
img{
      border-radius: 10px;
}
.el-button{
      margin-left: 10%;
}
</style>