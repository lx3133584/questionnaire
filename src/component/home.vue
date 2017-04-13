<template>
  <div id="home">
	<p>{{hello}}，{{name}}<br>{{msg}}</p>
	<router-link v-if='length>0' to='/list'>我的问卷</router-link>
	<router-link v-else to='/new'>新的问卷</router-link>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      hello: "你好",
      msg: "欢迎来到问卷管理系统！"
  	}
  },
  computed: {
    length() {
    	return this.$store.state.list.length;
  	},
  	name() {
  		return this.$store.state.name;
  	}
  },
  mounted() {
		this.$store.dispatch('getList');
		this.$store.dispatch('getName');
  }
}
</script>

<style>
#home{
	margin: 120px auto 0 auto;
	width: 95%;
	height: 95%;
	background: rgba(255,255,255,0.2);
}
#home p{
	margin-left: 2em;
	padding-top: 3em;
	font-size: 5rem;
	color: #fff;
}
#home a{
	display: block;
	margin-top: 1.5em;
	margin-left: 4em;
	width: 5em;
	height: 1.5em;
	line-height: 1.5em;
	font-size: 4rem;
	color: #fff;
	text-align: center;
	background: #ff9800;
	border: none;
	transition: all 0.5s;
	cursor: pointer;
}
#home a:hover{
	color: #000;
	background: #fff;
	border: #000 3px solid;
}
</style>