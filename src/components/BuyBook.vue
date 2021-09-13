<template>
  <div class="books">
    <p>书籍购物车</p>
    <el-button type="primary" class="tohome" @click="toHome">返回首页</el-button>
    <!-- 书籍信息 -->
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
        <el-form-item label="购买数量">
          <el-input-number v-model="num" @change="handleChange(num,bookObj.Price)" :min="1" :max="50">
          </el-input-number>
          共计：<span style="font-size:25px">{{priceSum}}</span> /元
          <span style="color:red">&emsp;(提示：最多选购50本书!)</span>
        </el-form-item>
      </el-form>
    </div>
    <!-- 订单地址信息 -->
    <div class="addressInfo">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="省份">
          <el-select v-model="orderInfo.pid" @change="getCity($event)" placeholder="请选择省份">
            <el-option v-for="item in province" :label="item.pv" :value="item.pk" :key="item.pk"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="城市">
          <el-select v-model="orderInfo.cid" @change="getXian($event)" placeholder="请选择城市">
            <el-option v-for="item in city" :label="item.cv" :value="item.ck" :key="item.ck"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="区县">
          <el-select v-model="orderInfo.cyk" @change="getCun($event)" placeholder="请选择区县">
            <el-option v-for="item in xian" :label="item.cyv" :value="item.cyk" :key="item.cyk"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="村镇">
          <el-select v-model="orderInfo.tk" @change="getMyCun($event)" placeholder="请选择村镇">
            <el-option v-for="item in cun" :label="item.tv" :value="item.tk" :key="item.tk"></el-option>
          </el-select>
        </el-form-item>
        <!-- <el-button type="primary" @click="saveAddress">查询</el-button> -->

      </el-form>
    </div>
    <div class="orderInfo">
      <!-- 订单卡片 -->
      <el-card class="box-card">
        <p>订单信息</p>
        <div class="otherInfo">
          <el-form ref="goodsForm" :rules="rules" :model="goodsInfo" label-width="80px">
            <el-form-item label="买家姓名" prop="name">
              <el-input v-model="goodsInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="商品名称" prop="goodsName">
              <el-input v-model="goodsInfo.goodsName" disabled></el-input>
            </el-form-item>
            <el-form-item label="发货地址" prop="address">
              <el-input style="width:20%" v-model="goodsInfo.address.province"></el-input>
              <el-input style="width:20%" v-model="goodsInfo.address.city"></el-input>
              <el-input style="width:20%" v-model="goodsInfo.address.xian"></el-input>
              <el-input style="width:20%" v-model="goodsInfo.address.cun"></el-input>
            </el-form-item>
            <el-form-item label="联系方式" prop="tel">
              <el-input v-model="goodsInfo.tel"></el-input>
            </el-form-item>
            <el-form-item label="商品总价" prop="price">
              <el-input v-model="priceSum" disabled></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="buyBook">立即购买</el-button>
              <el-button type="primary" @click="addCart(goodsInfo)">加入购物车</el-button>
              <el-button type="primary" @click="addCollect(goodsInfo)">加入收藏夹</el-button>
              <el-button type="primary" @click="mycart">我的购物车</el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-card>
    </div>
    <div class="bookInfo">
      <el-form label-width="80px" :model="bookObj">
        <el-form-item label="书籍描述">
          <el-input
            type="textarea"
            rows="10"
            v-model="bookObj.Desc"
            disabled
          ></el-input>
        </el-form-item>
        <el-form-item label="书籍目录">
          <el-input
            type="textarea"
            rows="15"
            v-model="bookObj.TOC"
            disabled
          ></el-input>
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
      date: "",
      num: "",
      orderInfo:{
        pid:"",
        pname:"",
        cid:"",
        cyk:"",
        tk:""
      },
      // 商品订单信息
      // goodsInfo:{
      //   bid:"",
      //   goodsName:"",  //书籍名称
      //   price:"",
      //   bookimg:"",
      //   booktype:""
      // },
      goodsInfo:{
        bid:"",
        name:"",
        goodsName:"",  //书籍名称
        address:{
          province:"",
          city:"",
          xian:"",
          cun:""
        },
        tel:"",
        price:"",
        bookimg:"",
        booktype:""
      },
      priceSum:"",
      province:[],
      city:[],
      xian:[],
      cun:[],
      // 信息验证
      rules:{
        name:[{ required: true, message: '请输入买家姓名', trigger: 'blur' }],
        tel:[{ required: true, message: '请输入联系方式', trigger: 'blur' }]
      },
      //最终订单信息
      goodsOrderInfo:{
        OrderId:0,
        BookId:"", //书籍编号
        Quantity:"",  //数量
        UnitPrice:""  //单价
      }
    };
  },
  created() {
    let book = sessionStorage.getItem("currentBook");
    this.bookObj = JSON.parse(book);
    // console.log(this.bookObj);
    this.priceSum=this.bookObj.Price;
    // 订单中的书籍编号
    this.goodsOrderInfo.BookId=this.bookObj.BookId;
    // 订单内容获取
    this.goodsInfo.goodsName=this.bookObj.Title;
    this.goodsInfo.bookimg=this.bookObj.ImageUrl;
    this.goodsInfo.booktype=this.bookObj.CategoryName;
    this.goodsInfo.price=this.bookObj.Price;
    this.goodsInfo.bid=this.bookObj.BookId;

    let date = this.bookObj.PublishDate;
    this.date = date.substring(0, 10);

    this.getProvince();
  },
  methods: {
    toHome() {
      this.$router.push("/");
    },
    // 商品计数器
    handleChange(count,val) {
      // console.log(count+"---"+val);//count商品数量  val商品单价
      this.priceSum=count*val;
      this.goodsOrderInfo.Quantity=count;
      this.goodsOrderInfo.UnitPrice=val;

      this.goodsInfo.count=count;
    },
    saveAddress(){
      console.log(this.orderInfo);
    },
    //获取省份信息
    getProvince(){
      this.$http.get("/getsheng").then((res)=>{
        // console.log(res.data);
        this.province=res.data;
      })
    },
    // 城市   四个函数中的for循环为获取详细的地址信息
    getCity(event){
      this.$http.get("/getchengshibysid?pk="+this.orderInfo.pid).then((res)=>{
        // console.log(res.data);
        this.city=res.data;
        // 获取订单省份
        for(let i=0;i<this.province.length;i++){
          if(this.province[i].pk==event){
            // console.log(this.province[i].pv);
            this.goodsInfo.address.province=this.province[i].pv;
          }
        }
      })
    },
    // 县级信息
    getXian(val){
      this.$http.get("/getcountrybycityid?ck="+this.orderInfo.cid).then((res)=>{
        // console.log(res.data);
        this.xian=res.data;
        for(let i=0;i<this.city.length;i++){
          if(this.city[i].ck==val){
            this.goodsInfo.address.city=this.city[i].cv;
          }
        }
      })
    },
    // 村镇信息
    getCun(val){
      this.$http.get("/gettownbycid?cyk="+this.orderInfo.cyk).then((res)=>{
        // console.log(res.data);
        this.cun=res.data;

        for(let i=0;i<this.xian.length;i++){
          if(this.xian[i].cyk==val){
            this.goodsInfo.address.xian=this.xian[i].cyv;
          }
        }
      })
    },
    getMyCun(val){
      // console.log(val)
      for(let i=0;i<this.cun.length;i++){
        if(this.cun[i].tk==val){
          this.goodsInfo.address.cun=this.cun[i].tv;
        }
      }
    },
    // 立即购买
    buyBook(){
      let uid=sessionStorage.getItem("uid");
      if(uid != null){
        this.$http.post("/createorder",this.goodsOrderInfo).then((res)=>{
          console.log(this.goodsOrderInfo);
          console.log(res.data);
        })
      }else{
        this.$message.error("请先登录");
      }      
    },
    // 加入购物车
    addCart(val){
      let uid=sessionStorage.getItem("uid");
      if(uid != null){
        this.$store.state.mycart.shop_list.push(val);
        
        let book=JSON.stringify(val);       
        sessionStorage.setItem("mycartbook",book);
        // sessionStorage.setItem("mycartbook",currentBookObj);
        // let aa=sessionStorage.getItem("mycartbook");
        // console.log(JSON.parse(aa));

        this.$message.success("添加成功!");
        // console.log(JSON.parse(book)); //书籍信息
      }else{
        this.$message.error("请先登录");
      }
    },
    mycart(){
      this.$router.push("/mycart");
    },
    // 加入收藏夹
    addCollect(val){
      // console.log(val);
      this.$store.state.mycollect.collect.push(val);
      this.$message.success("收藏成功");
    }
  }
};
</script>

<style scoped>
.books p {
  font-size: 35px;
  height: 40px;
  margin-left: 45%;
  font-family: "楷体";
  position: relative;
  top: 70px;
}
.books .tohome {
  height: 40px;
  width: 70px;
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
.orderInfo {
  width: 50%;
  height: 500px;
  margin: 0 auto;
  background-color: skyblue;
}
.addressInfo{
  width: 80%;
  height: 42px;
  margin: 0 auto;
}
.orderInfo .box-card{
  width: 100%;
  height: 100%;
  margin-top: 10px;
}
.box-card p{
  width: 20%;
  margin-left: 40%;
  margin-top: -10%;
}
.orderInfo .otherInfo{
  width: 100%;
  height: 100%;
  margin-top: 13%;
}
</style>