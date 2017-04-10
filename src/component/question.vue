<!-- 问题模块 -->
<template>
  <div id="question">
    <label><input type="checkbox" v-model="required" @click="modRequired">此题是否必填</label>
    <h2>
      Q{{index+1}}（{{type_name}}）
      <text_edit :text="title" sClass="qsTitle" iClass="qiTitle" @transferData="pullTitle"></text_edit>
    </h2>
    <ul>
      <li v-if="type==='text'">
        <i class="iconfont icon-text"></i>
      </li>
      <li v-else v-for="(item,index) in options">
        <i :class="icon+type"></i>
        <text_edit :text="options[index].name" @transferData="pullData" @transferIndex="pullIndex(index)"></text_edit>
        <i class="iconfont icon-close" @click="removeOption(index)"></i>
      </li>
    </ul>
    <p>
      <span v-if="index!=0" @click="upQuestion">上移</span>
      <span v-if="index!=length-1" @click="downQuestion">下移</span>
      <span @click="copyQuestion">复用</span>
      <span @click="removeQuestion">删除</span>
    </p>
    <button v-if="(type==='text')" id="station"></button>
    <button v-else @click="addOption">+ 添加选项</button>
  </div>
</template>

<script type="text/javascript">
import Text_edit from './text_edit.vue';

export default {
  data () {
    return {
      icon:'iconfont icon-',
      tem_option:'临时选项'
    }
  },
  props: {
      index: Number,
  },
  computed: {
    title() {
      return this.$store.state.questionnaire.questions[this.index].title
    },
    length() {
      return this.$store.state.questionnaire.questions.length
    },
    type() {
      return this.$store.state.questionnaire.questions[this.index].type
    },
    type_name() {
      switch (this.type){
        case "radio":
          return "单选题";
          break;
        case "checkbox":
          return "多选题";
          break;
        case "text":
          return "文本题";
          break;
      };
    },
    required() {
      return this.$store.state.questionnaire.questions[this.index].required
    },
    options() {
      return this.$store.state.questionnaire.questions[this.index].options
    }
  },
  methods:{
    pullTitle:function(data){//传递问题标题
      this.$store.commit('modQuestionTitle',{index:this.index,title:data})
    },
    pullData:function(data){//传递选项的值
      this.tem_option = data
    },
    pullIndex:function(index){//把选项的值插入到数组
      this.$store.commit('modOption',{index:this.index,oindex:index,option:this.tem_option})
    },
    addOption:function(){//添加选项
      this.$store.commit('addOption',{index:this.index,option:"选项"})
    },
    removeOption:function(index){//删除选项
      this.$store.commit('removeOption',{index:this.index,oindex:index})
    },
    upQuestion:function(){//上移问题
      this.$store.commit('upQuestion',{index:this.index})
    },
    downQuestion:function(){//下移问题
      this.$store.commit('downQuestion',{index:this.index})
    },
    copyQuestion:function(){//复用问题
      this.$store.commit('copyQuestion',{index:this.index})
    },
    removeQuestion:function(){//删除问题
      this.$store.commit('removeQuestion',{index:this.index})
    },
    modRequired:function(){//修改问题是否必填
      this.$store.commit('modQuestionRequired',{index:this.index,required:!this.required})
    }
  },
  components: { Text_edit }
    
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
#question button:focus{
  outline: none;
}
</style>