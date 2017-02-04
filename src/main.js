import Vue from 'vue'
import App from './App.vue'
import VueRouter from "vue-router";
import VueResource from 'vue-resource';
import Vuex from 'vuex';

//开启debug模式
Vue.config.debug = true;

Vue.use(VueRouter);
Vue.use(VueResource);
Vue.use(Vuex);

// 定义组件
import Home from './component/home.vue';
import Navs from './component/navs.vue';
import New from './component/new.vue';
import List from './component/list.vue';
import View from './component/view.vue';

// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: [
    {
      path: '/que',
      component: Home
    },
    {
      path: '/navs',
      component: Navs
    },
    {
      path: '/new',
      component: New
    },
    {
      path: '/list',
      component: List
    },
    {
      path: '/view',
      component: View
    }
  ]
})

// 创建一个vuex实例
// 分配多组件共享的数据和方法
const store = new Vuex.Store({
  state: {
    questionnaire: { title:'请输入标题',   //问卷的标题
                     questions:[{//问题
                        type:'radio',    //问题的类型
                        title:'请输入标题',   //问题的标题
                        required:false, //问题是否必填
                        options:['选项']   //选项
                      }],
                      date:'',//截止日期
                      status:'未保存'//发布状态
                    },
    list: [{ title:'JavaScript框架使用使用情况调查',
                     questions:[{
                        type:'checkbox',
                        title:'你最常使用的框架或库是什么？',
                        required:false,
                        options:['react','vue','jquery','bootstrap','angularjs']
                      },{
                        type:'radio',
                        title:'你觉得那个框架的学习难度最大？',
                        required:false,
                        options:['react','vue','jquery','bootstrap','angularjs']
                      },{
                        type:'text',
                        title:'说出你喜欢的框架或者库的优点。',
                        required:false,
                        options:[]
                      }],
                      date:'2018-01-01',
                      status:'未发布'
                    }],
    seen: false//判断是否显示日历模块
  },
  mutations: {
    modNaireTitle (state,arr) {//修改问卷标题
      state.questionnaire.title = arr.title
    },
    addQuestion (state,arr){//添加指定类型的问题
      state.questionnaire.questions.push({type:arr.type,title:'请输入标题', required:false, options:['选项']})
    },
    modQuestionTitle (state,arr) {//修改问卷标题
      state.questionnaire.questions[arr.index].title = arr.title
    },
    modQuestionRequired (state,arr){//修改问题是否必填
      state.questionnaire.questions[arr.index].required = arr.required
    },
    upQuestion (state,arr){//上移问题
      var cur = state.questionnaire.questions[arr.index];
      var pre = state.questionnaire.questions[arr.index-1];
      state.questionnaire.questions.splice(arr.index-1,1,cur);
      state.questionnaire.questions.splice(arr.index,1,pre);
      
    },
    downQuestion (state,arr){//下移问题
      var cur = state.questionnaire.questions[arr.index];
      var aft = state.questionnaire.questions[arr.index+1];
      state.questionnaire.questions.splice(arr.index+1,1,cur);
      state.questionnaire.questions.splice(arr.index,1,aft);
      
    },
    copyQuestion (state,arr){//复用问题
      var cur = state.questionnaire.questions[arr.index];
      state.questionnaire.questions.push(cur);
    },
    removeQuestion (state,arr){//删除问题
      state.questionnaire.questions.splice(arr.index,1);
    },
    addOption (state,arr){//添加选项
      state.questionnaire.questions[arr.index].options.push(arr.option)
    },
    removeOption (state,arr){//删除选项
      state.questionnaire.questions[arr.index].options.splice(arr.oindex,1)
    },
    modOption (state,arr){//修改选项的值
      state.questionnaire.questions[arr.index].options.splice(arr.oindex,1,arr.option)
    },
    modDate (state,arr){//修改截止日期
      state.questionnaire.date = arr.date
    },
    save (state,arr){//保存问卷
      state.questionnaire.status = "未发布";
      if(arr){
        state.list[arr.index] = state.questionnaire
      }
      else{
        state.list.push(state.questionnaire)
      }
    },
    submit (state,arr){//保存并把问卷状态改为发布
      state.questionnaire.status = "已发布";
      if(arr){
        state.list[arr.index] = state.questionnaire
      }
      else{
        state.list.push(state.questionnaire)
      }
    },
    reset (state,arr){//重置正在编辑的问卷
      if(arr){
        state.questionnaire = state.list[arr.index]
      }
      else{
        state.questionnaire = { title:'请输入标题',questions:[{type:'radio',title:'请输入标题',required:false,options:['选项']}],date:'',status:'未保存'}
      }
    },
    removeNaire (state,arr) {//删除问卷
      state.list.splice(arr.index,1)
    },
    switchSeen (state,arr) {
      state.seen = arr.seen
    }
     
  
}
})

// 现在我们可以启动应用了！
// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
const app = new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')