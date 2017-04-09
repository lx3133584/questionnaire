import Vue from 'vue';
import App from './App.vue';
import VueResource from 'vue-resource';

import store from './store';
import router from './router';

Vue.use(VueResource);


// 路由器会创建一个 App 实例，并且挂载到选择符 #app 匹配的元素上。
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')