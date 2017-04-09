<template>
  <div id="new" @click.self="hideDate">
    <text_edit :text="title" sClass="sTitle" iClass="iTitle" @transferData="pullTitle"></text_edit>
    <div class="main" @click="hideDate">
      <question_list></question_list>
    </div>
    <p>截止日期：</p>
    <date></date>
    <submit></submit>
  </div>
</template>

<script type="text/javascript">
import Text_edit from './text_edit.vue';
import Question_list from './question_list.vue';
import Submit from './submit.vue';
import Date from './date.vue';

export default {
  computed: {
    title () {
      return this.$store.state.questionnaire.title
    }
  },
  mounted:function(){
    this.$store.dispatch('reset');
    this.$store.commit('switchEditing',{boolean:false});
  },
  methods:{
    pullTitle:function(data){//传递问题标题
      this.$store.commit('modNaireTitle',{title:data})
    },
    hideDate:function(){
      if(this.$store.state.seen){
        this.$store.commit('switchSeen',{seen:false})
      }
    }
  },
  components: { Question_list, Text_edit, Submit, Date }
}
</script>

<style>
#new{
	margin: 120px auto 0 auto;
	width: 95%;
  color: #eee;
	background: rgba(255,255,255,0.2);
}
#new .sTitle,#new .iTitle{
  display: block;
  width: 100%;
  height: 3em;
  line-height: 3em;
  font-size: 3rem;
  text-align: center;
}
#new .sTitle{
  color: #fff;
}
#new .main{
  border-top: 2px solid #ddd;
}
#new>p{
  font-size: 18px;
  font-weight: bold;
  margin: 0 30px;
}
</style>