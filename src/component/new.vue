<template>
  <div id="new">
    <edit text="请输入标题" sClass="sTitle" iClass="iTitle"></edit>
    <div class="main">
      <question_list></question_list>
    </div>
    <date></date>
    <submit></submit>
  </div>
</template>

<script type="text/javascript">
import Edit from './edit.vue';
import Question_list from './question_list.vue';
import Submit from './submit.vue';
import Date from './date.vue';

export default {
  data () {
    return {
      index: 1
    }
  },
  components: { Question_list, Edit, Submit, Date }
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
</style>