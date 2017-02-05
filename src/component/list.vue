<template>
  <div id="list">
  	<table border="4">
  		<thead>
  			<tr>
  				<th><input type="checkbox"></th>
  				<th>标题</th>
  				<th>截止日期</th>
  				<th>状态</th>
  				<th>操作</th>
  			</tr>
  		</thead>
  		<tbody>
  			<tr v-for="(item,index) in list">
  				<td><input type="checkbox"></td>
  				<td>{{item.title}}</td>
  				<td>{{item.date}}</td>
  				<td>{{item.status}}</td>
  				<td>
	  				<button @click="edit(index)" v-if="item.status=='未发布'">编辑</button>
	  				<button @click="del(index)">删除</button>
	  				<button @click="view(index)">查看问卷</button>
	  				<button v-if="item.status=='已发布'">查看数据</button>
  				</td>
  			</tr>
  		</tbody>
  	</table>
  </div>
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      msg: "hello world"
    }
  },
  computed: {
    list () {
    	return this.$store.state.list
    }
  },
  methods:{
  	edit:function(index){
  		this.$store.commit('reset',{index:index});
  		this.$router.push({ path: 'new', query: { index: index }});
  	},
    del:function(index){
      this.$store.commit('removeNaire',{index:index});
    },
    view:function(index){
      this.$router.push({ path: 'view', query: { index: index }})
    }
  }
}
</script>

<style>
#list{
	margin: 120px auto 0 auto;
	padding: 100px 0;
	width: 95%;
  	color: #eee;
  	text-align: center;
	background: rgba(255,255,255,0.2);
}
#list table{
	margin: 0 auto;
}
#list table th,#list table td{
	padding: 5px 10px;
}
#list table input{
	margin: 0 10px;
}
#list table thead{
	font-size: 2.5rem;
}
#list table tbody{
	font-size: 2rem
}
#list table tbody button{
  font-size: 1.8rem;
  color: #fff;
  background: rgba(255,152,0,0.8);
  border: none;
  border-radius: 3px;
  cursor: pointer;
}
</style>