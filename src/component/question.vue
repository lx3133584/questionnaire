<!-- 问题模块 -->
<template>
  <div id="question">
    <label><input type="checkbox">此题是否必填</label>
    <h2>
      Q{{index+1}}（{{type_name}}）
      <edit :text="title" sClass="qsTitle" iClass="qiTitle"></edit>
    </h2>
    <ul>
      <li v-if="type==='text'">
        <i class="iconfont icon-text"></i>
      </li>
      <li v-else v-for="(item,index) in options">
        <i :class="icon+type"></i>
        <edit :text="option_name+(index+1)"></edit>
        <i class="iconfont icon-close" @click="removeOption(index)"></i>
      </li>
    </ul>
    <p>
      <span @click="upQuestion">上移</span>
      <span>下移</span>
      <span>复用</span>
      <span @click="removeQuestion">删除</span>
    </p>
    <button v-if="(type==='text')" id="station"></button>
    <button v-else @click="addOption">+ 添加选项</button>
  </div>
</template>

<script type="text/javascript">
import Edit from './edit.vue';

export default {
  data () {
    return {
      options: [],
      title:'请输入标题',
      type_name:'',
      icon:'iconfont icon-',
      option_name:'选项'
    }
  },
  props: {
      index: Number,
      type: String,
  },
  created() {
      switch (this.type){
        case "radio":
          this.type_name="单选题";
          break;
        case "checkbox":
          this.type_name="多选题";
          break;
        case "text":
          this.type_name="文本题";
          break;
      };
  },
  methods:{
    addOption:function(){
      this.options.push("")
    },
    removeOption:function(index){
      this.options.splice(index,1)
    },
    upQuestion:function(index){
      this.$emit('up',index)
    },
    removeQuestion:function(index){
      this.$emit('del',index)
    }
  },
  components: { Edit }
    
}
</script>

<style>
#question{
  margin: 1rem 0;
  padding: 1rem;

}
#question>h2{
  font-size: 1.6rem;
}
#question>h2 .qiTitle{
  font-size: 1.5rem;
}
#question>ul>li{
  margin: 0.4em 2em;
  font-size: 1.4rem;
}
#question li i:last-child{
  cursor: pointer;
}
#question>ul>li i.icon-text{
  font-size: 15rem;
  cursor: default;
}
#question>label{
  float: right;
  margin: 1em;
  font-size: 1.2rem;
  cursor: pointer;
}
#question>label>input{
  vertical-align: middle;
  margin-right: 0.5em;
}
#question>p{
  float: right;
  margin: 0 2em;
}
#question>p>span{
  display: inline-block;
  margin: 0 0.2em;
  height: 2em;
  line-height: 2em;
  font-size: 1.2rem;
  cursor: pointer;
}
#question>button{
  display: block;
  margin: 0.4em auto;
  width: 98%;
  height: 2em;
  line-height: 2em;
  font-size: 1.8rem;
  color: #fff;
  background: none;
  border: hidden 2px #ccc;
  border-radius: 4px;
  cursor: pointer;
}
#question>button#station{
  height: 0;
  visibility: hidden;
}
#question>button:hover{
  border: dashed 2px #ccc;
}
#question>button:focus{
  border: none;
}
</style>