<template>
  <div>
    <el-input v-model="count" style="width:300px"/>
    <el-button type="primary" @click="addCount">遍历</el-button>
    <p v-for="(item,index) in arr" :key="index">{{item}}</p>
    原数组:{{arr}}sess数组:{{a}}
  </div>
</template>

<script>
export default {
  data(){
    return{
      count:"",
      arr:[],
      a:[]
    }
  },
  created(){
    
  },
  methods:{
    addCount(){
      this.arr.push(this.count);
      sessionStorage.setItem("curarr",this.arr);
    }
  },
  updated(){
    let a = sessionStorage.getItem("curarr");
    this.a=a;
  }

}
</script>

<style>

</style>