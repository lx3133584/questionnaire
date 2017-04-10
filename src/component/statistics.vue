<template>
  <div id="statistics">
    <h1>{{naire.title}}</h1>
    <ul class="main">
      <li v-for="(item,index) in naire.questions">
        <!-- 单选题 -->
        <template v-if="item.type=='radio'">
          <h2>Q{{index+1}} ( 单选题 ) {{item.title}}
            <span v-if="item.required" style="color:#EB3F3F">*</span>
          </h2>
          <ul>
            <li v-for="itemIn in item.options">
              <label>
              <input type="radio" :name="item.title">
              {{itemIn}}
              </label>
            </li>
          </ul>
        </template>
        <!-- 多选题 -->
        <template v-if="item.type=='checkbox'">
          <h2>Q{{index+1}} ( 多选题 ) {{item.title}}
            <span v-if="item.required" style="color:#EB3F3F">*</span>
          </h2>
          <ul>
            <li v-for="itemIn in item.options">
              <label>
              <input type="checkbox" :name="item.title">
              {{itemIn}}
              </label>
            </li>
          </ul>
        </template>
        <!-- 文本题 -->
        <template v-if="item.type=='text'">
          <h2>Q{{index+1}} ( 文本题 ) {{item.title}}
            <span v-if="item.required" style="color:#EB3F3F">*</span>
          </h2>
          <ul>
            <li>
              <textarea></textarea>
            </li>
          </ul>
        </template> 
      </li>
    </ul>
    <button @click="back">返回</button>
  </div>
</template>

<script type="text/javascript">

export default {
  computed: {
    naire() {
      return this.$store.state.list[this.index]
    },
    index() {
      return this.$store.state.operating.index
    }
  },
  methods: {
    back:function() {
      this.$store.commit('switchOperating',{type:false});
      this.$router.push('/list');
    },
  }
}
</script>

<style>
#statistics{
	margin: 120px auto 0 auto;
	width: 95%;
  color: #eee;
	background: rgba(255,255,255,0.2);
}
#statistics h1{
  display: block;
  width: 100%;
  height: 3em;
  line-height: 3em;
  font-size: 3rem;
  text-align: center;
}
#statistics .main{
  border-top: 2px solid #ddd;
}
#statistics .main{
  margin: 1rem 0;
  padding: 5rem;

}
#statistics .main h2{
  font-size: 1.6rem;
}
#statistics .main>li{
  margin-bottom: 3rem;
}
#statistics .main ul>li{
  margin: 0.8em 2em;
  font-size: 1.4rem;
}
#statistics .main ul>li label{
  cursor: pointer;
}
#statistics .main ul>li textarea{
  width: 60%;
  height: 10rem;
  font-size: 2rem;
  color: #fff;
  background: rgba(255,255,255,0.4);
}
#statistics button{
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
#statistics button:hover{
  color: #000;
  background: #fff;
  border: #000 1px solid;
}

</style>