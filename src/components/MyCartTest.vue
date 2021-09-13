<template>
  <div>
    <!-- 使用v-if隐藏会使getBook失去作用 -->
    <!-- {{getBook2}} -->
    <!-- <div v-show="(seen = false)">{{ getBook2 }}</div> -->
    <!-- <div class="mainContent">
            <el-card shadow="always" class="cardone">
                  <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                        <el-breadcrumb-item>购物车</el-breadcrumb-item>
                        <el-breadcrumb-item>订单列表</el-breadcrumb-item>
                        <el-breadcrumb-item>商品详情</el-breadcrumb-item>
                  </el-breadcrumb>
                  <div class="cartorderlist">
                        <el-card shadow="hover" v-for="(item,index) in bookObj" :key="index" class="cardtwo">
                              <img :src="item.bookimg" alt="">
                              <p class="btitle">{{item.goodsName}}</p><br><br>
                              <p class="btype">{{item.booktype}}</p><br>
                              <p class="bprice">价格：{{item.price}}/元</p>
                              <el-input-number v-model="booknum" :min="1" :max="50" size="mini"></el-input-number>
                              <el-button type="danger">删除订单</el-button>
                        </el-card>
                        <div class="jiesuan">
                              <el-button type="warning" round>去结算</el-button>
                        </div>
                  </div>
            </el-card>
      </div> -->
    <div class="mainContent">
      <el-card shadow="always" class="cardone">
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>购物车</el-breadcrumb-item>
          <el-breadcrumb-item>订单列表</el-breadcrumb-item>
          <el-breadcrumb-item>商品详情</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- 商品信息 -->
        <el-table :data="shoplist" style="width: 100%">
          <el-table-column prop="bid" label="书籍id" width="180">
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
                <el-button type="primary" @click="addToCart(shoplist)">添加到购物车</el-button>
          </el-table-column>
        </el-table>
        <!--已选商品 -->
        <div class="cartorderlist">
          <el-card shadow="hover" v-for="(item, index) in cartProducts" :key="index"  class="cardtwo">
            <img :src="item.bookimg" alt="" />
            <p>{{ item.bid }}</p>
            <p class="btitle">{{ item.goodsName }}</p>
            <br /><br />
            <p class="btype">{{ item.booktype }}</p>
            <br />
            <p class="bprice">价格：{{ item.price }}/元</p>
            <p class="bprice">数量：{{ item.num }}/本</p>
            <el-button type="danger" @click="delProduct(item)">删除订单</el-button>
          </el-card>
          <el-card v-if="!cartProducts.length" shadow="hover" class="cardtwo">
            <p>您的购物车空空如也...</p>
          </el-card>
          <div class="item">总数:
                    <strong>{{totalNum}}</strong>
          </div>
          <div class="item">总价:
                <strong>{{totalPrice}}</strong>
          </div>
          <div class="item btn btn-danger">
                <el-button type="danger" @click="clearAll">清空购物车</el-button>
          </div>
          <div class="jiesuan">
            <el-button type="warning" @click="toJieSuan()" round>去结算</el-button>
          </div>
        </div>
      </el-card>
          <!-- <el-card
            shadow="hover"
            v-for="(item, index) in bookObj"
            :key="index"
            class="cardtwo"
          >
            <img :src="item.book.bookimg" alt="" />
            <p class="btitle">{{ item.book.goodsName }}</p>
            <br /><br />
            <p class="btype">{{ item.book.booktype }}</p>
            <br />
            <p class="bprice">价格：{{ item.book.price }}/元</p>
            <el-input-number
              v-model="item.count"
              :min="1"
              :max="50"
              size="mini"
            ></el-input-number>
            <el-button type="danger">删除订单</el-button>
          </el-card>
          <div class="jiesuan">
            <el-button type="warning" @click="toJieSuan()" round
              >去结算</el-button
            >
          </div>
        </div>
      </el-card> -->
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions} from 'vuex';
export default {
  data() {
    return {
      msg: "",
      cir1: true,
      cir2: false,
      booknum: 1, //购买数量
      fengmian: "",
      bookObj: []
    };
  },
  methods: {
      ...mapActions(['addToCart']),
      ...mapActions(['delProduct']),
      ...mapActions(['clearAll']),
    // 计数器
    handleChange(value) {
      console.log(value);
    },
    // 订单左侧小圆按钮
    selectOrder() {
      // this.cir1=false;
      // this.cir2=true;
      if (this.cir1 == true) {
        this.cir2 = true;
        this.cir1 = false;
      } else {
        this.cir2 = false;
        this.cir1 = true;
      }
    },
    toJieSuan() {
      this.$router.push("/jiesuan");
    }
  },
  computed: {
        ...mapGetters(['shoplist']),
        ...mapGetters(['cartProducts']),
        ...mapGetters(['totalPrice','totalNum']),
//     getBook() {
//       //获取state中的数据 this.$store.state.mycart(模块名).count(数据)
//       // let c=this.$store.state.mycart.count;
//       let b = sessionStorage.getItem("mycartbook");
//       this.$store.commit("mycart/setMyCart", JSON.parse(b));
//       let bookObj = this.$store.state.mycart.cart;
//       // // console.log(bookObj);
//       this.bookObj = bookObj;
//       let book;
//       for (let i = 0; i < bookObj.length; i++) {
//         book = bookObj[i];
//         // this.fengmian=JSON.parse(book).bookimg;
//         // console.log(JSON.parse(book));
//       }
//       // return JSON.parse(book);
//       return book;
//     },
//     getBook2() {
//       this.$store.commit("mycart/setMyCart2");
//       this.bookObj = this.$store.state.mycart.cart2;
//       return this.$store.state.mycart.cart2;
//     }
  }
};
</script>

<style scoped>
@import "../assets/css/cart.css";
</style>