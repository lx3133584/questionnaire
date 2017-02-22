<template>
  <div id="navs">
    <ul>
    	<li v-for='item in nav_list'>
    		<router-link :to='item.link'>{{item.title}}</router-link>
    	</li>
    </ul>
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      nav_list:[//导航栏列表中的项
      	{link:'.',title:'问卷调查'},
      	{link:'./list',title:'问卷列表'},
      	{link:'./new',title:'新建问卷'}
      ]
    }
  }
}
</script>

<style>
#navs{
	position: fixed;
	top: 0;
	padding: 0 10%;
	height: 100px;
	line-height: 100px;
	width: 100%;
	font-size: 2rem;
	background: #fff;
	box-shadow: #000 1px 0 5px;
}
#navs li{
  display: inline-block;
  margin: 0 30px;
}
#navs li:first-child{
	font-size: 140%;
}
#navs li a.router-link-active{
  color: #ff9800;
}
</style>