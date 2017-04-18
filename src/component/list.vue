<template>
    <div id="list">
        <table>
            <thead>
            <tr>
                <!-- <th><input type="checkbox"></th> -->
                <th>标题</th>
                <th>截止日期</th>
                <th>状态</th>
                <th>操作</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(item,index) in list">
                <!-- <td><input type="checkbox"></td> -->
                <td>{{item.title}}</td>
                <td v-if='item.date'>{{item.date}}</td>
                <td v-else>无期限</td>
                <td>{{item.status}}</td>
                <td>
                    <button @click="edit(index)" v-if="item.status=='未发布'||item.status=='已过期'">编辑</button>
                    <button @click="del(index)">删除</button>
                    <button @click="view(index)">查看</button>
                    <button @click="statistics(index)" v-if="item.status=='已发布'">统计</button>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
</template>

<script type="text/javascript">
    import messageBox from './messageBox/main.js'

    export default {
        computed: {
            list() {
                return this.$store.state.list
            }
        },
        mounted() {
            this.$store.dispatch('getList');
        },
        methods: {
            edit(index) {//编辑
                this.$store.commit('reset', {index: index})
                this.$store.commit('switchOperating', {type: 'editing', index: index});
                this.$router.push({path: 'edit'});
            },
            del(index) {//删除
                messageBox({
                    title: '删除',
                    message: '该问卷将永久删除不能恢复, 是否确定?',
                    type: 'confirm',
                    success: () => {
                        this.$store.dispatch('removeNaire', {index: index});
                    }
                });
            },
            view(index) {//查看问卷
                this.$store.commit('switchOperating', {type: 'viewing', index: index});
                this.$router.push({path: 'view'})
            },
            statistics(index) {//问卷统计
                this.$store.commit('switchOperating', {type: 'statistics', index: index});
                this.$router.push({path: 'statistics'})
            }
        },
        components: {messageBox}
    }
</script>

<style>
    #list {
        margin: 120px auto 0 auto;
        padding: 100px 0;
        width: 95%;
        color: #eee;
        text-align: center;
        background: rgba(255, 255, 255, 0.2);
    }

    #list table {
        margin: 0 auto;
        border: 2px solid rgba(255, 255, 255, 0.2);
    }

    #list table th, #list table td {
        color: #fff;
        padding: 5px 10px;
    }

    #list table input {
        margin: 0 10px;
    }

    #list table thead tr {
        font-size: 2.5rem;
        height: 2em;
        line-height: 2em;
        cursor: default;
        background: rgba(255, 255, 255, 0.3);
    }

    #list table tbody tr {
        font-size: 2rem;
        height: 2em;
        line-height: 2em;
        border-bottom: 1px solid #333;
        cursor: default;
    }

    #list table tbody tr:hover {
        background: rgba(255, 255, 255, 0.2);
    }

    #list table tbody button {
        font-size: 1.8rem;
        color: #fff;
        background: rgba(255, 152, 0, 0.8);
        border: none;
        border-radius: 3px;
        cursor: pointer;
    }
</style>