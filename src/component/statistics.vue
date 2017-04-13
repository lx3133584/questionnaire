<template>
  <div id="statistics">
    <h1>{{naire.title}}</h1>
    <ul class="main">
      <li v-for="(item,index) in naire.questions">
        <!-- 单选题-->
        <template v-if="item.type=='radio'">
          <h2>Q{{index+1}} ( 单选题 ) {{item.title}}
            <span v-if="item.required" class="required">*</span>
          </h2>
          <button @click="switchType(index, 'pie')">饼状图</button>
          <button @click="switchType(index, 'bar')">柱状图</button>
          <div :id="`echart${index}`"></div>
        </template>
        <!-- 多选题 -->
        <template v-if="item.type=='checkbox'">
          <h2>Q{{index+1}} ( 多选题 ) {{item.title}}
            <span v-if="item.required" class="required">*</span>
          </h2>
          <button @click="switchType(index, 'pie')">饼状图</button>
          <button @click="switchType(index, 'bar')">柱状图</button>
          <div :id="`echart${index}`"></div>
        </template>
        <!-- 文本题 -->
        <template v-if="item.type=='text'">
          <h2>Q{{index+1}} ( 文本题 ) {{item.title}}
            <span v-if="item.required" class="required">*</span>
          </h2>
        </template> 
      </li>
    </ul>
    <button @click="back()">返回</button>
  </div>
</template>

<script type="text/javascript">
export default {
  data() {
    return {
      charts: []
    }
  },
  computed: {
    naire() {//问卷列表
      return this.$store.state.list[this.index]
    },
    index() {//正在操作的问卷序号
      return this.$store.state.operating.index
    },
    chart_data() {//图表使用的数据
      let data = [];
      for(let i of this.naire.questions.keys()) {
        data[i] = {pie:[],bar:{x:[],y:[]}};
        for(let j of this.naire.questions[i].options.keys()) {
          data[i].pie[j] = {
            name: this.naire.questions[i].options[j].name,
            value: this.naire.questions[i].options[j].count
          };
          data[i].bar.x[j] = this.naire.questions[i].options[j].name;
          data[i].bar.y[j] = this.naire.questions[i].options[j].count;
        }
      }
      return data
    }
  },
  methods: {
    back() {//返回列表页
      this.$store.commit('switchOperating',{type:false});
      this.$router.push('/list');
    },
    option(index, type) {//echarts的设置
      if(type === 'pie') {
        return {
          title: this.naire.questions.title,
          tooltip: {},
          legend: {
              data: ['选项选中次数'],
              textStyle: {color: '#fff'}
          },
          xAxis: false,
          yAxis: false,
          series: [
            {
              name: '选项',
              type: 'pie',
              radius : '55%',
              center: ['50%', '50%'],
              data: this.chart_data[index].pie
            }
          ]
        }
      }
      else if(type === 'bar') {
        return {
          title: this.naire.questions.title,
          tooltip: {},
          legend: {
              data: ['选项选中次数'],
              textStyle: {color: '#fff'}
          },
          xAxis: {
              data: this.chart_data[index].bar.x
          },
          yAxis: {},
          series: [{
              name: '选项',
              type: 'bar',
              data: this.chart_data[index].bar.y
          }],
          textStyle: {color: '#fff'}
        }
      };
    },
    switchType(index, type) {//切换图表类型
      this.charts[index] = echarts.init(document.getElementById(`echart${index}`));
      this.charts[index].setOption(this.option(index, type));
    },
    initEcharts() {
      for(let i of this.naire.questions.keys()) {
        this.switchType(i, 'bar');
      }
    },
  },
  mounted() {
    this.initEcharts()
  }
}
</script>

<style>
#statistics {
	margin: 120px auto 0 auto;
	width: 95%;
  color: #eee;
	background: rgba(255,255,255,0.2);
}
#statistics h1 {
  display: block;
  width: 100%;
  height: 3em;
  line-height: 3em;
  font-size: 3rem;
  text-align: center;
}
#statistics .main {
  border-top: 2px solid #ddd;
}
#statistics .main {
  margin: 1rem 0;
  padding: 5rem;

}
#statistics .main h2 {
  font-size: 1.6rem;
}
#statistics .main div {
  margin: 20px;
  width: 60%;
  height: 20rem;
  font-size: 2rem;
}
#statistics button {
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
#statistics button:hover {
  color: #000;
  background: #fff;
  border: #000 1px solid;
}
#statistics .required {
  color:#EB3F3F;
}

</style>