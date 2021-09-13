<template>
  <div class="books">
        <p>书籍信息</p>
        <el-button type="primary" @click="toHome">返回首页</el-button>
        <el-button type="primary" @click="addCart">加入购物车<i class="el-icon-shopping-cart-full"></i></el-button>
        <el-button type="primary" @click="toCart">查看</el-button>
    <div class="bookImg">
      <img
        :src="bookObj.ImageUrl"
        alt="书籍封面"
        width="280px"
        height="400px"
      />
      <el-form label-width="80px" :model="bookObj">
        <el-form-item label="书名">
          <span slot="label">书&emsp;&emsp;名</span>
          <el-input v-model="bookObj.Title" disabled></el-input>
        </el-form-item>
        <el-form-item label="作者">
          <span slot="label">作&emsp;&emsp;者</span>
          <el-input v-model="bookObj.Author" disabled></el-input>
        </el-form-item>
        <el-form-item label="出版社">
          <el-input v-model="bookObj.PublishName" disabled></el-input>
        </el-form-item>
        <el-form-item label="出版时间">
          <el-input v-model="date" disabled></el-input>
          <!-- {{bookObj.PublishDate | bookDate}} -->
        </el-form-item>
        <el-form-item label="所属类别">
          <el-input v-model="bookObj.CategoryName" disabled></el-input>
        </el-form-item>
        <el-form-item label="书籍单价">
          <el-input v-model="bookObj.Price" disabled></el-input>
        </el-form-item>
      </el-form>
    </div>
    <div class="bookInfo">
      <el-form label-width="80px" :model="bookObj">
        <el-form-item label="书籍描述">
          <el-input type="textarea" rows="10" v-model="bookObj.Desc" disabled></el-input>
        </el-form-item>
        <el-form-item label="书籍目录">
          <el-input type="textarea"  rows="15" v-model="bookObj.TOC" disabled></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      bookObj: {},
      cartBook:{
        bid:"",
        bookimg:"",
        goodsName:"",
        price:"",
        booktype:""
      },
      date: ""
    };
  },
  created() {
    let book = sessionStorage.getItem("currentBook");
    this.bookObj = JSON.parse(book);
    let date = this.bookObj.PublishDate;
    this.date = date.substring(0, 10);

    let cartbook=JSON.parse(book);
    // console.log(cartbook);
    this.cartBook.bid=cartbook.BookId;
    this.cartBook.bookimg=cartbook.ImageUrl;
    this.cartBook.goodsName=cartbook.Title;
    this.cartBook.price=cartbook.Price;
    this.cartBook.booktype=cartbook.CategoryName;
  },
  methods:{
        toHome(){
              this.$router.push("/");
        },
        addCart(){
          let uid=sessionStorage.getItem("uid");
          if(uid != null){
            this.$store.state.mycart.shop_list.push(this.cartBook);
              // sessionStorage.setItem("mycartbook",JSON.stringify(this.cartBook));
            this.$message.success("加入成功!")
          }else{
            this.$message.error("请先登录");
          }
        },
        toCart(){
          let uid=sessionStorage.getItem("uid");
          if(uid != null){
              this.$router.push("/mycart");
          }else{
            this.$message.error("请先登录");
          }
        }
  }
};
</script>

<style scoped>
.books p{
      font-size: 35px;
      height: 40px;
      margin-left: 47%;
      font-family: "楷体";
      position: relative;
      top: 70px;
}
.books .el-button{
      height: 40px;
      width: 100px;
      padding-left: 5px;
      position: relative;
      top: -100px;
}
.bookImg img {
  margin-left: 320px;
  margin-top: 100px;
}
.bookImg .el-form {
  width: 40%;
  margin-left: 600px;
  margin-top: -400px;
}
.bookInfo {
  width: 70%;
  height: 200px;
  margin: 0 auto;
  padding-top: 40px;
}
</style>