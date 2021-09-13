<template>
  <div>
      <ul>
            <li v-for="item in bookInfo">
                  <div class="contentbox">
                        <img :src="item.imgUrl" alt="">
                        <!-- <p>{{item.title}}</p> -->
                        <span>{{item.title}}</span>
                  </div>
            </li>
      </ul>
  </div>
</template>

<script>
export default {
data(){
      return{
            bookInfo:[
                  {title:"java程序设计",imgUrl:require('../../assets/images/book7.jpg')},
                  {title:"python原理与基础",imgUrl:require('../../assets/images/book8.jpg')},
                  {title:"C++基础语法",imgUrl:require('../../assets/images/book9.jpg')},
                  {title:"C#原理与应用",imgUrl:require('../../assets/images/book10.jpg')},
                  {title:"php程序设计",imgUrl:require('../../assets/images/book11.jpg')},
                  {title:"vue框架及element-ui",imgUrl:require('../../assets/images/book12.jpg')},
                  {title:"React原理与讲解",imgUrl:require('../../assets/images/book13.jpg')}
            ]
      }
},
created(){

},
methods:{

}
}
</script>

<style scoped>
div ul{
      list-style-type: none;
}
div ul li img{
      width:40px;
      height:50px;
      /* float: left; */
}
.contentbox{
      width: 200ox;
      height: 70px;
      float: left;
}
.contentbox span{
      margin-right: 50px;
      position: relative;
      top: -15px;
}
</style>