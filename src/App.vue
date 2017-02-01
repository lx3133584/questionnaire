<template>
  <div id="app">
    <navs></navs>
    <router-view></router-view>
  </div>
</template>

<script>
import Navs from './component/navs.vue';

export default {
  name: 'app',
  components: { Navs }
}
</script>

<style>
*{
  margin: 0;
}
html,body {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  font-size: 62.5%;
  height: 90%;
  background: url('assets/images/bg.jpg') no-repeat;
  -webkit-background-size: cover;
  background-size: cover;
  background-attachment: fixed;
}
#app{
  margin-top: 100px;
  height: 100%
}
ul {
  list-style-type: none;
  padding: 0;
}
a{
  color: inherit;
  text-decoration: none;
}
a:hover{
  color: #ff9800;
}
</style>
