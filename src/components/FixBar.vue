<template>
  <div>
        <div class="wai-box">
              <ul>
                    <li>
                          <a href="#">回到顶部<i class="el-icon-top"></i></a>
                    </li>
                    <li>
                          <!-- <a href="/">首页<i class="el-icon-s-home"></i></a> -->
                          <router-link to="/">首页<i class="el-icon-house"></i></router-link>
                    </li>
                    <li>
                        <router-link to="/mycart">购物车<i class="el-icon-shopping-cart-full"></i></router-link>
                    </li>
                    <li>
                          <router-link to="/myorder">我的订单<i class="el-icon-notebook-2"></i></router-link>
                    </li>
                    <li>
                          <router-link to="/login">登录注册<i class="el-icon-mouse"></i></router-link>
                    </li>
              </ul>
        </div>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped>
div.wai-box{
      position: fixed;
      top: 50%;
      left: 93%;
      width: 85px;
      height: 270px;
      background-color:rgb(209, 208, 208);
}
div.wai-box ul{
      list-style-type: none;
}
div.wai-box ul li{
      width: 85px;
      height: 50px;
      padding-left: 0px;
      line-height: 50px;
      margin-left: -40px;
      /* margin-top: -15px; */
      text-align: center;
      color: black;
}
div.wai-box ul li:hover{
      background-color: goldenrod;
      cursor: pointer;
}
a{
      text-decoration: none;
      color: black;
}
</style>