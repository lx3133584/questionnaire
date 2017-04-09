<template>
  <div id="submit">
    <button @click="save(index,'已发布')">提交问卷</button>
    <button @click="save(index,'未发布')">保存问卷</button>  
  </div>
</template>

<script type="text/javascript">


export default {
  props:{index:Number},
  methods:{
    save:function(index,type){
        this.$store.dispatch('save',{index:index,type:type}).then(()=>{
          this.$store.dispatch('reset').then(()=>{
            this.$router.push('/list');
          })
        })
    }
  }
}
</script>

<style>
#submit button{
  float: right;
  display: inline-block;
  margin: 1em;
  width: 5em;
  height: 1.5em;
  line-height: 1.5em;
  font-size: 2rem;
  color: #fff;
  text-align: center;
  background: rgba(255,152,0,0.8);
  border: none;
  transition: all 0.5s;
  cursor: pointer;
}
#submit button:hover{
  color: #000;
  background: #fff;
  border: #000 1px solid;
}
</style>