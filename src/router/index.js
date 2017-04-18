import Vue from 'vue'
import Router from "vue-router"


import Home from '../component/home.vue'
import New from '../component/new.vue'
import List from '../component/list.vue'
import View from '../component/view.vue'
import Edit from '../component/edit.vue'
import Statistics from '../component/statistics.vue'

// const Home = resolve => require(['../component/home.vue'], resolve)
// const New = resolve => require(['../component/new.vue'], resolve)
// const List = resolve => require(['../component/list.vue'], resolve)
// const View = resolve => require(['../component/view.vue'], resolve)
// const Edit = resolve => require(['../component/edit.vue'], resolve)
// const Statistics = resolve => require(['../component/statistics.vue'], resolve)

Vue.use(Router)


export default new Router({
    base: __dirname,
    routes: [
        {
            path: '/',
            component: Home
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
        },
        {
            path: '/statistics',
            component: Statistics
        }
    ]
})