<!-- 点击把文本变成输入框 -->
<template>
  <span v-if="!editing" 
        @click="edit" 
        :class="sClass">
        {{ edit_text }}
  </span>
  <input type="text" 
         v-else 
         @blur="edit" 
         v-model="edit_text" 
         ref="input" 
         :class="iClass">
</template>

<script type="text/javascript">
export default {
  data () {
    return {
      edit_text: '',
      editing: false,
    }
  },
  props : ['text','sClass','iClass'],
  mounted: function () {
    // 避免直接使用pros属性，通过计算方法重置
    return this.edit_text=this.text
  },
  methods:{
    edit:function(){
      this.editing = !this.editing;
      if(this.edit_text == ""){
        this.edit_text = "请重新填写"
      }
      // 在dom有变化后立即执行
      this.$nextTick(function(){
        if(this.editing){// 全选
          this.$refs.input.select();
        }
        else{
          this.$emit('transferData',this.edit_text) //将选项的数据传递给父组件
          this.$emit('transferIndex','')            //提供给父组件一个容器，用来传递选项的位置
        }
      })
    }, 
  },
  watch:{
    text:function(newValue,oldValue){
      this.edit_text = newValue
    }
  }
}
</script>

<style>
input{
  color: #000;
  background: rgba(255,255,255,0.4)
}
</style>