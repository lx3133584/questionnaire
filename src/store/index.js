import Vue        from 'vue'
import Vuex       from 'vuex'

import mutations  from './mutations'
import actions  from './actions'

Vue.use(Vuex)

// 创建一个vuex实例
// 分配多组件共享的数据和方法
const store = new Vuex.Store({
  state: {
    questionnaire: { title:'请输入标题',   //问卷的标题
                     questions:[{//问题
                        type:'radio',    //问题的类型
                        title:'请输入标题',   //问题的标题
                        required:false, //问题是否必填
                        options:['选项','选项']   //选项
                      }],
                      date:'',//截止日期
                      status:'未保存'//发布状态
                    },
    list: [],
    seen: false,//判断是否显示日历模块
    editing: {boolean:false,index:0},//是否正在编辑问卷状态和编辑问卷的index
    name: ""//存放登录用户的用户名
  },
  mutations,
  actions
})

export default store

