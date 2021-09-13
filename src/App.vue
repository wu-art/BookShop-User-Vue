<template>
  <div id="app">
    <!-- <img src="./assets/logo.png"> -->
    <router-view/>
    <fixbar></fixbar>
  </div>
</template>

<script>
import fixbar from './components/FixBar'
export default {
  name: 'App',
  components:{
    fixbar
  }
}
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  height: 100%;
}
</style>
