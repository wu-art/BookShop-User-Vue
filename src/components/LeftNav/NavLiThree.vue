<template>
  <div>
    <ul>
      <li v-for="item in bookInfo">
        <div class="contentbox">
          <img :src="item.imgUrl" alt="" />
          <!-- <p>{{item.title}}</p> -->
          <span>{{ item.title }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // imgUrl:require('../../assets/images/book.jpg'),
      bookInfo: [
        {
          title: "科学世界的探知",
          imgUrl: require("../../assets/images/book.jpg")
        },
        {
          title: "动物世界的探知",
          imgUrl: require("../../assets/images/book1.jpg")
        },
        {
          title: "人类世界的探知",
          imgUrl: require("../../assets/images/book2.jpg")
        },
        {
          title: "宇宙世界的探知",
          imgUrl: require("../../assets/images/book3.jpg")
        },
        {
          title: "科学世界的探知",
          imgUrl: require("../../assets/images/book4.jpg")
        },
        {
          title: "玄幻世界的探知",
          imgUrl: require("../../assets/images/book5.jpg")
        },
        {
          title: "科学世界的探知",
          imgUrl: require("../../assets/images/book6.jpg")
        }
      ]
    };
  },
  created() {},
  methods: {}
};
</script>

<style scoped>
div ul {
  list-style-type: none;
}
div ul li img {
  width: 40px;
  height: 50px;
  /* float: left; */
}
.contentbox {
  width: 200ox;
  height: 70px;
  float: left;
}
.contentbox span {
  margin-right: 50px;
  position: relative;
  top: -15px;
}
</style>