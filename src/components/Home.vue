<template>
  <div class="home">
    <el-container>
      <el-header>
        <!-- 个人信息弹出框 -->
        <el-dialog title="个人信息" :visible.sync="selfinfoDia" width="60%">
          <el-form :inline="true" :model="selfInfo" class="demo-form-inline">
            <el-form-item label="头像">
              <div class="block"><el-avatar shape="square" :size="50" :src="`${baseUrl}${squareUrl}`"></el-avatar></div>
              <el-upload
                class="upload-demo"
                action=""
                :on-preview="handlePreview">
                <el-button size="small" type="primary">点击上传</el-button>
                <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
              </el-upload>
              <el-button size="small" type="primary" @click="updateTouXiang">确定上传</el-button>
            </el-form-item><br>
            <el-form-item label="昵称">
              <el-input v-model="selfInfo.LoginId"></el-input>
            </el-form-item>
            <el-form-item label="密码">
              <el-input v-model="selfInfo.LoginPwd"></el-input>
            </el-form-item>
            <el-form-item label="邮箱">
              <el-input v-model="selfInfo.Mail"></el-input>
            </el-form-item>
            <el-form-item label="地址">
              <el-input v-model="selfInfo.Address"></el-input>
            </el-form-item>
            <el-form-item label="姓名">
              <el-input v-model="selfInfo.Name"></el-input>
            </el-form-item>
            <el-form-item label="电话">
              <el-input v-model="selfInfo.Phone"></el-input>
            </el-form-item>
            <el-form-item label="角色">
              <el-input v-model="RoleName"></el-input>
            </el-form-item>
          </el-form>
          <span slot="footer" class="dialog-footer">
            <el-button @click="selfinfoDia = false">取 消</el-button>
            <el-button type="primary" @click="selfinfoDia = false">确 定</el-button>
          </span>
        </el-dialog>
        <el-menu :router="true" class="el-menu-demo" mode="horizontal" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b">
          <el-submenu index="#" v-if="boolImg">
            <template slot="title">个人中心</template>
            <el-menu-item index="#" @click="getSelfInfo">个人信息</el-menu-item>
            <el-menu-item index="#" @click="loginout">注销登录</el-menu-item>
          </el-submenu>
          <!-- <el-menu-item index="#" style="margin-left:10px" v-if="boolImg">个人头像</el-menu-item> -->
          <el-menu-item index="Login" style="margin-left:10px" v-if="boolLogin">请登录</el-menu-item>
          <el-menu-item index="Login" v-if="boolReg">免费注册</el-menu-item>
          <el-menu-item index="3">手机逛书城</el-menu-item>
          <el-submenu index="4" style="margin-left:15%">
            <template slot="title">我的商品</template>
            <el-menu-item index="4-1">已购买的书籍</el-menu-item>
            <el-menu-item index="4-2">我的足迹</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-shopping-cart-full"></i>购物车</template>
            <el-menu-item index="mycart">我的购物车</el-menu-item>
            <el-menu-item index="5-3">书城达人</el-menu-item>
            <el-menu-item index="myorder">订单管理</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-star-on"></i>收藏夹</template>
            <el-menu-item index="mycollect">收藏的宝贝</el-menu-item>
            <el-menu-item index="6-2">收藏的店铺</el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title"><i class="el-icon-s-promotion"></i>书籍分类</template>
            <el-menu-item index="7-1">文学类书籍</el-menu-item>
            <el-menu-item index="7-2">科学类书籍</el-menu-item>
            <el-menu-item index="7-3">小说类书籍</el-menu-item>
            <el-menu-item index="7-4">漫画类书籍</el-menu-item>
          </el-submenu>
          <el-menu-item index="8"><i class="el-icon-message-solid"></i>消息中心</el-menu-item>
          <el-menu-item index="9"><i class="el-icon-service"></i>联系客服</el-menu-item>         
          <el-submenu index="10">
            <template slot="title"><i class="el-icon-s-grid"></i>网站导航</template>
            <el-menu-item index="9"><i class="el-icon-s-grid"></i>书城</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-header>

      <el-main>
        <div class="mainTop">
          <!-- 搜索框 -->
          <div class="bookLogo">
            <img src="../assets/images/booklogo.jpg" alt="">
          </div>
          <div class="topSearch">
            <el-input v-model="sBook" clearable @clear="loadBook" placeholder="请输入书籍名称" class="searchBox"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="searchBook">搜索</el-button>
            <p>
              <!-- wwww -->
              <span v-for="i in searchType" :key="i.sid"><a href="#">{{i.name}}</a>&emsp;</span>
            </p>
          </div>
        </div>
        <div class="main-content">
          
          <div class="lun-bo">
            <!-- 轮播左侧导航栏 -->
            <div class="left-nav">
              <ul>
                <li v-for="item in leftNav" @click="showContent">
                  <router-link to="#" @click.native="showCard(item.title)">{{item.title}}</router-link>
                  <i class="el-icon-arrow-right" style="padding-left:70px"></i>
                </li>
              </ul>
            </div>
            <div class="right-content">
              <!-- 轮播图 -->
              <el-carousel height="450px" v-if="seen">
                <el-carousel-item v-for="item in rightLunBo" :key="item.bid">
                  <img :src="item.imageurl" :title="item.title" alt="" width="100%">
                </el-carousel-item>
              </el-carousel>
              <el-button type="primary" v-if="btnSeen" @click="toLun" size="mini" class="btn"><i class="el-icon-right"></i></el-button>
              <!-- 左边导航链接 -->
              <el-card class="box-card" v-if="seenCard">
                <router-view />
              </el-card>
            </div>
          </div>
          <!-- 多条件查询 -->
          <div class="sousuo">
              <el-form :inline="true" class="demo-form-inline">
                <el-form-item>
                  <el-input v-model="query.title" placeholder="请输入书名"></el-input>
                </el-form-item>
                <!-- label="书籍类型" -->
                <el-form-item>
                  <el-select v-model="query.cid" placeholder="请选择书籍类型">
                    <el-option v-for="item in bookType" :label="item.Name" :value="item.id" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-select v-model="query.pid" placeholder="请选择出版社">
                    <el-option v-for="item in publishlist" :label="item.Name" :value="item.id" :key="item.id"></el-option>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary" @click="findBookInfo">查询</el-button>
                </el-form-item>
              </el-form>
          </div>
          <!-- 书籍列表 -->
          <div class="book-content">
            <ul>
              <li v-for="item in book" @click="buyBook">
                <img :src="item.ImageUrl" alt="">
                <span style="color:grey;font-size:13px">{{item.Title | getTitle}}</span>
                <span style="color:red;font-size:13px">￥/{{item.Price}}</span><br>
                <span style="font-family:kaiti;font-size:13px">{{item.PublishName}}</span>
                <!-- .stop  阻止事件冒泡 -->
                <span class="detailStyle" @click.stop="bookOtherInfo(item)">详情<i class="el-icon-d-arrow-right"></i></span><br>
                <span class="addCarStyle" @click.stop="addBookCar(item)">添加到购物车<i class="el-icon-shopping-cart-2"></i></span>
              </li>
            </ul>
          </div>
          <!-- 分页 -->
          <div class="fenye">
            <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[40, 50, 60, 70]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="totals">
            </el-pagination>
          </div>
        </div>
      </el-main>
      <el-footer style="height:150px">
        <p>&copy;MisWu出版 | 版权所有者 | 时间:2021/07/11</p>
        <p>详细信息参见:https://miswu.bookshop.cn</p>
        <p style="font-size:25px">一本书让你欢乐无穷,而整个书城则让你无法自拔!</p>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      // 控制头像 登录 注册显示隐藏
      boolImg:false,
      boolLogin:true,
      boolReg:true,
      // 个人信息弹框
      selfinfoDia:false,
      selfInfo:{},
      RoleName:"",  //个人信息的角色格式化
      squareUrl:"",  //个人头像
      updateImg:"",//修改个人头像
      baseUrl:this.$http.defaults.baseURL,
      sBook:"", //后台参数title
      book:[],
      currentPage:1,
      pageSize:50,
      totals:0,
      // cid:"",
      // pid:"",
      leftNav:[//左侧导航栏
        {title:"生活知识"},{title:"科学分类"},
        {title:"漫画部分"},{title:"小学阶段"},
        {title:"初中阶段"},{title:"高中阶段"},
        {title:"大学生活"},{title:"故事小说"},
        {title:"近代分类"}
      ],
      rightLunBo:[],
      seen:true,//是否显示右边轮播图
      seenCard:false,
      btnSeen:true,
      // 多条件搜索
      query:{
        title:"",
        pid:"",
        cid:"",
        cname:"",
        pname:""
      },
      bookType:[],
      publishlist:[],
      searchType:[
        {sid:1,name:"科学"},
        {sid:2,name:"小说"},
        {sid:3,name:"故事"},
        {sid:4,name:"现代"},
        {sid:5,name:"近代"}
      ]
    };
  },
  created(){
    this.getBookList();
    this.getLunBoPic();
    this.getBookType();
    this.getPublishList();
    this.getUid();
  },
  methods:{
    getUid(){
      // 也可以在created中直接获取
      let bool=sessionStorage.getItem("uid");
      if(bool != null){
        this.boolImg=true;
        this.boolLogin=false;
      }else{
        this.boolImg=false;
        this.boolLogin=true;
      }
    },
    // 注销登录
    loginout(){     
      this.$http.post("/loginout").then((res)=>{
        // console.log(res);
        this.$message.success(res.data.statedesc);
      })
      sessionStorage.clear();
      this.boolImg=false;
      this.boolLogin=true;
    },
    // 获取个人信息  //判断是否登录 即是否有uid
    getSelfInfo(){
      let uid=sessionStorage.getItem("uid");
      this.selfinfoDia=true;
      if(uid != null){
        this.$http.post("/getloginuserinfo").then((res)=>{
          // console.log(res.data);
          this.selfInfo=res.data;
          this.squareUrl=res.data.Photo;
          let RoleName=res.data.RoleName;
          if(RoleName ==0){
            this.RoleName="普通用户"
          }else{
            this.RoleName="管理员"
          }
        })
      }else{
        this.$message.error("请先登录或注册");
      }
    },
    // 上传头像
    handlePreview(file) {
      // console.log(123);
      this.updateImg=file;
      // this.squareUrl="/photos/"+file;
    },
    updateTouXiang(){
      let fd=new FormData();
      fd.append("file",this.updateImg);
      this.$http.post("/uploaduserinfophoto",fd).then((res)=>{
        // console.log(res);
        if(res.status==200){
          this.$message.success(res.data.statedesc);
        }else{
          this.$message.error(res.data.statedesc);
        }
      })
    },
    // 获取书籍列表
    getBookList(){
      //失败
      // let str=`currentpage=${this.currentPage}&pagesize=${this.pageSize}
      // &title=${this.sBook}&cid=${this.cid}&pid=${this.pid}`;    
      // querybookfortitlelike 查询列表 
      let str="title="+this.sBook+"&cid="+this.query.cid +"&pid="+this.query.pid+"&currentpage="+this.currentPage+"&pagesize="+this.pageSize; 
      this.$http.post("/querybookforavgpageadn",str).then((result) => {
        // console.log(result.data.data)
        this.book=result.data.data;
        this.currentPage=result.data.cpage;
        this.pageSize=result.data.size;
        this.totals=result.data.rowtotal;
      }).catch((err) => {
        console.log(err);
      });
    },
    // 清空搜索框
    loadBook(){
      this.getBookList();
    },
    // 分页
    handleSizeChange(val) {
      this.pageSize=val;
      this.getBookList();
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage=val;
      this.getBookList();
      // console.log(`当前页: ${val}`);
    },
    // 搜索书籍
    searchBook(){
      this.getBookList();
      if(this.book.length == 0){
        this.$message.warning("抱歉,暂无该书籍的信息");
      }
    },
    // 购物车  购买书籍
    buyBook(){
      this.$router.push("/buybook");//跳转到书籍详情或者购物列表
    },
    // 获取轮播图片
    getLunBoPic(){
      this.$http.get("/getbannnerall").then((res)=>{
        // console.log(res);
        this.rightLunBo=res.data
      })
    },
    // 显示侧边栏右侧内容
    showContent(){
      // this.$router.push("/navli");
      this.seen=false;
      this.seenCard=true;
    },
    // 右边导航跳转判断
    showCard(val){
        switch(val){
          case "生活知识":
            this.$router.push("/navlione");
            break;
          case "科学分类":
            this.$router.push("/navlitwo");
            break;
          case "漫画部分":
            this.$router.push("/navlithree");
            break;
          case "小学阶段":
            this.$router.push("/navlifour");
            break;
          case "初中阶段":
            this.$router.push("/navlifive");
            break;
          case "高中阶段":
            this.$router.push("/navlisix");
            break;
          case "大学生活":
            this.$router.push("/navlisev");
            break;
          case "故事小说":
            this.$router.push("/navlieig");
            break;
          case "近代分类":
            this.$router.push("/navlinine");
            break;
        }
    },
    toLun(){
      this.seen=true;
      this.seenCard=false;
    },
    // 书籍详情
    bookOtherInfo(row,event){
      // console.log(row);
      // 阻止事件冒泡 （阻止默认冒泡） vue中用@click.stop=""阻止
      // let maoPao=event || window.event;
      // maoPao.cancelBubble=true;
      let str=JSON.stringify(row);
      sessionStorage.setItem("currentBook",str);
      this.$router.push("/bookdetail");
    },
    // 获取书籍类型列表   查询
    getBookType(){
      this.$http.get("/querycategoriesall?cname="+this.query.cname).then((res)=>{
        this.bookType=res.data;
      })
    },
    // 获取出版社列表
    getPublishList(){
      this.$http.get("/querypublisherall?pname="+this.query.pname).then((res)=>{
        this.publishlist=res.data;
      })
    },
    // 查询
    findBookInfo(){
      this.getBookList();
      if(this.book.length == 0){
        this.$message.warning("抱歉,暂无该书籍的信息");
      }
      // let str="title="+''+"&cid="+this.query.cid +"&pid="+this.query.pid+"&currentpage="+this.currentPage+"&pagesize="+this.pageSize; 
      // this.$http.post("/querybookforavgpageadn",str).then((res)=>{
      //   console.log(res);
      //   this.book=res.data.data;
      //   this.currentPage=res.data.cpage;
      //   this.pageSize=res.data.size;
      //   this.totals=res.data.rowtotal;
      // })
    },
    // 添加到购物车
    addBookCar(row,event){
      // 阻止事件冒泡（阻止默认冒泡） vue中用@click.stop=""阻止
      // let maoPao2=event || window.event;
      // maoPao2.cancelBubble=true;
      let str=JSON.stringify(row);
      sessionStorage.setItem("currentBook",str);
      this.$router.push("/buybook");
    }
  },
  filters:{
    // 重新获取书名
    getTitle(val){
      let newTitle=val.substring(0,10);
      return newTitle+"...";
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
@import "../assets/css/home.css";
</style>
