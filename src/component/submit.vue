<template>
    <div id="submit">
        <button @click="save(index, '已发布', type)">提交问卷</button>
        <button @click="save(index, '未发布', type)">保存问卷</button>
    </div>
</template>

<script type="text/javascript">
    import messageBox from './messageBox/main.js'
    import loading from './loading/main.js'

    export default {
        data() {
            return {
                type: this.$store.state.operating.type,
                index: this.$store.state.operating.index
            }
        },
        methods: {
            save(index, status, type) {
                if (status === '已发布') {
                    messageBox({
                        title: '保存/提交',
                        message: '提交问卷后，截止日期之前不可更改, 是否确定?',
                        type: 'confirm',
                        success: () => {
                            loading({show: true});
                            this.$store.dispatch('save', {index: index, status: status, type: type}).then(() => {
                                loading({show: false});
                                this.$store.commit('switchOperating', {type: false});
                                this.$store.commit('reset');
                                this.$router.push('/list');
                            })
                        },
                    })
                }
                else {
                    loading({show: true});
                    this.$store.dispatch('save', {index: index, status: status, type: type}).then(() => {
                        loading({show: false});
                        this.$store.commit('switchOperating', {type: false});
                        this.$store.commit('reset');
                        this.$router.push('/list');
                    })
                }
            }
        },
        components: {messageBox, loading}
    }
</script>

<style>
    #submit button {
        float: right;
        display: inline-block;
        margin: 1em;
        width: 5em;
        height: 1.5em;
        line-height: 1.5em;
        font-size: 2rem;
        color: #fff;
        text-align: center;
        background: rgba(255, 152, 0, 0.8);
        border: none;
        transition: all 0.5s;
        cursor: pointer;
    }

    #submit button:hover {
        color: #000;
        background: #fff;
        border: #000 1px solid;
    }
</style>