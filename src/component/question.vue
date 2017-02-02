<!-- 问题模块 -->
<template>
  <div id="question">
    <label><input type="checkbox" v-model="required">此题是否必填</label>
    <h2>
      Q{{index+1}}（{{type_name}}）
      <edit :text="title" sClass="qsTitle" iClass="qiTitle" @transferData="pullTitle"></edit>
    </h2>
    <ul>
      <li v-if="type==='text'">
        <i class="iconfont icon-text"></i>
      </li>
      <li v-else v-for="(item,index) in options">
        <i :class="icon+type"></i>
        <edit :text="options[index]" @transferData="pullDate" @transferIndex="pullIndex(index)"></edit>
        <i class="iconfont icon-close" @click="removeOption(index)"></i>
      </li>
    </ul>
    <p>
      <span v-if="index!=0" @click="upQuestion">上移</span>
      <span v-if="index!=length" @click="downQuestion">下移</span>
      <span @click="copyQuestion">复用</span>
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
      required:false,
      options: ['选项'],
      title:'请输入标题',
      type_name:'',
      icon:'iconfont icon-',
      tem_option:'临时选项'
    }
  },
  props: {
      index: Number,
      length:Number,
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
    pullTitle:function(data){//传递问题标题
      this.title = data
    },
    pullDate:function(data){//传递选项的值
      this.tem_option = data
    },
    pullIndex:function(index){//把选项的值插入到数组
      this.options.splice(index,1,this.option)
    },
    addOption:function(){//添加选项
      this.options.push("选项")
    },
    removeOption:function(index){//删除选项
      this.options.splice(index,1)
    },
    upQuestion:function(){//上移问题
      this.$emit('up')
    },
    downQuestion:function(){//下移问题
      this.$emit('down')
    },
    copyQuestion:function(){//复用问题
      this.$emit('copy')
    },
    removeQuestion:function(){//删除问题
      this.$emit('del')
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