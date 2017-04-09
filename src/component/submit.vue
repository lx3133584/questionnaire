<template>
  <div id="submit">
    <button @click="submit(index)">提交问卷</button>
    <button @click="save(index)">保存问卷</button>  
  </div>
</template>

<script type="text/javascript">


export default {
  props:{index:Number},
  methods:{
    save:function(index){
        this.$store.dispatch('save',{index:index}).then(()=>{
          this.$store.commit('reset');
          this.$router.push('/list');
        });
    },
    submit:function(index){
      this.$store.dispatch('submit',{index:index}).then(()=>{
          this.$store.commit('reset');
          this.$router.push('/list');
        });
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