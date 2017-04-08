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
import Edit from './component/edit.vue';

// 创建一个路由器实例
// 并且配置路由规则
const router = new VueRouter({
  base: __dirname,
  routes: [
    {
      path: '/',
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
    },
    {
      path: '/edit',
      component: Edit
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
                        options:['选项1','选项2']   //选项
                      }],
                      date:'',//截止日期
                      status:'未保存'//发布状态
                    },
    list: [],
    seen: false,//判断是否显示日历模块
    editing: {boolean:false,index:0},//是否正在编辑问卷状态和编辑问卷的index
    name: ""//存放登录用户的用户名
  },
  mutations: {
    getName (state) {//得到用户的用户名
       Vue.http.options.root = '.';
       Vue.http.get('./data.php').then(response => {
         state.name = response.body;
       }, response => {
         alert("error"+response.headers)
       });
    },
    modNaireTitle (state,arr) {//修改问卷标题
      state.questionnaire.title = arr.title
    },
    addQuestion (state,arr){//添加指定类型的问题
      state.questionnaire.questions.push({type:arr.type,title:'请输入标题', required:false, options:['选项1','选项2']})
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
        Vue.http.post('./data.php',{"type":"mod","index":arr.index,"data":state.questionnaire})
        .then(response => {
          console.log('成功保存并把问卷状态改为未发布')
        }, response => {
          alert("error"+response.headers)
        });
      }
      else{
        Vue.http.post('./data.php',{"type":"add","data":state.questionnaire})
        .then(response => {
          console.log('成功保存并把问卷状态改为未发布')
        }, response => {
          alert("error"+response.headers)
        });
      }
    },
    submit (state,arr){//保存并把问卷状态改为发布
      state.questionnaire.status = "已发布";
      if(arr){
        Vue.http.post('./data.php',{"type":"mod","index":arr.index,"data":state.questionnaire})
        .then(response => {
          console.log('成功保存并把问卷状态改为已发布')
        }, response => {
          alert("error"+response.headers)
        });
      }
      else{
        Vue.http.post('./data.php',{"type":"add","data":state.questionnaire})
        .then(response => {
          console.log('成功保存并把问卷状态改为已发布')
        }, response => {
          alert("error"+response.headers)
        });
      }
    },
    reset (state,arr){//重置正在编辑的问卷
      if(arr){
        Vue.http.post('./data.php',{"type":"get","index":arr.index})
        .then(response => {
          state.questionnaire = JSON.parse(response.body);
          console.log('成功重置正在编辑的问卷');
        }, response => {
          alert("error"+response.headers)
        });
      }
      else{
        state.questionnaire = { title:'请输入标题',questions:[{type:'radio',title:'请输入标题',required:false,options:['选项1','选项2']}],date:'',status:'未保存'}
      }
    },
    removeNaire (state,arr) {//删除问卷
      state.list.splice(arr.index,1)
      Vue.http.post('./data.php',{"type":"del","index":arr.index})
        .then(response => {
          console.log('成功删除问卷');
        }, response => {
          alert("error"+response.headers)
        });
    },
    getList (state) {//得到问卷列表
      Vue.http.post('./data.php',{"type":"list"})
        .then(response => {
          if(response.body!=0){
            if(response.body.indexOf("++") !== -1){
              state.list = response.body.split('++');
            }
            else{
              state.list[0] = response.body;
            }
            for(var i=0;i<state.list.length;i++){
                state.list[i] = JSON.parse(state.list[i]);
              }
          }
          else{
            state.list = []
          }
          
        }, response => {
          alert("error"+response.headers)
        });
    },
    switchSeen (state,arr) {//切换日历显示状态
      state.seen = arr.seen
    },
    switchEditing (state,arr) {//切换编辑问卷状态
      state.editing.boolean = arr.boolean;
      state.editing.index = arr.index;
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