import Vue from 'vue'
import Router from "vue-router"


// import Home from '../component/home.vue'
// import New from '../component/new.vue'
// import List from '../component/list.vue'
// import View from '../component/view.vue'
// import Edit from '../component/edit.vue'
// import Statistics from '../component/statistics.vue'

const Home = r => require.ensure([], () => r(require('../component/home.vue')), 'home')
const New = r => require.ensure([], () => r(require('../component/new.vue')), 'new')
const List = r => require.ensure([], () => r(require('../component/list.vue')), 'list')
const View = r => require.ensure([], () => r(require('../component/view.vue')), 'view')
const Edit = r => require.ensure([], () => r(require('../component/edit.vue')), 'edit')
const Statistics = r => require.ensure([], () => r(require('../component/statistics.vue')), 'statistics')


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