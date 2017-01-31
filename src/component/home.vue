<template>
  <div id="home">
	<p>{{hello}}<br>{{msg}}</p>
	<router-link :to='btn.link'>{{btn.text}}</router-link>
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      hello: "你好，",
      msg:"欢迎来到调差问卷！",
      btn:{link:'/list',text:'问卷列表'}
  	}
  },
  mounted () { 	
	if (window.localStorage.data){
		this.btn.link = "/list";
		this.btn.text = "我的问卷";
	}
	else {
		this.btn.link = "/new";
		this.btn.text = "新建问卷";
	}
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
}
#home a:hover{
	color: #000;
	background: #fff;
	border: #000 3px solid;
}
</style>