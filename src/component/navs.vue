<template>
    <div id="navs">
        <ul>
            <li v-for='item in nav_list'>
                <router-link :to='item.link'>{{item.title}}</router-link>
            </li>
            <li>
                <router-link v-if='operating_type'
                             :to='nav_temp[operating_type].link'>
                    {{nav_temp[operating_type].title}}
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script type="text/javascript">
    export default {
        data() {
            return {
                nav_list: [//导航栏列表中的项
                    {link: '/', title: '问卷调查'},
                    {link: '/list', title: '问卷列表'},
                    {link: '/new', title: '新建问卷'}
                ],
                nav_temp: {//导航栏中临时的项
                    editing: {link: '/edit', title: '编辑问卷'},
                    viewing: {link: '/view', title: '查看问卷'},
                    statistics: {link: '/statistics', title: '问卷统计'}
                }
            }
        },
        computed: {
            operating_type () {//正在操作的类型
                return this.$store.state.operating.type
            }
        }
    }
</script>

<style>
    #navs {
        position: fixed;
        top: 0;
        padding: 0 10%;
        height: 100px;
        line-height: 100px;
        width: 100%;
        font-size: 2rem;
        background: #fff;
        box-shadow: #000 1px 0 5px;
        z-index: 999;
    }

    #navs li {
        display: inline-block;
        margin: 0 30px;
    }

    #navs li:first-child {
        font-size: 140%;
    }

    #navs li a.router-link-active {
        color: #ff9800;
    }
</style>